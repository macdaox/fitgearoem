import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { StatusSelect } from "@/components/StatusSelect";
import { TranslateMessageButton } from "@/components/TranslateMessageButton";
import { isAdminAuthenticated } from "@/lib/auth";
import { getInquiryStoreInfo, listInquiries } from "@/lib/inquiry-store";
import { inquiryStatusLabels, isInquiryStatus } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const storeInfo = await getInquiryStoreInfo();
  const inquiries = await listInquiries();

  return (
    <main className="min-h-screen bg-mist px-5 py-8 sm:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">管理后台</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink">批发询盘管理</h1>
            <p className="mt-2 text-sm text-graphite">
              共 {inquiries.length} 条询盘 · {storeInfo.label}
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
          {storeInfo.isLocalDemo ? (
            <div className="rounded-[8px] border border-ocean/20 bg-white p-5 text-graphite">
              <h2 className="text-lg font-semibold text-ink">本地演示模式</h2>
              <p className="mt-2 text-sm leading-6">
                当前没有检测到 Cloudflare KV、Cloudflare R2 或 PostgreSQL，询盘会保存到本地 `.data/inquiries.json`。
              </p>
            </div>
          ) : null}

          {inquiries.length ? (
            inquiries.map((inquiry) => (
              <article key={inquiry.id} className="rounded-[8px] border border-line bg-white p-5 shadow-soft">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold text-ink">{inquiry.name}</h2>
                      <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase text-graphite">
                        {isInquiryStatus(inquiry.status) ? inquiryStatusLabels[inquiry.status] : inquiry.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-graphite">{inquiry.createdAt.toLocaleString()}</p>
                  </div>
                  <StatusSelect inquiryId={inquiry.id} initialStatus={inquiry.status} />
                </div>

                <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="邮箱" value={inquiry.email} />
                  <Field label="WhatsApp" value={inquiry.whatsapp} />
                  <Field label="国家/地区" value={inquiry.country} />
                  <Field label="感兴趣产品" value={inquiry.productInterest} />
                  <Field label="采购数量" value={inquiry.quantity} />
                </dl>

                <div className="mt-5 rounded-[8px] bg-mist p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-graphite">客户留言</dt>
                  <dd className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink">{inquiry.message}</dd>
                  <TranslateMessageButton text={inquiry.message} />
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

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-graphite">{label}</dt>
      <dd className="mt-1 break-words text-ink">{value || "-"}</dd>
    </div>
  );
}
