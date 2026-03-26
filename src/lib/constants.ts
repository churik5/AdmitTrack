import type { ChecklistItem } from './types'

// ---------------------------------------------------------------------------
// 1. CHECKLIST_ITEMS
// ---------------------------------------------------------------------------

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // --- Universities ---
  {
    id: 'uni-research-list',
    category: 'Universities',
    label: 'Build initial list of 15-25 schools',
    completed: false,
    description:
      'Research schools across selectivity tiers (reach, target, likely). Use College Navigator, Niche, and each school\'s CDS (Common Data Set) for hard numbers on admit rate, mid-50% test scores, and average GPA.',
  },
  {
    id: 'uni-narrow-list',
    category: 'Universities',
    label: 'Narrow to final balanced list of 8-15 schools',
    completed: false,
    description:
      'Aim for roughly 2-4 reach, 3-5 target, and 2-3 likely schools. Evaluate fit based on major strength, campus culture, location, cost, and outcomes. Every school on your list should be one you would genuinely attend.',
  },
  {
    id: 'uni-note-requirements',
    category: 'Universities',
    label: 'Record each school\'s specific requirements',
    completed: false,
    description:
      'Log required test scores, number of recommendation letters, supplemental essay prompts, portfolio requirements, interviews, and any special forms. Check each school\'s admissions page directly -- requirements change year to year.',
  },
  {
    id: 'uni-track-deadlines',
    category: 'Universities',
    label: 'Enter all application deadlines',
    completed: false,
    description:
      'Include EA, ED, ED2, REA, and RD deadlines. Add financial aid deadlines (FAFSA, CSS Profile, institutional forms) and scholarship deadlines. Set personal deadlines 5-7 days before the real ones.',
  },
  {
    id: 'uni-visit-plan',
    category: 'Universities',
    label: 'Plan campus visits or virtual tours',
    completed: false,
    description:
      'Schedule official visits, attend info sessions, and connect with current students. Take notes on what stood out -- these details fuel "Why Us" essays. If you can\'t visit in person, watch student vlogs, attend virtual events, and explore the campus map.',
  },

  // --- Testing ---
  {
    id: 'test-register-sat-act',
    category: 'Testing',
    label: 'Register for SAT or ACT',
    completed: false,
    description:
      'Check each target school\'s testing policy (required, test-optional, test-blind). Register well in advance -- popular test centers fill up. Plan to take the test at least twice, with the first sitting no later than spring of junior year.',
  },
  {
    id: 'test-prep-plan',
    category: 'Testing',
    label: 'Create a test prep schedule',
    completed: false,
    description:
      'Take a full-length diagnostic for both SAT and ACT to decide which suits you better. Use official practice materials (College Board for SAT, ACT.org for ACT). Schedule 4-8 weeks of focused prep before each sitting.',
  },
  {
    id: 'test-subject-tests',
    category: 'Testing',
    label: 'Check if any schools recommend subject tests or AP scores',
    completed: false,
    description:
      'Some competitive programs (engineering, pre-med) recommend AP exam scores or subject-specific evidence. Log which AP scores you plan to send and self-report where allowed.',
  },
  {
    id: 'test-send-scores',
    category: 'Testing',
    label: 'Send official score reports',
    completed: false,
    description:
      'Order score sends at least 3-4 weeks before deadlines. Use Score Choice or superscoring policies to your advantage. Keep PDFs of score reports in your Documents section.',
  },

  // --- Activities & Honors ---
  {
    id: 'act-inventory',
    category: 'Activities & Honors',
    label: 'List all activities from grades 9-12',
    completed: false,
    description:
      'Include clubs, sports, jobs, family responsibilities, independent projects, summer programs, volunteering, and hobbies. Don\'t overlook informal commitments -- tutoring siblings, managing a family business, or self-taught skills all count.',
  },
  {
    id: 'act-write-descriptions',
    category: 'Activities & Honors',
    label: 'Draft 150-character descriptions for each activity',
    completed: false,
    description:
      'CommonApp gives you 150 characters per activity. Lead with your role and impact, use active verbs, and include numbers when possible. See the "Writing Descriptions" guide for examples.',
  },
  {
    id: 'act-rank-activities',
    category: 'Activities & Honors',
    label: 'Rank activities by significance',
    completed: false,
    description:
      'Place your most meaningful activities first. Prioritize depth over breadth: leadership roles, sustained commitment, and measurable impact rank higher than one-time participation.',
  },
  {
    id: 'act-list-honors',
    category: 'Activities & Honors',
    label: 'Compile honors and awards',
    completed: false,
    description:
      'Include academic awards, competition placements, scholarships, honor societies, and recognitions. Assign each an accurate level: school, regional, state, national, or international.',
  },
  {
    id: 'act-gather-evidence',
    category: 'Activities & Honors',
    label: 'Collect evidence and supporting documents',
    completed: false,
    description:
      'Upload certificates, news articles, programs, photos, and letters. Link each piece of evidence to the corresponding activity or honor. This makes it easy to reference specifics in essays and interviews.',
  },

  // --- Documents ---
  {
    id: 'doc-transcript',
    category: 'Documents',
    label: 'Request official transcripts',
    completed: false,
    description:
      'Ask your counselor to send official transcripts to each school. Keep an unofficial copy for your records. Verify that your GPA, course titles, and grades are correct before sending.',
  },
  {
    id: 'doc-rec-letters',
    category: 'Documents',
    label: 'Request recommendation letters',
    completed: false,
    description:
      'Ask 2-3 teachers (ideally from junior year core subjects) and your counselor at least 6 weeks before the earliest deadline. Provide each recommender a "brag sheet" summarizing your accomplishments and goals.',
  },
  {
    id: 'doc-resume',
    category: 'Documents',
    label: 'Prepare an activities resume',
    completed: false,
    description:
      'Create a one-page resume listing activities, honors, work experience, and skills. Some schools accept an "Additional Information" upload -- a polished resume works well here.',
  },
  {
    id: 'doc-id-copies',
    category: 'Documents',
    label: 'Gather ID and legal documents',
    completed: false,
    description:
      'Have copies of your passport or state ID, Social Security number (for FAFSA), and residency documentation if applicable. Store these securely.',
  },

  // --- Essays ---
  {
    id: 'essay-personal-statement',
    category: 'Essays',
    label: 'Write CommonApp/Coalition personal statement',
    completed: false,
    description:
      'Choose a prompt that lets you reveal something meaningful about who you are. Start with brainstorming and freewriting before committing to a topic. Aim for a complete first draft 8-10 weeks before your earliest deadline.',
  },
  {
    id: 'essay-supplementals',
    category: 'Essays',
    label: 'Draft all supplemental essays',
    completed: false,
    description:
      'Each school has unique prompts. Start with "Why Us" essays since they require school-specific research. Reuse and adapt material across similar prompts, but always tailor details to each school.',
  },
  {
    id: 'essay-revise',
    category: 'Essays',
    label: 'Revise and get feedback on all essays',
    completed: false,
    description:
      'Read each essay aloud to catch awkward phrasing. Get feedback from 2-3 trusted readers (teacher, counselor, parent, peer) -- but keep your authentic voice. Plan for at least 3 revision rounds per essay.',
  },
  {
    id: 'essay-word-count',
    category: 'Essays',
    label: 'Verify all essays meet word limits',
    completed: false,
    description:
      'CommonApp personal statement: 650 words max. Supplementals vary (50 to 500+ words). Stay within 10% of the limit -- too short signals lack of effort, too long shows inability to edit.',
  },

  // --- Research & Projects ---
  {
    id: 'research-document',
    category: 'Research & Projects',
    label: 'Document ongoing research or independent projects',
    completed: false,
    description:
      'Record your research question, methodology, findings, and your specific contribution. Even incomplete research demonstrates intellectual curiosity -- note where you are and what you plan to do next.',
  },
  {
    id: 'research-advisor',
    category: 'Research & Projects',
    label: 'Secure letters or acknowledgments from research mentors',
    completed: false,
    description:
      'If you worked with a professor, researcher, or organization, ask for a letter or written acknowledgment of your contribution. This third-party validation strengthens your application.',
  },
  {
    id: 'research-publications',
    category: 'Research & Projects',
    label: 'Log publications, presentations, or competition submissions',
    completed: false,
    description:
      'Record titles, dates, venues, co-authors, and links. Even a poster presentation at a local symposium or a blog post about your project counts as dissemination of your work.',
  },

  // --- Financial ---
  {
    id: 'fin-fafsa',
    category: 'Financial',
    label: 'Complete the FAFSA',
    completed: false,
    description:
      'FAFSA opens October 1. File as early as possible -- some aid is first-come, first-served. You need your (and your parents\') Social Security numbers, tax returns, and bank statements.',
  },
  {
    id: 'fin-css',
    category: 'Financial',
    label: 'Complete the CSS Profile (if required)',
    completed: false,
    description:
      'About 200+ schools require the CSS Profile in addition to FAFSA. It asks for more detailed financial information. Check each school\'s financial aid page to confirm requirements.',
  },
  {
    id: 'fin-scholarships',
    category: 'Financial',
    label: 'Search and apply for scholarships',
    completed: false,
    description:
      'Use Fastweb, Scholarships.com, and your school counselor\'s list. Apply to local scholarships (Rotary, community foundations) -- they often have less competition. Track deadlines and requirements for each.',
  },
  {
    id: 'fin-compare-aid',
    category: 'Financial',
    label: 'Run Net Price Calculators for target schools',
    completed: false,
    description:
      'Every school is required to have a Net Price Calculator on its website. Run it for each school on your list to estimate your actual cost. This helps avoid surprises when aid letters arrive.',
  },
  {
    id: 'fin-fee-waivers',
    category: 'Financial',
    label: 'Check eligibility for application fee waivers',
    completed: false,
    description:
      'Fee waivers are available through the CommonApp (based on financial indicators), the SAT fee waiver program, or directly from schools. Your counselor can also request waivers on your behalf.',
  },

  // --- Final Steps ---
  {
    id: 'final-review-apps',
    category: 'Final Steps',
    label: 'Review every application before submitting',
    completed: false,
    description:
      'Check for typos, correct school names in supplementals, verify that activity descriptions fit character limits, and confirm that all required materials are attached. Have someone else do a final read-through.',
  },
  {
    id: 'final-submit-early',
    category: 'Final Steps',
    label: 'Submit applications 2-3 days before deadlines',
    completed: false,
    description:
      'Portals crash on deadline day. Submitting early gives you a buffer for technical issues and lets you confirm that schools received your materials.',
  },
  {
    id: 'final-confirm-materials',
    category: 'Final Steps',
    label: 'Confirm all materials received via applicant portals',
    completed: false,
    description:
      'Log into each school\'s applicant portal 1-2 weeks after submission to verify they have your transcript, test scores, recommendations, and financial aid forms. Follow up immediately if anything is missing.',
  },
  {
    id: 'final-interview-prep',
    category: 'Final Steps',
    label: 'Prepare for interviews',
    completed: false,
    description:
      'Research common interview questions ("Tell me about yourself," "Why this school?"). Practice with a friend or family member. Prepare 2-3 thoughtful questions to ask your interviewer about the school.',
  },
  {
    id: 'final-thank-yous',
    category: 'Final Steps',
    label: 'Send thank-you notes to recommenders and interviewers',
    completed: false,
    description:
      'A brief, genuine thank-you email or handwritten note goes a long way. Let recommenders know your results when decisions arrive -- they care about how things turn out.',
  },
]

