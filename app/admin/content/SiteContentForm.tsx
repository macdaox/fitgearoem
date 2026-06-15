"use client";

import { useState } from "react";
import type React from "react";
import { ImageUp, Save } from "lucide-react";
import type { HomeIconName, IconName, SiteContent } from "@/lib/site-content";

const iconOptions: Array<{ value: IconName; label: string }> = [
  { value: "rotate", label: "旋转/轴承" },
  { value: "shield", label: "防滑/保护" },
  { value: "cable", label: "线材/可调节" },
  { value: "zap", label: "速度/轻量" },
  { value: "badge", label: "认证/综合" }
];

const homeIconOptions: Array<{ value: HomeIconName; label: string }> = [
  { value: "factory", label: "工厂/面积" },
  { value: "lines", label: "生产线" },
  { value: "workers", label: "团队/工人" },
  { value: "warehouse", label: "仓库/库存" },
  { value: "globe", label: "全球/国家" },
  { value: "delivery", label: "准时/交付" },
  { value: "search", label: "询盘/需求" },
  { value: "quotation", label: "报价/文件" },
  { value: "sample", label: "打样/确认" },
  { value: "production", label: "生产/工厂" },
  { value: "truck", label: "物流/发货" }
];

export function SiteContentForm({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      });
      const result = (await response.json()) as { success: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "保存失败。");
      }

      setMessage("已保存，刷新首页即可看到最新内容。");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败。");
    } finally {
      setSaving(false);
    }
  }

  function updateImage(path: string, url: string) {
    setDeepValue(path, url);
  }

  function setDeepValue(path: string, value: string) {
    setContent((current) => {
      const next = structuredClone(current);
      const parts = path.split(".");
      let target: Record<string, unknown> | unknown[] = next as unknown as Record<string, unknown>;

      for (let index = 0; index < parts.length - 1; index += 1) {
        target = (target as Record<string, unknown>)[parts[index]] as Record<string, unknown> | unknown[];
      }

      (target as Record<string, unknown>)[parts[parts.length - 1]] = value;
      return next;
    });
  }

  return (
    <div className="grid gap-5">
      <Section title="品牌与联系方式">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="品牌名" value={content.brand.name} onChange={(value) => setDeepValue("brand.name", value)} />
          <TextField label="邮箱" value={content.brand.email} onChange={(value) => setDeepValue("brand.email", value)} />
          <TextField label="WhatsApp 号码" value={content.brand.whatsapp} onChange={(value) => setDeepValue("brand.whatsapp", value)} />
          <TextField label="Instagram 链接" value={content.brand.instagram} onChange={(value) => setDeepValue("brand.instagram", value)} />
          <TextField label="TikTok 链接" value={content.brand.tiktok} onChange={(value) => setDeepValue("brand.tiktok", value)} />
          <TextField label="Facebook 链接" value={content.brand.facebook} onChange={(value) => setDeepValue("brand.facebook", value)} />
        </div>
      </Section>

      <Section title="首页 Hero">
        <div className="grid gap-4">
          <TextField label="小标题" value={content.hero.eyebrow} onChange={(value) => setDeepValue("hero.eyebrow", value)} />
          <TextField label="主标题" value={content.hero.title} onChange={(value) => setDeepValue("hero.title", value)} />
          <TextareaField label="描述" value={content.hero.description} onChange={(value) => setDeepValue("hero.description", value)} />
          <ImageField label="Hero 图片" value={content.hero.image} onChange={(url) => updateImage("hero.image", url)} />
          <TextField
            label="图片裁切位置"
            value={content.hero.imagePosition}
            onChange={(value) => setDeepValue("hero.imagePosition", value)}
            hint="例如 68% 50%，第一个值是左右位置，第二个值是上下位置。"
          />
        </div>
      </Section>

      <Section title="五张全屏图模块">
        <div className="grid gap-4">
          <TextField label="模块小标题" value={content.detailsIntro.eyebrow} onChange={(value) => setDeepValue("detailsIntro.eyebrow", value)} />
          <TextField label="模块标题" value={content.detailsIntro.title} onChange={(value) => setDeepValue("detailsIntro.title", value)} />
          {content.productDetails.map((item, index) => (
            <div key={index} className="rounded-[8px] border border-line bg-mist p-4">
              <p className="mb-4 text-sm font-semibold text-ink">全屏图 {index + 1}</p>
              <div className="grid gap-4">
                <TextField label="标题" value={item.title} onChange={(value) => setDeepValue(`productDetails.${index}.title`, value)} />
                <TextareaField label="描述" value={item.description} onChange={(value) => setDeepValue(`productDetails.${index}.description`, value)} />
                <ImageField label="图片" value={item.image} onChange={(url) => updateImage(`productDetails.${index}.image`, url)} />
                <label className="grid gap-2 text-sm font-medium text-graphite">
                  图标
                  <select
                    value={item.icon}
                    onChange={(event) => setDeepValue(`productDetails.${index}.icon`, event.target.value)}
                    className="h-11 rounded-[8px] border border-line bg-white px-3 text-ink outline-none focus:border-ocean"
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="首页数据亮点">
        <div className="grid gap-4">
          <TextField label="模块小标题" value={content.homeStats.eyebrow} onChange={(value) => setDeepValue("homeStats.eyebrow", value)} />
          {content.homeStats.items.map((item, index) => (
            <div key={index} className="rounded-[8px] border border-line bg-mist p-4">
              <p className="mb-4 text-sm font-semibold text-ink">数据项 {index + 1}</p>
              <div className="grid gap-4 md:grid-cols-3">
                <TextField label="数字" value={item.value} onChange={(value) => setDeepValue(`homeStats.items.${index}.value`, value)} />
                <TextField label="说明" value={item.label} onChange={(value) => setDeepValue(`homeStats.items.${index}.label`, value)} />
                <IconSelect
                  label="图标"
                  value={item.icon}
                  options={homeIconOptions}
                  onChange={(value) => setDeepValue(`homeStats.items.${index}.icon`, value)}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="OEM 定制模块">
        <div className="grid gap-4">
          <TextField label="小标题" value={content.oem.eyebrow} onChange={(value) => setDeepValue("oem.eyebrow", value)} />
          <TextField label="标题" value={content.oem.title} onChange={(value) => setDeepValue("oem.title", value)} />
          <TextareaField label="描述" value={content.oem.description} onChange={(value) => setDeepValue("oem.description", value)} />
          <ImageField label="背景图片" value={content.oem.image} onChange={(url) => updateImage("oem.image", url)} />
          <TextareaField
            label="定制选项"
            value={content.oem.options.join("\n")}
            onChange={(value) =>
              setContent((current) => ({
                ...current,
                oem: {
                  ...current.oem,
                  options: value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                }
              }))
            }
            hint="每行一个选项。"
          />
        </div>
      </Section>

      <Section title="询盘区文案">
        <div className="grid gap-4">
          <TextField label="小标题" value={content.inquiry.eyebrow} onChange={(value) => setDeepValue("inquiry.eyebrow", value)} />
          <TextField label="标题" value={content.inquiry.title} onChange={(value) => setDeepValue("inquiry.title", value)} />
          <TextareaField label="描述" value={content.inquiry.description} onChange={(value) => setDeepValue("inquiry.description", value)} />
        </div>
      </Section>

      <Section title="服务流程">
        <div className="grid gap-4">
          <TextField label="模块标题" value={content.serviceProcess.title} onChange={(value) => setDeepValue("serviceProcess.title", value)} />
          {content.serviceProcess.steps.map((step, index) => (
            <div key={index} className="rounded-[8px] border border-line bg-mist p-4">
              <p className="mb-4 text-sm font-semibold text-ink">流程步骤 {index + 1}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="编号" value={step.number} onChange={(value) => setDeepValue(`serviceProcess.steps.${index}.number`, value)} />
                <TextField label="标题" value={step.title} onChange={(value) => setDeepValue(`serviceProcess.steps.${index}.title`, value)} />
                <TextareaField
                  label="描述"
                  value={step.description}
                  onChange={(value) => setDeepValue(`serviceProcess.steps.${index}.description`, value)}
                />
                <IconSelect
                  label="图标"
                  value={step.icon}
                  options={homeIconOptions}
                  onChange={(value) => setDeepValue(`serviceProcess.steps.${index}.icon`, value)}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="关于我们页面">
        <div className="grid gap-4">
          <TextField label="页面小标题" value={content.about.eyebrow} onChange={(value) => setDeepValue("about.eyebrow", value)} />
          <TextField label="页面主标题" value={content.about.title} onChange={(value) => setDeepValue("about.title", value)} />
          <TextareaField label="页面描述" value={content.about.description} onChange={(value) => setDeepValue("about.description", value)} />
          <ImageField label="页面 Hero 图片" value={content.about.heroImage} onChange={(url) => updateImage("about.heroImage", url)} />
          <TextField
            label="Hero 图片裁切位置"
            value={content.about.imagePosition}
            onChange={(value) => setDeepValue("about.imagePosition", value)}
            hint="例如 50% 50%，第一个值是左右位置，第二个值是上下位置。"
          />
          <TextField label="Hero 主按钮文字" value={content.about.primaryCta} onChange={(value) => setDeepValue("about.primaryCta", value)} />
          <TextField label="Hero 次按钮文字" value={content.about.secondaryCta} onChange={(value) => setDeepValue("about.secondaryCta", value)} />
          <TextField label="介绍区小标题" value={content.about.introEyebrow} onChange={(value) => setDeepValue("about.introEyebrow", value)} />
          <TextField label="介绍区标题" value={content.about.introTitle} onChange={(value) => setDeepValue("about.introTitle", value)} />
          <TextareaField label="介绍区正文" value={content.about.introText} onChange={(value) => setDeepValue("about.introText", value)} />
          <TextField
            label="能力模块小标题"
            value={content.about.capabilitiesEyebrow}
            onChange={(value) => setDeepValue("about.capabilitiesEyebrow", value)}
          />
          <TextField
            label="能力模块标题"
            value={content.about.capabilitiesTitle}
            onChange={(value) => setDeepValue("about.capabilitiesTitle", value)}
          />
          <TextField label="工厂/服务区小标题" value={content.about.factoryEyebrow} onChange={(value) => setDeepValue("about.factoryEyebrow", value)} />
          <TextField label="工厂/服务区标题" value={content.about.factoryTitle} onChange={(value) => setDeepValue("about.factoryTitle", value)} />
          <TextareaField label="工厂/服务区正文" value={content.about.factoryText} onChange={(value) => setDeepValue("about.factoryText", value)} />
          <ImageField label="工厂/服务区图片" value={content.about.factoryImage} onChange={(url) => updateImage("about.factoryImage", url)} />
          <TextareaField
            label="流程步骤"
            value={content.about.processSteps.join("\n")}
            onChange={(value) =>
              setContent((current) => ({
                ...current,
                about: {
                  ...current.about,
                  processSteps: parseLines(value)
                }
              }))
            }
            hint="每行一个步骤。"
          />
          <TextareaField
            label="数据亮点"
            value={content.about.stats.map((item) => `${item.value} | ${item.label}`).join("\n")}
            onChange={(value) =>
              setContent((current) => ({
                ...current,
                about: {
                  ...current.about,
                  stats: parseStats(value)
                }
              }))
            }
            hint="每行一个，格式：数值 | 说明。例如：OEM | Logo, color and packaging support"
          />
          <TextareaField
            label="能力模块"
            value={content.about.capabilities.map((item) => `${item.title} | ${item.description}`).join("\n")}
            onChange={(value) =>
              setContent((current) => ({
                ...current,
                about: {
                  ...current.about,
                  capabilities: parseCapabilities(value)
                }
              }))
            }
            hint="每行一个，格式：标题 | 描述。"
          />
          <TextField label="价值点小标题" value={content.about.valuesEyebrow} onChange={(value) => setDeepValue("about.valuesEyebrow", value)} />
          <TextField label="价值点标题" value={content.about.valuesTitle} onChange={(value) => setDeepValue("about.valuesTitle", value)} />
          <TextareaField
            label="价值点"
            value={content.about.values.join("\n")}
            onChange={(value) =>
              setContent((current) => ({
                ...current,
                about: {
                  ...current.about,
                  values: value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                }
              }))
            }
            hint="每行一个价值点。"
          />
          <TextField label="底部 CTA 小标题" value={content.about.ctaEyebrow} onChange={(value) => setDeepValue("about.ctaEyebrow", value)} />
          <TextField label="底部 CTA 标题" value={content.about.ctaTitle} onChange={(value) => setDeepValue("about.ctaTitle", value)} />
          <TextareaField label="底部 CTA 描述" value={content.about.ctaDescription} onChange={(value) => setDeepValue("about.ctaDescription", value)} />
          <TextField label="底部 CTA 按钮文字" value={content.about.ctaButton} onChange={(value) => setDeepValue("about.ctaButton", value)} />
        </div>
      </Section>

      <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-[8px] border border-line bg-white/90 p-4 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-graphite">{message || "修改后点击保存，前台会读取最新内容。"}</p>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-semibold text-white transition hover:bg-graphite disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? "保存中..." : "保存网站内容"}
        </button>
      </div>
    </div>
  );
}

function parseStats(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [statValue, ...labelParts] = line.split("|");
      return {
        value: statValue.trim(),
        label: labelParts.join("|").trim()
      };
    })
    .filter((item) => item.value && item.label);
}

function parseCapabilities(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...descriptionParts] = line.split("|");
      return {
        title: title.trim(),
        description: descriptionParts.join("|").trim()
      };
    })
    .filter((item) => item.title && item.description);
}

function parseLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[8px] border border-line bg-white p-5 shadow-soft">
      <h2 className="mb-5 text-xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function TextField({ label, value, hint, onChange }: { label: string; value: string; hint?: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-graphite">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-[8px] border border-line bg-white px-3 text-ink outline-none focus:border-ocean"
      />
      {hint ? <span className="text-xs font-normal text-graphite">{hint}</span> : null}
    </label>
  );
}

function IconSelect<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-graphite">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="h-11 rounded-[8px] border border-line bg-white px-3 text-ink outline-none focus:border-ocean"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  value,
  hint,
  onChange
}: {
  label: string;
  value: string;
  hint?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-graphite">
      {label}
      <textarea
        value={value}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[8px] border border-line bg-white px-3 py-3 text-ink outline-none focus:border-ocean"
      />
      {hint ? <span className="text-xs font-normal text-graphite">{hint}</span> : null}
    </label>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function upload(file: File) {
    setUploading(true);
    setMessage("");

    try {
      const uploadFile = await compressImageForUpload(file);
      const formData = new FormData();
      formData.append("file", uploadFile);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      const result = (await response.json()) as { success: boolean; url?: string; storage?: string; message?: string };

      if (!response.ok || !result.success || !result.url) {
        throw new Error(result.message || "上传失败。");
      }

      onChange(result.url);
      const sizeNote =
        uploadFile.size < file.size
          ? ` 已压缩：${formatFileSize(file.size)} -> ${formatFileSize(uploadFile.size)}。`
          : ` 文件大小：${formatFileSize(uploadFile.size)}。`;
      setMessage(`${result.storage === "cloudflare-r2" ? "已上传到 Cloudflare R2。" : "已保存到本地 uploads。"}${sizeNote}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "上传失败。");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-2 text-sm font-medium text-graphite">
      <span>{label}</span>
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 rounded-[8px] border border-line bg-white px-3 text-ink outline-none focus:border-ocean"
        />
        <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-ink">
          <ImageUp size={18} />
          {uploading ? "上传中..." : "上传图片"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
              event.target.value = "";
            }}
          />
        </label>
      </div>
      {value ? (
        <div className="overflow-hidden rounded-[8px] border border-line bg-mist">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={`${label} preview`} className="max-h-48 w-full object-cover" />
        </div>
      ) : null}
      {message ? <span className="text-xs font-normal text-graphite">{message}</span> : null}
    </div>
  );
}

async function compressImageForUpload(file: File) {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  const image = await createImageBitmap(file);
  const maxDimension = 2400;
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", {
    alpha: file.type === "image/png"
  });

  if (!context) {
    image.close();
    return file;
  }

  context.drawImage(image, 0, 0, width, height);
  image.close();

  const webpBlob = await canvasToBlob(canvas, "image/webp", 0.82);
  const outputBlob = webpBlob || (await canvasToBlob(canvas, "image/jpeg", 0.84));

  if (!outputBlob || outputBlob.size >= file.size) {
    return file;
  }

  const extension = outputBlob.type === "image/webp" ? "webp" : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([outputBlob], `${baseName}-compressed.${extension}`, {
    type: outputBlob.type,
    lastModified: Date.now()
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}
