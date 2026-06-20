import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
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

  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ success: false, message: "图片不能超过 4MB，请先压缩后再上传。" }, { status: 400 });
  }

  const extension = getExtension(file.name, file.type);
  const key = `site/${Date.now()}-${crypto.randomUUID()}${extension}`;

  try {
    const bindingUrl = await uploadToR2Binding(key, file, file.type);
    if (bindingUrl) {
      return NextResponse.json({ success: true, url: bindingUrl, storage: "cloudflare-r2" });
    }

    const localUrl = await uploadLocally(key, file);
    return NextResponse.json({ success: true, url: localUrl, storage: "local" });
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json({ success: false, message: "图片上传失败，请检查 Cloudflare 配置。" }, { status: 500 });
  }
}

async function uploadToR2Binding(key: string, file: File, contentType: string) {
  const bucket = await getSiteImagesBucket();
  const publicUrl = await getCloudflarePublicR2Url();

  if (!bucket || !publicUrl) {
    return null;
  }

  await bucket.put(key, file.stream(), {
    httpMetadata: {
      contentType
    }
  });

  return `${publicUrl.replace(/\/$/, "")}/${key}`;
}

async function uploadLocally(key: string, file: File) {
  const relativePath = path.join("uploads", key);
  const target = path.join(process.cwd(), "public", relativePath);
  const body = new Uint8Array(await file.arrayBuffer());
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
