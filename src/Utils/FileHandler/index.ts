import {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
    GetObjectCommand,
  } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  import crypto from 'crypto'
  
  export class FileHandler {
    private credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
    private s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: this.credentials,
    });
    private bucketName = process.env.AWS_S3_BUCKET_NAME;
  
    constructor() {
    }
  
    async postFiles(file: Uint8Array, fileName: string): Promise<void> {
      try {
        const uploadParams = {
          Bucket: this.bucketName,
          Key: fileName,
          Body: file,
        };
        const command = new PutObjectCommand(uploadParams);
        await this.s3Client.send(command);
      } catch (error) {
        console.log(error);
      }
    }
  
    async getFile(fileName:string): Promise<string>{
      try {
        const params = {
          Bucket: this.bucketName,
          Key: fileName,
          Expires: 3600,
        };
        const command = new GetObjectCommand(params);
        const signedUrl = await getSignedUrl(this.s3Client, command, {
          expiresIn: 3600,
        });
        return signedUrl
      } catch (error) {
        console.log(error)
      }
    }

    getFileName(fileExt:string) {
      const timestamp = Date.now().toString();
      const random = crypto.randomBytes(32).toString("hex");
      return `${random}${timestamp}.${fileExt}`;
    }
  }