import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";

type DeepSeekResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, message: "未登录或登录已过期。" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { text?: string } | null;
  const text = body?.text?.trim();

  if (!text) {
    return NextResponse.json({ success: false, message: "没有可翻译的内容。" }, { status: 400 });
  }

  if (text.length > 4000) {
    return NextResponse.json({ success: false, message: "留言太长，请拆分后再翻译。" }, { status: 400 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ success: false, message: "请先在 .env.local 配置 DEEPSEEK_API_KEY。" }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "你是专业外贸询盘翻译助手。请把客户留言翻译成简体中文，只输出译文。保留邮箱、电话号码、WhatsApp、数量、产品型号、专有名词和品牌名。不要添加解释。"
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = (await response.json().catch(() => null)) as DeepSeekResponse | null;

    if (!response.ok) {
      return NextResponse.json({ success: false, message: "DeepSeek 翻译请求失败，请检查 API Key 或余额。" }, { status: 502 });
    }

    const translatedText = data?.choices?.[0]?.message?.content?.trim();
    if (!translatedText) {
      return NextResponse.json({ success: false, message: "DeepSeek 没有返回翻译结果。" }, { status: 502 });
    }

    return NextResponse.json({ success: true, translatedText });
  } catch (error) {
    console.error("DeepSeek translation failed", error);
    return NextResponse.json({ success: false, message: "翻译服务暂时不可用。" }, { status: 500 });
  }
}
