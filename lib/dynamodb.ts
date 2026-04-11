import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.SES_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID!,
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY!,
  },
});

const TABLE = process.env.DYNAMODB_TABLE_NAME ?? "interior-espacio-substack-posts";

export async function isAlreadyPosted(substackPostId: string): Promise<boolean> {
  const res = await client.send(
    new GetItemCommand({
      TableName: TABLE,
      Key: { substackPostId: { S: substackPostId } },
    })
  );
  return res.Item !== undefined;
}

export async function markAsPosted(params: {
  substackPostId: string;
  facebookPostId: string;
  title: string;
  url: string;
}): Promise<void> {
  await client.send(
    new PutItemCommand({
      TableName: TABLE,
      Item: {
        substackPostId: { S: params.substackPostId },
        facebookPostId: { S: params.facebookPostId },
        title: { S: params.title },
        url: { S: params.url },
        postedAt: { S: new Date().toISOString() },
      },
    })
  );
}
