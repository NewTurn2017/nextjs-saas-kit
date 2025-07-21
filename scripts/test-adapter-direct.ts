#!/usr/bin/env bun
/**
 * Test SupabaseAdapter directly to understand what tables it's looking for
 */

import { SupabaseAdapter } from "@auth/supabase-adapter"
import { createClient } from '@supabase/supabase-js'
import { env } from '../lib/env'

async function testAdapter() {
  console.log('🔍 Testing SupabaseAdapter directly...\n')

  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SECRET_KEY
  )

  try {
    // Create adapter
    const adapter = SupabaseAdapter({
      url: env.NEXT_PUBLIC_SUPABASE_URL,
      secret: env.SUPABASE_SECRET_KEY,
    })

    console.log('✅ Adapter created successfully')
    console.log('Adapter methods:', Object.keys(adapter))

    // Test creating a user
    console.log('\n🧪 Testing user creation...')
    try {
      const testUser = await adapter.createUser({
        email: 'test@example.com',
        emailVerified: null,
      })
      console.log('✅ User created:', testUser)
      
      // Clean up
      if (testUser?.id) {
        await adapter.deleteUser(testUser.id)
        console.log('🧹 Test user cleaned up')
      }
    } catch (error: any) {
      console.error('❌ User creation failed:', error.message)
      console.error('Error details:', error)
    }

  } catch (error) {
    console.error('❌ Adapter creation failed:', error)
  }
}

testAdapter()