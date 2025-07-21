#!/usr/bin/env bun
/**
 * Test SupabaseAdapter connection with service role key
 */

import { createClient } from '@supabase/supabase-js'
import { env } from '../lib/env'

async function testAdapterConnection() {
  console.log('🔍 Testing SupabaseAdapter connection...\n')

  // Test with service role key (same as adapter)
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SECRET_KEY
  )

  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing service role connection...')
    const { data: test, error: testError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Service role connection failed:', testError)
      return
    }
    console.log('✅ Service role connection successful!\n')

    // Test 2: Test getUserByAccount query
    console.log('2️⃣ Testing getUserByAccount query pattern...')
    const { data: accounts, error: accountError } = await supabase
      .from('accounts')
      .select('*, users!inner(*)')
      .eq('provider', 'google')
      .eq('providerAccountId', 'test-id')
      .single()
    
    if (accountError && accountError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('❌ Query pattern failed:', accountError)
    } else {
      console.log('✅ Query pattern works correctly!')
    }

    // Test 3: Check if we can insert
    console.log('\n3️⃣ Testing insert capability...')
    const testUser = {
      email: 'test-adapter@example.com',
      name: 'Test User',
      emailVerified: new Date()
    }
    
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert(testUser)
      .select()
      .single()
    
    if (insertError) {
      console.error('❌ Insert failed:', insertError)
    } else {
      console.log('✅ Insert successful:', newUser)
      
      // Clean up
      const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', newUser.id)
      
      if (!deleteError) {
        console.log('🧹 Test user cleaned up')
      }
    }

    // Test 4: Check environment variables
    console.log('\n4️⃣ Environment variables check:')
    console.log('NEXT_PUBLIC_SUPABASE_URL:', env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing')
    console.log('SUPABASE_SECRET_KEY:', env.SUPABASE_SECRET_KEY ? '✅ Set (length: ' + env.SUPABASE_SECRET_KEY.length + ')' : '❌ Missing')
    
    // Verify it's a service role key
    const isServiceRole = env.SUPABASE_SECRET_KEY?.includes('service_role')
    console.log('Is service role key:', isServiceRole ? '✅ Yes' : '⚠️  Check - should contain "service_role"')

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

testAdapterConnection()