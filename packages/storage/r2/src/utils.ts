// packages/storage-r2/src/utils.ts

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET!;

export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array,
  contentType = 'application/octet-stream'
): Promise<{ key: string; url: string }> {
  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  const url = await getSignedUrl(
    r2,
    new HeadObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }),
    { expiresIn: 60 * 60 } // 1 hour
  );

  return { key, url };
}

export async function deleteFile(key: string) {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}

export async function replaceFile(
  key: string,
  body: Buffer | Uint8Array,
  contentType = 'application/octet-stream'
): Promise<{ key: string; url: string }> {
  // R2 will override by default when key already exists
  return uploadFile(key, body, contentType);
}