// ---------------------------------------------------------------------------
// 2. GUIDES
// ---------------------------------------------------------------------------

export const GUIDES: {
  slug: string
  title: string
  content: string
}[] = [
  {
    slug: 'activity-vs-honor',
    title: 'Activity vs. Honor: What Goes Where?',
    content: `The CommonApp separates your profile into Activities (up to 10 slots) and Honors (up to 5 slots). Placing an item in the wrong section weakens its impact and confuses admissions officers. Here is how to decide.

**An Activity is something you do.** It involves ongoing participation, effort, and time. Activities include clubs, sports, jobs, volunteering, independent projects, family responsibilities, and hobbies that demand consistent commitment. The key question is: did you invest time regularly over a sustained period?

**An Honor is something you receive.** It is a recognition, award, or distinction given to you by someone else -- a school, an organization, a competition, or a government body. The key question is: did an external entity select you or evaluate your work and grant you a title, prize, or placement?

**Gray areas and how to handle them:**

- **Honor societies (NHS, Mu Alpha Theta, etc.):** If membership is based on meeting GPA or test thresholds and you just attend meetings, list it as an Honor. If you hold a leadership role and actively organize events, list the leadership role under Activities and the membership under Honors.
- **Competition participation vs. placement:** Participating in Science Olympiad all year is an Activity. Winning a medal at the state tournament is an Honor. You can list both: the team membership as an Activity and the specific award as an Honor.
- **Scholarships:** Merit scholarships are Honors. Receiving a scholarship to attend a summer program is an Honor; the summer program itself is an Activity.
- **Eagle Scout / Gold Award:** The project work is an Activity; the award itself is an Honor.

**A practical test:** If you can describe it as a verb phrase ("organized weekly tutoring sessions," "competed on the debate team"), it belongs in Activities. If you can describe it as a noun phrase received from someone ("National Merit Semifinalist," "first place in state science fair"), it belongs in Honors.

When in doubt, ask yourself where the item will sound more impressive. A regional science fair first-place finish has more punch as an Honor ("1st Place, Regional Science Fair") than buried in an activity description. Conversely, sustained volunteer leadership at a nonprofit has more weight as an Activity with hours and impact details than as a vague honor.`,
  },
  {
    slug: 'writing-descriptions',
    title: 'Writing Strong Activity Descriptions',
    content: `The CommonApp gives you exactly 150 characters to describe each activity. That is roughly one long sentence. Every character matters, and most students waste them on vague filler. Here is how to write descriptions that make admissions officers take notice.

**Start with impact, not duties.** Bad: "Member of the robotics club." Better: "Designed & built autonomous navigation system; led team to state championship." The first tells them nothing they can't already guess from the activity title. The second shows what you actually did and achieved.

**Use strong active verbs.** Replace "helped with" with "organized," "launched," "designed," "trained," "raised," "analyzed," or "published." Active verbs convey agency and leadership. Avoid passive constructions ("was responsible for") that eat up characters without adding meaning.

**Include numbers whenever possible.** Numbers are the fastest way to convey scale and impact. "Tutored 30+ students weekly in calculus; 90% improved one letter grade" is vastly more compelling than "Tutored students in math and helped them improve." Even rough numbers work -- "Organized fundraiser raising $4,200" beats "Organized a successful fundraiser."

**Use abbreviations strategically.** Common abbreviations save characters: & for "and," w/ for "with," dept. for "department," org. for "organization," govt. for "government." Admissions officers read thousands of these -- they understand shorthand.

**Structure: Role + Action + Result.** A reliable formula is: [Your role/leadership title]; [what you did]; [measurable outcome]. Example: "VP of Operations; restructured club budget & event planning; grew membership 40% in one year."

**Avoid these common mistakes:**
- Repeating the activity title or position in the description (they have their own fields).
- Using subjective adjectives like "amazing," "passionate," or "dedicated" -- show, don't tell.
- Writing in first person ("I organized...") -- drop the pronoun to save characters.
- Listing duties instead of achievements ("Attended weekly meetings, participated in events").

**Before and after examples:**

Weak (147 chars): "I am a member of the debate team and I participate in tournaments and help the younger members learn how to debate and do research for cases"

Strong (148 chars): "Varsity captain; coached 12 novice debaters in LD & PF. Won 3 tournament finals, qualified to state. Built case database used by 40+ team members"

The strong version names a leadership role, quantifies coaching, cites competitive results, and mentions a lasting contribution -- all in the same space.`,
  },
  {
    slug: 'honor-levels',
    title: 'Assessing Honor Levels Accurately',
    content: `The CommonApp asks you to classify each honor as School, Regional/Local, State, National, or International. Admissions officers know what each level means, so inflating or deflating your honors hurts credibility. Here is how to assess each level honestly.

**School Level:** The recognition comes from your high school and only students at your school were eligible. Examples: Honor Roll, departmental awards ("Outstanding Chemistry Student"), school-specific scholarships, valedictorian/salutatorian, school MVP awards, student-of-the-month. If the pool of candidates was limited to your school, it is school level -- even if it feels significant to you.

**Regional/Local Level:** The recognition involves competition or selection from multiple schools in your city, county, or metropolitan area. Examples: county science fair awards, all-city orchestra selection, regional math league placements, city-wide art competition awards, district-level debate tournament results, local Rotary Club scholarships. The key: candidates came from multiple schools in a defined geographic area smaller than your state.

**State Level:** The recognition involves competition or selection from across your entire state. Examples: all-state band/orchestra/choir, state science fair placements, state championship results, Governor's Scholars programs, state-level DECA/FBLA/HOSA awards, AP Scholar (since the College Board assigns this at a level comparable to statewide distinction). The pool of candidates spans the whole state.

**National Level:** The recognition involves competition or selection from across the entire country. Examples: National Merit Semifinalist/Finalist, USAMO qualifier, national-level Science Olympiad or MATHCOUNTS placements, Intel/Regeneron STS semifinalist, National YoungArts winner, Presidential Scholar nominee, USA Biology/Chemistry/Physics Olympiad camp. The pool is nationwide.

**International Level:** The recognition involves candidates from multiple countries. Examples: International Math/Science/Informatics Olympiad medalists, international essay competition winners (e.g., John Locke Institute), research published in international journals, International Baccalaureate awards that are globally competitive. Very few high school students have genuine international-level honors -- do not stretch a national honor into this category.

**Common mistakes to avoid:**
- Calling NHS "national" because it has "National" in the name. NHS chapters select at the school level -- it is a school-level honor. (However, NHS Scholarship winners selected nationally are national-level.)
- Labeling AP Scholar awards as "national." While the AP program is national, the AP Scholar designation is based on your own scores, not competition against others. List it as school or state level depending on how your school treats it.
- Inflating a local competition to "regional." If it drew participants from just 3-5 nearby schools, it is local.
- Calling a summer program acceptance an "honor." Being admitted to a selective program (e.g., RSI, MITES) can be listed as a national-level honor if the acceptance rate and applicant pool justify it. Being admitted to a paid summer camp is not an honor.

**When you are unsure,** look at the applicant pool. Ask: "How many people were eligible to receive this, and from how wide a geographic area?" That gives you the honest answer.`,
  },
  {
    slug: 'evidence-and-files',
    title: 'Storing and Organizing Evidence',
    content: `Admissions applications ask you to summarize years of work in a few lines. Having organized evidence lets you write accurate descriptions, back up claims in interviews, and respond quickly if a school asks for more detail. Here is how to build a solid evidence library.

**What counts as evidence:**
- Certificates, trophies, and award letters (scan or photograph them).
- Screenshots of published articles, websites you built, or social media posts about your work.
- Programs or flyers from events you organized, with your name highlighted.
- Recommendation letters from mentors, coaches, or supervisors (even informal emails praising your work).
- Data and metrics: fundraising totals, membership growth charts, performance stats, grade improvements of students you tutored.
- News articles or blog posts mentioning your achievements.
- Research papers, abstracts, or poster files.
- Videos of performances, presentations, or project demos (store links).

**How to organize in AdmitTrack:**
1. Upload each document in the Documents section with a clear, descriptive name (e.g., "2025 State Science Fair - 2nd Place Certificate" not "IMG_4392.jpg").
2. Tag every document with relevant categories: the activity it supports, the type of document, and the date.
3. Use the "Related To" field to link each document to the specific activity, honor, or essay it supports. This creates cross-references so you can quickly find everything related to a given achievement.
4. Add a brief comment explaining what the document shows and why it matters. When you are writing essays months later, these notes save you from having to re-examine every file.

**Naming conventions that work:**
Use the format: [Year] [Activity/Honor Name] - [Document Type]. Examples:
- "2025 Debate Team - State Qualifier Certificate"
- "2024 Summer Research - Final Paper Draft"
- "2025 Student Government - Event Photos Homecoming"

**When to collect evidence:**
The best time is immediately after the event. Set a habit: after every competition, performance, or milestone, spend 5 minutes uploading and tagging the evidence. Waiting until senior fall means scrambling to find certificates from sophomore year, discovering that links are broken, and relying on fuzzy memories for numbers.

**Privacy and security:**
Do not upload documents containing Social Security numbers, full bank account details, or other sensitive financial information to any app. Store those separately in a secure location. AdmitTrack stores data locally on your device, but treat any digital storage with appropriate caution.`,
  },
  {
    slug: 'participation-vs-results',
    title: 'Participation vs. Results: Showing Real Impact',
    content: `Admissions officers read thousands of applications that say "participated in" and "was a member of." These phrases tell them nothing about what you actually contributed. The difference between a forgettable and a compelling application often comes down to replacing participation language with results language.

**Participation language describes presence.** "Member of the Environmental Club." "Attended weekly volunteer sessions." "Participated in the school play." These statements confirm you showed up. They do not tell an admissions officer what changed because you were there.

**Results language describes impact.** "Launched school composting program; diverted 200 lbs of waste monthly from landfill." "Organized and led Saturday tutoring for 15 underserved middle schoolers; 12 raised math grades by one letter." "Played lead role in school production of Our Town; sold out all 3 performances (first time in 5 years)." These statements show what happened because of your effort.

**How to find your results when you think you don't have any:**

1. **Ask "So what?"** You volunteered at a food bank. So what? You sorted 500 boxes of food during holiday drives. So what? Those 500 boxes fed 200 families for a week. Keep asking until you hit a concrete outcome.

2. **Look for numbers.** How many people did you serve, teach, lead, recruit? How much money did you raise? How many hours did you invest? What percentage improvement did you drive? Numbers transform vague claims into credible ones.

3. **Identify what changed.** Before you got involved, what was the situation? After your involvement, what was different? If you started a club, how many members does it have now? If you redesigned a process, how much time or money did it save?

4. **Note firsts and onlys.** Were you the first student to do something? The youngest person selected? The only sophomore on a varsity team? These markers of distinction are results in themselves.

5. **Credit sustained effort.** If you have been doing something for 3-4 years, that persistence is a result. "4-year varsity player" signals commitment. "Built and maintained school garden across all 4 high school years; expanded from 2 beds to 12" shows growth.

**Reframing common activities:**

- "Volunteered at hospital" becomes "Logged 200+ hours in pediatric ward; created activity kits for 50+ child patients to reduce pre-procedure anxiety."
- "Worked at grocery store" becomes "Trained 8 new cashiers; promoted to shift lead within 6 months; managed team of 5 during peak hours."
- "Played on soccer team" becomes "Starting midfielder for 3 seasons; led team in assists junior year (14); organized off-season conditioning program adopted by coaches."

The pattern is always the same: replace the generic verb with a specific one, add a number, and point to a tangible outcome. This is what turns a list of activities into a portrait of a person who makes things happen.`,
  },
  {
    slug: 'research-projects',
    title: 'Documenting Research and Projects',
    content: `Research and independent projects can be among the most compelling parts of your application, but only if you document them well. A vague mention of "doing research" carries little weight. A clearly described project with a defined question, methodology, and your specific contribution can set you apart. Here is how to document your work effectively.

**What counts as research or an independent project:**
- Formal research with a professor or lab (summer programs, school-year mentorships).
- Independent studies or extended essays (IB EE, AP Research, self-directed projects).
- Competition projects (science fairs, engineering challenges, hackathons).
- Creative or entrepreneurial projects with a tangible output (app you built, business you started, documentary you produced).
- Data analysis or survey-based investigations you conducted on your own.

**What to record for each project:**

1. **Title and topic.** Give it a clear, descriptive title. "Analyzing the Effect of Microplastics on Daphnia Magna Reproduction Rates" is better than "Biology Research."

2. **Your research question or project goal.** What were you trying to find out, build, or solve? State this in one or two sentences. Admissions officers want to see intellectual curiosity and clarity of thought.

3. **Methodology.** What did you actually do? Briefly describe your approach -- experiments, data collection, coding, interviews, literary analysis. You do not need to write a methods section, but you do need to show that your process was thoughtful and systematic.

4. **Your specific contribution.** This is critical if you worked on a team or in a lab. Were you the person who designed the experiment? Wrote the code? Analyzed the data? Drafted the paper? Admissions officers want to know what you did, not what the team did.

5. **Findings or outcomes.** What did you discover, build, or conclude? Even null results or incomplete projects are valuable if you can articulate what you learned and what you would do differently. "We found no significant correlation, which challenged our initial hypothesis and led us to redesign the study" shows genuine scientific thinking.

6. **Dissemination.** Did you present at a symposium, publish in a journal (even a student journal), submit to a competition, or share your work publicly? Record the venue, date, and any recognition received.

7. **Skills developed.** List specific technical skills (Python, R, gel electrophoresis, CAD, survey design) and broader skills (experimental design, literature review, scientific writing, collaboration with graduate students).

**Tips for students without formal lab access:**

You do not need a university affiliation to do meaningful research. You can:
- Use publicly available datasets (Census data, NASA datasets, Kaggle) to conduct original analysis.
- Design and run surveys through Google Forms and analyze results with free tools.
- Build software projects that solve a real problem in your school or community.
- Write in-depth analytical essays or reports on topics in your intended field.
- Contribute to open-source projects on GitHub.

The key is demonstrating intellectual initiative: you identified a question, figured out how to investigate it, and produced something tangible. That mindset matters more to admissions officers than having a prestigious lab name attached to your work.

**Recording in AdmitTrack:**
Use the Research section to log each project with all the details above. Link related documents (papers, presentations, code repositories) in the Documents section. If the research connects to an activity (e.g., Science Olympiad) or an honor (e.g., science fair placement), create those cross-references so your application tells a coherent story.`,
  },
  {
    slug: 'application-materials',
    title: 'Gathering Application Materials',
    content: `Submitting a college application requires assembling materials from multiple sources -- you, your school, your recommenders, testing agencies, and financial aid offices. Missing a single item can delay your application or cause it to be reviewed as incomplete. Here is a comprehensive checklist and timeline for gathering everything you need.

**Materials you prepare yourself:**
- Personal statement / main essay (CommonApp, Coalition, ApplyTexas, UC PIQs, etc.).
- Supplemental essays for each school.
- Activities list with descriptions (up to 10 on CommonApp).
- Honors list with levels (up to 5 on CommonApp).
- Additional Information section (optional but useful for context -- explain circumstances, add an activity resume, or elaborate on a key experience).
- Art or music portfolio (if applying to arts programs -- check specific school requirements for format, file size, and submission platform like SlideRoom).

**Materials from your high school:**
- Official transcript (your counselor sends this through the application platform or by mail).
- School Report / Secondary School Report (your counselor completes this form, which includes your class rank, school profile, and their recommendation).
- Mid-year report (sent after first-semester senior grades are finalized, usually January-February).
- Final transcript (sent after graduation to the school you will attend).

**Materials from recommenders:**
- Teacher recommendations (typically 2, from junior-year core academic teachers).
- Counselor recommendation (included in the School Report).
- Additional recommendations (from a coach, employer, mentor, or research supervisor -- only if the school allows them and the letter adds a new dimension).

**Materials from testing agencies:**
- Official SAT or ACT score reports (ordered through College Board or ACT.org).
- AP score reports (if self-reporting is not accepted).
- TOEFL/IELTS scores (for international students or non-native English speakers).

**Financial aid materials:**
- FAFSA (required for federal aid at all US schools).
- CSS Profile (required by about 200+ private schools).
- Institutional financial aid forms (some schools have their own additional forms).
- Tax returns and W-2s (for verification if selected).
- Non-custodial parent profile (if parents are divorced and the school requires it).

**Timeline for gathering materials:**

Summer before senior year: Finalize school list, draft personal statement, begin supplemental essays. Ask teachers for recommendations (give them at least 6 weeks, ideally before school starts).

September-October: Complete FAFSA and CSS Profile (both open October 1). Finalize activities and honors lists. Continue drafting and revising essays.

November 1-15: EA and ED deadlines for most schools. All materials for these applications should be submitted or in transit by late October.

January 1-15: Many RD and ED2 deadlines. Mid-year reports become relevant.

February-March: Check applicant portals to confirm all materials were received. Submit any outstanding financial aid documents.

**Pro tip:** Create a simple tracking spreadsheet or use AdmitTrack's checklist to mark each material as "not started," "in progress," "submitted," and "confirmed received." The most common application crisis is discovering two days before a deadline that a recommender has not submitted their letter.`,
  },
  {
    slug: 'using-admittrack',
    title: 'Getting the Most Out of AdmitTrack',
    content: `AdmitTrack is designed to be your central workspace for the entire college application process. Instead of scattering information across Google Docs, spreadsheets, sticky notes, and email threads, you can keep everything in one place. Here is how to use each section effectively.

**Profile:**
Fill out your profile completely as your first step. Include your GPA (weighted and unweighted), test scores, intended majors, and class rank. Add honest notes about your strengths and weaknesses -- these are private and help you reflect on how to position yourself. Your profile data helps you evaluate school fit and keeps critical numbers at your fingertips when filling out applications.

**Universities:**
Add every school you are seriously considering. For each school, record the application type (EA, ED, RD, etc.), status, and all specific requirements. Use the notes field to capture impressions from campus visits, information sessions, or student conversations -- these details are gold for "Why Us" essays. Update the status field as you progress from researching to submitted to (hopefully) accepted.

**Activities:**
Enter all your extracurricular activities with full details: role, time commitment, grades involved, and a description. Write the description as you would want it to appear on your application -- 150 characters, impact-focused, with numbers. Use the "Results" field for outcomes that don't fit in the short description. Tag activities to group them thematically (e.g., "STEM," "leadership," "community").

**Honors:**
Log every award, recognition, and distinction. Be accurate about the level (school, regional, state, national, international). Use the "Significance" field to note why this honor matters and how selective it was -- this context helps when you need to decide which 5 honors to feature on the CommonApp.

**Documents:**
Upload and organize all supporting documents. Use clear file names, tags, and the "Related To" field to link documents to activities, honors, or essays. This section becomes your evidence library -- when you need to verify a date, check an exact placement, or attach a certificate, everything is in one place.

**Essays:**
Track every essay from brainstorming through final draft. Use the version history to save snapshots as you revise -- you can always go back to an earlier draft if a revision goes sideways. Link each essay to the universities that require it. Use the "Improvement Notes" field to record feedback from readers so you remember what to address in the next revision.

**Research:**
Document all research projects and independent work with full details about your question, methodology, contribution, and findings. Link related documents and connect research to relevant activities or honors.

**Deadlines:**
Enter every deadline you face -- application deadlines, financial aid deadlines, test registration dates, scholarship deadlines, and self-imposed milestones. Set priorities to keep the most urgent items visible. Check this section weekly and update statuses as you complete each item.

**Notes:**
Use notes for anything that does not fit neatly elsewhere: strategy thoughts, advice from a counselor, ideas for essay topics, questions to ask at an interview, or observations from a campus visit. Tag and link notes to relevant entities so they are easy to find later.

**Checklist:**
Work through the built-in checklist to make sure you are not missing any major step in the process. Check off items as you complete them. The checklist is designed to cover the full application cycle from initial research through final thank-you notes.

**General tips:**
- Update AdmitTrack regularly -- weekly is ideal. A 10-minute weekly review keeps everything current and prevents a frantic catch-up session before deadlines.
- Use tags consistently. Decide on a tagging system early (e.g., school names, themes like "leadership" or "STEM," essay types) and stick with it.
- When you sit down to write an application, open AdmitTrack alongside the application portal. Having your activities, honors, essays, and school-specific notes all accessible makes the process dramatically faster and more accurate.
- Back up your data periodically. AdmitTrack stores data locally on your device. Export or back up regularly so you do not lose your work.`,
  },
]

