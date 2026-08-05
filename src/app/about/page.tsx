import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | keynet",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        About
      </h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        This is a starter page. Replace this content with information about
        your application.
      </p>
    </div>
  );
}
