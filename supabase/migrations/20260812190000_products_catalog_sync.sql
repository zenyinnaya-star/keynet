-- The app's product catalog (src/lib/products.ts) grew to 10 products while
-- this table only ever had the original 4 headphones seeded. This migration
-- adds image columns (previously only tracked in the static file) and syncs
-- all 10 products so checkout can resolve a real product_id for every slug.

alter table public.products
  add column image text,
  add column image_width integer,
  add column image_height integer;

insert into public.products
  (slug, name, price, tagline, description, watermark, filter, specs, stock, image, image_width, image_height)
values
  (
    'midnight-black', 'Midnight Black', 249,
    'The original. Studio-tuned and built to disappear into the background.',
    'The Axiom Midnight Black is where it all started — a matte-finish, all-black build with tuned drivers and active noise cancellation for hours of distraction-free listening.',
    'MIDNIGHT', 'brightness(0.4) contrast(1.3) saturate(0.9)',
    '[{"label":"Driver size","value":"40mm"},{"label":"Battery life","value":"30 hours"},{"label":"Weight","value":"260g"},{"label":"Noise cancellation","value":"Active"},{"label":"Connectivity","value":"Bluetooth 5.3, 3.5mm"}]'::jsonb,
    100, '/hero-headphones-3d.webp', 840, 985
  ),
  (
    'studio-white', 'Studio White', 249,
    'Same tuning, a brighter build for the studio and everyday desk setup.',
    'Studio White takes the same driver and ANC setup as the original and wraps it in a clean, bright finish that looks at home next to your monitor as much as on your commute.',
    'STUDIO', 'brightness(1.55) contrast(0.85) saturate(0.3)',
    '[{"label":"Driver size","value":"40mm"},{"label":"Battery life","value":"28 hours"},{"label":"Weight","value":"255g"},{"label":"Noise cancellation","value":"Active"},{"label":"Connectivity","value":"Bluetooth 5.3, 3.5mm"}]'::jsonb,
    100, '/hero-headphones-3d.webp', 840, 985
  ),
  (
    'slate-grey', 'Slate Grey', 249,
    'A cooler, understated finish for everyday carry.',
    'Slate Grey splits the difference between Midnight Black and Studio White — a muted, cool-toned finish with the longest battery life in the lineup.',
    'SLATE', 'sepia(0.2) hue-rotate(190deg) saturate(1.1) brightness(0.95)',
    '[{"label":"Driver size","value":"40mm"},{"label":"Battery life","value":"32 hours"},{"label":"Weight","value":"265g"},{"label":"Noise cancellation","value":"Active"},{"label":"Connectivity","value":"Bluetooth 5.3, 3.5mm"}]'::jsonb,
    100, '/hero-headphones-3d.webp', 840, 985
  ),
  (
    'crimson-red', 'Crimson Red', 269,
    'A limited-run colorway for a bolder look.',
    'Crimson Red is a limited-run colorway on the same platform as the rest of the lineup, priced slightly higher to reflect the smaller production run.',
    'CRIMSON', 'sepia(1) saturate(4.5) hue-rotate(-52deg) brightness(0.85)',
    '[{"label":"Driver size","value":"40mm"},{"label":"Battery life","value":"26 hours"},{"label":"Weight","value":"258g"},{"label":"Noise cancellation","value":"Active"},{"label":"Connectivity","value":"Bluetooth 5.3, 3.5mm"}]'::jsonb,
    50, '/hero-headphones-3d.webp', 840, 985
  ),
  (
    'typeflow', 'Keynex TypeFlow', 89,
    'Smooth, responsive typing with a clean, minimalist design.',
    'Our first keyboard: a full-size layout tuned for consistent, comfortable typing, whether you''re studying, working, or typing through your day.',
    'TYPEFLOW', 'none',
    '[{"label":"Switch type","value":"Low-profile mechanical"},{"label":"Backlighting","value":"White backlight"},{"label":"Layout","value":"Full-size, 104-key"},{"label":"Connectivity","value":"USB-C, wired"},{"label":"Weight","value":"850g"}]'::jsonb,
    100, '/typeflow-keyboard.webp', 288, 161
  ),
  (
    'ultra-view-x', 'Keynex Ultra View X', 399,
    'Sharp detail, rich color, and a smooth viewing experience.',
    'Our first display: a 27-inch panel in a refined, modern frame, built for clarity and comfort whether you''re working, creating, or unwinding.',
    'ULTRAVIEW', 'none',
    '[{"label":"Screen size","value":"27 inch"},{"label":"Resolution","value":"4K UHD (3840x2160)"},{"label":"Panel type","value":"IPS"},{"label":"Refresh rate","value":"60Hz"},{"label":"Connectivity","value":"USB-C, HDMI"}]'::jsonb,
    100, '/ultra-view-x-monitor.webp', 930, 841
  ),
  (
    'vantage-wireless', 'Keynex Vantage Wireless', 199,
    'Wireless gaming audio with a boom mic that actually sounds clear.',
    'Our first gaming headset: a lightweight over-ear build with a detachable boom mic, tuned for long sessions and clear team calls without the wired tether.',
    'VANTAGE', 'none',
    '[{"label":"Driver size","value":"50mm"},{"label":"Battery life","value":"50 hours"},{"label":"Microphone","value":"Detachable boom, noise-cancelling"},{"label":"Connectivity","value":"2.4GHz wireless, USB-C"},{"label":"Weight","value":"320g"}]'::jsonb,
    100, '/vantage-wireless-headset.webp', 900, 1117
  ),
  (
    'vector-mouse', 'Keynex Vector', 59,
    'A lightweight wired mouse built for precise, responsive control.',
    'Our first mouse: a low-profile wired build with a smooth glide and a crisp click, designed to disappear into your setup while staying precise session after session.',
    'VECTOR', 'none',
    '[{"label":"Sensor","value":"Optical, 16000 DPI"},{"label":"Buttons","value":"6 programmable"},{"label":"Connectivity","value":"USB-C, wired"},{"label":"Weight","value":"79g"},{"label":"Cable","value":"1.8m paracord"}]'::jsonb,
    100, '/vector-mouse.webp', 918, 855
  ),
  (
    'swift-memory', 'Keynex Swift 16GB', 900,
    'Reliable, high-speed memory to keep everything running smoothly.',
    'Our first memory module: a 16GB DDR4 stick built for stable, everyday performance, whether you''re multitasking, gaming, or running heavier workloads.',
    'SWIFT', 'none',
    '[{"label":"Capacity","value":"16GB"},{"label":"Type","value":"DDR4"},{"label":"Speed","value":"3200MHz"},{"label":"Latency","value":"CL16"},{"label":"Voltage","value":"1.35V"}]'::jsonb,
    100, '/swift-memory.webp', 982, 630
  ),
  (
    'forge-14', 'Keynex Forge 14', 1299,
    'A 14-inch laptop built for speed, clarity, and all-day battery life.',
    'Our first laptop: a 14-inch machine in a precision-milled aluminum body, tuned for fast performance and a display sharp enough for both work and play.',
    'FORGE', 'none',
    '[{"label":"Display","value":"14 inch, 2.8K, 120Hz"},{"label":"Memory","value":"16GB unified"},{"label":"Storage","value":"512GB SSD"},{"label":"Battery life","value":"18 hours"},{"label":"Weight","value":"1.3kg"}]'::jsonb,
    100, '/forge-laptop.webp', 946, 658
  )
on conflict (slug) do update set
  name = excluded.name,
  price = excluded.price,
  tagline = excluded.tagline,
  description = excluded.description,
  watermark = excluded.watermark,
  filter = excluded.filter,
  specs = excluded.specs,
  image = excluded.image,
  image_width = excluded.image_width,
  image_height = excluded.image_height;
