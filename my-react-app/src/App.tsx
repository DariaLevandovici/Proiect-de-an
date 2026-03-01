import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/Home/sections";

export default function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}