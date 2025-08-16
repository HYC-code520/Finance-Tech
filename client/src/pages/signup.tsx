import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/navigation";
import { Link } from "wouter";
import backgroundImage from "@assets/Blue White Modern Artificial Intelligence Video-4_1755117300086.png";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup form submitted:", formData);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      data-testid="signup-page"
    >
      {/* Navigation */}
      <Navigation />

      {/* Floating particles/stars */}
      <div className="absolute top-10 left-20 w-2 h-2 bg-accent-cyan rounded-full animate-pulse z-20" />
      <div className="absolute top-32 right-32 w-3 h-3 bg-white rounded-full animate-pulse-slow z-20" />
      <div className="absolute bottom-40 left-16 w-2 h-2 bg-accent-cyan rounded-full animate-glow z-20" />
      <div className="absolute top-20 right-20 w-4 h-4 bg-white opacity-60 transform rotate-45 z-20" style={{clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"}} />

      {/* Signup Form Container - Centered */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative z-30 w-full max-w-md mx-4 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 title-glow">
            Create Your Account
          </h1>
          <p className="text-gray-300 text-sm">
            Join S&P Capital IQ to access powerful financial insights
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="signup-form">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName" className="text-gray-300 text-sm">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-gray-300 focus:border-accent-cyan focus:ring-accent-cyan/30"
                data-testid="input-firstname"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-300 text-sm">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-gray-300 focus:border-accent-cyan focus:ring-accent-cyan/30"
                data-testid="input-lastname"
                required
              />
            </div>
          </div>

          {/* Company Field */}
          <div>
            <Label htmlFor="company" className="text-gray-300 text-sm">Company</Label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Your Company"
              value={formData.company}
              onChange={handleInputChange}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-gray-300 focus:border-accent-cyan focus:ring-accent-cyan/30"
              data-testid="input-company"
            />
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-gray-300 text-sm">Work Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@company.com"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-gray-300 focus:border-accent-cyan focus:ring-accent-cyan/30"
              data-testid="input-email"
              required
            />
          </div>

          {/* Password Fields */}
          <div>
            <Label htmlFor="password" className="text-gray-300 text-sm">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-gray-300 focus:border-accent-cyan focus:ring-accent-cyan/30"
              data-testid="input-password"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-gray-300 text-sm">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-gray-300 focus:border-accent-cyan focus:ring-accent-cyan/30"
              data-testid="input-confirm-password"
              required
            />
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-2 text-xs text-gray-300">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 text-accent-cyan bg-white/10 border-white/30 rounded focus:ring-accent-cyan focus:ring-1"
              data-testid="checkbox-terms"
              required
            />
            <label htmlFor="terms">
              I agree to the{" "}
              <a href="#" className="text-accent-cyan hover:underline cursor-pointer">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-accent-cyan hover:underline cursor-pointer">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-accent-cyan text-primary-dark font-semibold py-3 rounded-lg hover:bg-white button-glow transition-all duration-300 mt-6"
            data-testid="button-signup"
          >
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/20"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-1 border-t border-white/20"></div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center space-x-4">
          <button className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="button-google">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
          <button className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="button-apple">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </button>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <Link href="/login">
              <a className="text-accent-cyan hover:underline transition-colors" data-testid="link-signin">
                Sign in
              </a>
            </Link>
          </p>
        </div>

        </div>
      </div>
    </div>
  );
}