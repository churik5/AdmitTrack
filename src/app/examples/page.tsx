'use client'

import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Tabs from '@/components/ui/Tabs'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { Lightbulb, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react'

const tabs = [
  { id: 'activities', label: 'Activity Descriptions' },
  { id: 'honors', label: 'Honors & Awards' },
  { id: 'research', label: 'Research & Projects' },
  { id: 'essays', label: 'Essay Approaches' },
]

const activityExamples = [
  {
    name: 'Debate Club',
    category: 'Debate / Speech',
    weak: 'Member of debate team for 3 years.',
    strong:
      'Varsity captain; led team to state semifinals. Coached 8 novice debaters, 5 qualified for regionals. Organized school-wide public forum on education policy.',
    why: 'The strong version quantifies impact, shows leadership progression, and highlights initiative beyond just participating.',
  },
  {
    name: 'Peer Tutoring',
    category: 'Academic',
    weak: 'Tutored students after school.',
    strong:
      'Founded free peer tutoring program serving 40+ students weekly in math and science. Recruited and trained 12 volunteer tutors. Average tutee grade improvement: 1.5 letter grades.',
    why: 'Numbers tell the story. The strong version shows you created something, scaled it, and measured results.',
  },
  {
    name: 'Part-Time Job',
    category: 'Work (Paid)',
    weak: 'Worked at grocery store.',
    strong:
      'Shift supervisor managing team of 6 at Trader Joe\'s. Redesigned inventory tracking process, reducing waste by 15%. Worked 20 hrs/week while maintaining 3.9 GPA.',
    why: 'Even paid work can demonstrate leadership and problem-solving. Show responsibility level, improvements you drove, and how you balanced competing demands.',
  },
  {
    name: 'Orchestra',
    category: 'Music',
    weak: 'Played violin in orchestra.',
    strong:
      'First chair violin, All-State Orchestra 2024-25. Performed 12 concerts/year including Carnegie Hall showcase. Mentored 3 younger students transitioning from Suzuki method.',
    why: 'Specific honors, performance venues, and mentorship roles transform a generic activity into a compelling narrative of excellence and service.',
  },
  {
    name: 'Food Bank Volunteering',
    category: 'Community Service',
    weak: 'Volunteered at food bank.',
    strong:
      'Logistics coordinator for City Food Bank; organized weekly distributions serving 200+ families. Built Excel database tracking donations and reducing spoilage by 30%.',
    why: 'A title and concrete contributions show ownership. Technical skills applied to service work demonstrate resourcefulness.',
  },
]

const honorExamples = [
  {
    name: 'National Merit Semifinalist',
    level: 'National',
    description: 'Scored in top 1% of PSAT takers nationally (Selection Index: 223). Advancing to Finalist round.',
  },
  {
    name: 'AP Scholar with Distinction',
    level: 'National',
    description: 'Earned scores of 3 or higher on 5+ AP exams with an average score of at least 3.5.',
  },
  {
    name: 'Science Olympiad - 2nd Place Physics',
    level: 'State',
    description: 'Placed 2nd in Circuit Lab event at State Science Olympiad competition among 84 teams.',
  },
  {
    name: 'Student of the Month - October',
    level: 'School',
    description: 'Selected by faculty for academic excellence and community leadership. One of 10 students recognized per year.',
  },
  {
    name: 'Published Research Paper',
    level: 'National',
    description: 'Co-authored paper in Journal of Young Investigators on antibiotic resistance patterns in local waterways.',
  },
]

const notHonors = [
  { item: 'Honor Roll / Dean\'s List', reason: 'List this under your GPA or academic profile instead.' },
  { item: 'Participation certificates', reason: 'Attending an event is an activity, not an honor. List it under Activities.' },
  { item: 'Club membership', reason: 'Being a member is participation. Only list if you held a leadership role or won a competitive selection.' },
  { item: 'Completing a course or program', reason: 'Completion is expected. Only list if you earned a distinction (top 10%, highest grade, etc.).' },
  { item: 'Sports team roster', reason: 'Making a team is an activity. Awards like MVP, All-Conference, or team captain recognition are honors.' },
]

const researchExamples = [
  {
    title: 'Antibiotic Resistance Patterns in Urban Waterways',
    type: 'Formal Research',
    status: 'Published',
    description:
      'Investigated prevalence of antibiotic-resistant bacteria in three urban creek systems using culture-based and PCR methods over a 6-month sampling period.',
    contribution:
      'Designed sampling protocol, collected 120+ water samples, performed DNA extraction and PCR analysis, co-wrote methods and results sections of published paper.',
    skills: ['PCR', 'Gel Electrophoresis', 'Statistical Analysis (R)', 'Scientific Writing', 'Lab Safety'],
    mentor: 'Dr. Sarah Chen, University of Michigan Biology Dept.',
  },
  {
    title: 'Accessible Transit App for Visually Impaired Users',
    type: 'Independent Project',
    status: 'Completed',
    description:
      'Developed a mobile app prototype that provides real-time audio navigation for public transit systems, using GPS data and text-to-speech APIs.',
    contribution:
      'Sole developer. Conducted user interviews with 15 visually impaired transit riders, built React Native prototype, iterated through 3 rounds of user testing.',
    skills: ['React Native', 'JavaScript', 'REST APIs', 'User Research', 'Accessibility (WCAG)'],
    mentor: 'Self-directed; feedback from school CS teacher',
  },
  {
    title: 'Effect of Microplastics on Daphnia Reproduction Rates',
    type: 'Competition Research',
    status: 'Completed',
    description:
      'Designed and executed controlled experiment examining how varying concentrations of polyethylene microplastics affect Daphnia magna reproduction over 21 days.',
    contribution:
      'Developed hypothesis and experimental design, maintained 24 culture tanks, counted offspring daily, performed ANOVA analysis, created poster and oral presentation.',
    skills: ['Experimental Design', 'Microscopy', 'Data Analysis (Excel)', 'Scientific Presentation', 'Animal Husbandry'],
    mentor: 'Ms. Rivera, AP Biology teacher; regional science fair mentor',
  },
]

const essayApproaches = {
  personal: {
    title: 'Personal Statement',
    topics: [
      {
        idea: 'The Bread-Baking Failures',
        angle:
          'Use a series of failed sourdough attempts as a lens for your relationship with patience, precision, and learning from mistakes. Connect to your growth mindset in academics.',
      },
      {
        idea: 'Translating for My Grandmother',
        angle:
          'Explore how being a bridge between languages shaped your identity, responsibility, and understanding of nuance. Ground it in one specific, vivid moment.',
      },
      {
        idea: 'The Annotated Margins',
        angle:
          'Describe your habit of filling book margins with questions and arguments. Show how active reading became active thinking and shaped your intellectual identity.',
      },
    ],
    dos: [
      'Start with a specific moment or image, not a broad statement',
      'Show vulnerability and genuine reflection',
      'Connect your story to who you are now, not just what happened',
      'Use your own voice and natural language',
      'Reveal something the rest of your application does not',
    ],
    donts: [
      'Summarize your resume or list accomplishments',
      'Write about a topic just because it sounds impressive',
      'Use cliches like "I learned the value of hard work"',
      'Focus the entire essay on someone else (a grandparent, coach, etc.)',
      'Try to be funny if humor is not your natural voice',
    ],
  },
  whyUs: {
    title: '"Why This School" Essay',
    structure: [
      { part: 'Hook', detail: 'Open with a specific detail about the school that genuinely excites you.' },
      { part: 'Academic Fit', detail: 'Name specific programs, professors, courses, or research opportunities. Explain what you would do with them.' },
      { part: 'Campus Culture', detail: 'Reference a tradition, club, or value that aligns with who you are. Be specific.' },
      { part: 'Your Contribution', detail: 'Explain what you bring to this community. Connect your past experiences to future plans on campus.' },
    ],
    dos: [
      'Research deeply: mention specifics only found by exploring the school\'s website, visiting, or talking to students',
      'Explain WHY each detail matters to you personally',
      'Show that you have a plan for your time there',
      'Connect your interests to their unique offerings',
    ],
    donts: [
      'Mention only ranking, prestige, location, or weather',
      'Write something so generic it could apply to any school',
      'Just list programs without explaining your connection to them',
      'Copy the school\'s marketing language back at them',
    ],
  },
  community: {
    title: 'Community Essay',
    communities: [
      'Your family or household',
      'A cultural or religious group',
      'An online community or forum',
      'A team, club, or ensemble',
      'Your neighborhood or town',
      'A shared identity group',
      'A workplace or volunteer organization',
    ],
    dos: [
      'Define what the community means to you personally',
      'Show your specific role and contributions',
      'Describe a moment of tension or growth within the community',
      'Reflect on how the community shaped your values',
    ],
    donts: [
      'Just describe the community without showing your place in it',
      'Choose a community you have no real connection to',
      'Focus only on what the community gave you without showing what you gave back',
      'Be vague about which community you are writing about',
    ],
  },
  challenge: {
    title: 'Challenge / Setback Essay',
    framework: [
      { step: 'The Situation', detail: 'Briefly describe what happened. Be honest but do not dwell on the negative.' },
      { step: 'Your Response', detail: 'What did you actually DO? Show agency and decision-making, not just emotions.' },
      { step: 'The Growth', detail: 'How did this change your thinking, behavior, or goals? Be specific and honest.' },
      { step: 'The Application', detail: 'Show how this growth shows up in your life now. Connect past challenge to present action.' },
    ],
    dos: [
      'Choose a real challenge, not a humble brag',
      'Spend 70% of the essay on your response and growth, not the problem itself',
      'Show maturity in how you reflect on the experience',
      'Be honest about what was hard without being a victim',
    ],
    donts: [
      'Write about a challenge that is actually a thinly veiled achievement',
      'Blame others or present yourself as entirely blameless',
      'Choose something too traumatic if you cannot reflect on it with distance',
      'End with a neat, tidy lesson that feels forced',
    ],
  },
}

export default function ExamplesPage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState('activities')

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={t.examples.title}
        description={t.examples.subtitle}
      />

      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
        <Lightbulb size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          These examples are modeled on successful applicants. Adapt the structure and specificity to your own experiences rather than copying content.
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'activities' && <ActivityDescriptions />}
        {activeTab === 'honors' && <HonorsAwards />}
        {activeTab === 'research' && <ResearchProjects />}
        {activeTab === 'essays' && <EssayApproachesSection />}
      </div>
    </div>
  )
}

