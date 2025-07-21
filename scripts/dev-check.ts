#!/usr/bin/env bun
/**
 * Development environment checker
 * Ensures everything is properly set up before starting development
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

interface CheckResult {
  name: string
  passed: boolean
  message?: string
}

async function runChecks(): Promise<CheckResult[]> {
  const results: CheckResult[] = []

  // Check 1: Node.js version
  try {
    const nodeVersion = process.version
    const major = parseInt(nodeVersion.split('.')[0].substring(1))
    results.push({
      name: 'Node.js version',
      passed: major >= 18,
      message: major >= 18 
        ? `✅ Node.js ${nodeVersion}` 
        : `❌ Node.js ${nodeVersion} (requires >= 18)`
    })
  } catch {
    results.push({
      name: 'Node.js version',
      passed: false,
      message: '❌ Could not check Node.js version'
    })
  }

  // Check 2: Bun installed
  try {
    execSync('bun --version', { stdio: 'ignore' })
    results.push({
      name: 'Bun',
      passed: true,
      message: '✅ Bun is installed'
    })
  } catch {
    results.push({
      name: 'Bun',
      passed: false,
      message: '❌ Bun is not installed. Install from https://bun.sh'
    })
  }

  // Check 3: .env.local exists
  const envPath = path.join(process.cwd(), '.env.local')
  const envExists = fs.existsSync(envPath)
  results.push({
    name: '.env.local',
    passed: envExists,
    message: envExists 
      ? '✅ .env.local exists' 
      : '❌ .env.local not found. Run: cp .env.example .env.local'
  })

  // Check 4: Dependencies installed
  const nodeModulesExists = fs.existsSync(path.join(process.cwd(), 'node_modules'))
  results.push({
    name: 'Dependencies',
    passed: nodeModulesExists,
    message: nodeModulesExists 
      ? '✅ Dependencies installed' 
      : '❌ Dependencies not installed. Run: bun install'
  })

  // Check 5: Git repository
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' })
    results.push({
      name: 'Git',
      passed: true,
      message: '✅ Git repository initialized'
    })
  } catch {
    results.push({
      name: 'Git',
      passed: false,
      message: '⚠️  Not a git repository. Run: git init'
    })
  }

  return results
}

async function main() {
  console.log('🔍 Checking development environment...\n')

  const results = await runChecks()
  
  results.forEach(result => {
    console.log(`${result.name}: ${result.message}`)
  })

  const allPassed = results.every(r => r.passed)
  
  console.log('\n' + '='.repeat(50))
  
  if (allPassed) {
    console.log('✅ All checks passed! You can run: bun dev')
  } else {
    console.log('❌ Some checks failed. Please fix the issues above.')
    
    // If env.local is missing and dependencies are installed, suggest running check-env
    const envCheck = results.find(r => r.name === '.env.local')
    const depsCheck = results.find(r => r.name === 'Dependencies')
    
    if (!envCheck?.passed && depsCheck?.passed) {
      console.log('\nAfter creating .env.local, run: bun check-env')
    }
    
    process.exit(1)
  }
}

main()