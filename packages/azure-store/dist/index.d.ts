import type stream from 'node:stream';
import { DataStore, Upload, type KvStore } from '@tus/utils';
import type { TokenCredential } from '@azure/core-auth';
type Options = {
    cache?: KvStore<Upload>;
    account: string;
    containerName: string;
    accountKey?: string;
    credential?: TokenCredential;
};
/**
 * Store using the Azure Storage SDK
 * @author Bharath Battaje <bharathraob@gmail.com>
 */
export declare class AzureStore extends DataStore {
    private cache;
    private blobServiceClient;
    private containerClient;
    private containerName;
    constructor(options: Options);
    /**
     * Saves upload metadata to blob metada. Also upload metadata
     * gets saved in local cache as well to avoid calling azure server everytime.
     */
    private saveMetadata;
    /**
     * Retrieves upload metadata previously saved.
     * It tries to get from local cache, else get from the blob metadata.
     */
    private getMetadata;
    /**
     * provides the readable stream for the previously uploaded file
     */
    read(file_id: string): Promise<NodeJS.ReadableStream | undefined>;
    /**
     * Creates a empty append blob on Azure storage and attaches the metadata to it.
     */
    create(upload: Upload): Promise<Upload>;
    /**
     * Gets the current file upload status
     */
    getUpload(id: string): Promise<Upload>;
    /**
     * Uploads each blob to the azure blob storage. Please note that current official Azure stoarge node sdk has some limitation
     * when it comes to stream upload. So here we are concatenating all the chunks from a request into a block and then uploading
     * to azure storage using the appendBlock. This can be upgraded to streamUpload when node sdk start supporting it.
     */
    write(stream: stream.Readable, id: string, offset: number): Promise<number>;
    declareUploadLength(id: string, upload_length: number): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map