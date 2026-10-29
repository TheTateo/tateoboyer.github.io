-- Shared portfolio data used by the public pages and the admin.
-- Replace the UUID below with the value of VITE_ADMIN_USER_ID before running
-- this script in the Supabase SQL editor.

create table if not exists public.portfolio_data (
  key text primary key,
  data jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_data enable row level security;

grant select on public.portfolio_data to anon, authenticated;
grant insert, update, delete on public.portfolio_data to authenticated;

drop policy if exists "Portfolio data is publicly readable" on public.portfolio_data;
create policy "Portfolio data is publicly readable"
  on public.portfolio_data
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Only the portfolio admin can write data" on public.portfolio_data;
create policy "Only the portfolio admin can write data"
  on public.portfolio_data
  for all
  to authenticated
  using (auth.uid() = 'REPLACE_WITH_VITE_ADMIN_USER_ID'::uuid)
  with check (auth.uid() = 'REPLACE_WITH_VITE_ADMIN_USER_ID'::uuid);

create or replace function public.set_portfolio_data_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portfolio_data_updated_at on public.portfolio_data;
create trigger portfolio_data_updated_at
  before update on public.portfolio_data
  for each row execute function public.set_portfolio_data_updated_at();
