import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { CraftPageTemplate } from "@/components/craft/CraftPageTemplate";
import { getCraft } from "@/data/crafts";

const craft = getCraft("nghe-son")!;

export const metadata: Metadata = {
  title: craft.name,
  description: craft.hero.subtitle,
};

export default function NgheSonPage() {
  return (
    <SiteShell>
      <CraftPageTemplate craft={craft} />
    </SiteShell>
  );
}
