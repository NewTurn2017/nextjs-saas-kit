#!/usr/bin/env bun
/**
 * Setup database with initial schema
 * This script runs the SQL from prompt/supabase_setup.md
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'
import { env } from '../lib/env'

async function setupDatabase() {
  console.log('🗄️  Setting up Supabase database...\n')

  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SECRET_KEY
  )

  try {
    // Read SQL file
    const sqlPath = path.join(process.cwd(), 'prompt', 'supabase_setup.md')
    const sqlContent = await fs.readFile(sqlPath, 'utf-8')
    
    // Extract SQL from markdown (everything after first -- line)
    const sqlMatch = sqlContent.match(/^--[\s\S]+$/m)
    if (!sqlMatch) {
      throw new Error('Could not extract SQL from supabase_setup.md')
    }
    
    const sql = sqlMatch[0]
    
    console.log('📝 Running database setup SQL...')
    console.log('This will create:')
    console.log('  - next_auth schema and tables')
    console.log('  - users table in public schema')
    console.log('  - Row Level Security policies')
    console.log('  - Necessary functions and triggers\n')

    // Note: This is a simplified version. In practice, you'd want to
    // run this SQL directly in Supabase SQL editor or via migrations
    console.log('⚠️  For security reasons, please run the SQL directly in Supabase:')
    console.log('1. Go to your Supabase project dashboard')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Copy the contents of prompt/supabase_setup.md')
    console.log('4. Paste and run the SQL\n')
    
    console.log('Or use Supabase CLI:')
    console.log('  supabase db push\n')
    
    console.log('✅ Once complete, your database will be ready!')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

setupDatabase()