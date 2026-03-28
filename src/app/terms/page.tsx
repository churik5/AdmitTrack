'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export default function TermsPage() {
  const { locale } = useI18n()

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
            {locale === 'ru' ? 'Условия использования' : 'Terms of Service'}
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            {locale === 'ru' ? 'Последнее обновление: 28 марта 2026' : 'Last updated: March 28, 2026'}
          </p>

          {locale === 'ru' ? <ContentRu /> : <ContentEn />}
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link href="/privacy" className="hover:underline">
            {locale === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
          </Link>
          {' · '}
          <Link href="/support" className="hover:underline">
            {locale === 'ru' ? 'Поддержка' : 'Support'}
          </Link>
        </div>
      </div>
    </div>
  )
}

function ContentEn() {
  return (
    <div className="prose prose-gray prose-sm max-w-none">
      <h2>1. Acceptance of Terms</h2>
      <p>By creating an account or using AdmitTrack, you agree to these Terms of Service. If you do not agree, please do not use the service.</p>

      <h2>2. Description of Service</h2>
      <p>AdmitTrack is a college admissions planning tool that helps students organize their application materials, track deadlines, manage essays, and prepare for the admissions process. The service is provided &quot;as is&quot; for personal, non-commercial use.</p>

      <h2>3. User Accounts</h2>
      <ul>
        <li>You must provide a valid email address to create an account.</li>
        <li>You are responsible for maintaining the security of your password.</li>
        <li>You are responsible for all activity that occurs under your account.</li>
        <li>You must notify us immediately of any unauthorized use of your account.</li>
      </ul>

      <h2>4. User Content</h2>
      <ul>
        <li>You retain ownership of all content you create or upload to AdmitTrack (essays, documents, notes, etc.).</li>
        <li>You grant us a limited license to store and display your content solely for the purpose of providing the service to you.</li>
        <li>You are responsible for ensuring your content does not violate any laws or third-party rights.</li>
      </ul>

      <h2>5. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the service for any illegal purpose</li>
        <li>Share your account credentials with others</li>
        <li>Attempt to access other users&apos; data</li>
        <li>Upload malicious files or content</li>
        <li>Reverse engineer or attempt to extract the source code</li>
        <li>Use automated systems to access the service (bots, scrapers, etc.)</li>
      </ul>

      <h2>6. Disclaimer of Warranties</h2>
      <p>AdmitTrack is provided &quot;as is&quot; without warranties of any kind. We do not guarantee:</p>
      <ul>
        <li>That the service will be uninterrupted or error-free</li>
        <li>The accuracy or completeness of any admissions guidance or information</li>
        <li>Any specific outcome in your college admissions process</li>
        <li>That deadline reminders will be delivered on time</li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, AdmitTrack shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service, including but not limited to missed deadlines, lost data, or rejected applications.</p>

      <h2>8. Account Termination</h2>
      <ul>
        <li>You may delete your account at any time through Profile &gt; Danger Zone.</li>
        <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
        <li>Upon deletion, all your data will be permanently removed from our servers.</li>
      </ul>

      <h2>9. Changes to Terms</h2>
      <p>We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.</p>

      <h2>10. Governing Law</h2>
      <p>These terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of the applicable jurisdiction.</p>

      <h2>11. Contact</h2>
      <p>For questions about these terms, contact us at <a href="mailto:support@admittrack.com">support@admittrack.com</a>.</p>
    </div>
  )
}

function ContentRu() {
  return (
    <div className="prose prose-gray prose-sm max-w-none">
      <h2>1. Принятие условий</h2>
      <p>Создавая аккаунт или используя AdmitTrack, вы соглашаетесь с данными Условиями использования. Если вы не согласны, пожалуйста, не используйте сервис.</p>

      <h2>2. Описание сервиса</h2>
      <p>AdmitTrack — инструмент для планирования поступления в университеты, помогающий студентам организовать материалы для заявок, отслеживать дедлайны, управлять эссе и готовиться к процессу поступления. Сервис предоставляется «как есть» для личного, некоммерческого использования.</p>

      <h2>3. Учётные записи</h2>
      <ul>
        <li>Для создания аккаунта необходимо указать действующий адрес электронной почты.</li>
        <li>Вы несёте ответственность за безопасность своего пароля.</li>
        <li>Вы несёте ответственность за все действия, совершённые под вашей учётной записью.</li>
        <li>Вы обязаны немедленно уведомить нас о любом несанкционированном использовании аккаунта.</li>
      </ul>

      <h2>4. Пользовательский контент</h2>
      <ul>
        <li>Вы сохраняете право собственности на весь контент, который создаёте или загружаете в AdmitTrack (эссе, документы, заметки и т.д.).</li>
        <li>Вы предоставляете нам ограниченную лицензию на хранение и отображение вашего контента исключительно для предоставления сервиса.</li>
        <li>Вы несёте ответственность за то, чтобы ваш контент не нарушал законы или права третьих лиц.</li>
      </ul>

      <h2>5. Допустимое использование</h2>
      <p>Вы обязуетесь не:</p>
      <ul>
        <li>Использовать сервис в незаконных целях</li>
        <li>Передавать свои данные для входа другим лицам</li>
        <li>Пытаться получить доступ к данным других пользователей</li>
        <li>Загружать вредоносные файлы или контент</li>
        <li>Осуществлять обратную разработку или извлекать исходный код</li>
        <li>Использовать автоматизированные системы для доступа к сервису (боты, парсеры и т.д.)</li>
      </ul>

      <h2>6. Отказ от гарантий</h2>
      <p>AdmitTrack предоставляется «как есть» без каких-либо гарантий. Мы не гарантируем:</p>
      <ul>
        <li>Бесперебойную или безошибочную работу сервиса</li>
        <li>Точность или полноту рекомендаций по поступлению</li>
        <li>Конкретный результат в процессе поступления</li>
        <li>Своевременную доставку напоминаний о дедлайнах</li>
      </ul>

      <h2>7. Ограничение ответственности</h2>
      <p>В максимальной степени, допускаемой законом, AdmitTrack не несёт ответственности за любой косвенный, случайный, специальный или последующий ущерб, возникший в результате использования сервиса, включая, но не ограничиваясь, пропущенные дедлайны, потерю данных или отказ в приёме.</p>

      <h2>8. Удаление аккаунта</h2>
      <ul>
        <li>Вы можете удалить свой аккаунт в любое время через Профиль &gt; Опасная зона.</li>
        <li>Мы оставляем за собой право приостановить или удалить аккаунты, нарушающие данные условия.</li>
        <li>При удалении все ваши данные будут безвозвратно удалены с наших серверов.</li>
      </ul>

      <h2>9. Изменение условий</h2>
      <p>Мы можем изменить данные условия в любое время. Продолжение использования сервиса после изменений означает принятие новых условий. О существенных изменениях мы уведомим по email.</p>

      <h2>10. Применимое право</h2>
      <p>Данные условия регулируются законодательством Соединённых Штатов Америки. Споры разрешаются в судах соответствующей юрисдикции.</p>

      <h2>11. Контакты</h2>
      <p>По вопросам об условиях обращайтесь на <a href="mailto:support@admittrack.com">support@admittrack.com</a>.</p>
    </div>
  )
}
