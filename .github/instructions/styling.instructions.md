---
applyTo: "**/*.css,**/tailwind.config.*,**/index.css"
description: "Styling guidelines for S&P Capital IQ branding and design system"
---

# Styling & Design System Guidelines

Apply the [general coding guidelines](../copilot-instructions.md) to all styling code.

## S&P Capital IQ Brand Colors

Use the established brand color palette consistently:

```css
:root {
  /* Primary Brand Colors */
  --primary-dark: #092946;    /* Main S&P Capital IQ dark blue */
  --accent-cyan: #71FDFF;     /* S&P Capital IQ accent cyan */
  --gradient-start: #041420;  /* Darker gradient overlay */
  --gradient-mid: #0f3a5f;    /* Mid-tone gradient */
  --gradient-end: #1a4d78;    /* Lighter gradient end */
  
  /* Supporting Colors */
  --text-primary: #FFFFFF;    /* Primary text on dark backgrounds */
  --text-secondary: #D1D5DB;  /* Secondary text, placeholders */
  --text-muted: #9CA3AF;      /* Muted text, less important content */
}
```

## Design System Components

### Typography Scale

```css
/* Heading Hierarchy */
.title-primary {
  @apply text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold;
}

.title-secondary {
  @apply text-2xl sm:text-3xl md:text-4xl font-bold;
}

.title-section {
  @apply text-xl sm:text-2xl font-semibold;
}

/* Body Text */
.text-body {
  @apply text-base leading-relaxed;
}

.text-caption {
  @apply text-sm text-gray-300;
}
```

### Interactive Elements

```css
/* Button Styles */
.btn-primary {
  @apply bg-accent-cyan text-primary-dark px-6 py-3 rounded-full font-semibold;
  @apply hover:bg-white transition-all duration-300 button-glow;
}

.btn-secondary {
  @apply bg-white/10 backdrop-blur-sm border border-white/30 text-white;
  @apply hover:bg-white/20 transition-colors;
}

/* Button Glow Effect */
.button-glow:hover {
  box-shadow: 0 0 20px rgba(113, 253, 255, 0.5);
  transform: translateY(-1px);
}
```

### Layout Patterns

```css
/* Glass Morphism Cards */
.glass-card {
  @apply backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl;
  @apply shadow-2xl;
}

/* Gradient Backgrounds */
.gradient-bg {
  background: linear-gradient(135deg, #092946 0%, #0f3a5f 25%, #1a4d78 50%, #0f3a5f 75%, #092946 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## Animation Standards

### Performance-Optimized Animations

```css
/* Micro-interactions */
.animate-ascend {
  animation: ascend 1.5s ease-out forwards;
}

@keyframes ascend {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Glow effects for interactive elements */
.animate-glow {
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { opacity: 0.4; }
  to { opacity: 1; }
}
```

### Loading States

```css
.loading-pulse {
  @apply animate-pulse bg-white/10 rounded;
}

.loading-spinner {
  @apply w-6 h-6 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin;
}
```

## Responsive Design

### Mobile-First Approach

```css
/* Base styles for mobile */
.responsive-container {
  @apply px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20;
}

.responsive-text {
  @apply text-sm sm:text-base md:text-lg lg:text-xl;
}

/* Responsive spacing */
.responsive-spacing {
  @apply space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12;
}
```

### Viewport Breakpoints

Use Tailwind's responsive prefixes consistently:
- `sm:` - 640px and up (tablets)
- `md:` - 768px and up (small laptops)
- `lg:` - 1024px and up (laptops)
- `xl:` - 1280px and up (large screens)

## Component-Specific Styles

### Feedback Cards

```css
.feedback-card {
  @apply glass-card p-6 hover:bg-white/15 transition-all duration-300;
  @apply border-l-4 border-accent-cyan;
}

.feedback-card-urgent {
  @apply border-l-red-400;
}

.feedback-card-high {
  @apply border-l-orange-400;
}

.feedback-card-medium {
  @apply border-l-accent-cyan;
}

.feedback-card-low {
  @apply border-l-green-400;
}
```

### Dashboard Widgets

```css
.dashboard-widget {
  @apply glass-card p-6;
  @apply hover:shadow-lg hover:shadow-accent-cyan/10 transition-all duration-300;
}

.widget-header {
  @apply flex items-center justify-between mb-4;
}

.widget-title {
  @apply text-lg font-semibold text-white;
}

.widget-content {
  @apply space-y-4;
}
```

## Accessibility Standards

### Color Contrast

Ensure WCAG AA compliance:
- Text on dark backgrounds: Use white (#FFFFFF) or light gray (#D1D5DB)
- Interactive elements: Maintain 4.5:1 contrast ratio minimum
- Focus indicators: Use high-contrast outlines

### Focus States

```css
.focus-visible:focus {
  @apply outline-none ring-2 ring-accent-cyan ring-offset-2 ring-offset-primary-dark;
}

/* Custom focus for buttons */
.btn-primary:focus-visible {
  @apply ring-2 ring-primary-dark ring-offset-2 ring-offset-accent-cyan;
}
```

## Dark Theme Optimization

Since the app uses a dark theme primarily:

```css
/* Ensure text readability on dark backgrounds */
.dark-optimized {
  @apply text-white selection:bg-accent-cyan selection:text-primary-dark;
}

/* Proper input styling for dark theme */
.input-dark {
  @apply bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-gray-300;
  @apply focus:border-accent-cyan focus:ring-accent-cyan/30;
}
```

## Performance Considerations

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Implement `will-change` property sparingly for complex animations
- Use CSS Grid and Flexbox for layouts over absolute positioning
- Optimize background images and use appropriate formats (WebP, AVIF)

## Utility Class Organization

Create semantic utility classes for common patterns:

```css
/* Layout utilities */
.container-dashboard { @apply max-w-7xl mx-auto responsive-container; }
.section-spacing { @apply py-8 sm:py-12 md:py-16 lg:py-20; }

/* Text utilities */
.text-brand { @apply title-glow-cyan; }
.text-highlight { @apply text-accent-cyan; }

/* Interactive utilities */
.hover-lift { @apply hover:-translate-y-0.5 transition-transform; }
.clickable { @apply cursor-pointer hover:opacity-80 transition-opacity; }
```
