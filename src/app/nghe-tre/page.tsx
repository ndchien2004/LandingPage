import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { TreStory } from "@/components/craft/TreStory";
import { getCraft } from "@/data/crafts";

const craft = getCraft("nghe-tre")!;

export const metadata: Metadata = {
  title: craft.name,
  description: craft.hero.subtitle,
};

export default function NgheTrePage() {
  return (
    <SiteShell>
      <TreStory craft={craft} />
    </SiteShell>
  );
}
