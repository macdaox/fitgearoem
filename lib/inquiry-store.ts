import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSiteDataKv } from "@/lib/cloudflare";
import { hasR2DataStoreConfig, readR2Json, writeR2Json } from "@/lib/r2-data-store";
import type { InquiryPayload } from "@/lib/validation";

export type StoredInquiry = Omit<InquiryPayload, "whatsapp" | "country" | "productInterest" | "quantity"> & {
  id: string;
  whatsapp?: string | null;
  country?: string | null;
  productInterest?: string | null;
  quantity?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

type LocalInquiryRecord = Omit<StoredInquiry, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

const localDataDir = path.join(process.cwd(), ".data");
const localDataPath = path.join(localDataDir, "inquiries.json");
const cloudflareInquiriesKey = "inquiries";
const r2InquiriesKey = "data/inquiries.json";

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function getInquiryStoreLabel() {
  return hasDatabaseUrl() ? "PostgreSQL 数据库" : "Cloudflare KV 或本地演示存储";
}

export async function createInquiry(data: InquiryPayload) {
  const kv = await getSiteDataKv();
  if (kv) {
    const inquiries = await readKvInquiries();
    const now = new Date().toISOString();
    inquiries.unshift({
      ...data,
      id: crypto.randomUUID(),
      status: "new",
      createdAt: now,
      updatedAt: now
    });
    await writeKvInquiries(inquiries);
    return;
  }

  if (hasR2DataStoreConfig()) {
    const r2Inquiries = (await readR2Inquiries()) || [];
    const now = new Date().toISOString();
    r2Inquiries.unshift({
      ...data,
      id: crypto.randomUUID(),
      status: "new",
      createdAt: now,
      updatedAt: now
    });
    await writeR2Json(r2InquiriesKey, r2Inquiries);
    return;
  }

  if (hasDatabaseUrl()) {
    const { prisma } = await import("@/lib/prisma");
    await prisma.inquiry.create({ data });
    return;
  }

  const inquiries = await readLocalInquiries();
  const now = new Date().toISOString();
  inquiries.unshift({
    ...data,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: now,
    updatedAt: now
  });
  await writeLocalInquiries(inquiries);
}

export async function listInquiries(): Promise<StoredInquiry[]> {
  const kv = await getSiteDataKv();
  if (kv) {
    const inquiries = await readKvInquiries();
    return inquiries.map(toStoredInquiry).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  if (hasR2DataStoreConfig()) {
    const r2Inquiries = (await readR2Inquiries()) || [];
    return r2Inquiries.map(toStoredInquiry).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  if (hasDatabaseUrl()) {
    const { prisma } = await import("@/lib/prisma");
    return prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  const inquiries = await readLocalInquiries();
  return inquiries.map(toStoredInquiry);
}

export async function updateInquiryStatus(id: string, status: string) {
  const kv = await getSiteDataKv();
  if (kv) {
    const inquiries = await readKvInquiries();
    const index = inquiries.findIndex((inquiry) => inquiry.id === id);
    if (index === -1) {
      throw new Error("Inquiry not found.");
    }

    inquiries[index] = {
      ...inquiries[index],
      status,
      updatedAt: new Date().toISOString()
    };
    await writeKvInquiries(inquiries);
    return;
  }

  if (hasR2DataStoreConfig()) {
    const r2Inquiries = (await readR2Inquiries()) || [];
    const index = r2Inquiries.findIndex((inquiry) => inquiry.id === id);
    if (index === -1) {
      throw new Error("Inquiry not found.");
    }

    r2Inquiries[index] = {
      ...r2Inquiries[index],
      status,
      updatedAt: new Date().toISOString()
    };
    await writeR2Json(r2InquiriesKey, r2Inquiries);
    return;
  }

  if (hasDatabaseUrl()) {
    const { prisma } = await import("@/lib/prisma");
    await prisma.inquiry.update({
      where: { id },
      data: { status }
    });
    return;
  }

  const inquiries = await readLocalInquiries();
  const index = inquiries.findIndex((inquiry) => inquiry.id === id);
  if (index === -1) {
    throw new Error("Inquiry not found.");
  }

  inquiries[index] = {
    ...inquiries[index],
    status,
    updatedAt: new Date().toISOString()
  };
  await writeLocalInquiries(inquiries);
}

async function readLocalInquiries(): Promise<LocalInquiryRecord[]> {
  try {
    const raw = await readFile(localDataPath, "utf8");
    const parsed = JSON.parse(raw) as LocalInquiryRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocalInquiries(inquiries: LocalInquiryRecord[]) {
  await mkdir(localDataDir, { recursive: true });
  await writeFile(localDataPath, JSON.stringify(inquiries, null, 2));
}

async function readKvInquiries(): Promise<LocalInquiryRecord[]> {
  const kv = await getSiteDataKv();
  if (!kv) return [];

  const raw = await kv.get(cloudflareInquiriesKey);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as LocalInquiryRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeKvInquiries(inquiries: LocalInquiryRecord[]) {
  const kv = await getSiteDataKv();
  if (!kv) {
    throw new Error("Cloudflare KV is not configured.");
  }
  await kv.put(cloudflareInquiriesKey, JSON.stringify(inquiries));
}

function toStoredInquiry(inquiry: LocalInquiryRecord): StoredInquiry {
  return {
    ...inquiry,
    createdAt: new Date(inquiry.createdAt),
    updatedAt: new Date(inquiry.updatedAt)
  };
}

async function readR2Inquiries() {
  const inquiries = await readR2Json<LocalInquiryRecord[]>(r2InquiriesKey);
  return inquiries && Array.isArray(inquiries) ? inquiries : null;
}
