export interface StorageProvider {
  upload(
    key: string,
    file:/*  Buffer | */ Uint8Array
  ): Promise<{ url?: string; key: string }>;

  delete(key: string): Promise<void>;

  getSignedUrl?(key: string, expiresIn?: number): Promise<string>;
}
