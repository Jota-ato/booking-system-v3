import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { requireAuth } from "@/lib/auth-server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const { user, isStaff, isAuth } = await requireAuth();

      if (!isAuth || !user) {
        throw new UploadThingError({
          code: "FORBIDDEN",
          message: "You are not authorized to upload files.",
        });
      }

      if (!isStaff) {
        throw new UploadThingError({
          code: "FORBIDDEN",
          message: "You are not authorized to upload images.",
        });
      }

      return {
        userId: user.id,
        userRole: user.role,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        uploadedBy: metadata.userId,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
