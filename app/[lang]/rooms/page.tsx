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
    title: t.rooms.meta.title,
    description: t.rooms.meta.description,
  }
}

export default async function RoomsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = getT(lang)
  const r = t.rooms

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

      {/* 宿の概要 */}
      <section className="section-padding bg-cream">
        <div className="container-base">
          <h2 className="font-serif text-2xl md:text-3xl text-brown mb-8">
            {r.overview.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {r.overview.items.map((item, i) => (
              <div key={i} className="bg-white rounded-sm p-5 border border-brown-100">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <p className="font-sans text-xs text-gold mb-1">{item.label}</p>
                <p className="font-sans text-sm font-medium text-brown">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ベッド構成 */}
      <section className="section-padding bg-washi">
        <div className="container-base max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-brown mb-4">
            {r.beds.title}
          </h2>
          <p className="font-sans text-brown-600 mb-6">{r.beds.desc}</p>
          <div className="bg-cream rounded-sm p-6 border border-brown-100">
            <ul className="space-y-3">
              {r.beds.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-sans text-sm text-brown">
                  <span className="text-gold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 設備一覧 */}
      <section className="section-padding bg-cream">
        <div className="container-base">
          <h2 className="font-serif text-2xl md:text-3xl text-brown mb-8">
            {t.amenities.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.amenities.categories.map((cat, i) => (
              <div key={i} className="bg-white rounded-sm p-6 border border-brown-100">
                <h3 className="font-sans text-sm font-medium text-brown mb-4">{cat.name}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 font-sans text-xs text-brown-600">
                      <span className="w-1 h-1 rounded-full bg-gold-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セルフチェックイン */}
      <section className="section-padding bg-washi">
        <div className="container-base max-w-3xl">
          <div className="bg-gold-50 border-l-4 border-gold rounded-sm p-6">
            <h2 className="font-serif text-xl text-brown mb-3">
              🔑 {r.selfCheckin.title}
            </h2>
            <p className="font-sans text-sm text-brown-600 leading-relaxed">
              {r.selfCheckin.desc}
            </p>
          </div>
        </div>
      </section>

      {/* 利用ルール */}
      <section className="section-padding bg-cream">
        <div className="container-base max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-brown mb-8">
            {r.rules.title}
          </h2>
          <div className="bg-white rounded-sm border border-brown-100 divide-y divide-brown-50">
            {r.rules.items.map((item, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <p className="font-sans text-sm text-brown-700 leading-relaxed">{item.text}</p>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/reservation`} className="btn-primary px-8 py-4 text-base">
              {t.common.requestBook}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
