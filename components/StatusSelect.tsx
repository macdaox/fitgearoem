"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inquiryStatusLabels, inquiryStatuses, type InquiryStatus } from "@/lib/site-data";

export function StatusSelect({ inquiryId, initialStatus }: { inquiryId: string; initialStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  async function updateStatus(nextStatus: InquiryStatus) {
    setStatus(nextStatus);
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });

      if (!response.ok) {
        throw new Error("状态更新失败。");
      }
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-graphite">
      状态
      <select
        value={status}
        onChange={(event) => updateStatus(event.target.value as InquiryStatus)}
        className="h-10 min-w-36 rounded-[8px] border border-line bg-white px-3 text-sm font-medium normal-case tracking-normal text-ink"
      >
        {inquiryStatuses.map((item) => (
          <option key={item} value={item}>
            {inquiryStatusLabels[item]}
          </option>
        ))}
      </select>
      {saving ? <span className="text-[11px] normal-case tracking-normal text-ocean">保存中...</span> : null}
    </label>
  );
}
