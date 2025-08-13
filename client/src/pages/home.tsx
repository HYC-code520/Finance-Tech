import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import DecorativeLine from "@/components/decorative-line";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg text-white font-sans" data-testid="home-page">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Mobile Responsive Container */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4" data-testid="mobile-container">
        <DecorativeLine width="w-full" className="h-2 opacity-50" />
      </div>
    </div>
  );
}
