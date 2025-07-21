import { z } from 'zod'

// Define the schema for environment variables
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
  
  // Optional
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

// Type for the environment variables
export type Env = z.infer<typeof envSchema>

// Validate environment variables
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.errors
        .filter(err => err.message === 'Required')
        .map(err => err.path.join('.'))
      
      const invalid = error.errors
        .filter(err => err.message !== 'Required')
        .map(err => `${err.path.join('.')}: ${err.message}`)
      
      console.error('❌ Environment validation failed:')
      
      if (missing.length > 0) {
        console.error('\nMissing environment variables:')
        missing.forEach(name => console.error(`  - ${name}`))
      }
      
      if (invalid.length > 0) {
        console.error('\nInvalid environment variables:')
        invalid.forEach(msg => console.error(`  - ${msg}`))
      }
      
      console.error('\nPlease check your .env.local file and ensure all required variables are set correctly.')
      
      throw new Error('Environment validation failed')
    }
    throw error
  }
}

// Export validated environment variables
export const env = process.env.NODE_ENV === 'production' 
  ? validateEnv() 
  : process.env as unknown as Env

// Helper to check if we're in development
export const isDev = process.env.NODE_ENV === 'development'

// Helper to check if we're in production
export const isProd = process.env.NODE_ENV === 'production'

// Export specific env vars for easier access
export const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
export const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const appUrl = env.NEXT_PUBLIC_APP_URL || (isDev ? 'http://localhost:3000' : '')