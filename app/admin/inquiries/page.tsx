import { redirect } from "next/navigation";
import { LogOut, Search } from "lucide-react";
import { InquiryActions } from "@/components/InquiryActions";
import { StatusSelect } from "@/components/StatusSelect";
import { TranslateMessageButton } from "@/components/TranslateMessageButton";
import { isAdminAuthenticated } from "@/lib/auth";
import { getInquiryStoreInfo, listInquiries } from "@/lib/inquiry-store";
import { inquiryStatuses, inquiryStatusLabels, isInquiryStatus, type InquiryStatus } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage({
  searchParams
}: {
  searchParams?: Promise<{
    status?: string;
    q?: string;
  }>;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const params = (await searchParams) || {};
  const activeStatus = params.status && isInquiryStatus(params.status) ? params.status : "all";
  const query = (params.q || "").trim().toLowerCase();
  const storeInfo = await getInquiryStoreInfo();
  const inquiries = await listInquiries();
  const filteredInquiries = inquiries.filter((inquiry) => {
    if (activeStatus !== "all" && inquiry.status !== activeStatus) {
      return false;
    }

    if (!query) {
      return true;
    }

    return [inquiry.email, inquiry.whatsapp, inquiry.message, inquiry.note]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query));
  });
  const statusCounts = {
    all: inquiries.length,
    ...Object.fromEntries(inquiryStatuses.map((status) => [status, inquiries.filter((inquiry) => inquiry.status === status).length]))
  } as Record<"all" | InquiryStatus, number>;

  return (
    <main className="min-h-screen bg-mist px-5 py-8 sm:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">管理后台</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink">批发询盘管理</h1>
            <p className="mt-2 text-sm text-graphite">
              共 {inquiries.length} 条询盘，当前显示 {filteredInquiries.length} 条 · {storeInfo.label}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/content"
              className="inline-flex h-11 items-center justify-center rounded-[8px] border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink"
            >
              网站内容管理
            </a>
            <form action="/api/admin/logout" method="post">
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink">
                <LogOut size={18} />
                退出登录
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <div className="rounded-[8px] border border-line bg-white p-4 shadow-soft">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap gap-2">
                <StatusFilterLink label="全部" count={statusCounts.all} active={activeStatus === "all"} href={query ? `?q=${encodeURIComponent(query)}` : "/admin/inquiries"} />
                {inquiryStatuses.map((status) => (
                  <StatusFilterLink
                    key={status}
                    label={inquiryStatusLabels[status]}
                    count={statusCounts[status]}
                    active={activeStatus === status}
                    href={`?status=${status}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                  />
                ))}
              </div>
              <form className="flex w-full gap-2 xl:max-w-sm">
                {activeStatus !== "all" ? <input type="hidden" name="status" value={activeStatus} /> : null}
                <label className="relative block min-w-0 flex-1">
                  <span className="sr-only">搜索询盘</span>
                  <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-graphite" />
                  <input
                    name="q"
                    defaultValue={params.q || ""}
                    placeholder="搜索邮箱 / WhatsApp / 留言"
                    className="h-10 w-full rounded-[8px] border border-line bg-white pl-9 pr-3 text-sm text-ink outline-none transition focus:border-ocean"
                  />
                </label>
                <button className="h-10 rounded-[8px] bg-ink px-4 text-sm font-semibold text-white transition hover:bg-graphite">搜索</button>
              </form>
            </div>
          </div>

          {storeInfo.isLocalDemo ? (
            <div className="rounded-[8px] border border-ocean/20 bg-white p-5 text-graphite">
              <h2 className="text-lg font-semibold text-ink">本地演示模式</h2>
              <p className="mt-2 text-sm leading-6">
                当前没有检测到 Cloudflare KV、Cloudflare R2 或 PostgreSQL，询盘会保存到本地 `.data/inquiries.json`。
              </p>
            </div>
          ) : null}

          {filteredInquiries.length ? (
            filteredInquiries.map((inquiry) => (
              <article key={inquiry.id} className="rounded-[8px] border border-line bg-white p-5 shadow-soft">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold text-ink">{inquiry.name}</h2>
                      <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase text-graphite">
                        {isInquiryStatus(inquiry.status) ? inquiryStatusLabels[inquiry.status] : inquiry.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-graphite">
                      提交：{inquiry.createdAt.toLocaleString()}
                      {inquiry.contactedAt ? ` · 联系：${inquiry.contactedAt.toLocaleString()}` : ""}
                    </p>
                  </div>
                  <StatusSelect inquiryId={inquiry.id} initialStatus={inquiry.status} />
                </div>

                <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="邮箱" value={inquiry.email} />
                  <Field label="WhatsApp" value={inquiry.whatsapp} />
                  {inquiry.productInterest ? <Field label="来源/产品" value={inquiry.productInterest} /> : null}
                </dl>

                {inquiry.message ? (
                  <div className="mt-5 rounded-[8px] bg-mist p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-graphite">客户留言</dt>
                    <dd className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink">{inquiry.message}</dd>
                    <TranslateMessageButton text={inquiry.message} />
                  </div>
                ) : null}

                <div className="mt-5">
                  <InquiryActions inquiryId={inquiry.id} initialNote={inquiry.note} initialStatus={inquiry.status} />
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[8px] border border-line bg-white p-8 text-center text-graphite">暂无询盘。</div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatusFilterLink({ label, count, active, href }: { label: string; count: number; active: boolean; href: string }) {
  return (
    <a
      href={href}
      className={`inline-flex h-9 items-center gap-2 rounded-[8px] border px-3 text-sm font-semibold transition ${
        active ? "border-ink bg-ink text-white" : "border-line bg-white text-graphite hover:border-ink hover:text-ink"
      }`}
    >
      {label}
      <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/15 text-white" : "bg-mist text-graphite"}`}>{count}</span>
    </a>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-graphite">{label}</dt>
      <dd className="mt-1 break-words text-ink">{value || "-"}</dd>
    </div>
  );
}
