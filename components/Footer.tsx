import Link from 'next/link'
import { getT } from '@/lib/i18n'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// フッターコンポーネント
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 【SNS・OTAリンク】.env.local に実際のURLを設定してください
const SNS_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#',
  airbnb: process.env.NEXT_PUBLIC_AIRBNB_URL || '#',
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || '#',
}

export default function Footer({ lang }: { lang: string }) {
  const t = getT(lang)
  const f = t.footer

  return (
    <footer className="bg-brown-800 text-brown-100">
      {/* ━━━━━ メインフッター ━━━━━ */}
      <div className="container-base py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* ブランド情報 */}
          <div className="md:col-span-2">
            <Link href={`/${lang}`} className="inline-block mb-4 group">
              <span className="font-serif text-xl text-white group-hover:text-gold-300 transition-colors">
                Jikka Japan
              </span>
              <span className="block font-sans text-xs text-brown-300 tracking-widest mt-0.5">
                ジッカジャパン
              </span>
            </Link>

            <p className="font-sans text-sm text-brown-300 mb-4 leading-relaxed">
              {f.tagline}
            </p>

            <p className="font-sans text-xs text-brown-400">
              📍 {f.address}
            </p>
            <p className="font-sans text-xs text-brown-400 mt-1">
              {f.tel}
            </p>

            {/* SNSリンク */}
            <div className="mt-6">
              <p className="font-sans text-xs text-brown-400 uppercase tracking-widest mb-3">
                {f.followUs}
              </p>
              <div className="flex gap-3">
                {/* Instagram */}
                {SNS_LINKS.instagram !== '#' && (
                  <a
                    href={SNS_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-sans text-xs text-brown-300 hover:text-gold-300 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                )}

                {/* Airbnb */}
                {SNS_LINKS.airbnb !== '#' && (
                  <a
                    href={SNS_LINKS.airbnb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs text-brown-300 hover:text-gold-300 transition-colors"
                  >
                    Airbnb
                  </a>
                )}

                {/* Booking.com */}
                {SNS_LINKS.booking !== '#' && (
                  <a
                    href={SNS_LINKS.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs text-brown-300 hover:text-gold-300 transition-colors"
                  >
                    Booking.com
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ナビリンク */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-brown-400 mb-4">
              {f.navTitle}
            </h3>
            <ul className="space-y-2.5">
              {Object.entries(f.links).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/${lang}/${key === 'home' ? '' : key}`}
                    className="font-sans text-sm text-brown-300 hover:text-gold-300 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 法的情報 */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-brown-400 mb-4">
              {f.legalTitle}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/privacy`}
                  className="font-sans text-sm text-brown-300 hover:text-gold-300 transition-colors"
                >
                  {f.legal.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/terms`}
                  className="font-sans text-sm text-brown-300 hover:text-gold-300 transition-colors"
                >
                  {f.legal.terms}
                </Link>
              </li>
            </ul>

            {/* 予約ボタン */}
            <div className="mt-8">
              <Link
                href={`/${lang}/reservation`}
                className="inline-flex items-center justify-center w-full px-5 py-3
                           bg-gold text-white font-sans text-sm font-medium
                           rounded-sm hover:bg-gold-600 transition-colors"
              >
                {t.common.bookNow}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━ コピーライト ━━━━━ */}
      <div className="border-t border-brown-700">
        <div className="container-base py-5">
          <p className="font-sans text-xs text-brown-400 text-center">
            {f.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
