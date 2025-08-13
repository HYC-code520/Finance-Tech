import { cn } from "@/lib/utils";

interface DecorativeLineProps {
  width?: string;
  className?: string;
  animationDelay?: string;
}

export default function DecorativeLine({ 
  width = "w-96", 
  className = "",
  animationDelay = "0s"
}: DecorativeLineProps) {
  return (
    <div 
      className={cn("tech-line h-4 animate-glow", width, className)}
      style={{ animationDelay }}
      data-testid="decorative-line"
    />
  );
}
