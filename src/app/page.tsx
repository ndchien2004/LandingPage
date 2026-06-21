import { Header } from "@/components/layout/Header";
import { HeroLevelSelection } from "@/components/home/HeroLevelSelection";

export default function Home() {
  return (
    <>
      <Header variant="overlay" />
      <HeroLevelSelection />
    </>
  );
}
