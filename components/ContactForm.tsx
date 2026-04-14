'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getT } from '@/lib/i18n'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function ContactForm({ lang }: { lang: string }) {
  const t = getT(lang)
  const f = t.contact.form
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

    // 【設定】.env.local に NEXT_PUBLIC_FORMSPREE_CONTACT_ID を設定してください
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID

    if (!formspreeId || formspreeId === 'YOUR_CONTACT_FORM_ID') {
      console.log('FormspreeのIDが未設定です。.env.localを確認してください。')
      console.log('送信データ:', formData)
      await new Promise((r) => setTimeout(r, 1000))
      setStatus('success')
      return
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: new URLSearchParams({
          ...formData,
          _subject: `【お問い合わせ】${formData.subject} / ${formData.name}様`,
        }),
        headers: {
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

  if (status === 'success') {
    const s = t.contact.success
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-6">✉️</div>
        <h3 className="font-serif text-2xl text-brown mb-3">{s.title}</h3>
        <p className="font-sans text-brown-600 mb-8">{s.desc}</p>
        <Link href={`/${lang}`} className="btn-primary">
          {s.backBtn}
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="form-label">{f.fields.name.label}</label>
          <input
            id="name" name="name" type="text"
            value={formData.name} onChange={handleChange}
            required placeholder={f.fields.name.placeholder}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">{f.fields.email.label}</label>
          <input
            id="email" name="email" type="email"
            value={formData.email} onChange={handleChange}
            required placeholder={f.fields.email.placeholder}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="form-label">{f.fields.subject.label}</label>
        <input
          id="subject" name="subject" type="text"
          value={formData.subject} onChange={handleChange}
          required placeholder={f.fields.subject.placeholder}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="message" className="form-label">{f.fields.message.label}</label>
        <textarea
          id="message" name="message" rows={6}
          value={formData.message} onChange={handleChange}
          required placeholder={f.fields.message.placeholder}
          className="form-input resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="font-sans text-sm text-red-600 bg-red-50 border border-red-200 rounded-sm px-4 py-3">
          {t.contact.error}
        </p>
      )}

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
