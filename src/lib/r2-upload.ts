import { PresignedUploadResponse } from "@/types/api";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export type UploadFolder = "covers" | "slips" | "pdfs";

export async function uploadToR2(file: File, folder: UploadFolder): Promise<string> {
  // 1. Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds 10MB limit (selected: ${(file.size / (1024 * 1024)).toFixed(1)}MB)`);
  }

  // 2. Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Unsupported file format "${file.type}". Allowed: JPG, PNG, WebP, PDF`);
  }

  // 3. Request presigned upload URL from backend
  const presignRes = await fetch("/api/backend/upload/presigned", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      folder,
    }),
  });

  if (!presignRes.ok) {
    let errText = "Failed to obtain upload authorization";
    try {
      const errJson = await presignRes.json();
      errText = errJson.message || errJson.error || errText;
    } catch {
      // fallback
    }
    throw new Error(errText);
  }

  const { uploadUrl, publicUrl }: PresignedUploadResponse = await presignRes.json();

  // 4. Direct PUT upload to Cloudflare R2 bucket with raw file binary
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error(`Direct Cloudflare R2 upload failed with HTTP status ${uploadRes.status}`);
  }

  return publicUrl;
}
