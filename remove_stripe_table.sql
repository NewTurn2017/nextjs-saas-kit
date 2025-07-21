-- SQL script to remove Stripe-related database table
-- Run this in your Supabase SQL editor

-- Drop the stripe_customers table if it exists
DROP TABLE IF EXISTS stripe_customers CASCADE;

-- Verify the table has been removed
-- You can run this query to check:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'stripe_customers';