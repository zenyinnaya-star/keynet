create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete set null,
  author text not null,
  rating smallint not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Authenticated users can leave reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);

-- Seed with the reviews that currently live in src/lib/products.ts
insert into public.reviews (product_id, author, rating, comment, created_at)
select p.id, r.author, r.rating, r.comment, r.created_at
from (
  values
    ('midnight-black', 'Jordan P.', 5, 'Been using these daily for work calls and music for a month now. ANC is genuinely good and they don''t clamp my head like my old pair did.', timestamptz '2026-06-02'),
    ('midnight-black', 'Alicia R.', 4, 'Sound is great, battery life is as advertised. Only docking a star because the carrying case feels a bit flimsy.', timestamptz '2026-05-14'),
    ('midnight-black', 'Theo M.', 5, 'Best headphones I''ve owned at this price point, easily.', timestamptz '2026-04-29'),
    ('studio-white', 'Priya K.', 5, 'The white finish shows fingerprints more than I expected but the sound quality makes up for it.', timestamptz '2026-06-10'),
    ('studio-white', 'Marcus D.', 4, 'Battery life is slightly shorter than I hoped but still gets me through a full week of commutes.', timestamptz '2026-05-22'),
    ('slate-grey', 'Nina F.', 5, 'Longest battery life of any headphones I''ve owned. Genuinely lasts me the whole work week.', timestamptz '2026-06-18'),
    ('slate-grey', 'Owen S.', 3, 'Sound and battery are great but the grey finish picks up scuffs pretty easily on the ear cups.', timestamptz '2026-05-01'),
    ('slate-grey', 'Layla H.', 5, 'My favorite color of the lineup, understated and doesn''t show wear.', timestamptz '2026-04-11'),
    ('crimson-red', 'Diego V.', 5, 'Worth the extra cost just for how these look. Glad I grabbed a pair before they sold out.', timestamptz '2026-06-25'),
    ('crimson-red', 'Sam T.', 4, 'Battery life is the shortest of the four colorways but still gets me through a full day.', timestamptz '2026-05-30')
) as r(slug, author, rating, comment, created_at)
join public.products p on p.slug = r.slug;
