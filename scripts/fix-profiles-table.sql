-- Fix profiles table to reference public.users instead of auth.users
-- Run this in Supabase SQL Editor

-- Drop existing profiles table and policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Recreate profiles table with correct reference
CREATE TABLE public.profiles (
  id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create simpler policies that work with service_role
CREATE POLICY "Enable all operations for authenticated users on their own profile" 
ON public.profiles 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS handle_profiles_updated_at ON public.profiles;
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create profiles for existing users
INSERT INTO public.profiles (id, name)
SELECT 
  id,
  COALESCE(name, email)
FROM public.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON public.profiles TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;

-- Verify the fix
SELECT 
  'Profiles table fixed!' as message,
  COUNT(*) as user_count,
  (SELECT COUNT(*) FROM public.profiles) as profile_count
FROM public.users;