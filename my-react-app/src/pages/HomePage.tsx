import { Header } from '../components/layout/Header';
import { HeroCarousel } from './Home/sections/HeroCarousel';
import { MenuSection } from './Home/sections/MenuSection';
import { Footer } from '../components/layout/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Header />
      <main>
        <HeroCarousel />
        <MenuSection />
      </main>
      <Footer />
    </div>
  );
}
