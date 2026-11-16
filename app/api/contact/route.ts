import { NextResponse } from "next/server";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, hasLocale } from "@/lib/i18n";

type Payload = {
  name?: unknown;
  direction?: unknown;
  group?: unknown;
  phone?: unknown;
  message?: unknown;
  locale?: unknown;
};

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    // The locale is unknown at this point, so fall back to the default.
    const fallback = getDictionary(defaultLocale).contact.form;
    return NextResponse.json({ ok: false, error: fallback.badRequest }, { status: 400 });
  }

  // Route Handlers cannot read root params, so the client sends its locale along.
  const rawLocale = str(body.locale, 5);
  const locale = hasLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale).contact.form;

  const name = str(body.name, 120);
  const direction = str(body.direction, 120);
  const group = str(body.group, 60);
  const phone = str(body.phone, 40);
  const message = str(body.message, 2000);

  const errors: Record<string, string> = {};
  if (name.length < 3) errors.name = t.errors.name;
  if (!/^[+()\d\s-]{7,20}$/.test(phone)) errors.phone = t.errors.phone;
  if (message.length < 5) errors.message = t.errors.message;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // When bot credentials are configured the message is delivered to Telegram.
  // Without them the request is still accepted and written to the server log.
  if (token && chatId) {
    const text = [
      "📩 Saytdan yangi murojaat",
      `🌐 ${locale.toUpperCase()}`,
      `👤 ${name}`,
      direction ? `🎓 ${direction}` : null,
      group ? `👥 ${group}` : null,
      `📞 ${phone}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });

      if (!response.ok) {
        console.error("Telegram delivery failed:", response.status, await response.text());
        return NextResponse.json({ ok: false, error: t.sendFailed }, { status: 502 });
      }
    } catch (error) {
      console.error("Telegram request error:", error);
      return NextResponse.json({ ok: false, error: t.sendFailed }, { status: 502 });
    }
  } else {
    console.info("[contact] new message", { locale, name, direction, group, phone, message });
  }

  return NextResponse.json({ ok: true });
}
