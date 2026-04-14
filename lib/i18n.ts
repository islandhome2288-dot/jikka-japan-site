// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 多言語対応ユーティリティ
// 将来的に繁体字・簡体字・韓国語を追加する場合は
// translations/ にファイルを追加し、このファイルに登録してください
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { ja } from './translations/ja'
import { en } from './translations/en'

// サポートする言語の一覧
const translations = { ja, en } as const

// 言語の型定義
export type Lang = keyof typeof translations

// サポートする言語一覧（URLバリデーションに使用）
export const supportedLangs: Lang[] = ['ja', 'en']

// デフォルト言語
export const defaultLang: Lang = 'ja'

// 翻訳テキストを取得する関数
export function getT(lang: string) {
  if (lang === 'en') return translations.en
  return translations.ja
}

// lang パラメータが有効か確認する
export function isValidLang(lang: string): lang is Lang {
  return supportedLangs.includes(lang as Lang)
}

// 言語を切り替えるためのパスを生成する
export function getLangPath(currentPath: string, targetLang: Lang): string {
  const segments = currentPath.split('/')
  segments[1] = targetLang // /ja/rooms → /en/rooms
  return segments.join('/')
}

// 言語ラベルマップ（ナビゲーション表示用）
export const langLabels: Record<Lang, string> = {
  ja: '日本語',
  en: 'English',
}
