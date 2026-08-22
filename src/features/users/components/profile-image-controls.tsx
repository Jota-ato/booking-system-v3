"use client";

import { useRef, useState } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { getUserInitials } from "@/shared/utils/names";
import { Button } from "@/shared/components/ui/button";
import { Trash } from "lucide-react";
import { useUploader } from "@/shared/hooks/use-uploader";
import { Spinner } from "@/shared/components/ui/spinner";
import { showResponse } from "@/shared/lib/client-actions";
import { deleteUPloadedImage } from "@/features/images/actions/images-actions";
import { extractFileKeyFromUrl } from "@/shared/utils/uploadthing";

export function ProfileImageControls({
  userImage,
  userName,
  onImageUpdated,
}: {
  userImage: string | null;
  userName: string;
  onImageUpdated?: (newUrl: string) => Promise<void> | void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(userImage);
  const { uploadFile, isLoading } = useUploader();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile(file);

      setCurrentImage(result.url);
      if (onImageUpdated) {
        await onImageUpdated(result.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async () => {
    setCurrentImage(null);
    showResponse(
      await deleteUPloadedImage(extractFileKeyFromUrl(currentImage || "")),
    );
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      <Avatar className="size-25 relative">
        {currentImage && <AvatarImage src={currentImage} alt={userName} />}
        <AvatarFallback className="text-3xl">
          {getUserInitials(userName)}
        </AvatarFallback>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
            <Spinner className="size-6 text-foreground" />
          </div>
        )}
      </Avatar>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={handleButtonClick}
          disabled={isLoading}
          aria-label="Change profile picture"
          variant="outline"
          size="sm"
        >
          {isLoading ? "Optimizing & Uploading..." : "Change picture"}
        </Button>

        <Button
          type="button"
          onClick={handleDelete}
          disabled={isLoading || !currentImage}
          aria-label="Delete profile picture"
          variant="outline"
          size="icon-sm"
        >
          <Trash className="size-4" />
        </Button>
      </div>
    </div>
  );
}
