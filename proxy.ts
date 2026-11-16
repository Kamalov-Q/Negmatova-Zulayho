import { NextResponse, type NextRequest } from "next/server";

// Kept inline rather than imported: proxy runs apart from the render code and may
// be deployed to the edge on its own.
const locales = ["uz", "ru", "en"] as const;
const defaultLocale = "uz";

/** Picks the best supported locale from the browser's Accept-Language header. */
function preferredLocale(header: string | null): string {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: quality ? Number(quality) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if ((locales as readonly string[]).includes(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const alreadyLocalized = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (alreadyLocalized) return;
  
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request.headers.get("accept-language"))}${
    pathname === "/" ? "" : pathname
  }`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except API routes, Next internals and static files in /public.
  matcher: ["/((?!api|_next|media|favicon.ico|.*\\.[^/]+$).*)"],
};
