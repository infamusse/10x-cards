-- Create initial schema
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  hashed_password text not null,
  created_at timestamptz not null default now()
);

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

-- Create index for performance optimization
create index if not exists idx_flashcards_user_id on flashcards(user_id);

-- Initial RLS setup (will be disabled in next migration)
alter table users enable row level security;
alter table flashcards enable row level security;

-- Add test user
INSERT INTO users (
  id,
  email,
  hashed_password,
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'test@example.com',
  'not-a-real-hash',
  now()
) ON CONFLICT (id) DO NOTHING;
