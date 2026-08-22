"use client";
import { showResponse } from "@/shared/lib/client-actions";
import { updateStaffDataAction } from "@/features/staff/actions/staff-actions";
import { useUploader } from "@/shared/hooks/use-uploader";
import { deleteUPloadedImage } from "@/features/images/actions/images-actions";
import { extractFileKeyFromUrl } from "@/shared/utils/uploadthing";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { getUserInitials } from "@/shared/utils/names";
import { Button } from "@/shared/components/ui/button";
import { Trash } from "lucide-react";

import { Spinner } from "@/shared/components/ui/spinner";
import { Staff, User } from "@/db/types/index.types";
import { useRef, useState } from "react";

export function StaffImageControls({
  staff,
  user,
}: {
  staff: Staff | null;
  user: User;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(
    staff?.image ?? null,
  );
  const { uploadFile, isLoading } = useUploader();

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !staff) return;

    try {
      const result = await uploadFile(file);
      setCurrentImage(result.url);
      const response = showResponse(
        await updateStaffDataAction({
          staffId: staff.id,
          userId: user.id,
          data: { image: result.url },
        }),
      );
      if (response && response.changedImage) {
        await deleteUPloadedImage(extractFileKeyFromUrl(currentImage || ""));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!staff) return;
    const response = showResponse(
      await updateStaffDataAction({
        staffId: staff.id,
        userId: user.id,
        data: { image: null },
      }),
    );
    if (response && response.changedImage) {
      await deleteUPloadedImage(extractFileKeyFromUrl(currentImage || ""));
    }
    setCurrentImage(null);
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
        {currentImage && (
          <AvatarImage src={currentImage} alt={staff?.name || "staff"} />
        )}
        <AvatarFallback className="text-3xl">
          {getUserInitials(staff?.name || "")}
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
          disabled={isLoading || !staff}
          aria-label="Change picture"
          variant="outline"
          size="sm"
        >
          Change picture
        </Button>

        <Button
          type="button"
          onClick={handleDelete}
          disabled={isLoading || !currentImage || !staff}
          aria-label="Delete picture"
          variant="outline"
          size="icon-sm"
        >
          <Trash className="size-4" />
        </Button>
      </div>
    </div>
  );
}
