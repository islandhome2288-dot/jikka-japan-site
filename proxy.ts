import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// サポートする言語一覧
const supportedLangs = ['ja', 'en']
const defaultLang = 'ja'

// Next.js 16 では "proxy" という名前でエクスポートする必要があります
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 言語プレフィックスが既にあるか確認
  const pathnameHasLang = supportedLangs.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  )

  if (pathnameHasLang) return NextResponse.next()

  // ブラウザの Accept-Language ヘッダーから言語を自動検出
  const acceptLanguage = request.headers.get('accept-language') || ''
  const detectedLang = acceptLanguage.startsWith('ja') ? 'ja' : defaultLang

  // 言語プレフィックスを付けてリダイレクト
  const newUrl = new URL(`/${detectedLang}${pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  // 静的ファイル・APIルートは除外
  matcher: ['/((?!_next|api|favicon\\.ico|images|.*\\..*).*)'],
}
