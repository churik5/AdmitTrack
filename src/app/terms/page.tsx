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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use &mdash; AdmitTrack</h1>
          <p className="text-sm text-gray-400 mb-1">Effective date: March 28, 2026</p>
          <p className="text-sm text-gray-400 mb-8">Last updated: March 28, 2026</p>

          <div className="prose prose-gray prose-sm max-w-none">
            <p>These Terms of Use (&quot;Terms&quot;) govern your access to and use of AdmitTrack through the website, web application, and iOS application (collectively, the &quot;Service&quot;).</p>
            <p>By accessing or using the Service, you agree to these Terms.</p>

            <h2>1. About the Service</h2>
            <p>AdmitTrack is a platform for organizing admissions-related information, including user profiles, universities, deadlines, activities, honors, essays, documents, research records, notes, and checklists.</p>
            <p>Operator: Churilov Aleksandr Alekseevich<br />Contact email: <a href="mailto:aleksandrcurilov933@gmail.com">aleksandrcurilov933@gmail.com</a></p>

            <h2>2. Eligibility</h2>
            <p>You may use the Service only if:</p>
            <ul>
              <li>you are at least 13 years old;</li>
              <li>you are legally capable of entering into binding agreements under applicable law;</li>
              <li>you use the Service on your own behalf and do not impersonate another person.</li>
            </ul>

            <h2>3. Account</h2>
            <p>Some features of the Service require an account.</p>
            <p>You agree to:</p>
            <ul>
              <li>provide a valid email address;</li>
              <li>keep your login credentials secure;</li>
              <li>not share your account with others;</li>
              <li>notify us if you become aware of unauthorized access to your account.</li>
            </ul>
            <p>You are responsible for activity that occurs under your account.</p>

            <h2>4. User Content</h2>
            <p>You may create, upload, store, edit, and manage content in the Service, including text, notes, deadlines, descriptions, links, document metadata, and other materials.</p>
            <p>You retain ownership of your content.</p>
            <p>By using the Service, you grant us a limited right to host, store, process, transmit, and display your content solely as necessary to:</p>
            <ul>
              <li>operate the Service;</li>
              <li>synchronize data across devices and platforms;</li>
              <li>maintain technical functionality;</li>
              <li>protect security and integrity;</li>
              <li>provide support.</li>
            </ul>

            <h2>5. Prohibited Use</h2>
            <p>You may not:</p>
            <ul>
              <li>use the Service in violation of applicable law;</li>
              <li>upload malware, malicious code, or harmful material;</li>
              <li>attempt to gain unauthorized access to the Service, other accounts, databases, or infrastructure;</li>
              <li>interfere with or disrupt the operation of the Service;</li>
              <li>use the Service to store or distribute content you do not have the right to use;</li>
              <li>use the Service for fraud, spam, abuse, or circumvention of technical restrictions.</li>
            </ul>

            <h2>6. Availability and Changes</h2>
            <p>We aim to keep the Service available and functional, but we do not guarantee uninterrupted availability, error-free operation, or permanent access.</p>
            <p>We may:</p>
            <ul>
              <li>modify features;</li>
              <li>change the interface or data structure;</li>
              <li>suspend or limit access temporarily for maintenance, security, or technical reasons.</li>
            </ul>

            <h2>7. Account Deletion</h2>
            <p>You may delete your account from within the Service where that functionality is available.</p>
            <p>When you delete your account, your account and associated user data are deleted from the active systems of the Service without a waiting period, except where temporary retention may occur in logs, caches, or infrastructure systems until ordinary cleanup occurs, or where retention is required by law.</p>

            <h2>8. Intellectual Property</h2>
            <p>All rights in and to the Service, excluding user content, including its design, structure, code, interface logic, branding, and materials, belong to the operator of the Service or are used lawfully.</p>
            <p>These Terms do not transfer ownership of the Service to you. You receive only a limited right to use the Service in accordance with these Terms.</p>

            <h2>9. Disclaimer of Warranties</h2>
            <p>The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis.</p>
            <p>To the maximum extent permitted by law, we disclaim warranties of any kind, whether express or implied, including warranties regarding:</p>
            <ul>
              <li>uninterrupted availability;</li>
              <li>error-free operation;</li>
              <li>fitness for a particular purpose;</li>
              <li>absence of data loss;</li>
              <li>satisfaction of your expectations.</li>
            </ul>

            <h2>10. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, we are not liable for:</p>
            <ul>
              <li>indirect, incidental, special, consequential, or punitive damages;</li>
              <li>loss of profits;</li>
              <li>loss of data;</li>
              <li>loss of opportunities;</li>
              <li>interruption of business or educational planning;</li>
              <li>damages resulting from unauthorized access, technical failures, or third-party services.</li>
            </ul>
            <p>If liability cannot be excluded entirely under applicable law, it will be limited to the minimum extent permitted.</p>

            <h2>11. Third-Party Services</h2>
            <p>The Service may rely on third-party providers for infrastructure and technical functionality, including authentication, hosting, storage, database, and email delivery services.</p>
            <p>We are not responsible for the independent practices or failures of third-party services beyond our control.</p>

            <h2>12. Privacy</h2>
            <p>Your use of the Service is also governed by the <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>, which explains how personal information is collected, used, stored, and deleted.</p>

            <h2>13. Termination</h2>
            <p>We may suspend or terminate access to the Service if:</p>
            <ul>
              <li>you violate these Terms;</li>
              <li>we reasonably believe your use presents a security, legal, or operational risk;</li>
              <li>continued access is not technically or legally feasible.</li>
            </ul>
            <p>You may stop using the Service at any time and may delete your account if that functionality is available.</p>

            <h2>14. Governing Law</h2>
            <p>These Terms are governed by the laws applicable to the operator of the Service, unless mandatory law in your jurisdiction requires otherwise.</p>

            <h2>15. Changes to These Terms</h2>
            <p>We may update these Terms from time to time.</p>
            <p>If we make material changes, we may notify users through the Service, by email, or by updating the &quot;Last updated&quot; date above. Continued use of the Service after updated Terms become effective means the updated Terms apply.</p>

            <h2>16. Contact</h2>
            <p>If you have questions about these Terms, contact:</p>
            <p>Churilov Aleksandr Alekseevich<br />Email: <a href="mailto:aleksandrcurilov933@gmail.com">aleksandrcurilov933@gmail.com</a></p>
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
