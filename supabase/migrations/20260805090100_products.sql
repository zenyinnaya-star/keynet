create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price numeric(10, 2) not null,
  tagline text,
  description text,
  watermark text,
  filter text,
  specs jsonb not null default '[]'::jsonb,
  stock integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Products are viewable by everyone"
  on public.products for select
  using (true);

create trigger set_products_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

-- Seed with the catalog that currently lives in src/lib/products.ts
insert into public.products (slug, name, price, tagline, description, watermark, filter, specs, stock)
values
  (
    'midnight-black', 'Midnight Black', 249,
    'The original. Studio-tuned and built to disappear into the background.',
    'The Axiom Midnight Black is where it all started — a matte-finish, all-black build with tuned drivers and active noise cancellation for hours of distraction-free listening.',
    'MIDNIGHT', 'brightness(0.4) contrast(1.3) saturate(0.9)',
    '[{"label":"Driver size","value":"40mm"},{"label":"Battery life","value":"30 hours"},{"label":"Weight","value":"260g"},{"label":"Noise cancellation","value":"Active"},{"label":"Connectivity","value":"Bluetooth 5.3, 3.5mm"}]'::jsonb,
    100
  ),
  (
    'studio-white', 'Studio White', 249,
    'Same tuning, a brighter build for the studio and everyday desk setup.',
    'Studio White takes the same driver and ANC setup as the original and wraps it in a clean, bright finish that looks at home next to your monitor as much as on your commute.',
    'STUDIO', 'brightness(1.55) contrast(0.85) saturate(0.3)',
    '[{"label":"Driver size","value":"40mm"},{"label":"Battery life","value":"28 hours"},{"label":"Weight","value":"255g"},{"label":"Noise cancellation","value":"Active"},{"label":"Connectivity","value":"Bluetooth 5.3, 3.5mm"}]'::jsonb,
    100
  ),
  (
    'slate-grey', 'Slate Grey', 249,
    'A cooler, understated finish for everyday carry.',
    'Slate Grey splits the difference between Midnight Black and Studio White — a muted, cool-toned finish with the longest battery life in the lineup.',
    'SLATE', 'sepia(0.2) hue-rotate(190deg) saturate(1.1) brightness(0.95)',
    '[{"label":"Driver size","value":"40mm"},{"label":"Battery life","value":"32 hours"},{"label":"Weight","value":"265g"},{"label":"Noise cancellation","value":"Active"},{"label":"Connectivity","value":"Bluetooth 5.3, 3.5mm"}]'::jsonb,
    100
  ),
  (
    'crimson-red', 'Crimson Red', 269,
    'A limited-run colorway for a bolder look.',
    'Crimson Red is a limited-run colorway on the same platform as the rest of the lineup, priced slightly higher to reflect the smaller production run.',
    'CRIMSON', 'sepia(1) saturate(4.5) hue-rotate(-52deg) brightness(0.85)',
    '[{"label":"Driver size","value":"40mm"},{"label":"Battery life","value":"26 hours"},{"label":"Weight","value":"258g"},{"label":"Noise cancellation","value":"Active"},{"label":"Connectivity","value":"Bluetooth 5.3, 3.5mm"}]'::jsonb,
    50
  );
