'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, MessageCircle, ChevronDown, ChevronRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const faqEn = [
  { q: 'How do I reset my password?', a: 'Currently, you can request a password reset through the login page. Click "Forgot password" and follow the instructions sent to your email.' },
  { q: 'Can I export my data?', a: 'You can access all your data through the application interface. We are working on a dedicated export feature for a future update.' },
  { q: 'How do deadline reminders work?', a: 'We automatically send email reminders 7 days, 3 days, and 1 day before each deadline you have set. Reminders are sent to the email address in your profile.' },
  { q: 'Is my data secure?', a: 'Yes. We use Supabase with Row Level Security, HTTPS encryption, and hashed passwords. Your data is only accessible to you.' },
  { q: 'How do I delete my account?', a: 'Go to Profile > scroll to the bottom > Danger Zone > Delete Account. This permanently removes all your data from our servers.' },
  { q: 'Can I use AdmitTrack on my phone?', a: 'Yes! The web version is fully responsive and works on mobile browsers. A dedicated iOS app is coming soon.' },
  { q: 'Is AdmitTrack free?', a: 'AdmitTrack is currently free to use during the beta period.' },
]

const faqRu = [
  { q: 'Как сбросить пароль?', a: 'Вы можете запросить сброс пароля на странице входа. Нажмите «Забыли пароль» и следуйте инструкциям, отправленным на вашу почту.' },
  { q: 'Можно ли экспортировать данные?', a: 'Вы можете получить доступ ко всем данным через интерфейс приложения. Мы работаем над функцией экспорта для будущего обновления.' },
  { q: 'Как работают напоминания о дедлайнах?', a: 'Мы автоматически отправляем email-напоминания за 7, 3 и 1 день до каждого установленного дедлайна. Напоминания отправляются на email из вашего профиля.' },
  { q: 'Мои данные в безопасности?', a: 'Да. Мы используем Supabase с Row Level Security, шифрование HTTPS и хешированные пароли. Ваши данные доступны только вам.' },
  { q: 'Как удалить аккаунт?', a: 'Перейдите в Профиль > прокрутите вниз > Опасная зона > Удалить аккаунт. Это безвозвратно удалит все ваши данные с наших серверов.' },
  { q: 'Можно ли использовать AdmitTrack на телефоне?', a: 'Да! Веб-версия полностью адаптивна и работает в мобильных браузерах. Отдельное iOS-приложение скоро появится.' },
  { q: 'AdmitTrack бесплатный?', a: 'Да, AdmitTrack бесплатен в период бета-тестирования.' },
]

export default function SupportPage() {
  const { locale } = useI18n()
  const faq = locale === 'ru' ? faqRu : faqEn
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          {locale === 'ru' ? 'Назад' : 'Back'}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {locale === 'ru' ? 'Поддержка' : 'Support'}
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            {locale === 'ru'
              ? 'Нужна помощь? Мы здесь, чтобы помочь.'
              : 'Need help? We\'re here for you.'}
          </p>

          {/* Contact */}
          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            <a
              href="mailto:support@admittrack.com"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50/30 transition-colors"
            >
              <div className="p-2 bg-brand-100 rounded-lg">
                <Mail size={20} className="text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Email</p>
                <p className="text-xs text-gray-500">support@admittrack.com</p>
              </div>
            </a>
            <a
              href="mailto:support@admittrack.com"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-brand-300 hover:bg-brand-50/30 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageCircle size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {locale === 'ru' ? 'Обратная связь' : 'Feedback'}
                </p>
                <p className="text-xs text-gray-500">
                  {locale === 'ru' ? 'Идеи и предложения' : 'Ideas & suggestions'}
                </p>
              </div>
            </a>
          </div>

          {/* FAQ */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {locale === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-2">
            {faq.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900 pr-4">{item.q}</span>
                  {openIndex === i ? (
                    <ChevronDown size={16} className="text-gray-400 shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400 shrink-0" />
                  )}
                </button>
                {openIndex === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link href="/privacy" className="hover:underline">
            {locale === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
          </Link>
          {' · '}
          <Link href="/terms" className="hover:underline">
            {locale === 'ru' ? 'Условия использования' : 'Terms of Service'}
          </Link>
        </div>
      </div>
    </div>
  )
}
