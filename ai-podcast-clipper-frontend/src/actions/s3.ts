"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

interface UploadUrlResponse {
  success: boolean;
  signedUrl: string;
  uploadedFileId: string;
}

export async function generateUploadUrl({
  fileName,
  contentType,
}: {
  fileName: string;
  contentType: string;
}): Promise<UploadUrlResponse> {
  const session = await auth();
  if (!session) {
    throw new Error("UnAuthorized");
  }

  const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const fileExtension = fileName.split(".").pop() ?? "";
  const uniqueId = uuid4();
  const key = `${uniqueId}/original.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });

  const uploadedFile = await db.uploadedFile.create({
    data: {
      userId: session.user.id,
      s3Key: key,
      displayName: fileName,
      uploaded: false,
    },
    select: { id: true },
  });

  return {
    success: true,
    signedUrl,
    uploadedFileId: uploadedFile.id,
  };
}
