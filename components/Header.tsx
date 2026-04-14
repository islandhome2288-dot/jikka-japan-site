'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getT, getLangPath, type Lang } from '@/lib/i18n'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ヘッダーコンポーネント
// スクロールで背景色が変わる + モバイルメニュー対応
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Header({ lang }: { lang: string }) {
  const t = getT(lang)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // メニューを閉じる
  const closeMenu = () => setIsMenuOpen(false)

  // 現在のページかチェック
  const isActive = (path: string) => pathname === `/${lang}${path}`

  // 言語切替リンク
  const otherLang = lang === 'ja' ? 'en' : 'ja'
  const otherLangPath = getLangPath(pathname, otherLang as Lang)

  // ナビゲーションリンク一覧
  const navLinks = [
    { href: '', label: t.nav.home },
    { href: '/rooms', label: t.nav.rooms },
    { href: '/access', label: t.nav.access },
    { href: '/faq', label: t.nav.faq },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-washi/95 backdrop-blur-sm shadow-sm border-b border-brown-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container-base">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ━━━━━ ロゴ ━━━━━ */}
          <Link
            href={`/${lang}`}
            className="flex flex-col leading-tight group"
            onClick={closeMenu}
          >
            <span
              className={`font-serif text-lg md:text-xl font-bold tracking-wide transition-colors ${
                isScrolled ? 'text-brown' : 'text-white text-shadow-sm'
              } group-hover:text-gold`}
            >
              Jikka Japan
            </span>
            <span
              className={`font-sans text-xs tracking-widest transition-colors ${
                isScrolled ? 'text-brown-600' : 'text-white/80'
              }`}
            >
              ジッカジャパン
            </span>
          </Link>

          {/* ━━━━━ デスクトップナビ ━━━━━ */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className={`font-sans text-sm transition-colors hover:text-gold ${
                  isActive(link.href)
                    ? 'text-gold font-medium'
                    : isScrolled
                    ? 'text-brown'
                    : 'text-white/90 text-shadow-sm'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* 言語切替 */}
            <Link
              href={otherLangPath}
              className={`font-sans text-xs border px-2.5 py-1 rounded-sm transition-colors ${
                isScrolled
                  ? 'border-brown-300 text-brown hover:border-gold hover:text-gold'
                  : 'border-white/60 text-white/90 hover:border-white hover:text-white'
              }`}
            >
              {t.nav.langLabel}
            </Link>

            {/* 予約CTAボタン */}
            <Link href={`/${lang}/reservation`} className="btn-primary text-sm py-2.5 px-5">
              {t.common.bookNow}
            </Link>
          </nav>

          {/* ━━━━━ モバイル：ハンバーガーメニュー ━━━━━ */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-sm transition-colors ${
              isScrolled ? 'text-brown hover:text-gold' : 'text-white hover:text-gold-300'
            }`}
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              // × アイコン
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // ハンバーガーアイコン
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ━━━━━ モバイルメニュー（ドロワー） ━━━━━ */}
      {isMenuOpen && (
        <div className="md:hidden bg-washi border-t border-brown-100 shadow-lg">
          <nav className="container-base py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                onClick={closeMenu}
                className={`font-sans py-3 px-4 rounded-sm text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-gold font-medium bg-cream'
                    : 'text-brown hover:text-gold hover:bg-cream'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="divider-washi my-2" />

            {/* 言語切替 */}
            <Link
              href={otherLangPath}
              onClick={closeMenu}
              className="font-sans py-3 px-4 text-sm text-brown hover:text-gold hover:bg-cream rounded-sm transition-colors"
            >
              🌐 {t.nav.langLabel}
            </Link>

            {/* 予約ボタン */}
            <Link
              href={`/${lang}/reservation`}
              onClick={closeMenu}
              className="btn-primary mt-2 w-full text-center"
            >
              {t.common.bookNow}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
