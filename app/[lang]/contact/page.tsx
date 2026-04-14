import type { Metadata } from 'next'
import Link from 'next/link'
import { getT } from '@/lib/i18n'
import ContactForm from '@/components/ContactForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = getT(lang)
  return {
    title: t.contact.meta.title,
    description: t.contact.meta.description,
  }
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = getT(lang)
  const c = t.contact

  return (
    <>
      {/* ヒーロー */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-brown-800 to-brown-700 text-white">
        <div className="container-base text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-shadow-sm">
            {c.hero.title}
          </h1>
          <p className="font-sans text-white/75 text-sm tracking-wide">
            {c.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="section-padding bg-washi">
        <div className="container-base max-w-3xl">
          <div className="grid md:grid-cols-5 gap-10">

            {/* 左：案内 */}
            <div className="md:col-span-2">
              <div className="bg-cream rounded-sm p-6 border border-brown-100">
                <p className="font-sans text-sm text-brown-600 mb-4 flex items-center gap-2">
                  ⏰ {c.info.response}
                </p>
                <p className="font-sans text-xs text-brown-400 leading-relaxed">
                  {c.info.note}
                </p>

                <div className="divider-washi my-5" />

                <div className="space-y-3">
                  <Link
                    href={`/${lang}/reservation`}
                    className="flex items-center gap-2 font-sans text-sm text-gold hover:text-gold-700 transition-colors"
                  >
                    📅 {t.common.bookNow} →
                  </Link>
                  <Link
                    href={`/${lang}/faq`}
                    className="flex items-center gap-2 font-sans text-sm text-gold hover:text-gold-700 transition-colors"
                  >
                    ❓ {t.nav.faq} →
                  </Link>
                </div>
              </div>
            </div>

            {/* 右：お問い合わせフォーム */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-sm p-6 md:p-8 border border-brown-100 shadow-sm">
                <ContactForm lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
