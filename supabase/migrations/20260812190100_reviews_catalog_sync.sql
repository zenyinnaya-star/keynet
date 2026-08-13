-- Seed reviews for the 6 products added after the original reviews migration
-- (20260805090200_reviews.sql), matching src/lib/products.ts verbatim. Guarded
-- with a NOT EXISTS check (unlike that migration) since this one may end up
-- pasted into the SQL editor by hand rather than tracked by `db push`, and
-- could plausibly be re-run.
insert into public.reviews (product_id, author, rating, comment, created_at)
select p.id, r.author, r.rating, r.comment, r.created_at
from (
  values
    ('typeflow', 'Chris B.', 5, 'Quiet enough for calls, still feels great to type on. Exactly what I wanted for the office.', timestamptz '2026-07-02'),
    ('typeflow', 'Elena M.', 4, 'Solid everyday keyboard. Wish it came in a smaller tenkeyless size too.', timestamptz '2026-06-20'),
    ('ultra-view-x', 'Priya N.', 5, 'Colors look great out of the box, barely needed to calibrate anything.', timestamptz '2026-07-10'),
    ('ultra-view-x', 'Marcus L.', 4, 'Great panel for the price. Would love a higher refresh rate option down the line.', timestamptz '2026-06-28'),
    ('vantage-wireless', 'Trevor K.', 5, 'Mic quality is way better than I expected for a wireless headset. Teammates stopped asking me to switch to my old wired one.', timestamptz '2026-07-20'),
    ('vantage-wireless', 'Amara O.', 4, 'Comfortable for long sessions. Battery easily gets me through a few days of after-work gaming.', timestamptz '2026-07-05'),
    ('vector-mouse', 'Noah T.', 5, 'Glides so smoothly and the click feels satisfying without being loud. Great for long work sessions.', timestamptz '2026-08-01'),
    ('vector-mouse', 'Ivy C.', 4, 'Light and comfortable in hand. Wish it came in a wireless version too.', timestamptz '2026-07-22'),
    ('swift-memory', 'Grace L.', 5, 'Installed it and everything just worked. Noticeably smoother multitasking on my old rig.', timestamptz '2026-08-05'),
    ('swift-memory', 'Felix B.', 5, 'Solid, no-frills upgrade. Ran for a week under heavy load without a hiccup.', timestamptz '2026-07-27'),
    ('forge-14', 'Ravi D.', 5, 'Fast, quiet, and the battery genuinely lasts me a full day of work without hunting for an outlet.', timestamptz '2026-08-10'),
    ('forge-14', 'Sofia W.', 5, 'Build quality feels premium and the screen is gorgeous for photo editing.', timestamptz '2026-07-31')
) as r(slug, author, rating, comment, created_at)
join public.products p on p.slug = r.slug
where not exists (
  select 1 from public.reviews existing
  where existing.product_id = p.id
    and existing.author = r.author
    and existing.comment = r.comment
);
