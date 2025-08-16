import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-primary-dark text-white p-8" data-testid="design-system-page">
      <div className="max-w-6xl mx-auto">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link href="/">
            <Button 
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              data-testid="back-to-home"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 title-glow">S&P Capital IQ Design System</h1>
          <p className="text-xl text-gray-300">
            A comprehensive guide for maintaining visual consistency across the platform
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-accent-cyan">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Primary Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Primary Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-dark rounded-lg border border-gray-600"></div>
                  <div>
                    <p className="font-semibold">Primary Dark</p>
                    <p className="text-sm text-gray-400">#092946</p>
                    <p className="text-xs text-gray-500">Main background, dark elements</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#041420] rounded-lg border border-gray-600"></div>
                  <div>
                    <p className="font-semibold">Primary Darker</p>
                    <p className="text-sm text-gray-400">#041420</p>
                    <p className="text-xs text-gray-500">Gradient overlays, deep backgrounds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Accent Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-accent-cyan rounded-lg"></div>
                  <div>
                    <p className="font-semibold">Accent Cyan</p>
                    <p className="text-sm text-gray-400">#71FDFF</p>
                    <p className="text-xs text-gray-500">Highlights, CTAs, interactive elements</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-lg border border-gray-600"></div>
                  <div>
                    <p className="font-semibold">White</p>
                    <p className="text-sm text-gray-400">#FFFFFF</p>
                    <p className="text-xs text-gray-500">Primary text, contrast elements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gray Scale */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Gray Scale</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                  <div>
                    <p className="font-semibold">Gray 300</p>
                    <p className="text-sm text-gray-400">#D1D5DB</p>
                    <p className="text-xs text-gray-500">Secondary text, placeholders</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                  <div>
                    <p className="font-semibold">Gray 600</p>
                    <p className="text-sm text-gray-400">#4B5563</p>
                    <p className="text-xs text-gray-500">Borders, dividers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-accent-cyan">Typography</h2>
          <div className="space-y-8">
            
            {/* Headings */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Headings</h3>
              <div className="space-y-4 bg-black/20 p-6 rounded-lg">
                <div>
                  <h1 className="text-6xl font-bold title-glow">H1 - Hero Title</h1>
                  <p className="text-sm text-gray-400 mt-1">text-6xl font-bold + title-glow</p>
                </div>
                <div>
                  <h2 className="text-4xl font-bold">H2 - Section Title</h2>
                  <p className="text-sm text-gray-400 mt-1">text-4xl font-bold</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">H3 - Subsection</h3>
                  <p className="text-sm text-gray-400 mt-1">text-2xl font-bold</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">H4 - Component Title</h4>
                  <p className="text-sm text-gray-400 mt-1">text-xl font-semibold</p>
                </div>
              </div>
            </div>

            {/* Body Text */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Body Text</h3>
              <div className="space-y-4 bg-black/20 p-6 rounded-lg">
                <div>
                  <p className="text-xl text-gray-300">Large Body Text - For important descriptions</p>
                  <p className="text-sm text-gray-400 mt-1">text-xl text-gray-300</p>
                </div>
                <div>
                  <p className="text-base text-white">Regular Body Text - Standard content</p>
                  <p className="text-sm text-gray-400 mt-1">text-base text-white</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Small Text - Secondary information</p>
                  <p className="text-sm text-gray-400 mt-1">text-sm text-gray-300</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Extra Small - Captions, metadata</p>
                  <p className="text-sm text-gray-400 mt-1">text-xs text-gray-400</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-accent-cyan">Components</h2>
          
          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Buttons</h3>
            <div className="space-y-4 bg-black/20 p-6 rounded-lg">
              <div className="flex flex-wrap gap-4 items-center">
                <Button className="bg-accent-cyan text-primary-dark px-8 py-3 rounded-full font-semibold button-glow">
                  Primary CTA
                </Button>
                <Button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-2 rounded-lg hover:bg-white/20">
                  Secondary Glass
                </Button>
                <Button className="bg-transparent border border-accent-cyan text-accent-cyan px-6 py-2 rounded-lg hover:bg-accent-cyan hover:text-primary-dark">
                  Outline
                </Button>
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <p><strong>Primary CTA:</strong> bg-accent-cyan text-primary-dark + button-glow</p>
                <p><strong>Glass Effect:</strong> bg-white/10 backdrop-blur-sm border-white/30</p>
                <p><strong>Outline:</strong> border-accent-cyan text-accent-cyan</p>
              </div>
            </div>
          </div>

          {/* Form Elements */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
            <div className="space-y-4 bg-black/20 p-6 rounded-lg max-w-md">
              <div>
                <Label htmlFor="demo-input" className="text-gray-300 text-sm">Label Text</Label>
                <Input
                  id="demo-input"
                  placeholder="Placeholder text"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-gray-300 focus:border-accent-cyan focus:ring-accent-cyan/30"
                />
              </div>
              <div className="text-sm text-gray-400">
                <p><strong>Glass Input:</strong> bg-white/10 backdrop-blur-sm border-white/30</p>
                <p><strong>Focus State:</strong> focus:border-accent-cyan focus:ring-accent-cyan/30</p>
              </div>
            </div>
          </div>
        </section>

        {/* Effects & Animations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-accent-cyan">Effects & Animations</h2>
          
          {/* Glassmorphism */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Glassmorphism</h3>
            <div className="bg-black/20 p-6 rounded-lg">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-4">
                <h4 className="font-semibold mb-2">Glass Container</h4>
                <p className="text-gray-300">This container uses glassmorphism effects for a modern, see-through appearance.</p>
              </div>
              <div className="text-sm text-gray-400">
                <p><strong>Glass Effect:</strong> bg-white/10 backdrop-blur-lg border-white/20</p>
                <p><strong>Usage:</strong> Forms, modals, overlays</p>
              </div>
            </div>
          </div>

          {/* Glow Effects */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Glow Effects</h3>
            <div className="bg-black/20 p-6 rounded-lg space-y-4">
              <div>
                <h4 className="text-2xl font-bold title-glow mb-2">Title with Glow</h4>
                <p className="text-sm text-gray-400">Class: title-glow</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold title-glow-cyan mb-2">Cyan Title Glow</h4>
                <p className="text-sm text-gray-400">Class: title-glow-cyan</p>
              </div>
              <Button className="bg-accent-cyan text-primary-dark px-6 py-2 rounded-full font-semibold button-glow">
                Button Glow
              </Button>
              <p className="text-sm text-gray-400">Class: button-glow</p>
            </div>
          </div>
        </section>

        {/* Layout Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-accent-cyan">Layout Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Spacing</h3>
              <div className="bg-black/20 p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span>Small</span>
                  <span className="text-gray-400">0.25rem (4px)</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium</span>
                  <span className="text-gray-400">0.5rem (8px)</span>
                </div>
                <div className="flex justify-between">
                  <span>Large</span>
                  <span className="text-gray-400">1rem (16px)</span>
                </div>
                <div className="flex justify-between">
                  <span>XL</span>
                  <span className="text-gray-400">1.5rem (24px)</span>
                </div>
                <div className="flex justify-between">
                  <span>2XL</span>
                  <span className="text-gray-400">2rem (32px)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Border Radius</h3>
              <div className="bg-black/20 p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span>Small</span>
                  <span className="text-gray-400">0.125rem (2px)</span>
                </div>
                <div className="flex justify-between">
                  <span>Default</span>
                  <span className="text-gray-400">0.375rem (6px)</span>
                </div>
                <div className="flex justify-between">
                  <span>Large</span>
                  <span className="text-gray-400">0.5rem (8px)</span>
                </div>
                <div className="flex justify-between">
                  <span>XL</span>
                  <span className="text-gray-400">0.75rem (12px)</span>
                </div>
                <div className="flex justify-between">
                  <span>Full</span>
                  <span className="text-gray-400">9999px (pill shape)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-accent-cyan">Usage Guidelines</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-green-400">✓ Do</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Use glassmorphism for interactive elements</li>
                <li>• Apply glow effects to key titles and CTAs</li>
                <li>• Maintain consistent spacing using Tailwind classes</li>
                <li>• Use accent cyan for interactive and highlighted elements</li>
                <li>• Keep backgrounds dark for proper contrast</li>
                <li>• Use white text for primary content</li>
              </ul>
            </div>
            
            <div className="bg-black/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-red-400">✗ Don't</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Overuse glow effects on everything</li>
                <li>• Use light backgrounds without proper contrast</li>
                <li>• Mix different button styles in the same context</li>
                <li>• Use colors outside the defined palette</li>
                <li>• Create custom spacing - use Tailwind utilities</li>
                <li>• Forget focus states on interactive elements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-accent-cyan">Code Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-black/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Glassmorphism Container</h3>
              <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto text-gray-300">
{`<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
  <!-- Content goes here -->
</div>`}
              </pre>
            </div>

            <div className="bg-black/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Primary CTA Button</h3>
              <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto text-gray-300">
{`<Button className="bg-accent-cyan text-primary-dark px-8 py-4 rounded-full 
                  font-semibold text-lg button-glow transition-all duration-300">
  Call to Action
</Button>`}
              </pre>
            </div>

            <div className="bg-black/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Glass Form Input</h3>
              <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto text-gray-300">
{`<Input
  className="bg-white/10 backdrop-blur-sm border-white/30 text-white 
            placeholder-gray-300 focus:border-accent-cyan focus:ring-accent-cyan/30"
  placeholder="Enter your text"
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 pt-8 border-t border-gray-600">
          <p>S&P Capital IQ Design System - Maintain consistency across all components and pages</p>
        </footer>
      </div>
    </div>
  );
}