-- Run this in your Supabase SQL Editor
-- Table: user_cities
CREATE TABLE IF NOT EXISTS public.user_cities (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  city_name    TEXT NOT NULL,
  country_code TEXT DEFAULT '',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_cities ENABLE ROW LEVEL SECURITY;

-- Policies: users can only see/edit their own cities
CREATE POLICY "Users can view own cities"
  ON public.user_cities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cities"
  ON public.user_cities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cities"
  ON public.user_cities FOR DELETE
  USING (auth.uid() = user_id);
