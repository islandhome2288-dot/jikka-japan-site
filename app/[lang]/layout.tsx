import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLang, getT } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 静的パスの生成（SSG用）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function generateStaticParams() {
  return [{ lang: 'ja' }, { lang: 'en' }]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// メタデータ（言語別）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params

  return {
    alternates: {
      languages: {
        'ja': '/ja',
        'en': '/en',
      },
    },
    openGraph: {
      locale: lang === 'ja' ? 'ja_JP' : 'en_US',
    },
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 言語レイアウト（Header + Footer を追加）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params

  // 無効な言語の場合は 404
  if (!isValidLang(langParam)) {
    notFound()
  }

  const lang = langParam

  return (
    <>
      <Header lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
    </>
  )
}
