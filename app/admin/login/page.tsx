import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLoginForm } from "./AdminLoginForm";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/inquiries");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-5 py-12">
      <section className="w-full max-w-md rounded-[8px] bg-white p-7 shadow-soft">
        <p className="eyebrow">管理后台</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink">询盘后台登录</h1>
        <p className="mt-3 text-sm leading-6 text-graphite">请输入本地环境变量中配置的管理员密码。</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
