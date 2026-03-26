'use client'

import { useState, useMemo } from 'react'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Layers,
  PenLine,
  Award,
  FolderOpen,
  FileEdit,
  Heart,
  CalendarClock,
  ListChecks,
  FlaskConical,
  Rocket,
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import SearchInput from '@/components/ui/SearchInput'
import { cn } from '@/lib/utils'

interface Guide {
  id: string
  title: string
  icon: React.ReactNode
  content: React.ReactNode
  searchText: string
}

const guides: Guide[] = [
  {
    id: 'activity-vs-honor',
    title: 'Activity vs Honor: What\'s the Difference?',
    icon: <Layers size={20} className="text-blue-600" />,
    searchText: 'activity honor difference award club sport job project volunteering recognition prize scholarship',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          This is one of the most common points of confusion on college applications. The distinction is simple once you understand it, but getting it wrong can weaken your application.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Activity = Something You DO</h4>
            <p className="text-sm text-blue-800 mb-3">
              An activity is any sustained commitment where you actively participate, contribute, or lead. It involves your time, effort, and initiative on a regular basis.
            </p>
            <ul className="text-sm text-blue-800 space-y-1.5">
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">-</span> Varsity soccer (3 seasons)</li>
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">-</span> Math tutoring at community center</li>
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">-</span> Part-time job at a restaurant</li>
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">-</span> Founded a coding club</li>
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">-</span> Research assistant in a university lab</li>
              <li className="flex gap-2"><span className="text-blue-400 shrink-0">-</span> Student newspaper editor</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-2">Honor = Something You RECEIVE</h4>
            <p className="text-sm text-amber-800 mb-3">
              An honor is recognition given to you by someone else based on achievement, merit, or selection. You did not choose it; it was bestowed upon you.
            </p>
            <ul className="text-sm text-amber-800 space-y-1.5">
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">-</span> AP Scholar with Distinction</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">-</span> National Merit Semifinalist</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">-</span> First place at state science fair</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">-</span> Honor roll every semester</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">-</span> Eagle Scout</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0">-</span> School-nominated community service award</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Edge Cases and Common Mistakes</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2">
              <span className="text-gray-400 shrink-0">-</span>
              <span><strong>NHS membership:</strong> Being inducted into National Honor Society is an honor (you were selected). Serving as NHS president or organizing NHS events is an activity.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 shrink-0">-</span>
              <span><strong>Team captain:</strong> Playing on the team is an activity. Being named captain is an honor. List the sport as an activity and mention the captaincy in the description. List "Team Captain" separately only if your school formally recognizes it as an award.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 shrink-0">-</span>
              <span><strong>Competition participation vs. winning:</strong> Competing in Science Olympiad all year is an activity. Winning a medal at regionals is an honor. Do not list the same thing in both sections unless the participation and the award are truly distinct.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400 shrink-0">-</span>
              <span><strong>Scholarships:</strong> Receiving a scholarship is an honor. Working toward earning one (e.g., maintaining a GPA) is not a separate activity.</span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-500 italic">
          Rule of thumb: If you can say "I was chosen for..." or "I was awarded...", it is an honor. If you can say "I spent time doing...", it is an activity.
        </p>
      </div>
    ),
  },
  {
    id: 'writing-descriptions',
    title: 'Writing Activity Descriptions (150 Characters)',
    icon: <PenLine size={20} className="text-violet-600" />,
    searchText: 'writing activity description 150 characters common app short concise impact verbs numbers',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          The Common App gives you exactly 150 characters to describe each activity. That is roughly one long sentence. Every word must earn its place. Here is how to make those characters count.
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Core Principles</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2">
              <span className="font-semibold text-violet-600 shrink-0">1.</span>
              <span><strong>Lead with your role and impact.</strong> Admissions officers skim. Put the most important information first. "President" or "Lead developer" immediately signals your level of involvement.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-violet-600 shrink-0">2.</span>
              <span><strong>Use active, specific verbs.</strong> Replace "was responsible for" with "managed," "designed," "launched," or "trained." Active verbs convey agency and initiative.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-violet-600 shrink-0">3.</span>
              <span><strong>Include numbers wherever possible.</strong> Numbers are the fastest way to convey scale. "Organized 12 events" is stronger than "organized many events." "Raised $4,200" is concrete and memorable.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-violet-600 shrink-0">4.</span>
              <span><strong>Cut filler words ruthlessly.</strong> Remove "I," "the," "various," "different," "helped to," and "was involved in." These waste precious characters without adding meaning.</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Weak vs. Strong Examples</h4>
          <div className="space-y-3">
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <p className="text-xs font-medium text-red-500 mb-1">WEAK (vague, passive)</p>
              <p className="text-sm text-red-800">"I was a member of the debate team and participated in various tournaments throughout the year and helped organize events."</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <p className="text-xs font-medium text-green-600 mb-1">STRONG (specific, active)</p>
              <p className="text-sm text-green-800">"Captain; led 14-member team to state finals. Organized 6 invitational tournaments hosting 200+ competitors from 30 schools."</p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <p className="text-xs font-medium text-red-500 mb-1">WEAK</p>
              <p className="text-sm text-red-800">"I volunteer at a local hospital helping patients and nurses with different things that they need on a weekly basis."</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <p className="text-xs font-medium text-green-600 mb-1">STRONG</p>
              <p className="text-sm text-green-800">"Assist ER nurses with patient intake and supply restocking 8 hrs/wk. Trained 5 new volunteers on hospital protocols."</p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <p className="text-xs font-medium text-red-500 mb-1">WEAK</p>
              <p className="text-sm text-red-800">"I started a tutoring program at my school to help other students with their homework and studying."</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <p className="text-xs font-medium text-green-600 mb-1">STRONG</p>
              <p className="text-sm text-green-800">"Founded peer tutoring program; recruited 20 tutors serving 75+ students weekly. Average tutee GPA rose 0.4 points."</p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <p className="text-xs font-medium text-red-500 mb-1">WEAK</p>
              <p className="text-sm text-red-800">"I work at a coffee shop after school and on weekends doing various tasks like making drinks and serving customers."</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <p className="text-xs font-medium text-green-600 mb-1">STRONG</p>
              <p className="text-sm text-green-800">"Shift lead at local cafe, 15 hrs/wk. Manage 3-person team, handle inventory orders, train new hires. Promoted after 4 months."</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 italic">
          Tip: Write your description, then count characters. If you are over 150, cut adjectives and adverbs first. They are almost always the weakest words in the sentence.
        </p>
      </div>
    ),
  },
  {
    id: 'honor-levels',
    title: 'How to Evaluate Honor Levels',
    icon: <Award size={20} className="text-amber-600" />,
    searchText: 'honor level school regional state national international award recognition evaluate',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          The Common App asks you to assign a level to each honor: School, State/Regional, National, or International. Getting this right matters because admissions officers know the difference. Inflating a school-level award to national level will hurt your credibility.
        </p>

        <div className="space-y-3">
          <div className="flex gap-3 items-start bg-gray-50 rounded-lg p-3 border border-gray-200">
            <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded shrink-0">SCHOOL</span>
            <div>
              <p className="text-sm text-gray-700 font-medium">Recognized within your school only</p>
              <p className="text-sm text-gray-500 mt-1">Honor roll, class rank, departmental awards, school MVP, "Student of the Month," valedictorian, school-specific scholarship, school science fair winner.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-blue-50 rounded-lg p-3 border border-blue-100">
            <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded shrink-0">REGIONAL</span>
            <div>
              <p className="text-sm text-blue-800 font-medium">District, county, or multi-school recognition</p>
              <p className="text-sm text-blue-600 mt-1">All-county team, regional science fair placement, district writing competition winner, multi-school math league honors, regional orchestra selection.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-violet-50 rounded-lg p-3 border border-violet-100">
            <span className="bg-violet-200 text-violet-800 text-xs font-bold px-2 py-1 rounded shrink-0">STATE</span>
            <div>
              <p className="text-sm text-violet-800 font-medium">Statewide recognition</p>
              <p className="text-sm text-violet-600 mt-1">All-State team, state science fair finalist, Governor's School selection, state-level DECA/FBLA/TSA placement, state merit scholarship.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-amber-50 rounded-lg p-3 border border-amber-100">
            <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded shrink-0">NATIONAL</span>
            <div>
              <p className="text-sm text-amber-800 font-medium">Nationwide recognition across the country</p>
              <p className="text-sm text-amber-600 mt-1">National Merit Semifinalist/Finalist, AP Scholar, National Science Olympiad medalist, USAMO qualifier, Congressional Award, National YoungArts winner, QuestBridge finalist.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-green-50 rounded-lg p-3 border border-green-100">
            <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded shrink-0">INTL</span>
            <div>
              <p className="text-sm text-green-800 font-medium">Recognition involving multiple countries</p>
              <p className="text-sm text-green-600 mt-1">International Math Olympiad medalist, International Science Olympiad placement, international research publication, Model UN "Best Delegate" at an international conference.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Common Mistakes</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">-</span>
              <span><strong>Calling NHS "national":</strong> Even though the name includes "National," your induction into your school's chapter is a school-level honor. Only national-level NHS awards (like the NHS Scholarship) are national.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">-</span>
              <span><strong>AP Scholar as "international":</strong> AP exams exist outside the US, but AP Scholar is awarded by the College Board, a US organization. List it as national.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">-</span>
              <span><strong>Confusing participation with placement:</strong> Attending a national competition is not a national honor. You need to have placed or been recognized at that competition.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">-</span>
              <span><strong>Online competitions:</strong> If participants come from multiple countries, it could be international, but only if the competition is well-established and reputable. A small online contest with a few international entrants is not truly international-level recognition.</span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-500 italic">
          When in doubt, go with the lower level. Understating is always better than overstating. Admissions officers respect honesty and will notice inflation.
        </p>
      </div>
    ),
  },
  {
    id: 'organizing-documents',
    title: 'Organizing Your Documents',
    icon: <FolderOpen size={20} className="text-emerald-600" />,
    searchText: 'documents organize files naming convention checklist transcript recommendation letters resume',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          College applications involve dozens of documents. Losing track of a transcript or recommendation letter can cost you a deadline. Set up a system now and save yourself serious stress later.
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">What to Keep Digital Copies Of</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              'Official and unofficial transcripts',
              'Standardized test score reports (SAT, ACT, AP, IB)',
              'Letters of recommendation (if you receive copies)',
              'Resume or activity summary',
              'Personal statement and supplemental essays (all drafts)',
              'Financial aid documents (FAFSA confirmation, CSS Profile)',
              'Award certificates and honor verification',
              'Portfolio pieces (art, writing, coding projects)',
              'Application confirmation screenshots',
              'Scholarship applications and responses',
              'Correspondence with admissions offices',
              'Interview notes and thank-you emails',
            ].map((item, i) => (
              <div key={i} className="flex gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-emerald-500 shrink-0">-</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">File Naming Convention</h4>
          <p className="text-sm text-gray-700">
            Use a consistent format so you can find anything instantly. A recommended pattern:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 space-y-1">
            <p>LastName_DocumentType_Detail_Date.pdf</p>
            <p className="text-gray-500 mt-2"># Examples:</p>
            <p>Smith_Transcript_Official_2025-09.pdf</p>
            <p>Smith_Essay_CommonApp_Personal_v3.docx</p>
            <p>Smith_Rec_Dr-Johnson_Physics.pdf</p>
            <p>Smith_Resume_2025-10.pdf</p>
            <p>Smith_Essay_MIT_WhyUs_Final.docx</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Where to Link Documents in AdmitTrack</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2">
              <span className="text-emerald-500 shrink-0">-</span>
              <span><strong>Profile section:</strong> Transcript, test scores, resume. These are universal documents used across all applications.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 shrink-0">-</span>
              <span><strong>University-specific pages:</strong> Supplemental essays, school-specific forms, interview notes for that school.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 shrink-0">-</span>
              <span><strong>Activity entries:</strong> Certificates, photos, or links that verify or illustrate a specific activity.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 shrink-0">-</span>
              <span><strong>Honor entries:</strong> Award certificates, notification emails, or screenshots of results.</span>
            </li>
          </ul>
        </div>

        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <h4 className="font-semibold text-emerald-900 mb-2">Essential Documents Checklist</h4>
          <div className="grid md:grid-cols-2 gap-1">
            {[
              'Unofficial transcript (request early)',
              'SAT/ACT score reports',
              'AP/IB score reports',
              'At least 2 teacher recommendation letters',
              '1 counselor recommendation letter',
              'Completed FAFSA (if applicable)',
              'CSS Profile (if required by your schools)',
              'Personal statement (final version)',
              'Supplemental essays per school',
              'Updated resume or activity list',
            ].map((item, i) => (
              <label key={i} className="flex gap-2 text-sm text-emerald-800 py-0.5">
                <span className="shrink-0">[ ]</span>
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'writing-essays',
    title: 'Writing Strong Essays',
    icon: <FileEdit size={20} className="text-rose-600" />,
    searchText: 'essay writing personal statement show tell specific structure hook context reflection pitfalls',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Your essay is the one place in the application where you are not a list of numbers and achievements. It is where admissions officers hear your voice, understand your thinking, and decide whether you would be an interesting person to have on campus. Here is how to write one that resonates.
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">1. Show, Don't Tell</h4>
          <p className="text-sm text-gray-700">
            This is the single most important principle. Do not tell the reader you are passionate, resilient, or curious. Instead, describe a moment that makes those qualities obvious.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <p className="text-xs font-medium text-red-500 mb-1">TELLING</p>
              <p className="text-sm text-red-800 italic">"I am very passionate about environmental science and have always cared deeply about the planet."</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <p className="text-xs font-medium text-green-600 mb-1">SHOWING</p>
              <p className="text-sm text-green-800 italic">"The water sample turned brown in my hands. I had collected it from the creek behind my house, the same creek where I had caught tadpoles as a kid."</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">2. Specific Details Beat General Claims</h4>
          <p className="text-sm text-gray-700">
            General statements are forgettable. Specific details are memorable. Instead of writing about "helping people," write about the specific person, the specific problem, and the specific moment something shifted.
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">-</span> Replace "a student I tutored" with "Marcus, a sophomore who had failed algebra twice"</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">-</span> Replace "I learned a lot" with "I realized that my assumption about X was completely wrong"</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">-</span> Replace "a meaningful experience" with the actual experience, described vividly</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">3. Structure: Hook, Context, Reflection, Forward</h4>
          <div className="space-y-2">
            <div className="flex gap-3 items-start">
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded shrink-0">HOOK</span>
              <p className="text-sm text-gray-700">Open with a moment, image, or question that pulls the reader in. Drop them into the middle of something. Do not start with a dictionary definition, a famous quote, or "Ever since I was young..."</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded shrink-0">CONTEXT</span>
              <p className="text-sm text-gray-700">Provide enough background so the reader understands why this moment matters to you. Keep it concise. The reader does not need your entire life story, just enough to understand the stakes.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded shrink-0">REFLECT</span>
              <p className="text-sm text-gray-700">This is the heart of the essay. What did you learn? How did your thinking change? What do you understand now that you did not before? Admissions officers care most about how you process experiences.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded shrink-0">FORWARD</span>
              <p className="text-sm text-gray-700">End by looking ahead. How does this experience connect to who you are becoming? Avoid grand declarations. A quiet, honest ending is more powerful than a sweeping conclusion.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Common Pitfalls to Avoid</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2"><span className="text-red-400 shrink-0">-</span> <span><strong>The resume essay:</strong> Do not just list your achievements in paragraph form. The essay should reveal something the rest of your application cannot.</span></li>
            <li className="flex gap-2"><span className="text-red-400 shrink-0">-</span> <span><strong>The trauma essay without reflection:</strong> Difficult experiences can be powerful topics, but only if you show growth and insight. The essay should not just describe hardship; it should show what you did with it.</span></li>
            <li className="flex gap-2"><span className="text-red-400 shrink-0">-</span> <span><strong>The thesaurus essay:</strong> Do not use words you would never say out loud. Write in your natural voice. "Utilized" is not better than "used."</span></li>
            <li className="flex gap-2"><span className="text-red-400 shrink-0">-</span> <span><strong>The safe essay:</strong> If your essay could have been written by any applicant, it is too generic. Take a risk. Be specific. Be yourself.</span></li>
            <li className="flex gap-2"><span className="text-red-400 shrink-0">-</span> <span><strong>Trying to sound impressive:</strong> The best essays sound like a thoughtful person talking honestly, not like someone trying to impress a committee.</span></li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'why-us-essay',
    title: 'The "Why Us" Essay Formula',
    icon: <Heart size={20} className="text-pink-600" />,
    searchText: 'why us essay supplement college specific research programs professors clubs traditions fit',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Almost every selective school asks some version of "Why do you want to attend our university?" This is not a test of flattery. It is a test of whether you have done your homework and whether you genuinely belong at this specific school.
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Step 1: Research Specifics</h4>
          <p className="text-sm text-gray-700">
            Before writing a single word, spend at least 30 minutes researching the school beyond its homepage. Look for details that most applicants will not find.
          </p>
          <ul className="text-sm text-gray-700 space-y-1.5">
            <li className="flex gap-2"><span className="text-pink-400 shrink-0">-</span> <strong>Academic programs:</strong> Specific courses, interdisciplinary programs, research centers, unique majors, or special curricula (e.g., open curriculum, core programs)</li>
            <li className="flex gap-2"><span className="text-pink-400 shrink-0">-</span> <strong>Faculty:</strong> Find 1-2 professors whose research aligns with your interests. Read their recent publications or lab pages.</li>
            <li className="flex gap-2"><span className="text-pink-400 shrink-0">-</span> <strong>Student organizations:</strong> Clubs, publications, teams, or groups you would join. Be specific about what appeals to you.</li>
            <li className="flex gap-2"><span className="text-pink-400 shrink-0">-</span> <strong>Campus culture:</strong> Traditions, residential life, study abroad programs, community engagement opportunities.</li>
            <li className="flex gap-2"><span className="text-pink-400 shrink-0">-</span> <strong>Student perspectives:</strong> Read student blogs, watch student-made videos, visit forums for genuine impressions.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Step 2: Connect Your Interests to Their Offerings</h4>
          <p className="text-sm text-gray-700">
            The magic formula is: <strong>Your specific interest + Their specific resource = Why this school is the right fit.</strong> Every paragraph should connect something about YOU to something about THEM.
          </p>
          <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
            <p className="text-xs font-medium text-pink-500 mb-1">EXAMPLE STRUCTURE</p>
            <p className="text-sm text-pink-800">"My experience building a water quality database for my town's environmental commission sparked my interest in environmental data science. At [School], I would pursue this through Professor [Name]'s Watershed Analytics Lab, which uses the same GIS methods I have been teaching myself. I also want to take [Course Number]: [Course Name], which combines data science with environmental policy, the exact intersection I want to work in."</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Step 3: Show Genuine Fit, Not Flattery</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">-</span>
              <span><strong>Do not:</strong> "Your prestigious university with its world-renowned faculty and beautiful campus would be an incredible opportunity."</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500 shrink-0">-</span>
              <span><strong>Do:</strong> Show that you understand what makes this school different from other schools, and explain why that difference matters for your goals.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">-</span>
              <span><strong>Do not:</strong> Only mention things you could find on the first page of the school's website (location, ranking, general reputation).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500 shrink-0">-</span>
              <span><strong>Do:</strong> Mention specifics that show you have dug deeper: a particular lab, a unique course, a student tradition that resonates with you.</span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-500 italic">
          The ultimate test: Could you replace the school name with a different school and have the essay still work? If yes, it is not specific enough.
        </p>
      </div>
    ),
  },
  {
    id: 'managing-deadlines',
    title: 'Managing Deadlines Effectively',
    icon: <CalendarClock size={20} className="text-orange-600" />,
    searchText: 'deadline management calendar early decision regular decision rolling admission timeline',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Missing a deadline is one of the only mistakes in the college application process that cannot be fixed. Everything else, a weak essay, a missing test score, can usually be addressed. A missed deadline cannot. Here is how to make sure it never happens.
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Set Personal Deadlines 5-7 Days Early</h4>
          <p className="text-sm text-gray-700">
            Your real deadline should always be earlier than the official one. This buffer protects you from technical issues (server crashes on deadline day are common), last-minute family emergencies, illness, or simply needing one more revision pass.
          </p>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
            <p className="text-sm text-orange-800">
              <strong>Example:</strong> If a school's Regular Decision deadline is January 1, your personal deadline should be December 25-26. Enter both dates in AdmitTrack: the personal one as your working deadline and the official one as a safety net.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Group Deadlines by Type</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2">
              <span className="text-orange-500 shrink-0">-</span>
              <span><strong>Early Decision / Early Action (Oct-Nov):</strong> Usually November 1 or 15. These come first and often require your most polished work because the pool is smaller.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 shrink-0">-</span>
              <span><strong>Regular Decision (Dec-Jan):</strong> Most fall between January 1 and January 15. Bundle these together and work on shared elements (Common App essay, activity list) before tackling school-specific supplements.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 shrink-0">-</span>
              <span><strong>Financial Aid (varies):</strong> FAFSA opens October 1. CSS Profile deadlines vary by school. Some financial aid deadlines are BEFORE the application deadline. Check each school individually.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 shrink-0">-</span>
              <span><strong>Scholarships (varies widely):</strong> These have the most scattered deadlines. Log every one in AdmitTrack the moment you find it.</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">What to Do If You Miss a Deadline</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">1.</span> <span><strong>Do not panic.</strong> Contact the admissions office immediately. Some schools accept late submissions within a grace period, especially for technical issues.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">2.</span> <span><strong>Be honest and brief.</strong> Explain what happened without over-apologizing. "I experienced a technical issue and was unable to submit before the deadline. Is it possible to submit today?"</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">3.</span> <span><strong>Have your application ready to submit.</strong> If they give you extra time, submit within the hour. Do not ask for extra time and then take three more days.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">4.</span> <span><strong>If the school says no:</strong> Accept it gracefully and move forward. You likely have other schools on your list. This is why building a balanced college list matters.</span></li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'building-college-list',
    title: 'Building Your College List',
    icon: <ListChecks size={20} className="text-teal-600" />,
    searchText: 'college list reach target likely safety schools how many factors ranking fit',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          A well-built college list is your most important strategic decision. Apply to too few schools and you risk having no options. Apply to too many and you spread yourself too thin to write strong applications. The goal is a balanced list where you would be genuinely happy attending any school on it.
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Reach, Target, Likely: The Balance</h4>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <h5 className="font-semibold text-red-800 text-sm">Reach (2-4 schools)</h5>
              <p className="text-xs text-red-700 mt-1">Your stats are below the school's averages, or the school's acceptance rate is below 20%. Admission is possible but not expected. Dream schools go here.</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <h5 className="font-semibold text-amber-800 text-sm">Target (3-5 schools)</h5>
              <p className="text-xs text-amber-700 mt-1">Your stats are within or slightly above the school's middle 50% range. You have a reasonable chance of admission. These should be schools you would be excited to attend.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <h5 className="font-semibold text-green-800 text-sm">Likely (2-3 schools)</h5>
              <p className="text-xs text-green-700 mt-1">Your stats are well above the school's averages and the acceptance rate is above 50%. You are very likely to be admitted. These must be schools you would genuinely attend.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">How Many Schools?</h4>
          <p className="text-sm text-gray-700">
            Most students apply to <strong>8-12 schools</strong>. This is generally the sweet spot. Here is why:
          </p>
          <ul className="text-sm text-gray-700 space-y-1.5">
            <li className="flex gap-2"><span className="text-teal-500 shrink-0">-</span> <strong>Fewer than 6:</strong> Risky unless you have very strong credentials and a clear safety school. You may not have enough options.</li>
            <li className="flex gap-2"><span className="text-teal-500 shrink-0">-</span> <strong>8-12:</strong> Allows for a balanced mix of reach, target, and likely schools while still giving you time to write strong applications for each.</li>
            <li className="flex gap-2"><span className="text-teal-500 shrink-0">-</span> <strong>More than 15:</strong> You will almost certainly sacrifice quality for quantity. Supplemental essays for 15+ schools are very difficult to make individually excellent.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Factors Beyond Rankings</h4>
          <p className="text-sm text-gray-700">Rankings measure institutional reputation, not your personal fit. Consider:</p>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              'Academic programs in your intended major',
              'Class sizes and student-to-faculty ratio',
              'Location and setting (urban vs. rural, climate)',
              'Campus culture and social scene',
              'Research opportunities for undergrads',
              'Internship and career placement rates',
              'Financial aid and merit scholarship availability',
              'Study abroad programs',
              'Housing and dining quality',
              'Graduation rates and student satisfaction',
              'Diversity and inclusion climate',
              'Proximity to home (if that matters to you)',
            ].map((factor, i) => (
              <div key={i} className="flex gap-2 text-sm text-gray-700 bg-gray-50 rounded px-3 py-1.5">
                <span className="text-teal-500 shrink-0">-</span>
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 italic">
          The best college list is one where you can honestly say: "I would be happy at any of these schools." If a school is only on your list for its name, reconsider.
        </p>
      </div>
    ),
  },
  {
    id: 'research-projects',
    title: 'Research & Projects: What Counts?',
    icon: <FlaskConical size={20} className="text-indigo-600" />,
    searchText: 'research project independent competition mentor lab publication science STEM contribution',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Research and independent projects can be among the strongest items on your application, but many students are unsure what qualifies. The good news: you do not need a published paper to list meaningful research or project work.
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Types of Research and Projects</h4>

          <div className="space-y-3">
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
              <h5 className="font-semibold text-indigo-800 text-sm mb-2">Formal Research with a Mentor</h5>
              <p className="text-sm text-indigo-700">
                Working in a university lab, a hospital research department, or with a professional researcher. This is the most traditional form and carries significant weight. Even if you are doing basic tasks like data entry or literature reviews, you are gaining real research experience. Mention your mentor's name and institution in your description.
              </p>
            </div>

            <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
              <h5 className="font-semibold text-violet-800 text-sm mb-2">Independent Projects</h5>
              <p className="text-sm text-violet-700">
                Projects you initiated and executed on your own or with peers: building an app, conducting a survey, writing a research paper, creating a dataset, developing a product. These demonstrate initiative and self-direction, which admissions officers value highly. The project does not need to be groundbreaking; it needs to be genuine and well-executed.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h5 className="font-semibold text-blue-800 text-sm mb-2">Competition Work</h5>
              <p className="text-sm text-blue-700">
                Projects created for science fairs (ISEF, JSHS), engineering competitions (FIRST Robotics), hackathons, or academic olympiads. List the project as an activity and any awards as honors. If the project evolved beyond the competition, mention that too.
              </p>
            </div>

            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
              <h5 className="font-semibold text-teal-800 text-sm mb-2">Creative and Humanities Research</h5>
              <p className="text-sm text-teal-700">
                Research is not just for STEM. Writing a historical analysis, conducting interviews for a documentary, creating an art portfolio with a thesis, or performing archival research all count. Frame it the same way: what question did you explore, what methods did you use, and what did you find?
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">How to Describe Your Contribution</h4>
          <p className="text-sm text-gray-700 mb-2">
            Be honest and specific about what you personally did. Admissions officers know that high school students are rarely leading groundbreaking research. They are looking for intellectual curiosity and genuine engagement.
          </p>
          <ul className="text-sm text-gray-700 space-y-1.5">
            <li className="flex gap-2"><span className="text-indigo-500 shrink-0">-</span> State your specific role: "Analyzed data using Python," not "Contributed to research"</li>
            <li className="flex gap-2"><span className="text-indigo-500 shrink-0">-</span> Mention the topic/question: "Studying the effect of microplastics on freshwater organisms"</li>
            <li className="flex gap-2"><span className="text-indigo-500 shrink-0">-</span> Include tangible outputs: poster presentation, paper draft, dataset, prototype, or report</li>
            <li className="flex gap-2"><span className="text-indigo-500 shrink-0">-</span> Name your mentor and institution if applicable</li>
            <li className="flex gap-2"><span className="text-indigo-500 shrink-0">-</span> Do not overstate: if you assisted, say "assisted." If you led, say "led."</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'using-admittrack',
    title: 'How to Use AdmitTrack Effectively',
    icon: <Rocket size={20} className="text-brand-600" />,
    searchText: 'admittrack guide tutorial how to use profile universities activities honors deadlines essays documents checklist',
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          AdmitTrack is designed to be your single source of truth throughout the application process. Here is the recommended workflow to get the most out of it.
        </p>

        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">1</span>
            <div>
              <h5 className="font-semibold text-gray-900 text-sm">Start with Your Profile</h5>
              <p className="text-sm text-gray-600 mt-0.5">Fill in your personal information, academic stats (GPA, test scores), and intended major. This data helps you evaluate fit when adding universities later. Keep it updated as scores and grades change.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">2</span>
            <div>
              <h5 className="font-semibold text-gray-900 text-sm">Add Your Universities</h5>
              <p className="text-sm text-gray-600 mt-0.5">Add every school you are considering, even ones you are not sure about yet. Categorize them as reach, target, or likely. Include application type (EA, ED, RD) and deadlines. You can always remove schools later, but it is better to start broad.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">3</span>
            <div>
              <h5 className="font-semibold text-gray-900 text-sm">Log All Activities and Honors</h5>
              <p className="text-sm text-gray-600 mt-0.5">Enter every activity and honor, even small ones. It is easier to cut from a complete list than to remember things later under deadline pressure. For each activity, write the 150-character description now. Drafting descriptions early gives you time to revise them.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">4</span>
            <div>
              <h5 className="font-semibold text-gray-900 text-sm">Enter All Deadlines</h5>
              <p className="text-sm text-gray-600 mt-0.5">Log every deadline: application deadlines, financial aid deadlines, scholarship deadlines, test dates, recommendation letter request dates. Set personal deadlines 5-7 days before official ones. Check the deadlines page regularly so nothing surprises you.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">5</span>
            <div>
              <h5 className="font-semibold text-gray-900 text-sm">Draft and Refine Essays</h5>
              <p className="text-sm text-gray-600 mt-0.5">Use the essays section to draft your personal statement and each supplemental essay. Start early and revise often. Keep track of which essays go to which schools. Many schools have similar prompts, so you can adapt essays across applications.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">6</span>
            <div>
              <h5 className="font-semibold text-gray-900 text-sm">Upload and Organize Documents</h5>
              <p className="text-sm text-gray-600 mt-0.5">Upload or link to your transcripts, test scores, recommendation letters, certificates, and any other supporting documents. Attach them to the relevant sections (activities, honors, universities) so everything is connected and easy to find.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="bg-brand-100 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">7</span>
            <div>
              <h5 className="font-semibold text-gray-900 text-sm">Review Your Checklist Regularly</h5>
              <p className="text-sm text-gray-600 mt-0.5">Use the dashboard to see your overall progress. Check it at least once a week. Look for incomplete items, upcoming deadlines, and missing documents. The checklist is your safety net; it will catch things you might otherwise forget.</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-50 rounded-lg p-4 border border-brand-100">
          <h4 className="font-semibold text-brand-900 mb-2">Weekly Routine</h4>
          <p className="text-sm text-brand-800">
            Set aside 15-20 minutes each week to review your AdmitTrack dashboard. Update any activities or honors that have changed, check upcoming deadlines, and make sure your essay drafts are progressing. Small, consistent effort is far more effective than marathon sessions the night before a deadline.
          </p>
        </div>
      </div>
    ),
  },
]

export default function GuidesPage() {
  const [search, setSearch] = useState('')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const filteredGuides = useMemo(() => {
    if (!search.trim()) return guides
    const lower = search.toLowerCase()
    return guides.filter(
      (g) =>
        g.title.toLowerCase().includes(lower) ||
        g.searchText.toLowerCase().includes(lower)
    )
  }, [search])

  const toggleGuide = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const expandAll = () => {
    setExpandedIds(new Set(filteredGuides.map((g) => g.id)))
  }

  const collapseAll = () => {
    setExpandedIds(new Set())
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Guides & Instructions"
        description="Everything you need to know about the college application process, written by experts."
      />

      <div className="flex items-center gap-3 mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search guides..."
          className="flex-1"
        />
        <div className="flex gap-2 shrink-0">
          <button
            onClick={expandAll}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            Expand all
          </button>
          <button
            onClick={collapseAll}
            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            Collapse all
          </button>
        </div>
      </div>

      {filteredGuides.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No guides match your search.</p>
          <button
            onClick={() => setSearch('')}
            className="text-sm text-brand-600 hover:text-brand-700 mt-2"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredGuides.map((guide) => {
            const isExpanded = expandedIds.has(guide.id)
            return (
              <Card key={guide.id} className="p-0 overflow-hidden">
                <button
                  onClick={() => toggleGuide(guide.id)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="shrink-0">{guide.icon}</div>
                  <span className="flex-1 font-medium text-gray-900 text-sm">
                    {guide.title}
                  </span>
                  <div className="shrink-0 text-gray-400">
                    {isExpanded ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </div>
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-4 pb-5 pt-0 border-t border-gray-100">
                    <div className="pt-4">{guide.content}</div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <div className="mt-8 mb-4 text-center">
        <p className="text-xs text-gray-400">
          10 guides available. Have a question not covered here? Check the specific section of AdmitTrack for contextual tips.
        </p>
      </div>
    </div>
  )
}
