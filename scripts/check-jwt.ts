#!/usr/bin/env bun
/**
 * Check JWT token to verify it's service role
 */

import { env } from '../lib/env'

function decodeJWT(token: string) {
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format')
  }
  
  const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
  return payload
}

console.log('🔍 Checking Supabase keys...\n')

try {
  // Check service role key
  const servicePayload = decodeJWT(env.SUPABASE_SECRET_KEY)
  console.log('Service Role Key Payload:')
  console.log(JSON.stringify(servicePayload, null, 2))
  console.log('\nRole:', servicePayload.role)
  console.log('Is service_role?', servicePayload.role === 'service_role' ? '✅ Yes' : '❌ No')
  
  // Check anon key
  const anonPayload = decodeJWT(env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  console.log('\n\nAnon Key Payload:')
  console.log(JSON.stringify(anonPayload, null, 2))
  console.log('\nRole:', anonPayload.role)
  console.log('Is anon?', anonPayload.role === 'anon' ? '✅ Yes' : '❌ No')
  
} catch (error) {
  console.error('Error decoding JWT:', error)
}