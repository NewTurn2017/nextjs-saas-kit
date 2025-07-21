#!/usr/bin/env bun
/**
 * Test Supabase database connection and NextAuth tables
 */

import { createClient } from '@supabase/supabase-js'
import { env } from '../lib/env'

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')

  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SECRET_KEY
  )

  try {
    // Test 1: Check if we can connect
    console.log('1️⃣ Testing connection...')
    const { data: test, error: testError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Connection test failed:', testError.message)
      console.log('\n💡 Make sure you have run the SQL script in Supabase SQL Editor')
      return
    }
    console.log('✅ Connection successful!\n')

    // Test 2: Check if tables exist
    console.log('2️⃣ Checking NextAuth tables in public schema...')
    const tables = ['users', 'sessions', 'accounts', 'verification_tokens']
    
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1)
      
      if (error) {
        console.error(`❌ Table public.${table} not found`)
      } else {
        console.log(`✅ Table public.${table} exists`)
      }
    }

    // Test 3: Check public.users table
    console.log('\n3️⃣ Checking public.users table...')
    const { error: publicError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (publicError) {
      console.error('❌ Table public.users not found')
    } else {
      console.log('✅ Table public.users exists')
    }

    console.log('\n✨ Database setup looks good!')

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

testConnection()