// ---------------------------------------------------------------------------
// 3. ESSAY_TEMPLATES
// ---------------------------------------------------------------------------

export const ESSAY_TEMPLATES: {
  type: string
  title: string
  description: string
  tips: string[]
  structure: string[]
  avoidList: string[]
}[] = [
  {
    type: 'personal_statement',
    title: 'Personal Statement (CommonApp)',
    description:
      'The 650-word personal statement is the centerpiece of your application. It should reveal who you are beyond your grades and test scores -- your values, how you think, and what drives you.',
    tips: [
      'Start with a specific moment or scene, not a broad philosophical statement. "The morning I found my grandmother\'s handwritten recipe book in the attic" beats "Food has always been important to my family."',
      'Write about something that matters to you, not what you think admissions officers want to hear. Authentic passion for competitive birdwatching is more compelling than forced passion for saving the world.',
      'Show growth or change. The best personal statements have an arc: something happened, you reflected on it, and you came out different on the other side.',
      'Be specific. Replace generic claims ("I learned the value of hard work") with concrete details ("I spent 14 Saturdays rebuilding the engine, and each time I stripped a bolt, I learned patience is a physical skill").',
      'Read your essay aloud. If it sounds like it could have been written by any applicant, it needs more of your unique voice and details.',
      'Your essay does not need to be about a dramatic or traumatic event. Everyday moments observed with insight are often the strongest topics.',
    ],
    structure: [
      'Hook: Open with a vivid, specific moment that drops the reader into the middle of your story.',
      'Context: Briefly establish the situation -- just enough for the reader to understand what is happening and why it matters.',
      'Conflict or tension: What challenge, question, or turning point did you face? This is the engine of your essay.',
      'Reflection and growth: How did you think through the experience? What did you realize, learn, or decide? This is the most important section.',
      'Connection to who you are now: End by linking the experience to your current values, interests, or direction. Avoid cliched "I learned that..." closing lines -- show, don\'t tell.',
    ],
    avoidList: [
      'Summarizing your resume or listing accomplishments -- the activities section does that.',
      'Writing about a topic primarily to impress (e.g., a mission trip where the focus is on how much you helped "those people").',
      'Using SAT vocabulary words unnaturally to sound smart.',
      'Opening with a dictionary definition ("Webster\'s defines leadership as...").',
      'Ending with "And that\'s why I want to attend [University]" -- save school-specific content for supplementals.',
      'Writing about a sports injury or game-winning moment unless you have a genuinely unique angle.',
      'Trying to cover your entire life story. Focus on one thread.',
    ],
  },
  {
    type: 'supplemental',
    title: 'Supplemental Essay (General)',
    description:
      'Supplemental essays let schools evaluate fit and learn things your main essay doesn\'t cover. They range from 50 to 500+ words and vary widely in topic.',
    tips: [
      'Treat every supplemental as an opportunity to add a new dimension to your application. If your personal statement shows your creative side, use a supplemental to show analytical thinking.',
      'For short-answer prompts (50-150 words), be direct and specific. Every word earns its place.',
      'Research the school before writing. Reference specific programs, professors, courses, traditions, or opportunities that genuinely interest you.',
      'Reuse and adapt material across similar prompts, but always tailor the details to each school. Admissions officers can spot a generic essay instantly.',
      'Answer the actual question being asked. If the prompt asks about a community you belong to, don\'t write about a personal challenge instead.',
    ],
    structure: [
      'Read the prompt carefully and identify what it is really asking. Many prompts have multiple parts.',
      'Open with a specific detail or example -- not a restatement of the question.',
      'Develop your response with concrete evidence, anecdotes, or reasoning.',
      'Connect your answer to the school (for "Why Us" type prompts) or to your broader application narrative.',
      'Close with a forward-looking thought that shows how this idea connects to your future.',
    ],
    avoidList: [
      'Copy-pasting the same essay for multiple schools without changing details.',
      'Mentioning the wrong school name (this happens more often than you think -- triple-check).',
      'Being vague about the school ("I love the diverse community and academic rigor" applies to 500 schools).',
      'Exceeding the word limit. If they say 250 words, stay under 250.',
      'Using the supplemental to repeat information from your personal statement.',
    ],
  },
  {
    type: 'why_us',
    title: '"Why Us" / "Why This School" Essay',
    description:
      'This prompt asks you to demonstrate genuine, researched interest in a specific school. It is the admissions office\'s way of gauging whether you are a good fit and whether you will actually enroll if admitted.',
    tips: [
      'Go beyond surface-level facts. "Your 8:1 student-faculty ratio" is something anyone can find on the website. Instead, describe what that ratio would mean for you: "In Professor Chen\'s Advanced Biomechanics seminar, the 12-person cap would let me get feedback on my prosthetics research directly from someone who has published in the field."',
      'Mention specific courses by name and number, professors whose work interests you, research centers, student organizations, study abroad programs, or campus traditions that genuinely excite you.',
      'Show how you would contribute, not just consume. Schools want students who will add to the community, not just benefit from it.',
      'If you visited campus, reference a specific moment or observation from your visit -- this demonstrates genuine engagement.',
      'Connect the school\'s offerings to your specific goals. "I want to combine your Cognitive Science major with the Human-Computer Interaction lab to study how elderly users interact with health apps" shows fit that a generic "great academics" statement never will.',
    ],
    structure: [
      'Open with a specific hook that connects you to the school -- a course, a research opportunity, a campus moment, or a conversation with a student.',
      'Develop 2-3 specific reasons the school fits your goals. Each reason should name something specific at the school AND connect it to something specific about you.',
      'Show what you would contribute to campus life -- a club you would join or start, a perspective you would bring, a skill you would share.',
      'Close by tying together your goals and the school\'s offerings into a cohesive vision of your time there.',
    ],
    avoidList: [
      'Focusing on rankings, prestige, or reputation ("As a top-10 university...").',
      'Mentioning location or weather as a primary reason ("I love that the campus is in California").',
      'Flattering the school without substance ("Your world-renowned faculty and cutting-edge research").',
      'Listing features without connecting them to your interests and goals.',
      'Writing something so generic it could apply to any school if you swapped the name.',
    ],
  },
  {
    type: 'community',
    title: 'Community Essay',
    description:
      'This prompt asks you to describe a community you belong to and your role within it. "Community" is interpreted broadly: family, neighborhood, school, team, online group, cultural group, workplace, or any group where you feel a sense of belonging.',
    tips: [
      'Choose a community that reveals something meaningful about you. Your role in the community matters more than the community itself.',
      'Define the community specifically. "My community" is vague. "The 15-person weekend crew at the Sunrise Diner where I have worked since sophomore year" is vivid and real.',
      'Focus on your contribution and interaction with the group, not just a description of the group itself.',
      'Show tension or complexity. The most interesting community essays acknowledge challenges: disagreements, misunderstandings, evolving roles, or moments where you had to bridge differences.',
      'Smaller, more personal communities often make better essays than large, obvious ones. Your family\'s weekly cooking tradition can be more revealing than "the American community."',
    ],
    structure: [
      'Introduce the community with a specific scene or moment that shows the group in action.',
      'Describe your role -- what do you do, and how has your role evolved over time?',
      'Explore a challenge, change, or meaningful moment within the community.',
      'Reflect on what this community has taught you or how it has shaped your values.',
      'Connect to your broader identity or how you will carry these lessons forward.',
    ],
    avoidList: [
      'Defining community in an overly abstract or philosophical way.',
      'Choosing a community you have little genuine connection to just because it sounds impressive.',
      'Writing about the community without showing your specific role and contributions.',
      'Making the essay a sociology report about the group rather than a personal reflection.',
      'Ignoring the prompt\'s specific sub-questions if there are any.',
    ],
  },
  {
    type: 'challenge',
    title: 'Challenge / Setback / Failure Essay',
    description:
      'This prompt asks you to describe a time you faced a significant challenge, setback, or failure and what you learned from it. Admissions officers want to see resilience, self-awareness, and genuine growth.',
    tips: [
      'Choose a real challenge, not a humble brag. "My biggest challenge was being too dedicated to my studies" is not a real challenge. Failing a class, losing an election, being cut from a team, dealing with a family crisis, or struggling with a learning difference are real challenges.',
      'Spend more of the essay on your response and growth than on describing the challenge itself. A common mistake is using 80% of the word count on the problem and only 20% on the solution.',
      'Be honest and vulnerable. Admissions officers can tell when you are performing hardship versus genuinely reflecting on it.',
      'Show what specific actions you took, not just what you "realized" or "learned." Actions demonstrate real change; abstract lessons do not.',
      'It is fine if the challenge is ongoing. You do not need a neat resolution. Showing that you are actively working through something with maturity and self-awareness is powerful.',
    ],
    structure: [
      'Set the scene: briefly describe the challenge or failure with enough detail that the reader understands the stakes.',
      'Your initial reaction: how did you feel and respond in the moment? Honesty here builds credibility.',
      'The turning point: what made you decide to address the challenge differently?',
      'Specific actions you took: what did you actually do? Name concrete steps.',
      'What changed as a result: how are you different now? What did this experience teach you about yourself?',
    ],
    avoidList: [
      'Choosing a trivial challenge to avoid vulnerability.',
      'Making the essay a pity party without showing agency or growth.',
      'Blaming others for the challenge without taking any responsibility.',
      'Claiming the experience "made you stronger" without showing how.',
      'Writing about a challenge that raises red flags (e.g., academic dishonesty) without extreme care.',
      'Oversharing trauma details -- focus on your response, not on graphic descriptions of hardship.',
    ],
  },
  {
    type: 'intellectual_interest',
    title: 'Intellectual Curiosity / Academic Interest Essay',
    description:
      'This prompt asks you to describe an idea, subject, or intellectual pursuit that excites you. Schools want to see genuine intellectual engagement -- the kind of student who reads beyond the syllabus and asks questions that keep them up at night.',
    tips: [
      'Show your thinking process, not just your knowledge. Admissions officers are not testing whether you know a subject -- they want to see how your mind works when engaged with an idea.',
      'Be specific about what fascinates you. "I love biology" is too broad. "I am obsessed with how CRISPR-Cas9 could be used to address sickle cell disease, but I keep coming back to the ethical question of where gene editing should stop" shows a specific, engaged mind.',
      'Trace your interest to a specific origin point -- a book, a conversation, an experiment, a question that arose unexpectedly.',
      'Show how you have pursued this interest beyond the classroom: independent reading, personal projects, conversations with experts, related activities.',
      'Connect the interest to your future plans without being rigid. It is fine to say "I do not know where this leads, but I want to explore it further at a school where..."',
    ],
    structure: [
      'Open with the moment your curiosity was sparked -- a specific encounter with the idea.',
      'Describe how you explored the topic: what did you read, build, investigate, or discuss?',
      'Show the depth of your thinking: what complexities, contradictions, or open questions have you discovered?',
      'Connect to your academic goals: how does this interest relate to what you want to study?',
      'End with an open question or future direction -- show that your curiosity is ongoing, not concluded.',
    ],
    avoidList: [
      'Name-dropping thinkers or books you have not actually read.',
      'Writing a textbook summary of a topic instead of showing your personal engagement with it.',
      'Choosing a topic solely because it aligns with your intended major if you are not genuinely passionate about it.',
      'Being so abstract that the essay lacks any personal detail or narrative.',
      'Pretending to have expertise you don\'t have -- intellectual humility and curiosity are more appealing than false authority.',
    ],
  },
]

