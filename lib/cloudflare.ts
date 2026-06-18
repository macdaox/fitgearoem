type CloudflareBindings = {
  SITE_DATA?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
  };
  SITE_IMAGES?: {
    put(
      key: string,
      value: ArrayBuffer | ArrayBufferView | ReadableStream,
      options?: { httpMetadata?: { contentType?: string } }
    ): Promise<unknown>;
  };
  CLOUDFLARE_R2_PUBLIC_URL?: string;
  [key: string]: unknown;
};

export async function getCloudflareBindings(): Promise<CloudflareBindings | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const context = await getCloudflareContext({ async: true });
    return context.env as CloudflareBindings;
  } catch {
    return null;
  }
}

export async function getSiteDataKv() {
  const bindings = await getCloudflareBindings();
  return bindings?.SITE_DATA || null;
}

export async function getSiteImagesBucket() {
  const bindings = await getCloudflareBindings();
  return bindings?.SITE_IMAGES || null;
}

export async function getCloudflarePublicR2Url() {
  const bindings = await getCloudflareBindings();
  return (
    (typeof bindings?.CLOUDFLARE_R2_PUBLIC_URL === "string" && bindings.CLOUDFLARE_R2_PUBLIC_URL) ||
    process.env.CLOUDFLARE_R2_PUBLIC_URL ||
    ""
  );
}

export async function runAfterResponse(work: Promise<unknown>) {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const context = await getCloudflareContext({ async: true });
    context.ctx.waitUntil(work);
    return true;
  } catch {
    return false;
  }
}
