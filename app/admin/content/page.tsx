import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent } from "@/lib/site-content";
import { SiteContentForm } from "./SiteContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-mist px-5 py-8 sm:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">管理后台</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink">网站内容管理</h1>
            <p className="mt-2 text-sm text-graphite">维护首页、数据亮点、服务流程、关于我们、联系方式和 OEM 内容。</p>
          </div>
          <a
            href="/admin/inquiries"
            className="inline-flex h-11 items-center justify-center rounded-[8px] border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink"
          >
            返回询盘管理
          </a>
        </div>
        <SiteContentForm initialContent={content} />
      </section>
    </main>
  );
}
