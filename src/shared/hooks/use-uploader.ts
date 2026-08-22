"use client";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { compressImage } from "@/lib/image-compressor";
import { AppError } from "../lib/errors";

export function useUploader() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const uploadFile = async (rawFile: File) => {
    setIsProcessing(true);
    try {
      const optimizedFile = await compressImage(rawFile, {
        maxWidth: 1080,
        quality: 75,
      });

      const res = await startUpload([optimizedFile]);
      if (!res || res.length === 0) throw new AppError("Failed to upload file");

      return {
        url: res[0].ufsUrl,
        key: res[0].key,
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    uploadFile,
    isLoading: isProcessing || isUploading,
  };
}
