import type { Metadata } from "next";
import { HeritageTimeline } from "@/components/heritage/HeritageTimeline";

export const metadata: Metadata = {
  title: "Heritage | keynex",
};

export default function HeritagePage() {
  return <HeritageTimeline />;
}
