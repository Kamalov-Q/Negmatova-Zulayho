# Negmatova Zulayho — shaxsiy sayt

"Pedagoglik kasbiga kirish" fani bo'yicha o'quv materiallari, ochiq dars suratlari va
talabalar bilan aloqa sahifasi. Next.js (App Router) + Tailwind CSS v4.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # ishlab chiqarish uchun yig'ish
npm start        # yig'ilgan versiyani ishga tushirish
```

## Muhit o'zgaruvchilari (`.env.local`)

| O'zgaruvchi | Vazifasi |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Saytning haqiqiy domeni. Ijtimoiy tarmoq preview rasmlari shu manzilga nisbatan hisoblanadi. |
| `TELEGRAM_BOT_TOKEN` | Ixtiyoriy. Berilsa, aloqa formasidagi xabarlar Telegramga yuboriladi. |
| `TELEGRAM_CHAT_ID` | Ixtiyoriy. Xabar yuboriladigan chat ID. |

Telegram sozlanmagan bo'lsa, forma baribir ishlaydi: xabar server logiga yoziladi va
foydalanuvchi muvaffaqiyat xabarini ko'radi.

## Tillar

Sayt uch tilda: o'zbek (`/uz`), rus (`/ru`) va ingliz (`/en`). Ildiz manzil (`/`)
brauzer tilini aniqlab mos sahifaga yo'naltiradi — buni `proxy.ts` bajaradi.
Standart til — o'zbekcha.

## Tuzilishi

```
app/
  [lang]/layout.tsx     # metadata, shriftlar, mavzu skripti, skip-link
  [lang]/page.tsx       # bo'limlar tartibi
  globals.css           # dizayn tokenlari, light/dark rejim
  api/contact/route.ts  # aloqa formasi uchun endpoint
proxy.ts                # til aniqlash va yo'naltirish
components/             # Header, Hero, AboutMe, University, Materials,
                        # OpenLesson + Gallery, Contact, Footer, BackToTop
lib/content.ts          # tilga bog'liq bo'lmagan ma'lumot: havola, rasm, bayroqlar
lib/i18n.ts             # tillar ro'yxati va yordamchi funksiyalar
lib/dictionaries/       # uz.ts (asosiy), ru.ts, en.ts — barcha matnlar
public/media/           # suratlar
```

Matnni o'zgartirish uchun `lib/dictionaries/` ichidagi fayllarni tahrirlang.
`uz.ts` — namuna: unga yangi kalit qo'shilsa, TypeScript `ru.ts` va `en.ts` dan
ham o'sha kalitni talab qiladi. Havola, rasm va telefon raqamlar esa
`lib/content.ts` da.

## Mavzu (light / dark)

Boshlang'ich holat — tizim sozlamasi. Sarlavhadagi tugma tanlovni `localStorage`
ga yozadi va `<html data-theme="light|dark">` orqali qo'llaydi.
