"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const password = new FormData(event.currentTarget).get("password");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    setLoading(false);

    if (!response.ok) {
      setError("管理员密码不正确。");
      return;
    }

    router.push("/admin/inquiries");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
      <label className="grid gap-2 text-sm font-medium text-graphite">
        密码
        <input
          name="password"
          type="password"
          required
          className="h-12 rounded-[8px] border border-line bg-white px-3 text-ink outline-none transition focus:border-ocean"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-ink px-6 text-sm font-semibold text-white transition hover:bg-graphite disabled:opacity-60"
      >
        <LogIn size={18} />
        {loading ? "正在登录..." : "登录"}
      </button>
      {error ? <p className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
