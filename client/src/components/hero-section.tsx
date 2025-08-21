import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import DecorativeLine from "./decorative-line";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  
  const handleSeeHowItWorks = () => {
    setLocation("/dashboard");
  };

  return (
    <main className="flex-1 flex items-center py-8 sm:py-12 md:py-16 lg:py-20 px-0 sm:px-4 md:px-8 lg:px-16 xl:px-24" data-testid="hero-section">
      <div className="max-w-4xl">
        {/* Decorative Tech Line Top */}
        <DecorativeLine width="w-48 sm:w-64 md:w-80 lg:w-96" className="mb-4 sm:mb-6 md:mb-8" />
        
        {/* Hero Title */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12" data-testid="hero-title">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight animate-ascend">
            <span className="text-white title-glow">Capital IQ</span>
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight animate-ascend-delayed">
            <span className="text-accent-cyan title-glow-cyan">Distiller</span>
          </h1>
        </div>

        {/* Decorative Tech Line Middle */}
        <DecorativeLine 
          width="w-32 sm:w-48 md:w-64 lg:w-80" 
          className="mb-4 sm:mb-6 md:mb-8 ml-2 sm:ml-4 md:ml-8" 
          animationDelay="0.5s" 
        />

        {/* Hero Subtitle */}
        <div className="mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" data-testid="hero-subtitle">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
            Transforming scattered client feedback into strategic, data-driven decisions
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex" data-testid="cta-section">
          <Button
            onClick={handleSeeHowItWorks}
            className="bg-accent-cyan text-primary-dark px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg button-glow transition-all duration-300"
            data-testid="cta-button"
          >
            See How It Works
          </Button>
        </div>
      </div>
    </main>
  );
}
