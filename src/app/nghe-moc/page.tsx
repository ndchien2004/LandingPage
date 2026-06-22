import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { MocStory } from "@/components/craft/MocStory";
import { getCraft } from "@/data/crafts";

const craft = getCraft("nghe-moc")!;

export const metadata: Metadata = {
  title: craft.name,
  description: craft.hero.subtitle,
};

export default function NgheMocPage() {
  return (
    <SiteShell>
      <MocStory craft={craft} />
    </SiteShell>
  );
}
