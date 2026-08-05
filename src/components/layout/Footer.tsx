export function Footer() {
  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} keynet. All rights reserved.
      </div>
    </footer>
  );
}
