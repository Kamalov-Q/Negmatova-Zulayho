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

## Tuzilishi

```
app/
  layout.tsx            # metadata, shriftlar, skip-link
  page.tsx              # bo'limlar tartibi
  globals.css           # dizayn tokenlari, light/dark rejim
  api/contact/route.ts  # aloqa formasi uchun endpoint
components/             # Header, Hero, AboutMe, University, Materials,
                        # OpenLesson + Gallery, Contact, Footer, BackToTop
lib/content.ts          # saytdagi BARCHA matn, havola va rasmlar
public/media/           # suratlar
```

Matn, telefon, havola yoki material qo'shish uchun faqat `lib/content.ts` faylini
tahrirlash kifoya — komponentlarga tegish shart emas.
