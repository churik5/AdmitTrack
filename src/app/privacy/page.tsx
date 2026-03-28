'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export default function PrivacyPage() {
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
            {locale === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            {locale === 'ru' ? 'Последнее обновление: 28 марта 2026' : 'Last updated: March 28, 2026'}
          </p>

          {locale === 'ru' ? <ContentRu /> : <ContentEn />}
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link href="/terms" className="hover:underline">
            {locale === 'ru' ? 'Условия использования' : 'Terms of Service'}
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
      <h2>1. Information We Collect</h2>
      <p>When you use AdmitTrack, we collect the following types of information:</p>
      <ul>
        <li><strong>Account Information:</strong> Email address and encrypted password when you create an account.</li>
        <li><strong>Profile Data:</strong> Name, high school, city, state, graduation year, GPA, test scores, intended majors, and personal reflections you choose to provide.</li>
        <li><strong>Application Data:</strong> Universities, activities, honors, essays, research projects, deadlines, documents, notes, and checklist progress you enter into the platform.</li>
        <li><strong>Uploaded Files:</strong> Documents you upload (transcripts, certificates, etc.) are stored securely in our database.</li>
        <li><strong>Usage Data:</strong> Language preference and session information for authentication.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information solely to:</p>
      <ul>
        <li>Provide and maintain the AdmitTrack service</li>
        <li>Send deadline reminder emails (if you have deadlines set)</li>
        <li>Authenticate your identity and secure your account</li>
        <li>Improve the service based on usage patterns</li>
      </ul>

      <h2>3. Data Storage and Security</h2>
      <ul>
        <li>Your data is stored in <strong>Supabase</strong> (hosted on AWS) with Row Level Security (RLS) ensuring you can only access your own data.</li>
        <li>Passwords are hashed and never stored in plain text.</li>
        <li>All connections use HTTPS/TLS encryption.</li>
        <li>Uploaded files are stored as encrypted data in our database.</li>
      </ul>

      <h2>4. Data Sharing</h2>
      <p>We do <strong>not</strong> sell, rent, or share your personal information with third parties. Your data is shared only with:</p>
      <ul>
        <li><strong>Supabase:</strong> Our database and authentication provider.</li>
        <li><strong>Resend:</strong> Our email service provider (receives only your email address for sending deadline reminders).</li>
        <li><strong>Vercel:</strong> Our hosting provider.</li>
      </ul>

      <h2>5. Email Communications</h2>
      <p>We send automated deadline reminder emails when your application deadlines are approaching (7 days, 3 days, and 1 day before). These emails are sent to the email address in your profile.</p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access</strong> all your data through the application interface</li>
        <li><strong>Edit or update</strong> any of your information at any time</li>
        <li><strong>Delete your account</strong> permanently through Profile &gt; Danger Zone, which removes all your data from our servers</li>
        <li><strong>Export</strong> your data by accessing it through the application</li>
      </ul>

      <h2>7. Cookies</h2>
      <p>We use only essential cookies for authentication (session tokens). We do not use tracking cookies, analytics cookies, or advertising cookies.</p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>AdmitTrack is intended for high school students (typically ages 14-18) preparing for college applications. We do not knowingly collect data from children under 13. If you are under 13, please do not use this service.</p>

      <h2>9. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify users of significant changes via email or an in-app notice.</p>

      <h2>10. Contact</h2>
      <p>For any privacy-related questions, please contact us at <a href="mailto:support@admittrack.com">support@admittrack.com</a>.</p>
    </div>
  )
}

function ContentRu() {
  return (
    <div className="prose prose-gray prose-sm max-w-none">
      <h2>1. Какие данные мы собираем</h2>
      <p>При использовании AdmitTrack мы собираем следующую информацию:</p>
      <ul>
        <li><strong>Данные аккаунта:</strong> адрес электронной почты и зашифрованный пароль при создании аккаунта.</li>
        <li><strong>Данные профиля:</strong> имя, школа, город, регион, год выпуска, GPA, баллы тестов, предполагаемые специальности и личные размышления, которые вы решите указать.</li>
        <li><strong>Данные о поступлении:</strong> университеты, активности, награды, эссе, исследования, дедлайны, документы, заметки и прогресс по чек-листу.</li>
        <li><strong>Загруженные файлы:</strong> документы (транскрипты, сертификаты и т.д.) хранятся в зашифрованном виде в нашей базе данных.</li>
        <li><strong>Данные об использовании:</strong> языковые предпочтения и информация о сессии для аутентификации.</li>
      </ul>

      <h2>2. Как мы используем ваши данные</h2>
      <p>Мы используем вашу информацию исключительно для:</p>
      <ul>
        <li>Предоставления и поддержки сервиса AdmitTrack</li>
        <li>Отправки email-напоминаний о дедлайнах</li>
        <li>Аутентификации и защиты вашего аккаунта</li>
        <li>Улучшения сервиса на основе паттернов использования</li>
      </ul>

      <h2>3. Хранение и безопасность данных</h2>
      <ul>
        <li>Данные хранятся в <strong>Supabase</strong> (на серверах AWS) с политиками Row Level Security (RLS), гарантирующими доступ только к вашим данным.</li>
        <li>Пароли хешируются и никогда не хранятся в открытом виде.</li>
        <li>Все соединения используют шифрование HTTPS/TLS.</li>
        <li>Загруженные файлы хранятся в зашифрованном виде.</li>
      </ul>

      <h2>4. Передача данных третьим лицам</h2>
      <p>Мы <strong>не</strong> продаём, не сдаём в аренду и не передаём ваши персональные данные третьим лицам. Данные доступны только:</p>
      <ul>
        <li><strong>Supabase:</strong> наш провайдер базы данных и аутентификации.</li>
        <li><strong>Resend:</strong> сервис email-рассылки (получает только ваш email для отправки напоминаний).</li>
        <li><strong>Vercel:</strong> наш хостинг-провайдер.</li>
      </ul>

      <h2>5. Email-рассылка</h2>
      <p>Мы отправляем автоматические напоминания о дедлайнах за 7, 3 и 1 день до наступления срока. Письма отправляются на email, указанный в вашем профиле.</p>

      <h2>6. Ваши права</h2>
      <p>Вы имеете право:</p>
      <ul>
        <li><strong>Просматривать</strong> все свои данные через интерфейс приложения</li>
        <li><strong>Редактировать</strong> любую информацию в любое время</li>
        <li><strong>Удалить аккаунт</strong> навсегда через Профиль &gt; Опасная зона — это удалит все ваши данные с наших серверов</li>
        <li><strong>Экспортировать</strong> свои данные через интерфейс приложения</li>
      </ul>

      <h2>7. Файлы cookie</h2>
      <p>Мы используем только необходимые cookie для аутентификации (токены сессии). Мы не используем отслеживающие, аналитические или рекламные cookie.</p>

      <h2>8. Конфиденциальность несовершеннолетних</h2>
      <p>AdmitTrack предназначен для старшеклассников (обычно 14-18 лет), готовящихся к поступлению. Мы не собираем данные детей младше 13 лет. Если вам менее 13 лет, пожалуйста, не используйте этот сервис.</p>

      <h2>9. Изменения в политике</h2>
      <p>Мы можем обновлять данную Политику конфиденциальности. О существенных изменениях мы уведомим пользователей по email или через уведомление в приложении.</p>

      <h2>10. Контакты</h2>
      <p>По вопросам конфиденциальности обращайтесь на <a href="mailto:support@admittrack.com">support@admittrack.com</a>.</p>
    </div>
  )
}
