interface CompressOptions {
  maxWidth?: number;
  quality?: number;
}

export async function compressImage(
  file: File,
  options: CompressOptions = {},
): Promise<File> {
  if (typeof window === "undefined") {
    throw new Error("compressImage solo puede ejecutarse en el navegador");
  }

  const { maxWidth = 1920, quality = 75 } = options;

  const [{ default: resize }, { default: encodeWebp }] = await Promise.all([
    import("@jsquash/resize"),
    import("@jsquash/webp/encode"),
  ]);

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo inicializar el Canvas 2D");
  ctx.drawImage(bitmap, 0, 0);

  let imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);

  if (imageData.width > maxWidth) {
    const targetHeight = Math.round(
      (imageData.height * maxWidth) / imageData.width,
    );
    imageData = await resize(imageData, {
      width: maxWidth,
      height: targetHeight,
    });
  }

  const compressedBuffer = await encodeWebp(imageData, { quality });

  const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
  return new File([compressedBuffer], newFileName, {
    type: "image/webp",
  });
}
