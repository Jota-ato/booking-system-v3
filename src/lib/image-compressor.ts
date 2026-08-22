import decodeJpeg from "@jsquash/jpeg/decode";
import decodePng from "@jsquash/png/decode";
import decodeWebp from "@jsquash/webp/decode";
import encodeWebp from "@jsquash/webp/encode";
import resize from "@jsquash/resize";

interface CompressOptions {
  maxWidth?: number;
  quality?: number;
}

export async function compressImage(
  file: File,
  options: CompressOptions = { maxWidth: 1920, quality: 75 },
): Promise<File> {
  const { maxWidth = 1920, quality = 75 } = options;
  const arrayBuffer = await file.arrayBuffer();
  let imageData: ImageData;

  try {
    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      imageData = await decodeJpeg(arrayBuffer);
    } else if (file.type === "image/png") {
      imageData = await decodePng(arrayBuffer);
    } else if (file.type === "image/webp") {
      imageData = await decodeWebp(arrayBuffer);
    } else {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bitmap, 0, 0);
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  } catch (error) {
    throw new Error("Formato de imagen no compatible para compresión.");
  }

  if (imageData.width > maxWidth) {
    const scale = maxWidth / imageData.width;
    const targetHeight = Math.round(imageData.height * scale);

    imageData = await resize(imageData, {
      width: maxWidth,
      height: targetHeight,
    });
  }

  const compressedBuffer = await encodeWebp(imageData, {
    quality,
  });

  const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
  return new File([compressedBuffer], newFileName, {
    type: "image/webp",
  });
}
