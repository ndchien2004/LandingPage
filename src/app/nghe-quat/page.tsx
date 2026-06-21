import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { CraftPageTemplate } from "@/components/craft/CraftPageTemplate";
import { getCraft } from "@/data/crafts";

const craft = getCraft("nghe-quat")!;

export const metadata: Metadata = {
  title: craft.name,
  description: craft.hero.subtitle,
};

export default function NgheQuatPage() {
  return (
    <SiteShell>
      <CraftPageTemplate craft={craft} />
    </SiteShell>
  );
}
