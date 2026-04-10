import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'

const TABLE = process.env.DYNAMODB_TABLE_NAME ?? 'interior-espacio-substack-posts'

function getClient(): DynamoDBDocumentClient {
  return DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: process.env.AWS_REGION ?? 'us-east-1',
      credentials: {
        accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID!,
        secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY!,
      },
    })
  )
}

export async function isAlreadyPosted(substackPostId: string): Promise<boolean> {
  const result = await getClient().send(
    new GetCommand({ TableName: TABLE, Key: { substackPostId } })
  )
  return !!result.Item
}

export interface PostedRecord {
  substackPostId: string
  facebookPostId: string
  title: string
  url: string
}

export async function markAsPosted(record: PostedRecord): Promise<void> {
  const ttl = Math.floor(Date.now() / 1000) + 180 * 24 * 60 * 60 // 180 days

  await getClient().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        ...record,
        postedAt: new Date().toISOString(),
        ttl,
      },
    })
  )
}
