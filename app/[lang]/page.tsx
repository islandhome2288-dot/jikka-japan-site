import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getT } from '@/lib/i18n'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// メタデータ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isEn = lang === 'en'
  return {
    title: isEn
      ? 'Jikka Japan | Entire Home near Kansai Airport, Osaka'
      : 'Jikka Japan | ジッカジャパン - 関西空港近く一棟貸し民泊',
    description: isEn
      ? 'Entire home rental in Izumisano, Osaka. 10 min from Kansai Airport (KIX). Up to 7 guests. Family-friendly. Authentic Japanese atmosphere.'
      : '大阪・泉佐野の一棟貸し宿。関西空港から約10分。最大7名。ファミリー歓迎。和風の温もりある空間で特別な滞在を。',
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// トップページ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = getT(lang)

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. ヒーローセクション
          【写真】public/images/hero.jpg に 1920x1080px 以上の画像を配置してください
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0">
          {/* hero.jpg がある場合はそちらを使用。なければ gallery-1.jpg を使用 */}
          <Image
            src="/images/gallery-1.jpg"
            alt="Jikka Japan - 和風の一棟貸し宿"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>

        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        {/* コンテンツ */}
        <div className="relative z-10 container-base text-center text-white py-32">
          {/* タグライン */}
          <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-gold-300 mb-6 text-shadow-sm">
            {t.hero.tagline}
          </p>

          {/* メインキャッチコピー */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-shadow-md whitespace-pre-line">
            {t.hero.title}
          </h1>

          {/* サブコピー */}
          <p className="font-sans text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-12 leading-relaxed text-shadow-sm whitespace-pre-line">
            {t.hero.subtitle}
          </p>

          {/* CTAボタン群 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={`/${lang}/reservation`} className="btn-primary px-8 py-4 text-base">
              {t.hero.cta}
            </Link>
            <Link
              href={`/${lang}/rooms`}
              className="inline-flex items-center justify-center px-8 py-4
                         border border-white/70 text-white font-sans font-medium tracking-wide
                         rounded-sm hover:bg-white/10 transition-colors duration-200 text-base"
            >
              {t.common.learnMore}
            </Link>
          </div>

          {/* スクロールインジケーター */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="font-sans text-xs text-white/60">{t.hero.scrollDown}</span>
            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. コンセプトセクション
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding bg-cream">
        <div className="container-base">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* テキスト */}
            <div>
              <p className="section-tag mb-3">{t.concept.tag}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-brown leading-snug mb-6 whitespace-pre-line">
                {t.concept.title}
              </h2>
              <p className="font-sans text-brown-600 leading-relaxed mb-8">
                {t.concept.desc}
              </p>

              {/* ポイントリスト */}
              <ul className="space-y-3 mb-8">
                {t.concept.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-sm text-brown">
                    <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <Link href={`/${lang}/rooms`} className="btn-secondary">
                {t.common.learnMore}
              </Link>
            </div>

            {/* 画像エリア */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/images/concept.jpg"
                alt={t.concept.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. 魅力セクション（6つのFeatures）
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding bg-washi">
        <div className="container-base">
          <div className="text-center mb-12">
            <p className="section-tag mb-3">{t.features.tag}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-brown">
              {t.features.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((item, i) => (
              <div key={i} className="card group">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-lg text-brown mb-2">{item.title}</h3>
                <p className="font-sans text-sm text-brown-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. ギャラリーセクション
          【写真】public/images/gallery-1.jpg 〜 gallery-6.jpg を配置してください
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding bg-cream">
        <div className="container-base">
          <div className="text-center mb-10">
            <p className="section-tag mb-3">{t.gallery.tag}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-brown mb-3">
              {t.gallery.title}
            </h2>
            <p className="font-sans text-brown-600 text-sm">{t.gallery.subtitle}</p>
          </div>

          {/* ギャラリーグリッド */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className={`relative overflow-hidden rounded-sm ${
                  num === 1 ? 'col-span-2 md:col-span-1 aspect-video md:aspect-square' : 'aspect-square'
                }`}
              >
                <Image
                  src={`/images/gallery-${num}.jpg`}
                  alt={t.gallery.altTexts[num - 1]}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. 設備・アメニティセクション
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding bg-washi">
        <div className="container-base">
          <div className="text-center mb-12">
            <p className="section-tag mb-3">{t.amenities.tag}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-brown mb-3">
              {t.amenities.title}
            </h2>
            <p className="font-sans text-brown-600 text-sm">{t.amenities.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.amenities.categories.map((cat, i) => (
              <div key={i} className="bg-cream rounded-sm p-6">
                <h3 className="font-sans text-sm font-medium text-brown mb-4">{cat.name}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="font-sans text-xs text-brown-600 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href={`/${lang}/rooms`} className="btn-secondary">
              {t.common.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. ファミリー向けセクション
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding bg-cream">
        <div className="container-base">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* 画像エリア */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden order-2 md:order-1">
              <Image
                src="/images/family.jpg"
                alt="ファミリー向け設備"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* テキスト */}
            <div className="order-1 md:order-2">
              <p className="section-tag mb-3">{t.family.tag}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-brown leading-snug mb-6 whitespace-pre-line">
                {t.family.title}
              </h2>
              <p className="font-sans text-brown-600 leading-relaxed mb-8">
                {t.family.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.family.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="font-sans text-sm font-medium text-brown mb-1">{item.title}</h3>
                      <p className="font-sans text-xs text-brown-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. アクセスセクション
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding bg-washi">
        <div className="container-base">
          <div className="text-center mb-12">
            <p className="section-tag mb-3">{t.access.tag}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-brown mb-3">
              {t.access.title}
            </h2>
            <p className="font-sans text-brown-600 text-sm">{t.access.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {t.access.items.map((item, i) => (
              <div key={i} className="bg-cream rounded-sm p-5">
                <h3 className="font-sans text-xs font-medium text-gold mb-3">{item.label}</h3>
                <p className="font-sans text-sm text-brown-700 leading-relaxed whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Google Maps 埋め込み */}
          <div className="rounded-sm overflow-hidden border border-brown-100 mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443.24840363566574!2d135.31435121777778!3d34.407568966578836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000c9e2944df7c7%3A0xcf865883a45f54e6!2zSmlra2EgSmFwYW7vvZzjgrjjg4Pjgqsg44K444Oj44OR44Oz!5e1!3m2!1sja!2sjp!4v1776078364358!5m2!1sja!2sjp"
              width="100%"
              height="380"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Jikka Japan - Google Maps"
            />
          </div>

          {t.access.mapNote && (
            <p className="font-sans text-xs text-brown-400 text-center mb-8">
              {t.access.mapNote}
            </p>
          )}

          <div className="text-center">
            <Link href={`/${lang}/access`} className="btn-secondary">
              {t.common.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. レビュー・テスティモニアルセクション
          【ダミーデータ】実際のレビューに差し替えてください
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding bg-brown-800">
        <div className="container-base">
          <div className="text-center mb-12">
            <p className="font-sans text-xs tracking-widest uppercase text-gold-300 mb-3">
              {t.testimonials.tag}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
              {t.testimonials.title}
            </h2>
            <p className="font-sans text-brown-300 text-sm">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((review, i) => (
              <div key={i} className="bg-brown-700 rounded-sm p-6">
                {/* 星評価 */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-gold-300 text-sm">★</span>
                  ))}
                </div>
                {/* レビューテキスト */}
                <p className="font-sans text-sm text-brown-200 leading-relaxed mb-5 italic">
                  "{review.text}"
                </p>
                {/* 投稿者情報 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brown-600 flex items-center justify-center font-sans text-xs text-brown-300">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-sans text-xs font-medium text-white">{review.name}</p>
                    <p className="font-sans text-xs text-brown-400">{review.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="font-sans text-xs text-brown-400 text-center mt-6">
            ※ {t.testimonials.placeholder}
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. FAQプレビューセクション
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding bg-washi">
        <div className="container-base max-w-3xl">
          <div className="text-center mb-10">
            <p className="section-tag mb-3">{t.faqPreview.tag}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-brown">
              {t.faqPreview.title}
            </h2>
          </div>

          <div className="space-y-3">
            {t.faqPreview.items.map((item, i) => (
              <details
                key={i}
                className="group bg-white border border-brown-100 rounded-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer select-none
                                    font-sans text-sm font-medium text-brown
                                    hover:bg-cream transition-colors list-none">
                  <span>{item.q}</span>
                  <span className="text-gold text-lg font-light flex-shrink-0 group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-2">
                  <p className="font-sans text-sm text-brown-600 leading-relaxed whitespace-pre-line">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={`/${lang}/faq`} className="btn-ghost">
              {t.faqPreview.moreLink} →
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          10. 予約CTAバナー（ページ最下部）
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* 背景 */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-700 to-brown-700" />
        {/* 和風格子 */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px),
                              repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)`
          }}
        />

        <div className="relative z-10 container-base text-center text-white">
          <p className="font-sans text-xs tracking-widest uppercase text-gold-300 mb-4">
            {t.reservationCta.tagline}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-shadow-sm whitespace-pre-line">
            {t.reservationCta.title}
          </h2>
          <p className="font-sans text-white/80 mb-10 max-w-lg mx-auto">
            {t.reservationCta.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${lang}/reservation`}
              className="inline-flex items-center justify-center px-8 py-4
                         bg-white text-gold font-sans font-medium tracking-wide
                         rounded-sm hover:bg-gold-50 transition-colors duration-200 text-base"
            >
              {t.reservationCta.cta}
            </Link>
            <Link
              href={`/${lang}/reservation`}
              className="inline-flex items-center justify-center px-8 py-4
                         border border-white/60 text-white font-sans font-medium tracking-wide
                         rounded-sm hover:bg-white/10 transition-colors duration-200 text-base"
            >
              {t.reservationCta.ctaSub}
            </Link>
            <Link href={`/${lang}/contact`} className="font-sans text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors">
              {t.reservationCta.ctaTertiary}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
