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
    if (files.length === 0) {
      return;
    }

    const file = files[0]!;
    setUploading(true);

    try {
      //client -> s3 bucket
      //cliet -> next js Backend -> s3 bucket
    } catch (error) {
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
