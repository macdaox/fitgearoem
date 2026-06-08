import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getCloudflarePublicR2Url, getSiteImagesBucket } from "@/lib/cloudflare";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "未登录或登录已过期。" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, message: "请选择要上传的图片。" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ success: false, message: "只能上传图片文件。" }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ success: false, message: "图片不能超过 8MB。" }, { status: 400 });
  }

  const extension = getExtension(file.name, file.type);
  const key = `site/${Date.now()}-${crypto.randomUUID()}${extension}`;
  const arrayBuffer = await file.arrayBuffer();
  const bytes = Buffer.from(arrayBuffer);

  try {
    const bindingUrl = await uploadToR2Binding(key, arrayBuffer, file.type);
    if (bindingUrl) {
      return NextResponse.json({ success: true, url: bindingUrl, storage: "cloudflare-r2" });
    }

    const cloudflareUrl = await uploadToR2(key, bytes, file.type);
    if (cloudflareUrl) {
      return NextResponse.json({ success: true, url: cloudflareUrl, storage: "cloudflare-r2" });
    }

    const localUrl = await uploadLocally(key, bytes);
    return NextResponse.json({ success: true, url: localUrl, storage: "local" });
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json({ success: false, message: "图片上传失败，请检查 Cloudflare 配置。" }, { status: 500 });
  }
}

async function uploadToR2Binding(key: string, body: ArrayBuffer, contentType: string) {
  const bucket = await getSiteImagesBucket();
  const publicUrl = await getCloudflarePublicR2Url();

  if (!bucket || !publicUrl) {
    return null;
  }

  await bucket.put(key, body, {
    httpMetadata: {
      contentType
    }
  });

  return `${publicUrl.replace(/\/$/, "")}/${key}`;
}

async function uploadToR2(key: string, body: Buffer, contentType: string) {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET;
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    return null;
  }

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey }
  });

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType
    })
  );

  return `${publicUrl.replace(/\/$/, "")}/${key}`;
}

async function uploadLocally(key: string, body: Buffer) {
  const relativePath = path.join("uploads", key);
  const target = path.join(process.cwd(), "public", relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, body);
  return `/${relativePath.replaceAll(path.sep, "/")}`;
}

function getExtension(fileName: string, contentType: string) {
  const extension = path.extname(fileName).toLowerCase();
  if (extension) {
    return extension;
  }

  if (contentType === "image/png") return ".png";
  if (contentType === "image/webp") return ".webp";
  if (contentType === "image/gif") return ".gif";
  return ".jpg";
}
