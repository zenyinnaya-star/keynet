export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type Spec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  watermark: string;
  filter: string;
  tagline: string;
  description: string;
  specs: Spec[];
  reviews: Review[];
};

const HEADPHONE_IMAGE = "/hero-headphones-3d.webp";
const HEADPHONE_IMAGE_SIZE = { imageWidth: 840, imageHeight: 985 };

// hardcoded product catalog — the headphone variants share one product photo, tinted per color via CSS filter
export const PRODUCTS: Product[] = [
  {
    slug: "midnight-black",
    name: "Midnight Black",
    price: 249,
    image: HEADPHONE_IMAGE,
    ...HEADPHONE_IMAGE_SIZE,
    watermark: "MIDNIGHT",
    filter: "brightness(0.4) contrast(1.3) saturate(0.9)",
    tagline: "The original. Studio-tuned and built to disappear into the background.",
    description:
      "The Axiom Midnight Black is where it all started — a matte-finish, all-black build with tuned drivers and active noise cancellation for hours of distraction-free listening.",
    specs: [
      { label: "Driver size", value: "40mm" },
      { label: "Battery life", value: "30 hours" },
      { label: "Weight", value: "260g" },
      { label: "Noise cancellation", value: "Active" },
      { label: "Connectivity", value: "Bluetooth 5.3, 3.5mm" },
    ],
    reviews: [
      {
        id: "mb-1",
        author: "Jordan P.",
        rating: 5,
        comment:
          "Been using these daily for work calls and music for a month now. ANC is genuinely good and they don't clamp my head like my old pair did.",
        date: "2026-06-02",
      },
      {
        id: "mb-2",
        author: "Alicia R.",
        rating: 4,
        comment:
          "Sound is great, battery life is as advertised. Only docking a star because the carrying case feels a bit flimsy.",
        date: "2026-05-14",
      },
      {
        id: "mb-3",
        author: "Theo M.",
        rating: 5,
        comment: "Best headphones I've owned at this price point, easily.",
        date: "2026-04-29",
      },
    ],
  },
  {
    slug: "studio-white",
    name: "Studio White",
    price: 249,
    image: HEADPHONE_IMAGE,
    ...HEADPHONE_IMAGE_SIZE,
    watermark: "STUDIO",
    filter: "brightness(1.55) contrast(0.85) saturate(0.3)",
    tagline: "Same tuning, a brighter build for the studio and everyday desk setup.",
    description:
      "Studio White takes the same driver and ANC setup as the original and wraps it in a clean, bright finish that looks at home next to your monitor as much as on your commute.",
    specs: [
      { label: "Driver size", value: "40mm" },
      { label: "Battery life", value: "28 hours" },
      { label: "Weight", value: "255g" },
      { label: "Noise cancellation", value: "Active" },
      { label: "Connectivity", value: "Bluetooth 5.3, 3.5mm" },
    ],
    reviews: [
      {
        id: "sw-1",
        author: "Priya K.",
        rating: 5,
        comment: "The white finish shows fingerprints more than I expected but the sound quality makes up for it.",
        date: "2026-06-10",
      },
      {
        id: "sw-2",
        author: "Marcus D.",
        rating: 4,
        comment: "Battery life is slightly shorter than I hoped but still gets me through a full week of commutes.",
        date: "2026-05-22",
      },
    ],
  },
  {
    slug: "slate-grey",
    name: "Slate Grey",
    price: 249,
    image: HEADPHONE_IMAGE,
    ...HEADPHONE_IMAGE_SIZE,
    watermark: "SLATE",
    filter: "sepia(0.2) hue-rotate(190deg) saturate(1.1) brightness(0.95)",
    tagline: "A cooler, understated finish for everyday carry.",
    description:
      "Slate Grey splits the difference between Midnight Black and Studio White — a muted, cool-toned finish with the longest battery life in the lineup.",
    specs: [
      { label: "Driver size", value: "40mm" },
      { label: "Battery life", value: "32 hours" },
      { label: "Weight", value: "265g" },
      { label: "Noise cancellation", value: "Active" },
      { label: "Connectivity", value: "Bluetooth 5.3, 3.5mm" },
    ],
    reviews: [
      {
        id: "sg-1",
        author: "Nina F.",
        rating: 5,
        comment: "Longest battery life of any headphones I've owned. Genuinely lasts me the whole work week.",
        date: "2026-06-18",
      },
      {
        id: "sg-2",
        author: "Owen S.",
        rating: 3,
        comment:
          "Sound and battery are great but the grey finish picks up scuffs pretty easily on the ear cups.",
        date: "2026-05-01",
      },
      {
        id: "sg-3",
        author: "Layla H.",
        rating: 5,
        comment: "My favorite color of the lineup, understated and doesn't show wear.",
        date: "2026-04-11",
      },
    ],
  },
  {
    slug: "crimson-red",
    name: "Crimson Red",
    price: 269,
    image: HEADPHONE_IMAGE,
    ...HEADPHONE_IMAGE_SIZE,
    watermark: "CRIMSON",
    filter: "sepia(1) saturate(4.5) hue-rotate(-52deg) brightness(0.85)",
    tagline: "A limited-run colorway for a bolder look.",
    description:
      "Crimson Red is a limited-run colorway on the same platform as the rest of the lineup, priced slightly higher to reflect the smaller production run.",
    specs: [
      { label: "Driver size", value: "40mm" },
      { label: "Battery life", value: "26 hours" },
      { label: "Weight", value: "258g" },
      { label: "Noise cancellation", value: "Active" },
      { label: "Connectivity", value: "Bluetooth 5.3, 3.5mm" },
    ],
    reviews: [
      {
        id: "cr-1",
        author: "Diego V.",
        rating: 5,
        comment: "Worth the extra cost just for how these look. Glad I grabbed a pair before they sold out.",
        date: "2026-06-25",
      },
      {
        id: "cr-2",
        author: "Sam T.",
        rating: 4,
        comment: "Battery life is the shortest of the four colorways but still gets me through a full day.",
        date: "2026-05-30",
      },
    ],
  },
  {
    slug: "typeflow",
    name: "Keynex TypeFlow",
    price: 89,
    image: "/typeflow-keyboard.webp",
    imageWidth: 288,
    imageHeight: 161,
    watermark: "TYPEFLOW",
    filter: "none",
    tagline: "Smooth, responsive typing with a clean, minimalist design.",
    description:
      "Our first keyboard: a full-size layout tuned for consistent, comfortable typing, whether you're studying, working, or typing through your day.",
    specs: [
      { label: "Switch type", value: "Low-profile mechanical" },
      { label: "Backlighting", value: "White backlight" },
      { label: "Layout", value: "Full-size, 104-key" },
      { label: "Connectivity", value: "USB-C, wired" },
      { label: "Weight", value: "850g" },
    ],
    reviews: [
      {
        id: "tf-1",
        author: "Chris B.",
        rating: 5,
        comment: "Quiet enough for calls, still feels great to type on. Exactly what I wanted for the office.",
        date: "2026-07-02",
      },
      {
        id: "tf-2",
        author: "Elena M.",
        rating: 4,
        comment: "Solid everyday keyboard. Wish it came in a smaller tenkeyless size too.",
        date: "2026-06-20",
      },
    ],
  },
  {
    slug: "ultra-view-x",
    name: "Keynex Ultra View X",
    price: 399,
    image: "/ultra-view-x-monitor.webp",
    imageWidth: 930,
    imageHeight: 841,
    watermark: "ULTRAVIEW",
    filter: "none",
    tagline: "Sharp detail, rich color, and a smooth viewing experience.",
    description:
      "Our first display: a 27-inch panel in a refined, modern frame, built for clarity and comfort whether you're working, creating, or unwinding.",
    specs: [
      { label: "Screen size", value: "27 inch" },
      { label: "Resolution", value: "4K UHD (3840x2160)" },
      { label: "Panel type", value: "IPS" },
      { label: "Refresh rate", value: "60Hz" },
      { label: "Connectivity", value: "USB-C, HDMI" },
    ],
    reviews: [
      {
        id: "uvx-1",
        author: "Priya N.",
        rating: 5,
        comment: "Colors look great out of the box, barely needed to calibrate anything.",
        date: "2026-07-10",
      },
      {
        id: "uvx-2",
        author: "Marcus L.",
        rating: 4,
        comment: "Great panel for the price. Would love a higher refresh rate option down the line.",
        date: "2026-06-28",
      },
    ],
  },
  {
    slug: "vantage-wireless",
    name: "Keynex Vantage Wireless",
    price: 199,
    image: "/vantage-wireless-headset.webp",
    imageWidth: 900,
    imageHeight: 1117,
    watermark: "VANTAGE",
    filter: "none",
    tagline: "Wireless gaming audio with a boom mic that actually sounds clear.",
    description:
      "Our first gaming headset: a lightweight over-ear build with a detachable boom mic, tuned for long sessions and clear team calls without the wired tether.",
    specs: [
      { label: "Driver size", value: "50mm" },
      { label: "Battery life", value: "50 hours" },
      { label: "Microphone", value: "Detachable boom, noise-cancelling" },
      { label: "Connectivity", value: "2.4GHz wireless, USB-C" },
      { label: "Weight", value: "320g" },
    ],
    reviews: [
      {
        id: "vw-1",
        author: "Trevor K.",
        rating: 5,
        comment: "Mic quality is way better than I expected for a wireless headset. Teammates stopped asking me to switch to my old wired one.",
        date: "2026-07-20",
      },
      {
        id: "vw-2",
        author: "Amara O.",
        rating: 4,
        comment: "Comfortable for long sessions. Battery easily gets me through a few days of after-work gaming.",
        date: "2026-07-05",
      },
    ],
  },
  {
    slug: "vector-mouse",
    name: "Keynex Vector",
    price: 59,
    image: "/vector-mouse.webp",
    imageWidth: 918,
    imageHeight: 855,
    watermark: "VECTOR",
    filter: "none",
    tagline: "A lightweight wired mouse built for precise, responsive control.",
    description:
      "Our first mouse: a low-profile wired build with a smooth glide and a crisp click, designed to disappear into your setup while staying precise session after session.",
    specs: [
      { label: "Sensor", value: "Optical, 16000 DPI" },
      { label: "Buttons", value: "6 programmable" },
      { label: "Connectivity", value: "USB-C, wired" },
      { label: "Weight", value: "79g" },
      { label: "Cable", value: "1.8m paracord" },
    ],
    reviews: [
      {
        id: "vm-1",
        author: "Noah T.",
        rating: 5,
        comment: "Glides so smoothly and the click feels satisfying without being loud. Great for long work sessions.",
        date: "2026-08-01",
      },
      {
        id: "vm-2",
        author: "Ivy C.",
        rating: 4,
        comment: "Light and comfortable in hand. Wish it came in a wireless version too.",
        date: "2026-07-22",
      },
    ],
  },
  {
    slug: "swift-memory",
    name: "Keynex Swift 16GB",
    price: 900,
    image: "/swift-memory.webp",
    imageWidth: 982,
    imageHeight: 630,
    watermark: "SWIFT",
    filter: "none",
    tagline: "Reliable, high-speed memory to keep everything running smoothly.",
    description:
      "Our first memory module: a 16GB DDR4 stick built for stable, everyday performance, whether you're multitasking, gaming, or running heavier workloads.",
    specs: [
      { label: "Capacity", value: "16GB" },
      { label: "Type", value: "DDR4" },
      { label: "Speed", value: "3200MHz" },
      { label: "Latency", value: "CL16" },
      { label: "Voltage", value: "1.35V" },
    ],
    reviews: [
      {
        id: "sm-1",
        author: "Grace L.",
        rating: 5,
        comment: "Installed it and everything just worked. Noticeably smoother multitasking on my old rig.",
        date: "2026-08-05",
      },
      {
        id: "sm-2",
        author: "Felix B.",
        rating: 5,
        comment: "Solid, no-frills upgrade. Ran for a week under heavy load without a hiccup.",
        date: "2026-07-27",
      },
    ],
  },
  {
    slug: "forge-14",
    name: "Keynex Forge 14",
    price: 1299,
    image: "/forge-laptop.webp",
    imageWidth: 946,
    imageHeight: 658,
    watermark: "FORGE",
    filter: "none",
    tagline: "A 14-inch laptop built for speed, clarity, and all-day battery life.",
    description:
      "Our first laptop: a 14-inch machine in a precision-milled aluminum body, tuned for fast performance and a display sharp enough for both work and play.",
    specs: [
      { label: "Display", value: "14 inch, 2.8K, 120Hz" },
      { label: "Memory", value: "16GB unified" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Battery life", value: "18 hours" },
      { label: "Weight", value: "1.3kg" },
    ],
    reviews: [
      {
        id: "f14-1",
        author: "Ravi D.",
        rating: 5,
        comment: "Fast, quiet, and the battery genuinely lasts me a full day of work without hunting for an outlet.",
        date: "2026-08-10",
      },
      {
        id: "f14-2",
        author: "Sofia W.",
        rating: 5,
        comment: "Build quality feels premium and the screen is gorgeous for photo editing.",
        date: "2026-07-31",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

// average star rating across all reviews, 0 if there are none yet
export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
}
