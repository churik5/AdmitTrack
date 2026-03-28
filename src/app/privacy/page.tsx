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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy &mdash; AdmitTrack</h1>
          <p className="text-sm text-gray-400 mb-1">Effective date: March 28, 2026</p>
          <p className="text-sm text-gray-400 mb-8">Last updated: March 28, 2026</p>

          <div className="prose prose-gray prose-sm max-w-none">
            <p>This Privacy Policy explains how AdmitTrack (&quot;AdmitTrack,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, stores, discloses, and deletes personal information when you use the AdmitTrack website, web application, and iOS application (collectively, the &quot;Service&quot;).</p>
            <p>By using the Service, you acknowledge that your information will be handled as described in this Privacy Policy.</p>

            <h2>1. Who operates the Service</h2>
            <p>Service name: AdmitTrack<br />Operator: Churilov Aleksandr Alekseevich<br />Contact email: <a href="mailto:appbuilddesk@gmail.com">appbuilddesk@gmail.com</a></p>

            <h2>2. Scope of this Privacy Policy</h2>
            <p>This Privacy Policy applies to information processed through:</p>
            <ul>
              <li>the AdmitTrack website;</li>
              <li>the AdmitTrack web application;</li>
              <li>the AdmitTrack iOS application;</li>
              <li>related support and account management communications.</li>
            </ul>
            <p>This Privacy Policy does not apply to third-party websites, services, or applications that may be linked from the Service and that are governed by their own privacy policies.</p>

            <h2>3. Information we collect</h2>
            <p>We collect information you provide directly, information generated when you use the Service, and certain technical data required to operate accounts, sessions, synchronization, and reminders.</p>

            <h3>3.1 Account and authentication data</h3>
            <p>When you create or use an account, we may process:</p>
            <ul>
              <li>email address;</li>
              <li>hashed password;</li>
              <li>internal user identifier (such as UUID);</li>
              <li>registration date;</li>
              <li>last sign-in date or session-related timestamps;</li>
              <li>email confirmation and password reset status.</li>
            </ul>

            <h3>3.2 Profile and academic planning data</h3>
            <p>You may choose to store profile and admissions-related information, including:</p>
            <ul>
              <li>name;</li>
              <li>school;</li>
              <li>city;</li>
              <li>state or region;</li>
              <li>graduation year;</li>
              <li>GPA and weighted GPA;</li>
              <li>class rank;</li>
              <li>intended majors;</li>
              <li>test information, including SAT, ACT, and AP-related information;</li>
              <li>strengths, weaknesses, and personal notes.</li>
            </ul>

            <h3>3.3 Universities and application planning data</h3>
            <p>You may store information about universities and applications, including:</p>
            <ul>
              <li>university name;</li>
              <li>state or location;</li>
              <li>website;</li>
              <li>application type, such as EA, ED, or RD;</li>
              <li>application status;</li>
              <li>requirements;</li>
              <li>tags and organizational labels.</li>
            </ul>

            <h3>3.4 Activities, honors, research, and related records</h3>
            <p>You may store information such as:</p>
            <ul>
              <li>activities and extracurricular records;</li>
              <li>role and organization;</li>
              <li>hours and weeks;</li>
              <li>descriptions and outcomes;</li>
              <li>links;</li>
              <li>honors and awards;</li>
              <li>award level, including school, regional, national, or international;</li>
              <li>research-related information, including type, status, description, contribution, and publication information.</li>
            </ul>

            <h3>3.5 Essays, notes, deadlines, and checklists</h3>
            <p>You may store:</p>
            <ul>
              <li>essay text;</li>
              <li>essay version history;</li>
              <li>essay type;</li>
              <li>prompts;</li>
              <li>word limits;</li>
              <li>notes and categories;</li>
              <li>relationships between notes and other records;</li>
              <li>deadlines, including date, time, university, type, priority, and status;</li>
              <li>checklist completion status.</li>
            </ul>

            <h3>3.6 Documents and files</h3>
            <p>The Service may process document-related information, including:</p>
            <ul>
              <li>document metadata;</li>
              <li>document category, such as transcript, certificate, award, recommendation, essay, r&eacute;sum&eacute;, project, research, test result, financial document, or other category;</li>
              <li>file-related technical information when document upload is enabled in the version of the Service you use;</li>
              <li>file contents where upload functionality is available.</li>
            </ul>
            <p>At present, some versions of the Service may support document metadata management before full user-facing file upload is enabled.</p>

            <h3>3.7 Technical, device, browser, and usage data</h3>
            <p>We may process technical information necessary to operate, secure, and improve the Service, such as:</p>
            <ul>
              <li>IP address;</li>
              <li>browser type;</li>
              <li>device type;</li>
              <li>operating system;</li>
              <li>app or web session events;</li>
              <li>timestamps;</li>
              <li>error and diagnostic events;</li>
              <li>account and security logs.</li>
            </ul>

            <h3>3.8 Local storage, cache, and session data</h3>
            <p>The web version of the Service may use:</p>
            <ul>
              <li>browser local storage for cached or offline copies of user data and interface preferences;</li>
              <li>language preference storage;</li>
              <li>authentication or session-related cookies and similar technologies required for account access and session continuity.</li>
            </ul>

            <h3>3.9 Communications</h3>
            <p>If you contact us or if the Service sends operational emails, we may process:</p>
            <ul>
              <li>your email address;</li>
              <li>the content of your message;</li>
              <li>verification emails;</li>
              <li>password reset emails;</li>
              <li>reminder emails related to admissions planning and deadlines.</li>
            </ul>

            <h2>4. How we use information</h2>
            <p>We use information for the following purposes:</p>
            <ul>
              <li>to create and manage user accounts;</li>
              <li>to authenticate users and maintain secure sessions;</li>
              <li>to verify email addresses;</li>
              <li>to provide the core functionality of the Service;</li>
              <li>to store, synchronize, display, organize, and update user content across supported versions of the Service;</li>
              <li>to provide reminders and account-related notifications;</li>
              <li>to maintain language and interface preferences;</li>
              <li>to protect the Service against abuse, unauthorized access, fraud, misuse, and technical failures;</li>
              <li>to troubleshoot bugs, monitor performance, and maintain reliability;</li>
              <li>to respond to support requests and user communications;</li>
              <li>to comply with legal obligations;</li>
              <li>to enforce our Terms of Use and other applicable policies.</li>
            </ul>

            <h2>5. Legal bases for processing</h2>
            <p>Where applicable under relevant law, we process personal information on one or more of the following bases:</p>
            <ul>
              <li>performance of a contract with you, including providing the Service and account functionality;</li>
              <li>your consent, where consent is required;</li>
              <li>our legitimate interests in operating, securing, and improving the Service;</li>
              <li>compliance with legal obligations.</li>
            </ul>

            <h2>6. How information is shared</h2>
            <p>We do not sell personal information.</p>
            <p>We may share information only in the following circumstances:</p>

            <h3>6.1 Service providers and infrastructure providers</h3>
            <p>We may use third-party providers to operate the Service, including providers for authentication, database hosting, web hosting, storage, email delivery, and technical infrastructure.</p>
            <p>Based on the current setup, this may include Supabase for authentication and database functions and Vercel for web hosting or deployment, if used.</p>

            <h3>6.2 Legal compliance and protection</h3>
            <p>We may disclose information if we believe disclosure is necessary to:</p>
            <ul>
              <li>comply with applicable law, regulation, court order, or lawful request;</li>
              <li>protect the rights, property, or safety of users, the Service, or others;</li>
              <li>investigate abuse, security incidents, or fraud.</li>
            </ul>

            <h3>6.3 Business transfers</h3>
            <p>If the Service is involved in a merger, acquisition, reorganization, asset sale, or similar transaction, user information may be transferred as part of that transaction, subject to applicable law.</p>

            <h2>7. Cookies, local storage, and similar technologies</h2>
            <p>The Service may use cookies, local storage, and similar browser technologies to:</p>
            <ul>
              <li>keep users signed in;</li>
              <li>preserve session state;</li>
              <li>support authentication flows;</li>
              <li>remember preferences, such as selected language;</li>
              <li>support caching and offline-related behavior where implemented;</li>
              <li>improve reliability and basic functionality.</li>
            </ul>
            <p>You may be able to manage cookies and local storage through your browser settings, but disabling them may affect the functionality of the Service.</p>

            <h2>8. Data retention</h2>
            <p>We retain personal information for as long as necessary to provide the Service, maintain your account, fulfill the purposes described in this Privacy Policy, and comply with applicable legal obligations.</p>
            <p>If you keep an active account, we generally retain your account data and stored content until you delete it or request deletion.</p>

            <h2>9. Account deletion and data deletion</h2>
            <p>You may request deletion of your account from within the Service where that functionality is provided.</p>
            <p>When you delete your account, we delete your account and associated user data from the active systems of the Service without a waiting period, except where temporary retention may occur for technical reasons in logs, caches, or backups maintained by infrastructure providers, or where retention is required by law.</p>
            <p>This means:</p>
            <ul>
              <li>your account should no longer remain active after deletion;</li>
              <li>your user-generated content associated with the deleted account is intended to be removed from active Service systems;</li>
              <li>limited technical remnants may persist temporarily in infrastructure logs, caches, or backup systems until overwritten or deleted in the ordinary course of operations.</li>
            </ul>

            <h2>10. Data security</h2>
            <p>We use reasonable administrative, technical, and organizational measures intended to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure.</p>
            <p>However, no method of transmission over the internet and no method of electronic storage is completely secure. We therefore cannot guarantee absolute security.</p>
            <p>You are responsible for maintaining the confidentiality of your login credentials and for notifying us if you believe your account has been compromised.</p>

            <h2>11. International data processing</h2>
            <p>Depending on the infrastructure used to operate the Service, your information may be processed in countries other than your own. By using the Service, you understand that data may be processed by infrastructure providers in multiple jurisdictions, subject to applicable safeguards and legal requirements.</p>

            <h2>12. Children&apos;s privacy</h2>
            <p>The Service is not intended for children under the age of 13.</p>
            <p>We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without appropriate authorization where required, we will take steps to delete that information.</p>

            <h2>13. Your rights and choices</h2>
            <p>Depending on your location and applicable law, you may have the right to:</p>
            <ul>
              <li>access personal information we hold about you;</li>
              <li>request correction of inaccurate information;</li>
              <li>request deletion of your information;</li>
              <li>object to or restrict certain processing;</li>
              <li>request a copy of certain information;</li>
              <li>withdraw consent where processing is based on consent.</li>
            </ul>
            <p>To exercise privacy-related requests, contact: <a href="mailto:appbuilddesk@gmail.com">appbuilddesk@gmail.com</a></p>
            <p>We may need to verify your identity before fulfilling certain requests.</p>

            <h2>14. Third-party links and content</h2>
            <p>The Service may contain links to third-party websites, including university websites and external resources. We are not responsible for the privacy practices of third-party services. You should review their own privacy policies before providing information to them.</p>

            <h2>15. Changes to this Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time.</p>
            <p>If we make material changes, we may notify users through the Service, by email, or by updating the &quot;Last updated&quot; date above. Your continued use of the Service after the updated Privacy Policy becomes effective means the updated Privacy Policy will apply to your use of the Service.</p>

            <h2>16. Contact</h2>
            <p>If you have questions about this Privacy Policy or our privacy practices, contact:</p>
            <p>Churilov Aleksandr Alekseevich<br />Email: <a href="mailto:appbuilddesk@gmail.com">appbuilddesk@gmail.com</a></p>
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