// ---------------------------------------------------------------------------
// 4. ACTIVITY_EXAMPLES
// ---------------------------------------------------------------------------

export const ACTIVITY_EXAMPLES: {
  name: string
  category: string
  role: string
  description: string
  whyStrong: string
}[] = [
  {
    name: 'Debate Team',
    category: 'Debate & Speech',
    role: 'Team Captain',
    description:
      'Captain & varsity LD debater; coached 12 novices weekly. Won 3 tournament finals, qualified to state. Built case database used by 40+ members.',
    whyStrong:
      'Combines leadership (captain, coaching novices), quantifiable results (3 finals wins, state qualifier), and a lasting contribution (case database). Every clause adds new information.',
  },
  {
    name: 'Independent Research -- Microplastics',
    category: 'Research',
    role: 'Lead Researcher',
    description:
      'Designed & ran 6-month study on microplastic concentration in local watershed. Collected 120 water samples, analyzed via FTIR spectroscopy. Presented findings at regional science symposium.',
    whyStrong:
      'Shows initiative (independent, self-designed study), scientific rigor (specific methodology), persistence (6 months, 120 samples), and dissemination (symposium presentation). The specifics make the research credible.',
  },
  {
    name: 'Part-Time Job -- Grocery Store',
    category: 'Work',
    role: 'Shift Lead',
    description:
      'Promoted to shift lead after 8 months; managed team of 5, trained 8 new hires. Reduced checkout wait times 20% by redesigning lane assignment system.',
    whyStrong:
      'Transforms an ordinary job into a leadership story. Shows career progression (promotion), management responsibility (team of 5, training), and problem-solving with measurable impact (20% reduction).',
  },
  {
    name: 'Family Responsibilities',
    category: 'Family',
    role: 'Primary Caregiver',
    description:
      'Care for younger siblings (ages 6 & 9) 20+ hrs/wk while parents work evening shifts. Manage homework help, meals, transportation & medical appointments.',
    whyStrong:
      'Documents a meaningful commitment that many students overlook. Quantifies time (20+ hours/week), specifies responsibilities, and demonstrates maturity and reliability. Admissions officers value this authenticity.',
  },
  {
    name: 'Coding / App Development',
    category: 'Computer & Technology',
    role: 'Creator & Developer',
    description:
      'Built open-source study scheduling app (React Native); 2,300+ downloads on App Store. Merged 15 pull requests from community contributors.',
    whyStrong:
      'Demonstrates technical skill (React Native, open source), entrepreneurial initiative (published app), real-world traction (2,300+ downloads), and community leadership (managing contributions).',
  },
  {
    name: 'Hospital Volunteering',
    category: 'Community Service',
    role: 'Pediatric Ward Volunteer',
    description:
      'Logged 200+ hrs in pediatric ward over 2 years. Created 50+ activity kits for child patients; program adopted hospital-wide by volunteer coordinator.',
    whyStrong:
      'Goes beyond "volunteered at hospital" with specific hours, a concrete initiative (activity kits), quantified impact (50+ kits), and institutional adoption (hospital-wide). Shows sustained commitment.',
  },
  {
    name: 'Student Government',
    category: 'Student Government',
    role: 'Treasurer',
    description:
      'Managed $18K annual budget for 12 student orgs. Implemented transparent tracking system; reduced overspending 35%. Negotiated vendor contracts saving $2,100.',
    whyStrong:
      'Financial responsibility with real numbers ($18K budget, $2,100 saved, 35% reduction). Shows practical skills (budgeting, negotiation, systems design) that most student government descriptions omit.',
  },
  {
    name: 'Music -- Violin',
    category: 'Music',
    role: 'Concertmaster',
    description:
      'Concertmaster of 80-piece school orchestra (grades 10-12). Led sectional rehearsals for 16 violinists. Performed solo at 3 community benefit concerts raising $7,500.',
    whyStrong:
      'Shows both artistic excellence (concertmaster, solo performances) and leadership (led sectionals). Connects music to community impact ($7,500 raised). Numbers give scale to every claim.',
  },
]

