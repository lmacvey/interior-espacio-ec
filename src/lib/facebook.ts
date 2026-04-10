export interface FacebookPostResult {
  id: string
}

export async function postToFacebook(message: string): Promise<FacebookPostResult> {
  const pageId = process.env.FACEBOOK_PAGE_ID
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

  if (!pageId || !token) {
    throw new Error('Facebook credentials not configured')
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, access_token: token }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Facebook API error: ${JSON.stringify(err)}`)
  }

  return res.json() as Promise<FacebookPostResult>
}
