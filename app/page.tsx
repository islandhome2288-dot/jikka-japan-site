// ルートページ: /ja にリダイレクト（middleware.ts でも処理しているが念のため）
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/ja')
}
