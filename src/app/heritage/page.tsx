import type { Metadata } from "next";
import { HeritageTimeline } from "@/components/heritage/HeritageTimeline";

export const metadata: Metadata = {
  title: "Heritage | keynex",
};

// route wrapper, all the actual content lives in HeritageTimeline
export default function HeritagePage() {
  return <HeritageTimeline />;
}
