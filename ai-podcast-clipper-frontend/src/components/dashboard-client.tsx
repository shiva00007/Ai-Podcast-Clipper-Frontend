"use client";
import type { Clip } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import ClipsDisplay from "./clips-display";
type uploadedFilesProps = {
  id: string;
  s3Key: string;
  filename: string;
  status: string;
  clipsCount: number;
  createdAt?: Date;
};

type clipsProps = {
  clips: Clip[];
};

const DashboardClient = ({
  uploadedFiles,
  clips,
}: {
  uploadedFiles: uploadedFilesProps[];
  clips: clipsProps;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const [uploading, setUploading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    router.refresh();

    // Clear any previous timeout to avoid stacking
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set timeout and save the ID
    timeoutRef.current = setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  //upload handler

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
                disabled={uploading}
                maxFiles={1}
              >
                {(dropzone: DropzoneState) => (
                  <>
                    <div className="flex flex-col items-center justify-center space-y-2 rounded-lg p-2 text-center">
                      <UploadCloud className="text-muted-foreground h-10 w-10" />
                      <p className="font-medium">Drag and drop your file</p>
                      <p className="text-muted-foreground text-sm">
                        or click to browse (MP4 up to 500MB)
                      </p>
                      <Button
                        className="cursor-pointer"
                        variant="default"
                        size="sm"
                        disabled={uploading}
                      >
                        Select File
                      </Button>
                    </div>
                  </>
                )}
              </Dropzone>

              <div className="mt-2 flex items-start justify-between">
                <div>
                  {files.length > 0 && (
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">Selected file:</p>
                      {files.map((file) => (
                        <p key={file.name} className="text-muted-foreground">
                          {file.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  disabled={files.length === 0 || uploading}
                  onClick={handleUpload}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload and Generate Clips"
                  )}
                </Button>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-md mb-2 font-medium">Queue Status</h3>
                    <Button
                      onClick={handleRefresh}
                      variant="outline"
                      size="sm"
                      disabled={refreshing}
                    >
                      {refreshing && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Refresh
                    </Button>
                  </div>

                  <div className="max-h-[300px] overflow-auto rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>File</TableHead>
                          <TableHead>Uploaded</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Clips Created</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {uploadedFiles?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="max-w-xs truncate font-medium">
                              {item.filename}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {
                                new Date(item.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </TableCell>
                            <TableCell>
                              {item.status === "queued" && (
                                <Badge variant="outline">Queued</Badge>
                              )}
                              {item.status === "processing" && (
                                <Badge variant="outline">Processing</Badge>
                              )}
                              {item.status === "processed" && (
                                <Badge variant="outline">Processed</Badge>
                              )}
                              {item.status === "no credits" && (
                                <Badge variant="destructive">No Credits</Badge>
                              )}
                              {item.status === "failed" && (
                                <Badge variant="destructive">Failed</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {item.clipsCount > 0 ? (
                                <span>{item.clipsCount}</span>
                              ) : (
                                <span className="text-muted-foreground">
                                  No clips Yet
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-clips">
          <Card>
            <CardHeader>
              <CardTitle>My Clips</CardTitle>
              <CardDescription>
                View and Manage Your AI Generated Clips here.Processing May take
                Few Minutes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClipsDisplay clips={clips} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardClient;
