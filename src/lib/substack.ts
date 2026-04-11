import { XMLParser } from 'fast-xml-parser'

export interface SubstackPost {
  id: string
  title: string
  url: string
  excerpt: string
  publishedAt: string
}

export async function fetchSubstackFeed(): Promise<SubstackPost[]> {
  const publication = process.env.SUBSTACK_PUBLICATION
  if (!publication) return []

  try {
    const res = await fetch(`https://${publication}.substack.com/feed`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []

    const xml = await res.text()
    const parser = new XMLParser({ ignoreAttributes: false })
    const parsed = parser.parse(xml)

    const items: unknown[] = parsed?.rss?.channel?.item ?? []
    const list = Array.isArray(items) ? items : [items]

    return list.slice(0, 10).map((raw) => {
      const item = raw as Record<string, unknown>
      const guid = item.guid as Record<string, unknown> | string | undefined
      const guidText = typeof guid === 'object' && guid !== null ? String(guid['#text'] ?? '') : String(guid ?? '')
      return {
        id: guidText || String(item.link ?? ''),
        title: String(item.title ?? ''),
        url: String(item.link ?? ''),
        excerpt: stripHtml(String(item.description ?? item['content:encoded'] ?? '')).slice(0, 200),
        publishedAt: String(item.pubDate ?? ''),
      }
    })
  } catch {
    return []
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}
