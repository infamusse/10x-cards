-- Migration: Remove RLS policies from users and flashcards tables
-- Description: Drops all previously created RLS policies
-- Author: AI Assistant
-- Date: 2024-09-06

-- Drop policies for users table
drop policy if exists users_select_policy on users;
drop policy if exists users_insert_policy on users;
drop policy if exists users_update_policy on users;
drop policy if exists users_delete_policy on users;
drop policy if exists users_anon_policy on users;

-- Drop policies for flashcards table
drop policy if exists flashcards_select_policy on flashcards;
drop policy if exists flashcards_insert_policy on flashcards;
drop policy if exists flashcards_update_policy on flashcards;
drop policy if exists flashcards_delete_policy on flashcards;
drop policy if exists flashcards_anon_policy on flashcards;

-- Disable RLS on both tables
alter table users disable row level security;
alter table flashcards disable row level security;
