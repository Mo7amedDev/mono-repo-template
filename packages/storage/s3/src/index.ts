// packages/storage/s3/src/index.ts
 
export default class S3Provider {
  constructor(private config: { bucket: string }) {}

  async upload(key: string, file: Buffer) {
    console.log('Uploading to S3:', key);
    return { key };
  }

  async delete(key: string) {
    console.log('Deleting from S3:', key);
  }
}
