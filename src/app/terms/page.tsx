'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
          <p className="text-sm text-gray-400 mb-8">Effective date: March 28, 2026</p>

          <div className="prose prose-gray prose-sm max-w-none">
            <p>These Terms of Use (&quot;Terms&quot;) govern your access to and use of <strong>https://admittrack.app/</strong> (the &quot;Website&quot;), operated by <strong>Churilov Aleksandr Alekseevich</strong>, self-employed individual.</p>
            <p>By accessing or using the Website, you agree to these Terms.</p>

            <h2>1. Eligibility and Acceptance</h2>
            <p>By using the Website, you confirm that you are legally able to agree to these Terms under applicable law. If you use the Website on behalf of an organization, you represent that you have authority to bind that organization to these Terms.</p>

            <h2>2. Use of the Website</h2>
            <p>You may use the Website only in compliance with applicable laws and these Terms. You agree not to:</p>
            <ul>
              <li>use the Website for unlawful, fraudulent, deceptive, or misleading purposes;</li>
              <li>interfere with or disrupt the operation, availability, or security of the Website;</li>
              <li>attempt to gain unauthorized access to the Website, accounts, systems, servers, or databases;</li>
              <li>upload, transmit, or distribute malware, malicious code, spam, or harmful material;</li>
              <li>scrape, crawl, harvest, extract, copy, or monitor Website content or data by automated means without our prior written permission, except where such restriction is not allowed by law;</li>
              <li>infringe the intellectual property, privacy, or other rights of any person;</li>
              <li>use the Website in a way that could damage, disable, overburden, or impair our services or infrastructure.</li>
            </ul>

            <h2>3. Account Features</h2>
            <p>If the Website offers sign-in, authentication, or account-based features, you are responsible for:</p>
            <ul>
              <li>providing accurate information;</li>
              <li>maintaining the confidentiality of your login credentials;</li>
              <li>all activity that occurs under your account, to the extent permitted by law.</li>
            </ul>
            <p>We may suspend or disable access if we reasonably believe your account is being used unlawfully, insecurely, or in violation of these Terms.</p>

            <h2>4. Website Content</h2>
            <p>The Website and its content, including text, design, graphics, branding, interface elements, layout, logos, and other materials, are owned by or licensed to us and are protected by applicable intellectual property laws.</p>
            <p>Except as permitted by law or expressly authorized by us in writing, you may not reproduce, distribute, modify, publish, display, create derivative works from, or otherwise exploit any part of the Website.</p>

            <h2>5. User Submissions</h2>
            <p>If you send us messages, feedback, forms, applications, requests, or other content, you represent that:</p>
            <ul>
              <li>you have the right to provide that content;</li>
              <li>the content is accurate to the best of your knowledge;</li>
              <li>the content does not violate any law or third-party rights;</li>
              <li>the content does not contain malicious code or harmful material.</li>
            </ul>
            <p>To the extent necessary for us to operate the Website and respond to you, you grant us a non-exclusive, limited right to store, process, and use such submissions for those purposes.</p>

            <h2>6. Availability of the Website</h2>
            <p>We may change, update, suspend, or discontinue any part of the Website at any time, with or without notice. We do not guarantee that the Website will always be available, uninterrupted, timely, secure, or error-free.</p>

            <h2>7. No Professional, Admissions, or Legal Guarantee</h2>
            <p>Unless expressly stated otherwise, the Website is provided for general informational and service-related purposes only. Nothing on the Website constitutes legal advice, official admissions advice from a university, or a guarantee of any educational, application, or admissions outcome.</p>
            <p>You remain solely responsible for verifying deadlines, requirements, policies, and decisions with the relevant institutions or official sources.</p>

            <h2>8. Disclaimer of Warranties</h2>
            <p>To the maximum extent permitted by law, the Website is provided on an <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> basis, without warranties of any kind, whether express, implied, or statutory, including implied warranties of accuracy, availability, non-infringement, merchantability, or fitness for a particular purpose.</p>

            <h2>9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of data, revenue, profits, goodwill, or business opportunity, arising out of or related to your use of, or inability to use, the Website.</p>
            <p>Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.</p>

            <h2>10. Third-Party Services and Links</h2>
            <p>The Website may integrate with or contain links to third-party services, websites, or platforms, including infrastructure, database, authentication, hosting, or email providers. We are not responsible for the availability, content, privacy practices, or terms of any third-party services.</p>

            <h2>11. Suspension or Termination</h2>
            <p>We may suspend, restrict, or terminate your access to the Website at any time, with or without notice, if we reasonably believe that:</p>
            <ul>
              <li>you have violated these Terms;</li>
              <li>you are using the Website unlawfully or abusively;</li>
              <li>your use creates security, legal, or operational risk for us or others.</li>
            </ul>

            <h2>12. Indemnity</h2>
            <p>To the extent permitted by law, you agree to indemnify and hold harmless Churilov Aleksandr Alekseevich from claims, liabilities, damages, losses, and expenses arising from your violation of these Terms or your misuse of the Website.</p>

            <h2>13. Changes to the Terms</h2>
            <p>We may revise these Terms from time to time. The updated version will be posted on this page with a revised effective date. Your continued use of the Website after the effective date of updated Terms constitutes acceptance of the revised Terms, to the extent permitted by law.</p>

            <h2>14. Governing Law</h2>
            <p>These Terms are governed by the laws of <strong>Russia</strong>, unless mandatory law requires otherwise.</p>

            <h2>15. Contact</h2>
            <p>For questions regarding these Terms, contact:</p>
            <p><strong>Churilov Aleksandr Alekseevich</strong><br />Email: <a href="mailto:appbuilddesk@gmail.com"><strong>appbuilddesk@gmail.com</strong></a></p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          {' · '}
          <Link href="/support" className="hover:underline">Support</Link>
        </div>
      </div>
    </div>
  )
}
