"use client";
import type { Clip } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Dropzone, { type DropzoneState } from "shadcn-dropzone";
import { Loader2, UploadCloud } from "lucide-react";
import { generateUploadUrl } from "~/actions/s3";

import { toast } from "sonner";
import { processVideo } from "~/actions/generation";
type uploadedFilesProps = {
  id: string;
  s3Key: string;
  filename: string;
  status: string;
  clipsCount: number;
  createdAt: Date;
};

type clipsProps = {
  clips: Clip[];
};

const DashboardClient = ({
  uploadedFiles,
  clips,
}: {
  uploadedFiles: uploadedFilesProps;
  clips: clipsProps;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const [uploading, setUploading] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const file = files[0]!;
    setUploading(true);

    try {
      const { success, signedUrl, uploadedFileId } = await generateUploadUrl({
        fileName: file.name,
        contentType: file.type,
      });

      console.log("Upload URL:", signedUrl);
      console.log("Uploaded File ID:", uploadedFileId);

      if (!success || !signedUrl) {
        throw new Error("Failed to get Upload URL");
      }

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      console.log("Upload status:", uploadResponse.status);
      if (!uploadResponse.ok) {
        const err = await uploadResponse.text();
        console.error("S3 Upload Error:", err);
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }

      await processVideo(uploadedFileId);

      setFiles([]);
      toast.success("Your video is Uploaded Successfully", {
        description:
          "Your video has been scheduled for processing. Check the status below.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Upload or Processing Error:", error);
      toast.error("Upload failed", {
        description:
          "There was a problem uploading your video. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-semibold tracking-tight">
            Podcast Clipper
          </h1>
          <p className="text-muted-foreground">
            Upload Your Podcast and Get AI-Generated Clips Instantly
          </p>
        </div>
        <Link href="/dashboard/billing">
          <Button>Buy Credits</Button>
        </Link>
      </div>
      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="my-clips">My Clips</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Podcast</CardTitle>
              <CardDescription>
                Upload Your Audio Or Video File To Generate the Clips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dropzone
                onDrop={handleDrop}
                accept={{ "video/mp4": [".mp4"] }}
                maxSize={500 * 1024 * 1024}
                maxFiles={1}
                disabled={uploading}
              >
                {(dropzone: DropzoneState) => (
                  <>
                    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg p-10 text-center">
                      <UploadCloud className="text-muted-foreground h-12 w-12" />
                      <p className="font-medium"> Drag and Drop Your File</p>
                      <p className="text-muted-foreground text-sm">
                        or click to browser (MP4 upto 500 MB)
                      </p>
                      <Button
                        variant="default"
                        size="sm"
                        className="cursor-pointer"
                        disabled={uploading}
                      >
                        Select File
                      </Button>
                    </div>
                  </>
                )}
              </Dropzone>

              <div className="flex flex-col items-center justify-center">
                <div>
                  {files.length > 0 && (
                    <div className="flex space-y-2">
                      {files.map((file) => (
                        <p
                          className="text-muted-foreground text-sm"
                          key={file.name}
                        >
                          {file.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  className="my-2"
                  disabled={files.length === 0 || uploading}
                  onClick={handleUpload}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload and Generate Clips"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardClient;
