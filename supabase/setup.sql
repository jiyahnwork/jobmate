-- Create profiles table if it doesn't exist
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    email text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

-- Create policies
create policy "Users can view their own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Users can insert their own profile"
    on public.profiles for insert
    with check (auth.uid() = id);

create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = id);

-- Create or replace function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, created_at, updated_at)
    values (new.id, new.email, now(), now());
    return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger for new user signup
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Create profiles for existing users who don't have one
insert into public.profiles (id, email, created_at, updated_at)
select id, email, now(), now()
from auth.users
where id not in (select id from public.profiles)
on conflict (id) do nothing; 