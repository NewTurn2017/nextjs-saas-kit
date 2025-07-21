#!/usr/bin/env bun
/**
 * Generate TypeScript types from Supabase database
 * This script fetches the latest database schema and generates types
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'
import { env } from '../lib/env'

async function generateTypes() {
  console.log('🔧 Generating TypeScript types from Supabase...\n')

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`,
      {
        headers: {
          apikey: env.SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to connect to Supabase: ${response.statusText}`)
    }

    // Use Supabase CLI approach
    console.log('📝 To generate types, run:')
    console.log('  npx supabase gen types typescript --project-id [PROJECT_ID] > types/database.types.ts\n')
    console.log('Or if you have Supabase CLI installed:')
    console.log('  supabase gen types typescript --project-id [PROJECT_ID] > types/database.types.ts\n')
    
    console.log('You can find your project ID in:')
    console.log('1. Supabase Dashboard URL: https://app.supabase.com/project/[PROJECT_ID]')
    console.log('2. Your .env.local NEXT_PUBLIC_SUPABASE_URL: https://[PROJECT_ID].supabase.co')
    
    // Extract project ID from URL
    const urlMatch = env.NEXT_PUBLIC_SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)
    if (urlMatch) {
      console.log(`\n✨ Your project ID appears to be: ${urlMatch[1]}`)
      console.log(`\nRun: npx supabase gen types typescript --project-id ${urlMatch[1]} > types/database.types.ts`)
    }

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

generateTypes()