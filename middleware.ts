// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from './i18n-config';

// Funkce pro detekci preferovaného jazyka z hlavičky Accept-Language
const getPreferredLocale = (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language');
  if (!acceptLanguage) return defaultLocale;
  
  const acceptedLanguages = acceptLanguage.split(',');
  for (const lang of acceptedLanguages) {
    const languageCode = lang.split(';')[0].trim().substring(0, 2);
    if (locales.includes(languageCode as any)) {
      return languageCode;
    }
  }
  return defaultLocale;
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Kontrola, zda URL již obsahuje jazykový kód
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Pokud URL již obsahuje jazykový kód, nic se nemění
  if (pathnameHasLocale) return NextResponse.next();
  
  // Kontrola preferovaného jazyka prohlížeče nebo použití výchozího
  const locale = getPreferredLocale(request);
  
  // Přesměrování na URL s jazykovým kódem
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  // Zachování query parametrů
  if (request.nextUrl.search) {
    newUrl.search = request.nextUrl.search;
  }
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Matcher definující, na které cesty se middleware vztahuje
  matcher: [
    /*
     * Vyjmutí všech cest, které nepotřebují jazykové přesměrování:
     * - api (API cesty)
     * - _next/static (statické assety)
     * - _next/image (Next.js optimalizované obrázky)
     * - favicon.ico (ikonka prohlížeče)
     * - již lokalizované cesty
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};