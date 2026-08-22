"use server";

import { staffAction } from "@/shared/lib/actions";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteUPloadedImage = staffAction(async (fileKey: string) => {
  const response = await utapi.deleteFiles(fileKey);

  console.log(response);

  return "Image deleted successfully";
});
