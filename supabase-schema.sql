-- ============================================================
-- AdmitTrack Database Schema for Supabase
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable Row Level Security on all tables
-- Each table has user_id linked to auth.users

-- ── Profiles ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  high_school TEXT DEFAULT '',
  city TEXT DEFAULT '',
  state TEXT DEFAULT '',
  graduation_year INTEGER DEFAULT 2027,
  intended_majors JSONB DEFAULT '[]'::jsonb,
  gpa TEXT DEFAULT '',
  weighted_gpa TEXT DEFAULT '',
  class_rank TEXT DEFAULT '',
  test_scores JSONB DEFAULT '[]'::jsonb,
  strengths TEXT DEFAULT '',
  weaknesses TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  onboarding_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own profile" ON profiles
  FOR ALL USING (auth.uid() = user_id);

-- ── Universities ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS universities (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  state TEXT DEFAULT '',
  website TEXT DEFAULT '',
  application_type TEXT DEFAULT 'RD',
  status TEXT DEFAULT 'researching',
  notes TEXT DEFAULT '',
  requirements JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own universities" ON universities
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_universities_user ON universities(user_id);

-- ── Activities ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  category TEXT DEFAULT 'other',
  organization TEXT DEFAULT '',
  role TEXT DEFAULT '',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  ongoing BOOLEAN DEFAULT false,
  grades JSONB DEFAULT '[]'::jsonb,
  hours_per_week INTEGER DEFAULT 0,
  weeks_per_year INTEGER DEFAULT 0,
  description TEXT DEFAULT '',
  results TEXT DEFAULT '',
  links JSONB DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own activities" ON activities
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_activities_user ON activities(user_id);

-- ── Honors ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS honors (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  level TEXT DEFAULT 'school',
  issued_by TEXT DEFAULT '',
  date TEXT DEFAULT '',
  grade_received JSONB DEFAULT '[]'::jsonb,
  placement TEXT DEFAULT '',
  description TEXT DEFAULT '',
  significance TEXT DEFAULT '',
  link TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE honors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own honors" ON honors
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_honors_user ON honors(user_id);

-- ── Documents ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  category TEXT DEFAULT 'other',
  file_name TEXT DEFAULT '',
  file_size INTEGER DEFAULT 0,
  mime_type TEXT DEFAULT '',
  date_uploaded TEXT DEFAULT '',
  tags JSONB DEFAULT '[]'::jsonb,
  related_to TEXT DEFAULT '',
  comment TEXT DEFAULT '',
  file_data TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own documents" ON documents
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_documents_user ON documents(user_id);

-- ── Deadlines ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS deadlines (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  date TEXT DEFAULT '',
  time TEXT DEFAULT '',
  university_id TEXT DEFAULT '',
  university_name TEXT DEFAULT '',
  type TEXT DEFAULT 'application',
  priority TEXT DEFAULT 'high',
  status TEXT DEFAULT 'upcoming',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own deadlines" ON deadlines
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_deadlines_user ON deadlines(user_id);

-- ── Essays ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS essays (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  type TEXT DEFAULT 'personal_statement',
  prompt TEXT DEFAULT '',
  word_limit INTEGER DEFAULT 650,
  status TEXT DEFAULT 'brainstorming',
  current_content TEXT DEFAULT '',
  versions JSONB DEFAULT '[]'::jsonb,
  university_ids JSONB DEFAULT '[]'::jsonb,
  improvement_notes TEXT DEFAULT '',
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE essays ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own essays" ON essays
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_essays_user ON essays(user_id);

-- ── Research ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS research (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  type TEXT DEFAULT 'project',
  status TEXT DEFAULT 'idea',
  description TEXT DEFAULT '',
  topic TEXT DEFAULT '',
  published_at TEXT DEFAULT '',
  link TEXT DEFAULT '',
  own_contribution TEXT DEFAULT '',
  skills JSONB DEFAULT '[]'::jsonb,
  findings TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE research ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own research" ON research
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_research_user ON research(user_id);

-- ── Notes ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  content TEXT DEFAULT '',
  category TEXT DEFAULT 'general',
  tags JSONB DEFAULT '[]'::jsonb,
  linked_entities JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own notes" ON notes
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_notes_user ON notes(user_id);

-- ── Entity Links ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS entity_links (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL,
  source_id TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL
);

ALTER TABLE entity_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own entity links" ON entity_links
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_entity_links_user ON entity_links(user_id);

-- ── Checklist Items ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS checklist_items (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT DEFAULT '',
  label TEXT DEFAULT '',
  completed BOOLEAN DEFAULT false,
  description TEXT DEFAULT ''
);

ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own checklist items" ON checklist_items
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_checklist_user ON checklist_items(user_id);

-- ── Auto-create profile on signup ────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
