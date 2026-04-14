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
    title: t.faq.meta.title,
    description: t.faq.meta.description,
  }
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = getT(lang)
  const f = t.faq

  return (
    <>
      {/* ヒーロー */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-brown-800 to-brown-700 text-white">
        <div className="container-base text-center">
          <p className="font-sans text-xs tracking-widest uppercase text-gold-300 mb-3">
            {f.hero.subtitle}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-shadow-sm">
            {f.hero.title}
          </h1>
        </div>
      </section>

      {/* FAQコンテンツ */}
      <section className="section-padding bg-washi">
        <div className="container-base max-w-3xl">
          <div className="space-y-10">
            {f.categories.map((cat, catIndex) => (
              <div key={catIndex}>
                {/* カテゴリタイトル */}
                <h2 className="font-serif text-xl text-brown mb-4 pb-3 border-b border-brown-100">
                  {cat.category}
                </h2>

                {/* Q&Aアコーディオン */}
                <div className="space-y-2">
                  {cat.items.map((item, i) => (
                    <details
                      key={i}
                      className="group bg-white border border-brown-100 rounded-sm overflow-hidden"
                    >
                      <summary className="flex items-start justify-between gap-4 px-6 py-4 cursor-pointer select-none
                                          list-none hover:bg-cream transition-colors">
                        <div className="flex items-start gap-3">
                          <span className="font-serif text-gold font-bold text-sm flex-shrink-0 mt-0.5">Q</span>
                          <span className="font-sans text-sm font-medium text-brown leading-snug">
                            {item.q}
                          </span>
                        </div>
                        <span className="text-gold text-lg font-light flex-shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-200">
                          +
                        </span>
                      </summary>
                      <div className="px-6 pb-5 pt-2 flex gap-3">
                        <span className="font-serif text-brown-400 font-bold text-sm flex-shrink-0">A</span>
                        <p className="font-sans text-sm text-brown-600 leading-relaxed whitespace-pre-line">
                          {item.a}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* お問い合わせへの誘導 */}
          <div className="mt-12 bg-cream rounded-sm p-8 text-center border border-brown-100">
            <h3 className="font-serif text-xl text-brown mb-3">
              {lang === 'ja' ? 'ご不明な点はお気軽にどうぞ' : 'Still have questions?'}
            </h3>
            <p className="font-sans text-sm text-brown-600 mb-6">
              {lang === 'ja'
                ? '上記以外のご質問はお問い合わせフォームからお気軽にどうぞ。'
                : 'Feel free to reach out via our contact form.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/${lang}/contact`} className="btn-primary px-7 py-3">
                {t.nav.contact}
              </Link>
              <Link href={`/${lang}/reservation`} className="btn-secondary px-7 py-3">
                {t.common.bookNow}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
