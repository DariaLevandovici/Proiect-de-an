import { HeroCarousel } from "@/pages/Home/sections/HeroCarousel";
import { MenuSection } from "@/pages/Home/sections/MenuSection";

export function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <MenuSection />
    </main>
  );
}