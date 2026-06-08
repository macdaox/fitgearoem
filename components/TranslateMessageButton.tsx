"use client";

import { useState } from "react";
import { Languages } from "lucide-react";

export function TranslateMessageButton({ text }: { text: string }) {
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function translate() {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const result = (await response.json()) as { success: boolean; translatedText?: string; message?: string };

      if (!response.ok || !result.success || !result.translatedText) {
        throw new Error(result.message || "翻译失败。");
      }

      setTranslatedText(result.translatedText);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "翻译失败。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={translate}
        disabled={loading}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-[8px] border border-line bg-white px-3 text-sm font-semibold text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Languages size={16} />
        {loading ? "翻译中..." : translatedText ? "重新翻译" : "翻译成中文"}
      </button>

      {translatedText ? (
        <div className="mt-3 rounded-[8px] border border-ocean/20 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-graphite">中文翻译</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink">{translatedText}</p>
        </div>
      ) : null}

      {error ? <p className="mt-3 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
