import type { Metadata } from 'next'
import { getT } from '@/lib/i18n'
import ReservationForm from '@/components/ReservationForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = getT(lang)
  return {
    title: t.reservation.meta.title,
    description: t.reservation.meta.description,
  }
}

// OTAリンク（.env.local で設定してください）
const OTA = {
  airbnb: process.env.NEXT_PUBLIC_AIRBNB_URL || '#',
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || '#',
}

export default async function ReservationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = getT(lang)
  const r = t.reservation

  return (
    <>
      {/* ヒーロー */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-brown-800 to-brown-700 text-white">
        <div className="container-base text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-shadow-sm">
            {r.hero.title}
          </h1>
          <p className="font-sans text-white/75 text-sm tracking-wide">
            {r.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="section-padding bg-washi">
        <div className="container-base max-w-4xl">
          <div className="grid md:grid-cols-5 gap-10">

            {/* ━━━━━ 左：OTAリンク + 説明 ━━━━━ */}
            <div className="md:col-span-2 space-y-6">

              {/* OTAリンク（即時確定）*/}
              <div className="bg-cream rounded-sm p-6 border border-brown-100">
                <h2 className="font-serif text-lg text-brown mb-2">
                  {r.ota.title}
                </h2>
                <p className="font-sans text-xs text-brown-600 mb-5 leading-relaxed">
                  {r.ota.desc}
                </p>

                <div className="space-y-3">
                  {/* Airbnbボタン */}
                  <a
                    href={OTA.airbnb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3
                               bg-[#FF5A5F] text-white font-sans text-sm font-medium
                               rounded-sm hover:bg-[#E04A4E] transition-colors"
                  >
                    <span>🏠 {r.ota.airbnbLabel}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  {/* Booking.comボタン */}
                  <a
                    href={OTA.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3
                               bg-[#003580] text-white font-sans text-sm font-medium
                               rounded-sm hover:bg-[#002B6B] transition-colors"
                  >
                    <span>🌐 {r.ota.bookingLabel}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <p className="font-sans text-xs text-brown-400 mt-4">{r.ota.note}</p>
              </div>

              {/* 概要情報 */}
              <div className="bg-cream rounded-sm p-6 border border-brown-100">
                <h3 className="font-sans text-xs font-medium text-gold uppercase tracking-widest mb-4">
                  Jikka Japan
                </h3>
                <ul className="space-y-2">
                  <li className="font-sans text-xs text-brown-600">👥 最大7名 / Up to 7 guests</li>
                  <li className="font-sans text-xs text-brown-600">🏠 一棟貸切 / Entire home</li>
                  <li className="font-sans text-xs text-brown-600">✈️ 関西空港 約10分 / 10 min from KIX</li>
                  <li className="font-sans text-xs text-brown-600">🔑 セルフチェックイン / Self check-in</li>
                </ul>
              </div>
            </div>

            {/* ━━━━━ 右：予約リクエストフォーム ━━━━━ */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-sm p-6 md:p-8 border border-brown-100 shadow-sm">
                <h2 className="font-serif text-xl text-brown mb-2">
                  {r.form.title}
                </h2>
                <p className="font-sans text-xs text-brown-600 mb-6 leading-relaxed">
                  {r.form.desc}
                </p>
                <ReservationForm lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
