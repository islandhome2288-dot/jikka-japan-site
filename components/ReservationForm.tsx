'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getT } from '@/lib/i18n'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 予約リクエストフォーム
// Formspreeを使って送信。.env.local に FORMSPREE_ID を設定してください。
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface FormData {
  checkin: string
  checkout: string
  guests: string
  name: string
  email: string
  phone: string
  nationality: string
  notes: string
}

const INITIAL_FORM: FormData = {
  checkin: '',
  checkout: '',
  guests: '',
  name: '',
  email: '',
  phone: '',
  nationality: '',
  notes: '',
}

export default function ReservationForm({ lang }: { lang: string }) {
  const t = getT(lang)
  const f = t.reservation.form
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Formspreeへの送信
    // 【設定】.env.local に NEXT_PUBLIC_FORMSPREE_RESERVATION_ID を設定してください
    // 設定方法: https://formspree.io でフォーム作成 → Form IDをコピー
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_RESERVATION_ID

    if (!formspreeId || formspreeId === 'YOUR_RESERVATION_FORM_ID') {
      // FormspreeのIDが未設定の場合のテスト表示
      console.log('FormspreeのIDが未設定です。.env.localを確認してください。')
      console.log('送信データ:', formData)
      await new Promise((r) => setTimeout(r, 1000))
      setStatus('success')
      return
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          _subject: `【予約リクエスト】${formData.checkin} - ${formData.checkout} / ${formData.name}様`,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setStatus('success')
        setFormData(INITIAL_FORM)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // 送信成功時の表示
  if (status === 'success') {
    const s = t.reservation.success
    return (
      <div className="text-center py-12 px-6">
        <div className="text-5xl mb-6">🎉</div>
        <h3 className="font-serif text-2xl text-brown mb-3">{s.title}</h3>
        <p className="font-sans text-brown-600 mb-2">{s.desc}</p>
        <p className="font-sans text-xs text-brown-400 mb-8">{s.note}</p>
        <Link href={`/${lang}`} className="btn-primary">
          {s.backBtn}
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 日程 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="checkin" className="form-label">
            {f.fields.checkin.label}
          </label>
          <input
            id="checkin"
            name="checkin"
            type="date"
            value={formData.checkin}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="checkout" className="form-label">
            {f.fields.checkout.label}
          </label>
          <input
            id="checkout"
            name="checkout"
            type="date"
            value={formData.checkout}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
      </div>

      {/* 人数 */}
      <div>
        <label htmlFor="guests" className="form-label">
          {f.fields.guests.label}
        </label>
        <input
          id="guests"
          name="guests"
          type="text"
          value={formData.guests}
          onChange={handleChange}
          required
          placeholder={f.fields.guests.placeholder}
          className="form-input"
        />
      </div>

      {/* 名前 */}
      <div>
        <label htmlFor="name" className="form-label">
          {f.fields.name.label}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={f.fields.name.placeholder}
          className="form-input"
        />
      </div>

      {/* メール */}
      <div>
        <label htmlFor="email" className="form-label">
          {f.fields.email.label}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={f.fields.email.placeholder}
          className="form-input"
        />
      </div>

      {/* 電話・国籍 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="form-label">
            {f.fields.phone.label}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder={f.fields.phone.placeholder}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="nationality" className="form-label">
            {f.fields.nationality.label}
          </label>
          <input
            id="nationality"
            name="nationality"
            type="text"
            value={formData.nationality}
            onChange={handleChange}
            placeholder={f.fields.nationality.placeholder}
            className="form-input"
          />
        </div>
      </div>

      {/* ご要望 */}
      <div>
        <label htmlFor="notes" className="form-label">
          {f.fields.notes.label}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          placeholder={f.fields.notes.placeholder}
          className="form-input resize-none"
        />
      </div>

      {/* エラーメッセージ */}
      {status === 'error' && (
        <p className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 rounded-sm px-4 py-3">
          {t.reservation.error}
        </p>
      )}

      {/* 注意書き */}
      <p className="font-sans text-xs text-brown-400">{f.note}</p>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? f.submitting : f.submit}
      </button>
    </form>
  )
}
