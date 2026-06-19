"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Save, Trash2 } from "lucide-react";
import { inquiryStatusLabels, type InquiryStatus } from "@/lib/site-data";

const quickStatuses: InquiryStatus[] = ["contacted", "quoted", "spam"];

export function InquiryActions({
  inquiryId,
  initialNote,
  initialStatus
}: {
  inquiryId: string;
  initialNote?: string | null;
  initialStatus: string;
}) {
  const router = useRouter();
  const [note, setNote] = useState(initialNote || "");
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function update(payload: { note?: string; status?: InquiryStatus }) {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("保存失败。");
      }

      if (payload.status) {
        setStatus(payload.status);
      }
      setMessage("已保存");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败。");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!window.confirm("确定删除这条询盘吗？删除后默认不会再显示。")) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("删除失败。");
      }

      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "删除失败。");
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-3 rounded-[8px] border border-line bg-mist p-4">
      <div className="flex flex-wrap gap-2">
        {quickStatuses.map((item) => (
          <button
            key={item}
            type="button"
            disabled={saving || status === item}
            onClick={() => update({ status: item })}
            className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-line bg-white px-3 text-xs font-semibold text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-55"
          >
            <CheckCircle2 size={15} />
            {inquiryStatusLabels[item]}
          </button>
        ))}
        <button
          type="button"
          disabled={saving}
          onClick={remove}
          className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-red-200 bg-white px-3 text-xs font-semibold text-red-700 transition hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-55"
        >
          <Trash2 size={15} />
          删除
        </button>
      </div>

      <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-graphite">
        内部备注
        <textarea
          value={note}
          rows={3}
          onChange={(event) => setNote(event.target.value)}
          placeholder="例如：已加 WhatsApp，客户想要儿童跳绳，明天继续跟进..."
          className="rounded-[8px] border border-line bg-white px-3 py-2 text-sm font-normal normal-case leading-6 tracking-normal text-ink outline-none transition focus:border-ocean"
        />
      </label>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-graphite">{message}</p>
        <button
          type="button"
          disabled={saving}
          onClick={() => update({ note })}
          className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-ink px-3 text-xs font-semibold text-white transition hover:bg-graphite disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={15} />
          {saving ? "保存中" : "保存备注"}
        </button>
      </div>
    </div>
  );
}
