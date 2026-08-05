create type public.order_status as enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded');
create type public.transaction_status as enum ('pending', 'succeeded', 'failed', 'refunded');

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete restrict,
  status public.order_status not null default 'pending',
  subtotal numeric(10, 2) not null,
  total numeric(10, 2) not null,
  currency text not null default 'usd',
  shipping_address jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create trigger set_orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

alter table public.order_items enable row level security;

create policy "Users can view items on their own orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );

create policy "Users can add items to their own orders"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );

-- Stripe-oriented payment record, one (or more, for retries) per order.
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  stripe_payment_intent_id text unique,
  stripe_checkout_session_id text,
  stripe_customer_id text,
  amount numeric(10, 2) not null,
  currency text not null default 'usd',
  status public.transaction_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "Users can view transactions on their own orders"
  on public.transactions for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );

create trigger set_transactions_updated_at
  before update on public.transactions
  for each row execute procedure public.set_updated_at();

-- No insert/update policy for transactions: rows are written by the Stripe
-- webhook handler using the service role key, which bypasses RLS.
