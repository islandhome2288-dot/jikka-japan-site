import type { Metadata } from 'next'
import { Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// フォント設定（Google Fonts）
// preload: false にすることで日本語フォントの初回ロード負荷を軽減
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  preload: false,
  variable: '--font-noto-serif',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  preload: false,
  variable: '--font-noto-sans',
  display: 'swap',
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// デフォルトメタデータ（各ページで上書き可能）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const metadata: Metadata = {
  title: {
    default: 'Jikka Japan | ジッカジャパン - 関西空港近く一棟貸し民泊',
    template: '%s | Jikka Japan',
  },
  description: '大阪・泉佐野の一棟貸し宿。関西空港から約10分。最大7名。ファミリー歓迎。和風の温もりある空間で特別な滞在を。',
  keywords: ['関西空港 宿', '泉佐野 民泊', '関空 ファミリー宿', '一棟貸し 関西空港', '大阪 和風 宿泊', '泉佐野 一棟貸し'],
  openGraph: {
    type: 'website',
    siteName: 'Jikka Japan',
    locale: 'ja_JP',
    // 【OGP画像】public/images/ogp.jpg に 1200x630px の画像を配置してください
    // images: [{ url: '/images/ogp.jpg', width: 1200, height: 630 }],
  },
  // robots
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // lang は /[lang]/layout.tsx で上書きされます
    // suppressHydrationWarning はハイドレーション警告を抑制します
    <html suppressHydrationWarning>
      <head>
        {/* 構造化データ（JSON-LD）- ローカルビジネス情報 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LodgingBusiness',
              name: 'Jikka Japan（ジッカジャパン）',
              description: '大阪・泉佐野市の一棟貸し民泊。関西空港から約10分。最大7名。ファミリー歓迎。',
              url: 'https://jikka-japan.com', // 【要変更】実際のURLに書き換えてください
              address: {
                '@type': 'PostalAddress',
                streetAddress: '高松北１丁目８−８２-13',
                addressLocality: '泉佐野市',
                addressRegion: '大阪府',
                postalCode: '598-0025',
                addressCountry: 'JP',
              },
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: '無料Wi-Fi', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'キッチン', value: true },
                { '@type': 'LocationFeatureSpecification', name: '洗濯乾燥機', value: true },
              ],
              numberOfRooms: 1,
              petsAllowed: false,
            }),
          }}
        />
      </head>
      <body className={`${notoSerifJP.variable} ${notoSansJP.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
