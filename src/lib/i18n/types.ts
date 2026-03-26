export type Locale = 'en' | 'ru'

export interface Translations {
  // Common
  common: {
    save: string
    cancel: string
    delete: string
    edit: string
    add: string
    back: string
    search: string
    filter: string
    all: string
    loading: string
    noResults: string
    confirmDelete: string
    yes: string
    no: string
    done: string
    close: string
    next: string
    skip: string
    required: string
    optional: string
    notes: string
    tags: string
    link: string
    date: string
    status: string
    type: string
    description: string
    name: string
    title: string
    category: string
    signIn: string
    signUp: string
    signOut: string
    email: string
    password: string
    confirmPassword: string
    or: string
  }

  // Auth
  auth: {
    signInTitle: string
    signUpTitle: string
    signInSubtitle: string
    signUpSubtitle: string
    signingIn: string
    creatingAccount: string
    noAccount: string
    hasAccount: string
    createOne: string
    signInLink: string
    checkEmail: string
    checkEmailDesc: string
    backToSignIn: string
    minPassword: string
    passwordsDontMatch: string
  }

  // Navigation
  nav: {
    dashboard: string
    universities: string
    deadlines: string
    activities: string
    honors: string
    essays: string
    research: string
    documents: string
    notes: string
    guides: string
    examples: string
    checklist: string
    profile: string
    more: string
    main: string
    application: string
    organize: string
    help: string
  }

  // Dashboard
  dashboard: {
    greeting: string
    overview: string
    upcomingDeadlines: string
    viewAll: string
    noDeadlines: string
    addDeadline: string
    getStarted: string
    recentlyUpdated: string
    quickActions: string
    addUniversity: string
    addActivity: string
    writeEssay: string
    suggestAddUni: string
    suggestAddActivity: string
    suggestAddHonor: string
    suggestAddEssay: string
    suggestAddDeadline: string
    today: string
    tomorrow: string
    daysLeft: string
  }

  // Universities
  universities: {
    title: string
    subtitle: string
    addUniversity: string
    editUniversity: string
    universityName: string
    state: string
    website: string
    applicationType: string
    disclaimer: string
    noUniversities: string
    noUniversitiesDesc: string
    firstUniversity: string
    statuses: {
      researching: string
      planning: string
      in_progress: string
      submitted: string
      accepted: string
      rejected: string
      waitlisted: string
      deferred: string
      withdrawn: string
    }
    appTypes: {
      EA: string
      ED: string
      ED2: string
      REA: string
      RD: string
      rolling: string
      other: string
    }
    tabs: {
      overview: string
      deadlines: string
      requirements: string
      essays: string
      documents: string
      notes: string
    }
  }

  // Activities
  activities: {
    title: string
    subtitle: string
    addActivity: string
    editActivity: string
    activityName: string
    organization: string
    role: string
    startDate: string
    endDate: string
    ongoing: string
    gradesParticipated: string
    hoursPerWeek: string
    weeksPerYear: string
    results: string
    infoBox: string
    noActivities: string
    noActivitiesDesc: string
    firstActivity: string
    descriptionTip: string
    charCount: string
    tipTitle: string
    tips: string[]
  }

  // Honors
  honors: {
    title: string
    subtitle: string
    addHonor: string
    editHonor: string
    honorTitle: string
    level: string
    issuedBy: string
    dateReceived: string
    gradeReceived: string
    placement: string
    significance: string
    infoBox: string
    noHonors: string
    noHonorsDesc: string
    firstHonor: string
    whatCounts: string
    levels: {
      school: string
      regional: string
      state: string
      national: string
      international: string
    }
  }

  // Essays
  essays: {
    title: string
    subtitle: string
    newEssay: string
    editDetails: string
    prompt: string
    wordLimit: string
    words: string
    overLimit: string
    saved: string
    saving: string
    unsavedChanges: string
    saveVersion: string
    versionLabel: string
    versionHistory: string
    noVersions: string
    restoreVersion: string
    improvementNotes: string
    saveNotes: string
    linkedUniversities: string
    linkUni: string
    noLinkedUnis: string
    noEssays: string
    noEssaysDesc: string
    firstEssay: string
    guidanceTitle: string
    types: {
      personal_statement: string
      supplemental: string
      why_us: string
      community: string
      challenge: string
      intellectual_interest: string
      diversity: string
      activity: string
      other: string
    }
    statuses: {
      brainstorming: string
      outlining: string
      drafting: string
      revising: string
      polishing: string
      final: string
    }
  }

  // Deadlines
  deadlines: {
    title: string
    subtitle: string
    addDeadline: string
    editDeadline: string
    deleteDeadline: string
    university: string
    noUniversity: string
    priority: string
    time: string
    listView: string
    calendarView: string
    upcoming: string
    completed: string
    overdue: string
    overdueWarning: string
    noDeadlines: string
    noDeadlinesDesc: string
    firstDeadline: string
    allTypes: string
    allUniversities: string
    types: {
      application: string
      financial_aid: string
      scholarship: string
      test_registration: string
      document_submission: string
      interview: string
      portfolio: string
      self_imposed: string
    }
    priorities: {
      critical: string
      high: string
      medium: string
      low: string
    }
  }

  // Documents
  documents: {
    title: string
    subtitle: string
    addDocument: string
    fileName: string
    relatedTo: string
    comment: string
    noDocuments: string
    noDocumentsDesc: string
    firstDocument: string
    categories: {
      transcript: string
      certificate: string
      award: string
      recommendation: string
      essay: string
      resume: string
      project: string
      research: string
      test_score: string
      financial: string
      other: string
    }
  }

  // Research
  research: {
    title: string
    subtitle: string
    addResearch: string
    topic: string
    publishedAt: string
    ownContribution: string
    skills: string
    findings: string
    noResearch: string
    noResearchDesc: string
    firstResearch: string
    types: {
      research_paper: string
      article: string
      project: string
      independent_study: string
      competition_work: string
      idea: string
    }
    statuses: {
      idea: string
      planning: string
      in_progress: string
      completed: string
      published: string
    }
  }

  // Notes
  notes: {
    title: string
    subtitle: string
    addNote: string
    content: string
    noNotes: string
    noNotesDesc: string
    firstNote: string
    categories: {
      general: string
      university: string
      essay: string
      strategy: string
      advice: string
      idea: string
      requirement: string
      plan: string
    }
  }

  // Profile
  profile: {
    title: string
    subtitle: string
    personalInfo: string
    academicInfo: string
    testScores: string
    addScore: string
    testName: string
    score: string
    personalReflections: string
    strengths: string
    weaknesses: string
    additionalNotes: string
    profileCompleteness: string
    gpa: string
    weightedGpa: string
    classRank: string
    intendedMajors: string
    graduationYear: string
    highSchool: string
    city: string
    saved: string
  }

  // Onboarding
  onboarding: {
    welcome: string
    tagline: string
    welcomeDesc: string
    getStarted: string
    tellUs: string
    tellUsDesc: string
    yourName: string
    focusTitle: string
    focusDesc: string
    finishSetup: string
    focusOptions: {
      universities: string
      activities: string
      essays: string
      deadlines: string
      documents: string
      honors: string
    }
  }

  // Guides
  guides: {
    title: string
    subtitle: string
  }

  // Examples
  examples: {
    title: string
    subtitle: string
  }

  // Checklist
  checklist: {
    title: string
    subtitle: string
  }
}
