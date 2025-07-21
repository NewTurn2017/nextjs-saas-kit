#!/usr/bin/env bun
/**
 * Clean up test users from database
 */

import { createClient } from '@supabase/supabase-js'
import { env } from '../lib/env'

async function cleanup() {
  console.log('🧹 Cleaning up existing test data...\n')

  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SECRET_KEY
  )

  try {
    // Delete all existing data to start fresh
    console.log('Deleting accounts...')
    const { error: accountsError } = await supabase
      .from('accounts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (accountsError) {
      console.error('Error deleting accounts:', accountsError)
    } else {
      console.log('✅ Accounts cleaned')
    }

    console.log('Deleting sessions...')
    const { error: sessionsError } = await supabase
      .from('sessions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (sessionsError) {
      console.error('Error deleting sessions:', sessionsError)
    } else {
      console.log('✅ Sessions cleaned')
    }

    console.log('Deleting users...')
    const { error: usersError } = await supabase
      .from('users')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (usersError) {
      console.error('Error deleting users:', usersError)
    } else {
      console.log('✅ Users cleaned')
    }

    console.log('\n✨ Database cleaned successfully!')
    console.log('You can now test Google OAuth with a fresh database.')

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

cleanup()