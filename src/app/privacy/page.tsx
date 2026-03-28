'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Effective date: March 28, 2026</p>

          <div className="prose prose-gray prose-sm max-w-none">
            <p>AdmitTrack (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website <strong>https://admittrack.app/</strong> (the &quot;Website&quot;).</p>
            <p>This Privacy Policy explains how we collect, use, disclose, and protect personal data when you use the Website.</p>

            <h2>1. Data Controller</h2>
            <p><strong>Churilov Aleksandr Alekseevich</strong><br />Self-employed individual<br />Email: <a href="mailto:appbuilddesk@gmail.com"><strong>appbuilddesk@gmail.com</strong></a><br />Website: <strong>https://admittrack.app/</strong></p>

            <h2>2. Personal Data We Collect</h2>
            <p>We may collect the following categories of personal data:</p>
            <ul>
              <li><strong>Contact data</strong> &mdash; such as your name and email address, if you submit them through a form, sign up, or contact us directly.</li>
              <li><strong>Account and authentication data</strong> &mdash; if account features are available, we may process login, session, verification, and related account data.</li>
              <li><strong>Communications data</strong> &mdash; messages, requests, feedback, support inquiries, and other content you send to us.</li>
              <li><strong>Usage and technical data</strong> &mdash; such as IP address, browser type, device information, operating system, pages visited, timestamps, referring URLs, and similar log data.</li>
              <li><strong>Email delivery data</strong> &mdash; such as delivery status, open or bounce-related technical metadata, where applicable for transactional emails.</li>
              <li><strong>Cookie and similar technology data</strong> &mdash; where applicable.</li>
            </ul>

            <h2>3. How We Collect Data</h2>
            <p>We collect personal data:</p>
            <ul>
              <li>directly from you, when you submit forms, contact us, or use Website features;</li>
              <li>automatically, through server logs, cookies, and similar technologies;</li>
              <li>from service providers that support authentication, hosting, infrastructure, database, and email delivery.</li>
            </ul>

            <h2>4. How We Use Personal Data</h2>
            <p>We may use personal data to:</p>
            <ul>
              <li>provide, operate, and maintain the Website;</li>
              <li>create and manage user access or account-related functionality, if available;</li>
              <li>respond to inquiries, requests, or support messages;</li>
              <li>send service-related and transactional emails;</li>
              <li>monitor usage, performance, security, and reliability;</li>
              <li>detect, prevent, and address abuse, fraud, unauthorized access, and other misuse;</li>
              <li>improve the Website and related services;</li>
              <li>comply with legal obligations;</li>
              <li>establish, exercise, or defend legal claims.</li>
            </ul>

            <h2>5. Legal Bases for Processing</h2>
            <p>Where applicable data protection laws require a legal basis, we process personal data on one or more of the following bases:</p>
            <ul>
              <li><strong>Consent</strong> &mdash; where you have given consent for a specific purpose;</li>
              <li><strong>Performance of a contract</strong> or steps at your request before entering into one;</li>
              <li><strong>Legitimate interests</strong> &mdash; including operating, securing, improving, and administering the Website and communications;</li>
              <li><strong>Compliance with legal obligations</strong>.</li>
            </ul>

            <h2>6. Cookies and Similar Technologies</h2>
            <p>We may use cookies and similar technologies to:</p>
            <ul>
              <li>keep the Website functioning properly;</li>
              <li>maintain security and session integrity;</li>
              <li>remember preferences;</li>
              <li>improve performance and user experience;</li>
              <li>support essential infrastructure and technical operations.</li>
            </ul>
            <p>Where required by applicable law, we will request consent before using cookies or similar technologies that are not strictly necessary. You can manage cookies through your browser settings and, where available, through our cookie banner or preferences tool.</p>

            <h2>7. Service Providers and Data Sharing</h2>
            <p>We may share personal data with trusted third-party service providers that help us operate the Website and related services, including:</p>
            <ul>
              <li><strong>Vercel</strong> &mdash; for website hosting, infrastructure, deployment, and related platform services;</li>
              <li><strong>Supabase</strong> &mdash; for database, backend, authentication, storage, and related cloud functionality;</li>
              <li><strong>Resend</strong> &mdash; for transactional email delivery and related email infrastructure.</li>
            </ul>
            <p>These providers may process personal data on our behalf in connection with hosting, infrastructure, storage, authentication, communications, and technical operations. We do not sell your personal data. Vercel publishes a Data Processing Addendum stating it processes personal data as necessary to provide services and does not sell customer data; Supabase and Resend also publish DPA/privacy materials for their services.</p>
            <p>We may also disclose personal data:</p>
            <ul>
              <li>if required by law, regulation, court order, or lawful request by public authorities;</li>
              <li>to protect our rights, property, safety, or the rights, property, or safety of others;</li>
              <li>in connection with a business transfer, restructuring, or similar transaction, if applicable.</li>
            </ul>

            <h2>8. International Data Transfers</h2>
            <p>Your personal data may be processed in countries other than your own because our service providers may operate internationally. Where required, we take reasonable steps to ensure appropriate safeguards are in place for such transfers. Supabase, Vercel, and Resend each publish legal/privacy materials addressing processing and data protection obligations.</p>

            <h2>9. Data Retention</h2>
            <p>We retain personal data only for as long as necessary for the purposes described in this Privacy Policy, including to:</p>
            <ul>
              <li>provide the Website and related services;</li>
              <li>respond to requests and maintain communications;</li>
              <li>comply with legal, accounting, tax, or regulatory obligations;</li>
              <li>resolve disputes and enforce agreements.</li>
            </ul>
            <p>If we do not have a fixed retention period for certain data, we determine retention based on the nature of the data, the purpose of processing, legal requirements, and operational necessity.</p>

            <h2>10. Data Security</h2>
            <p>We implement reasonable technical and organizational measures designed to protect personal data against unauthorized access, disclosure, alteration, loss, or destruction. However, no method of internet transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

            <h2>11. Your Rights</h2>
            <p>Depending on your location and the law that applies to you, you may have the right to:</p>
            <ul>
              <li>request access to your personal data;</li>
              <li>request correction of inaccurate or incomplete data;</li>
              <li>request deletion of your personal data;</li>
              <li>request restriction of processing;</li>
              <li>object to certain processing;</li>
              <li>withdraw consent at any time where processing is based on consent;</li>
              <li>request data portability where applicable;</li>
              <li>lodge a complaint with a competent data protection authority.</li>
            </ul>
            <p>To exercise your rights, contact us at <a href="mailto:appbuilddesk@gmail.com"><strong>appbuilddesk@gmail.com</strong></a>.</p>

            <h2>12. Third-Party Links</h2>
            <p>The Website may contain links to third-party websites or services. We are not responsible for their content, privacy practices, or terms. Your use of third-party sites is governed by their own policies and terms.</p>

            <h2>13. Children&apos;s Privacy</h2>
            <p>The Website is not directed to children where such collection is prohibited by applicable law. We do not knowingly collect personal data from children in violation of applicable law. If you believe a child has provided us with personal data unlawfully, contact us and we will review the request.</p>

            <h2>14. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date. Your continued use of the Website after changes become effective means you accept the updated Privacy Policy, to the extent permitted by law.</p>

            <h2>15. Contact</h2>
            <p>For privacy-related questions or requests, contact:</p>
            <p><strong>Churilov Aleksandr Alekseevich</strong><br />Email: <a href="mailto:appbuilddesk@gmail.com"><strong>appbuilddesk@gmail.com</strong></a></p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link href="/terms" className="hover:underline">Terms of Use</Link>
          {' · '}
          <Link href="/support" className="hover:underline">Support</Link>
        </div>
      </div>
    </div>
  )
}
