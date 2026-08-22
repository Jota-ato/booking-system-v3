"use server";

import { staffAction } from "@/shared/lib/actions";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteUPloadedImage = staffAction(async (fileKey: string) => {
  await utapi.deleteFiles(fileKey);
  return "Image deleted successfully";
});
