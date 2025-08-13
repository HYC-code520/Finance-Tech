import { Button } from "@/components/ui/button";
import DecorativeLine from "./decorative-line";

export default function HeroSection() {
  const handleSeeHowItWorks = () => {
    // TODO: Implement navigation to demo or explanation section
    console.log("See How It Works clicked");
  };

  return (
    <main className="flex-1 flex items-center justify-center px-8 lg:px-16 py-16" data-testid="hero-section">
      <div className="max-w-4xl w-full">
        {/* Decorative Tech Line Top */}
        <DecorativeLine width="w-96" className="mb-8" />
        
        {/* Hero Title */}
        <div className="mb-12" data-testid="hero-title">
          <h1 className="text-6xl lg:text-8xl font-bold mb-4 leading-tight animate-ascend">
            <span className="text-white title-glow">S&P</span>
          </h1>
          <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight animate-ascend-delayed">
            <span className="text-accent-cyan title-glow-cyan">Capital IQ</span>
          </h1>
        </div>

        {/* Decorative Tech Line Middle */}
        <DecorativeLine 
          width="w-80" 
          className="mb-8 ml-8" 
          animationDelay="0.5s" 
        />

        {/* Hero Subtitle */}
        <div className="mb-12 max-w-2xl" data-testid="hero-subtitle">
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
            Transforming scattered client feedback into strategic, data-driven decisions
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex justify-center" data-testid="cta-section">
          <div className="ml-32">
            <Button
              onClick={handleSeeHowItWorks}
              className="bg-accent-cyan text-primary-dark px-8 py-4 rounded-full font-semibold text-lg button-glow transition-all duration-300"
              data-testid="cta-button"
            >
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
