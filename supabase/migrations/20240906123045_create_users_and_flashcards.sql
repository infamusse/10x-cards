-- Migration: Create users and flashcards tables
-- Description: Creates the initial schema for the flashcard application
-- Tables: users, flashcards
-- Author: AI Assistant
-- Date: 2024-09-06

-- Create the users table
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  hashed_password text not null,
  created_at timestamptz not null default now()
);

-- Add comments to the users table
comment on table users is 'Table storing user account information';
comment on column users.id is 'Unique identifier for the user';
comment on column users.email is 'User email address, must be unique';
comment on column users.hashed_password is 'Securely hashed user password';
comment on column users.created_at is 'Timestamp when the user account was created';

-- Create the flashcards table
create table if not exists flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  front_text text not null,
  back_text text not null,
  category text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add comments to the flashcards table
comment on table flashcards is 'Table storing user flashcards for learning';
comment on column flashcards.id is 'Unique identifier for the flashcard';
comment on column flashcards.user_id is 'Reference to the user who owns this flashcard';
comment on column flashcards.front_text is 'Text displayed on the front of the flashcard';
comment on column flashcards.back_text is 'Text displayed on the back of the flashcard';
comment on column flashcards.category is 'Optional category or tag for the flashcard';
comment on column flashcards.metadata is 'JSON metadata for storing study progress and spaced repetition data';
comment on column flashcards.created_at is 'Timestamp when the flashcard was created';
comment on column flashcards.updated_at is 'Timestamp when the flashcard was last updated';

-- Create index for performance optimization
create index if not exists idx_flashcards_user_id on flashcards(user_id);

-- Enable Row Level Security
alter table users enable row level security;
alter table flashcards enable row level security;

-- Function to get the current user id from claims
create or replace function get_auth_user_id()
returns uuid
language sql stable
as $$
  select auth.uid()
$$;

-- RLS Policies for users table

-- Allow users to select only their own data
create policy users_select_policy
  on users
  for select
  to authenticated
  using (id = get_auth_user_id());

-- Prevent users from inserting new user records (should be handled by auth system)
create policy users_insert_policy
  on users
  for insert
  to authenticated
  with check (false);

-- Allow users to update only their own data
create policy users_update_policy
  on users
  for update
  to authenticated
  using (id = get_auth_user_id())
  with check (id = get_auth_user_id());

-- Prevent users from deleting user records (should be handled by admin)
create policy users_delete_policy
  on users
  for delete
  to authenticated
  using (false);

-- No access for anonymous users
create policy users_anon_policy
  on users
  for all
  to anon
  using (false);

-- RLS Policies for flashcards table

-- Allow authenticated users to select their own flashcards
create policy flashcards_select_policy
  on flashcards
  for select
  to authenticated
  using (user_id = get_auth_user_id());

-- Allow authenticated users to insert their own flashcards
create policy flashcards_insert_policy
  on flashcards
  for insert
  to authenticated
  with check (user_id = get_auth_user_id());

-- Allow authenticated users to update their own flashcards
create policy flashcards_update_policy
  on flashcards
  for update
  to authenticated
  using (user_id = get_auth_user_id())
  with check (user_id = get_auth_user_id());

-- Allow authenticated users to delete their own flashcards
create policy flashcards_delete_policy
  on flashcards
  for delete
  to authenticated
  using (user_id = get_auth_user_id());

-- No access for anonymous users
create policy flashcards_anon_policy
  on flashcards
  for all
  to anon
  using (false);

-- Create a trigger to automatically update the updated_at timestamp
create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger flashcards_updated_at
  before update
  on flashcards
  for each row
  execute function update_updated_at();
