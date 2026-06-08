import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function getR2ClientConfig() {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    return null;
  }

  return {
    bucket,
    client: new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey }
    })
  };
}

export function hasR2DataStoreConfig() {
  return Boolean(getR2ClientConfig());
}

export async function readR2Json<T>(key: string): Promise<T | null> {
  const config = getR2ClientConfig();
  if (!config) return null;

  try {
    const response = await config.client.send(
      new GetObjectCommand({
        Bucket: config.bucket,
        Key: key
      })
    );

    const raw = await response.Body?.transformToString();
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (error) {
    if (isMissingObjectError(error)) {
      return null;
    }
    throw error;
  }
}

export async function writeR2Json(key: string, value: unknown) {
  const config = getR2ClientConfig();
  if (!config) return false;

  await config.client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: JSON.stringify(value),
      ContentType: "application/json"
    })
  );

  return true;
}

function isMissingObjectError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    ("name" in error || "$metadata" in error) &&
    ((error as { name?: string }).name === "NoSuchKey" ||
      (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode === 404)
  );
}
