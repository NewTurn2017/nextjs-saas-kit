#!/usr/bin/env bun
/**
 * Environment validation script
 * Run this to check if all required environment variables are set
 */

import { z } from 'zod'
import fs from 'fs'
import path from 'path'

const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().startsWith('https://'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SECRET_KEY: z.string().min(1),
  SUPABASE_JWT_SECRET: z.string().min(1),
  
  // Email
  EMAIL_SERVER_USER: z.string().email(),
  EMAIL_SERVER_PASSWORD: z.string().min(1),
  EMAIL_SERVER_HOST: z.string().min(1),
  EMAIL_SERVER_PORT: z.string().regex(/^\d+$/),
  EMAIL_FROM: z.string().email(),
  
  // Google OAuth
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
  AUTH_SECRET: z.string().min(32),
})

// Load .env.local file
function loadEnvFile(): Record<string, string> {
  const envPath = path.join(process.cwd(), '.env.local')
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found!')
    console.error('Please create .env.local from .env.example:')
    console.error('  cp .env.example .env.local')
    process.exit(1)
  }
  
  const envContent = fs.readFileSync(envPath, 'utf-8')
  const env: Record<string, string> = {}
  
  envContent.split('\n').forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=')
      if (key && value) {
        env[key.trim()] = value.trim()
      }
    }
  })
  
  return env
}

// Check environment variables
function checkEnv() {
  console.log('🔍 Checking environment variables...\n')
  
  const env = loadEnvFile()
  
  try {
    envSchema.parse(env)
    console.log('✅ All environment variables are valid!\n')
    console.log('You can now run:')
    console.log('  bun dev')
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:\n')
      
      const missing = error.errors
        .filter(err => err.code === 'invalid_type' && err.received === 'undefined')
        .map(err => err.path[0])
      
      const invalid = error.errors
        .filter(err => !(err.code === 'invalid_type' && err.received === 'undefined'))
      
      if (missing.length > 0) {
        console.error('Missing environment variables:')
        missing.forEach(name => {
          console.error(`  ❌ ${name}`)
        })
        console.error('')
      }
      
      if (invalid.length > 0) {
        console.error('Invalid environment variables:')
        invalid.forEach(err => {
          const name = err.path[0]
          console.error(`  ❌ ${name}: ${err.message}`)
        })
        console.error('')
      }
      
      console.error('Please update your .env.local file with the correct values.')
      console.error('Refer to the README.md for setup instructions.')
      console.error('')
      console.error('⚠️  Common issues:')
      console.error('  - Make sure values do NOT have quotes around them')
      console.error('  - SUPABASE_SECRET_KEY must be the Service Role Key (not Anon Key)')
      console.error('  - Check for trailing spaces in your values')
      
      process.exit(1)
    }
  }
}

checkEnv()