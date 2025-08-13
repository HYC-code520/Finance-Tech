import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import DecorativeLine from "@/components/decorative-line";
import videoBackground from "@assets/Blue White Modern Artificial Intelligence Video-2_1755115036815.mp4";

export default function Home() {
  return (
    <div className="min-h-screen text-white font-sans relative overflow-hidden" data-testid="home-page">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        data-testid="video-background"
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay from left (dark blue) to right (transparent) */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-10" 
        style={{
          background: 'linear-gradient(to right, #092946 0%, transparent 100%)'
        }}
        data-testid="gradient-overlay" 
      />

      {/* Content Layer */}
      <div className="relative z-20">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <HeroSection />


      </div>
    </div>
  );
}