function ActivityDescriptions() {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Activity Descriptions</h2>
        <p className="text-sm text-gray-500 mt-1">
          You get 150 characters for each activity. Every word must earn its place. Compare these weak and strong versions.
        </p>
      </div>

      {activityExamples.map((example, i) => (
        <Card key={i}>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-gray-900">{example.name}</h3>
            <Badge color="bg-blue-100 text-blue-700">{example.category}</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-3 rounded-lg bg-red-50 border border-red-100">
              <div className="flex items-center gap-1.5 mb-2">
                <ThumbsDown size={14} className="text-red-500" />
                <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Weak</span>
              </div>
              <p className="text-sm text-gray-700">{example.weak}</p>
            </div>

            <div className="p-3 rounded-lg bg-green-50 border border-green-100">
              <div className="flex items-center gap-1.5 mb-2">
                <ThumbsUp size={14} className="text-green-600" />
                <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Strong</span>
              </div>
              <p className="text-sm text-gray-700">{example.strong}</p>
            </div>
          </div>

          <div className="mt-3 flex gap-2 items-start">
            <ArrowRight size={14} className="text-brand-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">{example.why}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

function HonorsAwards() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Properly Classified Honors</h2>
        <p className="text-sm text-gray-500 mb-4">
          Each honor should include the name, recognition level, and a brief description with context about selectivity.
        </p>

        <div className="space-y-3">
          {honorExamples.map((honor, i) => (
            <Card key={i} className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-gray-900">{honor.name}</h3>
                  <Badge
                    color={cn(
                      honor.level === 'National' && 'bg-purple-100 text-purple-700',
                      honor.level === 'State' && 'bg-blue-100 text-blue-700',
                      honor.level === 'School' && 'bg-gray-100 text-gray-700'
                    )}
                  >
                    {honor.level}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{honor.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">What is NOT an Honor</h2>
        <p className="text-sm text-gray-500 mb-4">
          These are commonly listed in the Honors section but belong elsewhere in your application.
        </p>

        <div className="space-y-2">
          {notHonors.map((item, i) => (
            <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <ThumbsDown size={14} className="text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">{item.item}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Lightbulb size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Activity or Honor? It Can Be Both</p>
            <p className="text-sm text-blue-800">
              Science Olympiad is an activity (you practiced, competed, and grew as a team member). Placing 2nd at State is an honor (a competitive recognition). List the participation under Activities and the award under Honors. This is not double-counting; they serve different purposes.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function ResearchProjects() {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Research & Project Examples</h2>
        <p className="text-sm text-gray-500 mt-1">
          Three different types of research entries, each fully filled out. Notice how the &quot;Your Contribution&quot; section is specific about what YOU did.
        </p>
      </div>

      {researchExamples.map((project, i) => (
        <Card key={i}>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <h3 className="font-semibold text-gray-900">{project.title}</h3>
            <Badge color="bg-blue-100 text-blue-700">{project.type}</Badge>
            <Badge color="bg-green-100 text-green-700">{project.status}</Badge>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Description</p>
              <p className="text-sm text-gray-700">{project.description}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Your Contribution</p>
              <p className="text-sm text-gray-700">{project.contribution}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Mentor</p>
              <p className="text-sm text-gray-700">{project.mentor}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <Badge key={skill} color="bg-gray-100 text-gray-700">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function EssayApproachesSection() {
  const [essayTab, setEssayTab] = useState<'personal' | 'whyUs' | 'community' | 'challenge'>('personal')

  const essayTabs = [
    { id: 'personal', label: 'Personal Statement' },
    { id: 'whyUs', label: 'Why Us' },
    { id: 'community', label: 'Community' },
    { id: 'challenge', label: 'Challenge' },
  ]

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Essay Approaches</h2>
        <p className="text-sm text-gray-500 mt-1">
          Topic ideas, structural guides, and clear DO / DON&apos;T lists for each common essay type.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {essayTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setEssayTab(tab.id as typeof essayTab)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              essayTab === tab.id
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {essayTab === 'personal' && <PersonalStatementSection />}
      {essayTab === 'whyUs' && <WhyUsSection />}
      {essayTab === 'community' && <CommunitySection />}
      {essayTab === 'challenge' && <ChallengeSection />}
    </div>
  )
}

function PersonalStatementSection() {
  const data = essayApproaches.personal
  return (
    <div className="space-y-5">
      <Card>
        <h3 className="font-semibold text-gray-900 mb-3">Topic Ideas</h3>
        <div className="space-y-3">
          {data.topics.map((topic, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm font-medium text-gray-900">{topic.idea}</p>
              <p className="text-xs text-gray-500 mt-1">{topic.angle}</p>
            </div>
          ))}
        </div>
      </Card>

      <DosDonts dos={data.dos} donts={data.donts} />
    </div>
  )
}

function WhyUsSection() {
  const data = essayApproaches.whyUs
  return (
    <div className="space-y-5">
      <Card>
        <h3 className="font-semibold text-gray-900 mb-3">Recommended Structure</h3>
        <div className="space-y-2">
          {data.structure.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">{item.part}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <DosDonts dos={data.dos} donts={data.donts} />
    </div>
  )
}

function CommunitySection() {
  const data = essayApproaches.community
  return (
    <div className="space-y-5">
      <Card>
        <h3 className="font-semibold text-gray-900 mb-3">What Counts as a Community?</h3>
        <p className="text-sm text-gray-500 mb-3">
          Admissions officers define community broadly. Any of these can work:
        </p>
        <div className="flex flex-wrap gap-2">
          {data.communities.map((c) => (
            <Badge key={c} color="bg-purple-100 text-purple-700">{c}</Badge>
          ))}
        </div>
      </Card>

      <DosDonts dos={data.dos} donts={data.donts} />
    </div>
  )
}

function ChallengeSection() {
  const data = essayApproaches.challenge
  return (
    <div className="space-y-5">
      <Card>
        <h3 className="font-semibold text-gray-900 mb-3">How to Frame Growth</h3>
        <p className="text-sm text-gray-500 mb-3">
          The best challenge essays spend most of their word count on response and growth, not the problem.
        </p>
        <div className="space-y-2">
          {data.framework.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">{item.step}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <DosDonts dos={data.dos} donts={data.donts} />
    </div>
  )
}

function DosDonts({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="bg-green-50 border-green-200">
        <div className="flex items-center gap-1.5 mb-3">
          <ThumbsUp size={14} className="text-green-600" />
          <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Do</span>
        </div>
        <ul className="space-y-2">
          {dos.map((item, i) => (
            <li key={i} className="text-sm text-gray-700 flex gap-2">
              <span className="text-green-500 shrink-0">+</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <div className="flex items-center gap-1.5 mb-3">
          <ThumbsDown size={14} className="text-red-500" />
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Don&apos;t</span>
        </div>
        <ul className="space-y-2">
          {donts.map((item, i) => (
            <li key={i} className="text-sm text-gray-700 flex gap-2">
              <span className="text-red-400 shrink-0">&ndash;</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