// ---------------------------------------------------------------------------
// 5. HONOR_EXAMPLES
// ---------------------------------------------------------------------------

export const HONOR_EXAMPLES: {
  title: string
  level: string
  description: string
  whyCounts: string
}[] = [
  {
    title: 'National Merit Semifinalist',
    level: 'National',
    description:
      'Scored in the top ~1% of PSAT takers nationwide (approx. 16,000 out of 1.5 million). Selected by National Merit Scholarship Corporation based on state-level cutoff scores.',
    whyCounts:
      'One of the most widely recognized national-level academic honors. The selection pool is the entire nation of PSAT takers, making it a clear national-level distinction with an objective threshold.',
  },
  {
    title: 'AP Scholar with Distinction',
    level: 'School',
    description:
      'Earned scores of 3 or higher on 5+ AP exams with an average score of at least 3.5. Awarded by College Board based on individual performance.',
    whyCounts:
      'While the AP program is national, this award is based on your own scores rather than competition against others. List at school level. It shows academic rigor across multiple subjects.',
  },
  {
    title: '1st Place, State Science Fair -- Biochemistry',
    level: 'State',
    description:
      'Awarded first place in the Biochemistry category at the state science fair. Competed against 85 entries from across the state after qualifying through regional rounds.',
    whyCounts:
      'Clear state-level competition with multiple elimination rounds. The category specification and competitor count make the achievement concrete and verifiable.',
  },
  {
    title: 'All-State Orchestra -- First Violin',
    level: 'State',
    description:
      'Selected via blind audition for the state All-State Orchestra. Approximately 1,200 students auditioned for 120 seats across all instruments.',
    whyCounts:
      'Blind audition process and statewide applicant pool make this a legitimate state-level honor. The selection ratio (roughly 10%) adds context for admissions officers unfamiliar with the music world.',
  },
  {
    title: 'Scholastic Art & Writing Awards -- Gold Key (Regional)',
    level: 'Regional',
    description:
      'Received a Gold Key award in the Short Story category from the regional Scholastic Art & Writing Awards affiliate. Work advanced to national judging.',
    whyCounts:
      'The regional Gold Key is correctly classified as regional level. If the piece wins a national medal, that becomes a separate national-level honor. Distinguishing the levels shows honesty and understanding of the competition structure.',
  },
  {
    title: 'Varsity Letter -- Cross Country',
    level: 'School',
    description:
      'Earned varsity letter for completing full season as a scoring member of the varsity cross country team. Met team-defined performance standards.',
    whyCounts:
      'Varsity letters are awarded by the school based on school-defined criteria. Even though you compete against other schools in meets, the letter itself is a school-level recognition. Individual race placements at invitationals could be listed separately as regional honors.',
  },
  {
    title: 'United States Chemistry Olympiad -- Study Camp Qualifier',
    level: 'National',
    description:
      'Selected as one of 20 students nationally to attend the USNCO Study Camp based on performance on the national exam. Top 20 out of approximately 16,000 initial participants.',
    whyCounts:
      'Extremely selective national distinction with clear numbers (top 20 out of 16,000). This is unambiguously national level. If you represented the US at IChO, that would be international.',
  },
  {
    title: 'Eagle Scout',
    level: 'National',
    description:
      'Achieved the rank of Eagle Scout after completing all required merit badges and an independent community service project. Only about 6% of Scouts earn this rank.',
    whyCounts:
      'Eagle Scout is a nationally recognized achievement with a standardized set of requirements administered by a national organization. The ~6% attainment rate among all Scouts makes it a meaningful distinction.',
  },
]

