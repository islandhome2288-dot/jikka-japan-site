import type { Metadata } from 'next'
import Link from 'next/link'
import { getT } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = getT(lang)
  return {
    title: t.accessPage.meta.title,
    description: t.accessPage.meta.description,
  }
}

export default async function AccessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = getT(lang)
  const a = t.accessPage

  return (
    <>
      {/* ヒーロー */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-brown-800 to-brown-700 text-white">
        <div className="container-base text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-shadow-sm">
            {a.hero.title}
          </h1>
          <p className="font-sans text-white/75 text-sm tracking-wide">
            {a.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 関西空港からのアクセス */}
      <section className="section-padding bg-cream">
        <div className="container-base max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-brown mb-8">
            {a.byAir.title}
          </h2>
          <div className="space-y-4">
            {a.byAir.items.map((item, i) => (
              <div key={i} className="bg-white rounded-sm p-5 border border-brown-100 flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-sans text-sm font-medium text-brown mb-1">{item.method}</h3>
                  <p className="font-sans text-sm text-brown-600">{item.time}</p>
                  <p className="font-sans text-xs text-brown-400 mt-1">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 最寄り駅から */}
      <section className="section-padding bg-washi">
        <div className="container-base max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-brown mb-8">
            {a.byTrain.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {a.byTrain.items.map((item, i) => (
              <div key={i} className="bg-cream rounded-sm p-6 border border-brown-100">
                <p className="font-sans text-sm font-medium text-brown mb-2">🚉 {item.station}</p>
                <p className="font-sans text-sm text-gold">{item.walk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 地図・所在地 */}
      <section className="section-padding bg-cream">
        <div className="container-base max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-brown mb-4">
            {a.address.title}
          </h2>
          <p className="font-sans text-sm text-brown-600 mb-2">{a.address.detail}</p>
          {a.address.note && (
            <p className="font-sans text-xs text-brown-400 mb-8">{a.address.note}</p>
          )}

          {/* Google Maps 埋め込み */}
          <div className="rounded-sm overflow-hidden border border-brown-100 mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443.24840363566574!2d135.31435121777778!3d34.407568966578836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000c9e2944df7c7%3A0xcf865883a45f54e6!2zSmlra2EgSmFwYW7vvZzjgrjjg4Pjgqsg44K444Oj44OR44Oz!5e1!3m2!1sja!2sjp!4v1776078364358!5m2!1sja!2sjp"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Jikka Japan - Google Maps"
            />
          </div>
        </div>
      </section>

      {/* 周辺環境 */}
      <section className="section-padding bg-washi">
        <div className="container-base max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-brown mb-4">
            {a.surroundings.title}
          </h2>
          <p className="font-sans text-brown-600 mb-8 leading-relaxed">
            {a.surroundings.desc}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {a.surroundings.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-cream rounded-sm px-4 py-3">
                <p className="font-sans text-sm text-brown-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brown-800">
        <div className="container-base text-center">
          <h2 className="font-serif text-3xl text-white mb-6">
            {t.common.bookNow}
          </h2>
          <Link href={`/${lang}/reservation`} className="btn-primary px-8 py-4 text-base">
            {t.common.requestBook}
          </Link>
        </div>
      </section>
    </>
  )
}
