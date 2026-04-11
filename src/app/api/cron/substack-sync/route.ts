import { NextRequest, NextResponse } from 'next/server'
import { getSubstackPosts } from '@/lib/substack'
import { publishPost } from '@/lib/facebook'
import { isAlreadyPosted, markAsPosted } from '@/lib/dynamodb'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const posts = await getSubstackPosts()
  // Process oldest-first to preserve chronological order on the Facebook Page
  const ordered = [...posts].reverse()

  let posted = 0
  let skipped = 0

  for (const post of ordered) {
    if (!post.id) {
      skipped++
      continue
    }

    if (await isAlreadyPosted(post.id)) {
      skipped++
      continue
    }

    const message = `${post.title}\n\n${post.excerpt}\n\nLeer más → ${post.url}`
    const result = await publishPost(message)

    await markAsPosted({
      substackPostId: post.id,
      facebookPostId: result.id,
      title: post.title,
      url: post.url,
    })

    posted++
  }

  return NextResponse.json({ checked: posts.length, posted, skipped })
}
