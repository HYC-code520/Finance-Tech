import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Design System", path: "/design-system" },
    { name: "Others", path: "/others" },
  ];

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <nav className="w-full py-6 px-8 lg:px-16 animate-shift-down" data-testid="navigation">
      <div className="flex justify-between items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <a
                className={`font-medium text-lg transition-all duration-300 hover:-translate-y-0.5 ${
                  location === item.path
                    ? "text-white"
                    : "text-gray-300 hover:text-accent-cyan"
                }`}
                data-testid={`nav-link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="mobile-menu-button"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Sign In Button */}
        <Button
          onClick={handleLogin}
          className="bg-accent-cyan text-primary-dark px-6 py-2 rounded-full font-semibold text-lg hover:bg-white button-glow transition-all duration-300"
          data-testid="signin-button"
        >
          Sign In
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4" data-testid="mobile-menu">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <a
                  className={`font-medium text-lg transition-colors duration-300 ${
                    location === item.path
                      ? "text-white"
                      : "text-gray-300 hover:text-accent-cyan"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