// ---------------------------------------------------------------------------
// 6. WEAK_VS_STRONG_EXAMPLES
// ---------------------------------------------------------------------------

export const WEAK_VS_STRONG_EXAMPLES: {
  context: string
  weak: string
  strong: string
  explanation: string
}[] = [
  {
    context: 'Activity description -- Debate Team',
    weak: 'I am a member of the debate team. I participate in tournaments and help younger members learn how to debate and research.',
    strong:
      'Varsity captain; coached 12 novice debaters in LD & PF weekly. Won 3 tournament finals, qualified to state. Built shared case database for 40+ members.',
    explanation:
      'The weak version uses passive language ("am a member," "participate") and vague actions ("help younger members"). The strong version leads with a leadership title, quantifies coaching, cites competitive results, and names a tangible resource created. Every clause carries new, specific information.',
  },
  {
    context: 'Activity description -- Volunteering',
    weak: 'Volunteered at local food bank helping distribute food to families in need. It was a very rewarding experience that taught me about giving back.',
    strong:
      'Sorted & distributed 500+ food boxes over 18 months; organized holiday drive serving 200 families. Trained 10 new volunteers on intake procedures.',
    explanation:
      'The weak version is about feelings ("rewarding," "giving back") rather than actions. The strong version removes all subjective language and replaces it with quantities (500+ boxes, 200 families, 10 volunteers, 18 months) and specific actions (sorted, organized, trained).',
  },
  {
    context: 'Honor description -- NHS',
    weak: 'National Honor Society member. Selected for academic achievement and character.',
    strong:
      'Selected to NHS chapter (top 8% of class by GPA). Organized 3 campus-wide tutoring events serving 60+ students per session.',
    explanation:
      'The weak version states what everyone already knows about NHS. The strong version adds selectivity context (top 8%), then immediately pivots to what you did with the membership, adding numbers that show impact. It transforms a passive credential into an active achievement.',
  },
  {
    context: 'Essay excerpt -- personal statement opening',
    weak: 'Ever since I was young, I have always been passionate about science. In elementary school, I loved doing experiments, and in middle school I joined the science club.',
    strong:
      'The thermometer read 14 degrees below zero, and my fingers were too numb to hold the pH strip. I was knee-deep in Silver Creek at 6 AM on a Saturday in January, collecting my forty-third water sample.',
    explanation:
      'The weak opening is a chronological summary that could be written by any science-interested student. The strong opening drops the reader into a specific, vivid moment that raises questions (Why is this person in a freezing creek? What are they researching?) and demonstrates genuine commitment through action, not claims.',
  },
  {
    context: '"Why Us" essay excerpt',
    weak: 'I want to attend your university because of its prestigious reputation, diverse community, and excellent academic programs. The beautiful campus and amazing student life also appeal to me.',
    strong:
      'Professor Langston\'s Computational Neuroscience lab is studying exactly the question I have been chasing for two years: how does the brain encode spatial memory during sleep? Combining your Cognitive Science major with the NeuroTech student org would let me bridge the gap between the theory I have read and hands-on BCI research.',
    explanation:
      'The weak version uses generic flattery that could apply to hundreds of schools. The strong version names a specific professor, a specific research question, a specific major, and a specific student organization, then connects all four to the student\'s own interests. An admissions officer reading this knows the student has done real research on the school.',
  },
  {
    context: 'Activity description -- Part-time job',
    weak: 'Worked at a restaurant as a server. Responsible for taking orders, serving food, and cleaning tables.',
    strong:
      'Server & closer at busy 120-seat restaurant, 20 hrs/wk during school year. Trained 5 new hires. Promoted to weekend lead; managed section of 8 tables during peak hours.',
    explanation:
      'The weak version lists duties that define any server job. The strong version shows scale (120-seat restaurant, 20 hrs/wk), progression (promoted to weekend lead), and responsibility beyond the basic role (training, managing a section). It turns an ordinary job into evidence of reliability and growth.',
  },
  {
    context: 'Research description',
    weak: 'Did research at a university lab over the summer studying biology. Helped the graduate students with their experiments and learned a lot about the research process.',
    strong:
      'Conducted independent analysis of gene expression data (RNA-seq) in Dr. Park\'s oncology lab. Identified 3 previously unreported differentially expressed genes in pancreatic cancer cell lines. Co-authored poster presented at university research symposium.',
    explanation:
      'The weak version positions the student as a passive helper who "learned a lot." The strong version names specific techniques (RNA-seq), a specific mentor (Dr. Park), specific findings (3 genes), and specific output (co-authored poster). It shows the student was a contributor, not just an observer.',
  },
  {
    context: 'Additional Information section -- explaining a grade drop',
    weak: 'My grades dropped junior year because I was going through personal issues. It was a hard time but I got through it and my grades improved.',
    strong:
      'My GPA dropped from 3.9 to 3.4 in fall of junior year when my father was hospitalized for three months and I became the primary caregiver for my two younger siblings. I maintained all honors courses during this period. By spring semester, with support from my school counselor and adjusted family responsibilities, I raised my GPA back to 3.8.',
    explanation:
      'The weak version is vague and reads as an excuse. The strong version provides specific context (father hospitalized, caregiver role), specific numbers (GPA figures, three months, two siblings), and a specific recovery trajectory. It frames the grade drop as a documented circumstance, not a character flaw, while showing resilience with evidence.',
  },
]
