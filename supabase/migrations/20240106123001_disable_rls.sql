-- Disable RLS for development
alter table users disable row level security;
alter table flashcards disable row level security;

-- Grant necessary privileges
grant all privileges on all tables in schema public to anon;
grant all privileges on all tables in schema public to authenticated;
grant usage on all sequences in schema public to anon;
grant usage on all sequences in schema public to authenticated;
