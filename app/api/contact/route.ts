import { NextResponse } from "next/server";

type Payload = {
  name?: unknown;
  direction?: unknown;
  group?: unknown;
  phone?: unknown;
  message?: unknown;
};

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "So'rov formati noto'g'ri." }, { status: 400 });
  }

  const name = str(body.name, 120);
  const direction = str(body.direction, 120);
  const group = str(body.group, 60);
  const phone = str(body.phone, 40);
  const message = str(body.message, 2000);

  const errors: Record<string, string> = {};
  if (name.length < 3) errors.name = "Ism-familiyangizni to'liq kiriting.";
  if (!/^[+()\d\s-]{7,20}$/.test(phone)) errors.phone = "Telefon raqamni to'g'ri kiriting.";
  if (message.length < 5) errors.message = "Xabar kamida 5 ta belgidan iborat bo'lsin.";

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
        return NextResponse.json(
          { ok: false, error: "Xabarni yuborishda xatolik. Telegram orqali yozing." },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error("Telegram request error:", error);
      return NextResponse.json(
        { ok: false, error: "Xabarni yuborishda xatolik. Telegram orqali yozing." },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact] new message", { name, direction, group, phone, message });
  }

  return NextResponse.json({ ok: true });
}
