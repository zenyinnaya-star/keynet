create table public.wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

alter table public.wishlists enable row level security;

create policy "Users can view their own wishlist"
  on public.wishlists for select
  using (auth.uid() = user_id);

create policy "Users can add to their own wishlist"
  on public.wishlists for insert
  with check (auth.uid() = user_id);

create policy "Users can remove from their own wishlist"
  on public.wishlists for delete
  using (auth.uid() = user_id);
