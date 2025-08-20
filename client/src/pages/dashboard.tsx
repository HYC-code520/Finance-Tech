import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Search, User, Clock, AlertCircle, CheckCircle, XCircle, Bot, Building, Leaf, Grid3X3, List, ChevronDown, ChevronUp, ArrowUpDown, Zap, Heart } from "lucide-react";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { databaseService } from "@/services/databaseService";
import type { SupportTicket } from "@/types/tickets";

// Sentiment calculation utility
const calculateSentiment = (ticket: SupportTicket): number => {
  const text = `${ticket.ticket_subject || ''} ${ticket.ticket_body}`.toLowerCase();
  
  const negativeWords = ['angry', 'frustrated', 'terrible', 'awful', 'hate', 'worst', 'useless', 'broken', 'failed', 'bug', 'error', 'crash', 'problem', 'issue', 'not working', 'disappointed', 'unacceptable'];
  const positiveWords = ['great', 'excellent', 'love', 'amazing', 'perfect', 'wonderful', 'helpful', 'thanks', 'appreciate', 'good', 'works well', 'satisfied'];
  
  let score = 0.5; // Start neutral
  
  if (ticket.ticket_priority === 'urgent') score -= 0.3;
  else if (ticket.ticket_priority === 'high') score -= 0.2;
  else if (ticket.ticket_priority === 'low') score += 0.1;
  
  if (ticket.ticket_status === 'escalated') score -= 0.2;
  else if (ticket.ticket_status === 'closed') score += 0.1;
  
  negativeWords.forEach(word => {
    if (text.includes(word)) score -= 0.1;
  });
  
  positiveWords.forEach(word => {
    if (text.includes(word)) score += 0.1;
  });
  
  return Math.max(0, Math.min(1, score));
};

const getSentimentColor = (score: number): string => {
  if (score <= 0.3) return 'from-red-500 to-red-400';
  if (score <= 0.7) return 'from-yellow-500 to-yellow-400';
  return 'from-green-500 to-green-400';
};

const getSentimentLabel = (score: number): string => {
  if (score <= 0.3) return 'Negative';
  if (score <= 0.7) return 'Neutral';
  return 'Positive';
};

const SentimentBar = ({ score }: { score: number }) => {
  const percentage = score * 100;
  
  return (
    <div className="w-full mb-3">
      <div className="relative w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mb-1">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-40"></div>
        
        {/* Indicator dot */}
        <div 
          className={`absolute top-0 w-2 h-1.5 bg-gradient-to-r ${getSentimentColor(score)} rounded-full shadow-sm transform -translate-x-1/2 transition-all duration-300`}
          style={{ left: `${percentage}%` }}
        ></div>
      </div>
      
      {/* Labels underneath */}
      <div className="flex justify-between text-xs">
        <span className="text-red-400">Upset</span>
        <span className="text-yellow-400">Neutral</span>
        <span className="text-green-400">Happy</span>
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-blue-600";
    case "escalated":
      return "bg-red-600";
    case "closed":
      return "bg-green-600";
    default:
      return "bg-gray-600";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "text-red-400";
    case "high":
      return "text-orange-400";
    case "medium":
      return "text-accent-cyan";
    case "low":
      return "text-green-400";
    default:
      return "text-gray-400";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return <AlertCircle className="w-4 h-4" />;
    case "escalated":
      return <Clock className="w-4 h-4" />;
    case "closed":
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <XCircle className="w-4 h-4" />;
  }
};

// Priority Indicator Component
const PriorityIndicator = ({ priority }: { priority: string }) => {
  const getPriorityLevel = (priority: string): number => {
    switch (priority) {
      case 'urgent': return 4;
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 1;
    }
  };

  const level = getPriorityLevel(priority);
  
  return (
    <div className="flex items-center gap-1">
      <span className={`text-xs font-medium ${getPriorityColor(priority)}`}>
        {priority}
      </span>
      <div className="flex gap-0.5 ml-1">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`w-1.5 h-1.5 rounded-full ${
              dot <= level 
                ? priority === 'urgent' 
                  ? 'bg-red-400' 
                  : priority === 'high'
                  ? 'bg-orange-400'
                  : priority === 'medium'
                  ? 'bg-accent-cyan'
                  : 'bg-green-400'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Particle interface
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  update(): void;
  draw(): void;
}

// Memoized ticket card component for performance
const TicketCard = React.memo(({ 
  ticket, 
  index, 
  assignee,
  formatTimeAgo
}: { 
  ticket: SupportTicket; 
  index: number; 
  assignee: { name: string; role: string };
  formatTimeAgo: (timestamp: string) => string;
}) => (
  <div 
    className="relative bg-[#092946]/50 border border-[#71FDFF]/30 rounded-2xl p-5 hover:border-[#71FDFF]/50 transition-all duration-300 backdrop-blur-sm transform-gpu will-change-transform"
    data-testid={`ticket-card-${index}`}
    style={{ willChange: 'transform, opacity' }}
  >
    {/* Status and Priority Header */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Badge 
          variant="secondary" 
          className={`${getStatusColor(ticket.ticket_status)} text-white border-0 px-2 py-1 text-xs`}
        >
          {getStatusIcon(ticket.ticket_status)}
          <span className="ml-1">{ticket.ticket_status}</span>
        </Badge>
      </div>
      <div className="flex flex-col items-end gap-1">
        <PriorityIndicator priority={ticket.ticket_priority} />
        <span className="text-xs text-gray-400">
          {formatTimeAgo(ticket.timestamp_utc)}
        </span>
      </div>
    </div>

    {/* Ticket Title */}
    <h3 className="text-white font-medium text-sm mb-3 line-clamp-2">
      {ticket.ticket_subject || 'No Subject'}
    </h3>

    {/* Product Area & Tier Info */}
    <div className="flex items-center justify-between mb-3 text-xs">
      <span className="text-gray-300">{ticket.product_area?.replace('_', ' ') || 'Unknown'}</span>
      <span className="text-accent-cyan font-medium">Tier {ticket.client_firm_tier}</span>
    </div>

    {/* Customer Sentiment Bar */}
    <SentimentBar score={calculateSentiment(ticket)} />

    {/* Bottom section with Assignee */}
    <div className="flex items-center gap-2 mt-4 mb-2">
      {/* Assignee - Bottom Left */}
      <Avatar className="w-6 h-6">
        <AvatarFallback className="bg-[#041420] text-accent-cyan text-xs font-medium">
          {assignee.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="text-white text-xs font-medium">
          {assignee.name}
        </div>
        <div className="text-gray-400 text-xs">
          {assignee.role}
        </div>
      </div>
    </div>

    {/* Ticket Number - Absolute positioned at bottom right */}
    <div className="absolute bottom-0 right-0 bg-[#71FDFF] text-black px-3 py-1 text-xs font-medium rounded-tl-lg">
      #{index + 1}
    </div>
  </div>
));

TicketCard.displayName = 'TicketCard';

export default function Dashboard() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("assigned");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid"); // New state for view mode
  const [dateSortOrder, setDateSortOrder] = useState<"newest" | "oldest">("newest");
  const [prioritySortOrder, setPrioritySortOrder] = useState<"high" | "low" | "none">("none");
  const [sentimentSortOrder, setSentimentSortOrder] = useState<"positive" | "negative" | "none">("none");
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load real data from database
  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        const realTickets = await databaseService.getTickets();
        setTickets(realTickets);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tickets');
        console.error('Failed to load tickets:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 25 // Reduced from 50 to 25 for performance
    let animationId: number

    class ParticleImpl implements Particle {
      x: number = 0
      y: number = 0
      size: number = 0
      speedX: number = 0
      speedY: number = 0
      color: string = ''

      constructor() {
        if (!canvas) return
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 30 + 10 // Reduced size for performance
        this.speedX = (Math.random() - 0.5) * 12 // Reduced speed from 24 to 12
        this.speedY = (Math.random() - 0.5) * 12 // Reduced speed from 24 to 12
        // Pre-calculate color to avoid repeated string calculations
        const r = Math.floor(Math.random() * 100) + 100;
        const g = Math.floor(Math.random() * 100) + 150;
        const b = Math.floor(Math.random() * 55) + 200;
        const a = Math.random() * 0.2 + 0.05; // Reduced opacity for subtle effect
        this.color = `rgba(${r}, ${g}, ${b}, ${a})`
      }

      update() {
        if (!canvas) return
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        
        // Remove expensive blur filter for performance
        ctx.fillStyle = this.color
        ctx.beginPath()
        
        // Simplified circle instead of ellipse for performance
        ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new ParticleImpl())
    }

    // Optimized animation loop with FPS throttling
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    function animate(currentTime: number) {
      if (!ctx || !canvas) return
      
      // Throttle to target FPS
      if (currentTime - lastTime < frameInterval) {
        animationId = requestAnimationFrame(animate)
        return
      }
      
      lastTime = currentTime
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    
    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  // Memoized AI ticket count calculation
  const mentionedAI = useMemo(() => {
    return tickets.filter(ticket => 
      ticket.ticket_subject?.toLowerCase().includes('ai') || 
      ticket.product_area?.toLowerCase().includes('ai') ||
      ticket.ticket_body.toLowerCase().includes('ai') ||
      ticket.ticket_subject?.toLowerCase().includes('kensho') ||
      ticket.ticket_body.toLowerCase().includes('kensho')
    ).length;
  }, [tickets]);

  // Memoized Private Markets ticket count calculation
  const privateMarketsCount = useMemo(() => {
    return tickets.filter(ticket => 
      ticket.ticket_subject?.toLowerCase().includes('private market') || 
      ticket.product_area?.toLowerCase().includes('private_market') ||
      ticket.ticket_body.toLowerCase().includes('private market') ||
      ticket.ticket_subject?.toLowerCase().includes('pe') ||
      ticket.ticket_body.toLowerCase().includes('private equity') ||
      ticket.ticket_body.toLowerCase().includes('venture capital') ||
      ticket.ticket_body.toLowerCase().includes('buyout')
    ).length;
  }, [tickets]);

  // Memoized ESG ticket count calculation
  const esgCount = useMemo(() => {
    return tickets.filter(ticket => 
      ticket.ticket_subject?.toLowerCase().includes('esg') || 
      ticket.product_area?.toLowerCase().includes('esg') ||
      ticket.ticket_body.toLowerCase().includes('esg') ||
      ticket.ticket_subject?.toLowerCase().includes('environmental') ||
      ticket.ticket_body.toLowerCase().includes('sustainability') ||
      ticket.ticket_body.toLowerCase().includes('governance') ||
      ticket.ticket_body.toLowerCase().includes('social')
    ).length;
  }, [tickets]);

  // Format timestamp to match original design
  const formatTimeAgo = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return `${Math.floor(diffInHours * 60)} min`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
    return `${Math.floor(diffInHours / 24)} day${Math.floor(diffInHours / 24) > 1 ? 's' : ''}`;
  }, []);

  // Pre-calculated assignees for better performance
  const assignees = useMemo(() => [
    { name: "Sofia Chen", role: "AI Product Specialist" },
    { name: "Marcus Rodriguez", role: "Technical Support Lead" },
    { name: "Elena Kowalski", role: "ESG Data Analyst" },
    { name: "James Kim", role: "API Engineering" },
    { name: "Dr. Sarah Patel", role: "Data Solutions Architect" },
    { name: "Alex Thompson", role: "Frontend Developer" },
    { name: "David Zhang", role: "Infrastructure Engineer" },
    { name: "Dr. Lisa Wang", role: "AI Research Lead" }
  ], []);

  // Memoized assignee generation
  const generateAssignee = useCallback((ticket: SupportTicket, index: number) => {
    return assignees[index % assignees.length];
  }, [assignees]);

  // Debounced search handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Filter tickets based on search term and database data - Memoized for performance
  const filteredTickets = useMemo(() => {
    let filtered = tickets;
    
    // First filter by active tab
    if (activeTab === "mentioned") {
      filtered = tickets.filter(ticket => 
        ticket.ticket_subject?.toLowerCase().includes('ai') || 
        ticket.product_area?.toLowerCase().includes('ai') ||
        ticket.ticket_body.toLowerCase().includes('ai') ||
        ticket.ticket_subject?.toLowerCase().includes('kensho') ||
        ticket.ticket_body.toLowerCase().includes('kensho')
      );
    } else if (activeTab === "private-markets") {
      filtered = tickets.filter(ticket => 
        ticket.ticket_subject?.toLowerCase().includes('private market') || 
        ticket.product_area?.toLowerCase().includes('private_market') ||
        ticket.ticket_body.toLowerCase().includes('private market') ||
        ticket.ticket_subject?.toLowerCase().includes('pe') ||
        ticket.ticket_body.toLowerCase().includes('private equity') ||
        ticket.ticket_body.toLowerCase().includes('venture capital') ||
        ticket.ticket_body.toLowerCase().includes('buyout')
      );
    } else if (activeTab === "esg") {
      filtered = tickets.filter(ticket => 
        ticket.ticket_subject?.toLowerCase().includes('esg') || 
        ticket.product_area?.toLowerCase().includes('esg') ||
        ticket.ticket_body.toLowerCase().includes('esg') ||
        ticket.ticket_subject?.toLowerCase().includes('environmental') ||
        ticket.ticket_body.toLowerCase().includes('sustainability') ||
        ticket.ticket_body.toLowerCase().includes('governance') ||
        ticket.ticket_body.toLowerCase().includes('social')
      );
    }
    // For "assigned" tab, show all tickets (default behavior)
    
    // Then filter by search term if provided
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.ticket_subject?.toLowerCase().includes(lowerSearchTerm) ||
        ticket.ticket_body.toLowerCase().includes(lowerSearchTerm) ||
        ticket.ticket_id.toLowerCase().includes(lowerSearchTerm) ||
        ticket.product_area?.toLowerCase().includes(lowerSearchTerm) ||
        ticket.user_persona?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Sort by priority, sentiment, or date
    const sorted = [...filtered].sort((a, b) => {
      // Priority sorting takes precedence
      if (prioritySortOrder !== "none") {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        const priorityA = priorityOrder[a.ticket_priority as keyof typeof priorityOrder] || 1;
        const priorityB = priorityOrder[b.ticket_priority as keyof typeof priorityOrder] || 1;
        
        if (prioritySortOrder === "high") {
          return priorityB - priorityA; // High priority first
        } else {
          return priorityA - priorityB; // Low priority first
        }
      }
      
      // Sentiment sorting takes second precedence
      if (sentimentSortOrder !== "none") {
        const sentimentA = calculateSentiment(a);
        const sentimentB = calculateSentiment(b);
        
        if (sentimentSortOrder === "positive") {
          return sentimentB - sentimentA; // Positive first
        } else {
          return sentimentA - sentimentB; // Negative first
        }
      }
      
      // Default to date sorting
      const dateA = new Date(a.timestamp_utc).getTime();
      const dateB = new Date(b.timestamp_utc).getTime();
      
      if (dateSortOrder === "newest") {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Oldest first
      }
    });
    
    return sorted;
  }, [tickets, searchTerm, activeTab, dateSortOrder, prioritySortOrder, sentimentSortOrder]);

  // New component for list view
  const TicketListItem = React.memo(({ 
    ticket, 
    index, 
    assignee,
    formatTimeAgo
  }: { 
    ticket: SupportTicket; 
    index: number; 
    assignee: { name: string; role: string };
    formatTimeAgo: (timestamp: string) => string;
  }) => {
    const sentimentScore = calculateSentiment(ticket);
    
    return (
      <div 
        className="bg-[#092946]/50 border border-[#71FDFF]/30 rounded-lg p-3 hover:border-[#71FDFF]/50 transition-all duration-300 backdrop-blur-sm"
        data-testid={`ticket-list-item-${index}`}
      >
        <div className="flex items-center gap-4 text-sm">
          {/* Ticket Number */}
          <span className="bg-[#71FDFF] text-black px-2 py-1 text-xs font-medium rounded shrink-0">
            #{index + 1}
          </span>
          
          {/* Status Badge */}
          <Badge 
            variant="secondary" 
            className={`${getStatusColor(ticket.ticket_status)} text-white border-0 px-2 py-1 text-xs shrink-0`}
          >
            {getStatusIcon(ticket.ticket_status)}
            <span className="ml-1">{ticket.ticket_status}</span>
          </Badge>

          {/* Priority Indicator */}
          <div className="shrink-0">
            <PriorityIndicator priority={ticket.ticket_priority} />
          </div>

          {/* Mini Sentiment Bar */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-12 h-1 bg-gray-700 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-40"></div>
              <div 
                className={`absolute top-0 w-1 h-1 bg-gradient-to-r ${getSentimentColor(sentimentScore)} rounded-full transform -translate-x-1/2`}
                style={{ left: `${sentimentScore * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400">{getSentimentLabel(sentimentScore)}</span>
          </div>

          {/* Ticket Subject - Main content */}
          <div className="flex-1 min-w-0">
            <span className="text-white font-medium truncate block">
              {ticket.ticket_subject || 'No Subject'}
            </span>
          </div>

          {/* Product Area */}
          <span className="text-xs text-gray-300 shrink-0">
            {ticket.product_area?.replace('_', ' ') || 'Unknown'}
          </span>

          {/* Tier */}
          <span className="text-xs text-accent-cyan font-medium shrink-0">
            T{ticket.client_firm_tier}
          </span>

          {/* Time */}
          <span className="text-xs text-gray-400 shrink-0 w-16 text-right">
            {formatTimeAgo(ticket.timestamp_utc)}
          </span>

          {/* Assignee */}
          <div className="flex items-center gap-2 shrink-0">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-[#041420] text-accent-cyan text-xs font-medium">
                {assignee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-white text-xs font-medium min-w-0 truncate max-w-24">
              {assignee.name}
            </span>
          </div>
        </div>
      </div>
    );
  });

  TicketListItem.displayName = 'TicketListItem';

  if (loading) {
    return (
      <div 
        className="min-h-screen relative overflow-hidden bg-slate-900" 
        data-testid="dashboard-page"
      >
        {/* Animated particles background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
        {/* Navigation */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <Navigation />
        </div>
        
        {/* Sidebar */}
        <Sidebar />
        
        {/* Loading Content */}
        <div className="ml-16 pt-4">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan mx-auto"></div>
                <p className="mt-4 text-white">Loading tickets from database...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen relative overflow-hidden bg-slate-900" 
        data-testid="dashboard-page"
      >
        {/* Animated particles background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
        {/* Navigation */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <Navigation />
        </div>
        
        {/* Sidebar */}
        <Sidebar />
        
        {/* Error Content */}
        <div className="ml-16 pt-4">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
                <p className="mt-4 text-red-400">Error loading tickets: {error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-accent-cyan text-primary-dark rounded-lg hover:bg-accent-cyan/80 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-slate-900" 
      data-testid="dashboard-page"
      style={{ willChange: 'scroll-position' }}
    >
      {/* Animated particles background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-30 transform-gpu" 
        style={{ willChange: 'contents' }}
      />
      {/* Navigation */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <Navigation />
      </div>
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-16 pt-4">
        {/* Search Bar */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
            <Input
              type="text"
              placeholder="Search tickets by subject, content, ID, product area, or user type..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 bg-[#092946]/80 backdrop-blur-sm border-0 text-white placeholder:text-gray-300 focus:border-0 focus:ring-0 rounded-2xl transform-gpu will-change-contents"
              data-testid="search-input"
              style={{ willChange: 'contents' }}
            />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-6">
          
          {/* Collapsible Legend */}
          <div className="mb-6 bg-[#092946]/50 border border-[#71FDFF]/30 rounded-xl backdrop-blur-sm overflow-hidden">
            <button
              onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <h3 className="text-white text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-cyan rounded-full"></div>
                Dashboard Guide
              </h3>
              {isLegendCollapsed ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              )}
            </button>
            
            {!isLegendCollapsed && (
              <div className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Customer Sentiment */}
                  <div>
                    <h4 className="text-white text-sm font-medium mb-2 flex items-center gap-2">
                      <Heart className="w-3 h-3 text-accent-cyan" />
                      Customer Sentiment
                    </h4>
                    <div className="space-y-2">
                      <div className="w-32 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full opacity-60"></div>
                      <div className="flex justify-between text-xs max-w-32">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-gray-300">Upset</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-gray-300">Neutral</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">Happy</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        White dot shows customer mood
                      </p>
                    </div>
                  </div>

                  {/* Priority Levels */}
                  <div className="ml-8">
                    <h4 className="text-white text-sm font-medium mb-2 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-orange-400" />
                      Priority Levels
                    </h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-red-400 rounded-full" />)}
                        </div>
                        <span className="text-red-400 font-medium">Urgent</span>
                        <span className="text-gray-400">- Immediate attention</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-orange-400 rounded-full" />)}
                          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                        </div>
                        <span className="text-orange-400 font-medium">High</span>
                        <span className="text-gray-400">- Within hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-accent-cyan rounded-full" />)}
                          {[3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-gray-600 rounded-full" />)}
                        </div>
                        <span className="text-accent-cyan font-medium">Medium</span>
                        <span className="text-gray-400">- Within days</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          {[2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-gray-600 rounded-full" />)}
                        </div>
                        <span className="text-green-400 font-medium">Low</span>
                        <span className="text-gray-400">- When possible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Horizontal Tabs */}
          <div className="mb-6">
            <div className="w-full bg-[#092946]/80 border border-[#71FDFF]/30 rounded-t-2xl overflow-hidden backdrop-blur-sm">
              {/* Tab Headers */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab("assigned")}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 text-center transition-colors ${
                    activeTab === "assigned"
                      ? "bg-accent-cyan/20 border-b-2 border-accent-cyan"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    activeTab === "assigned" ? "bg-accent-cyan" : "bg-white/20"
                  }`}>
                    <User className={`w-3 h-3 ${
                      activeTab === "assigned" ? "text-primary-dark" : "text-white"
                    }`} />
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">Assigned</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    activeTab === "assigned"
                      ? "bg-accent-cyan text-primary-dark"
                      : "bg-white/20 text-white"
                  }`}>
                    {tickets.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("mentioned")}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 text-center transition-colors ${
                    activeTab === "mentioned"
                      ? "bg-accent-cyan/20 border-b-2 border-accent-cyan"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    activeTab === "mentioned" ? "bg-accent-cyan" : "bg-white/20"
                  }`}>
                    <Bot className={`w-3 h-3 ${
                      activeTab === "mentioned" ? "text-primary-dark" : "text-white"
                    }`} />
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">Mentioned AI</div>
                  </div>
                  {mentionedAI > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      activeTab === "mentioned"
                        ? "bg-accent-cyan text-primary-dark"
                        : "bg-white/20 text-white"
                    }`}>
                      {mentionedAI}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("private-markets")}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 text-center transition-colors ${
                    activeTab === "private-markets"
                      ? "bg-accent-cyan/20 border-b-2 border-accent-cyan"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    activeTab === "private-markets" ? "bg-accent-cyan" : "bg-white/20"
                  }`}>
                    <Building className={`w-3 h-3 ${
                      activeTab === "private-markets" ? "text-primary-dark" : "text-white"
                    }`} />
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">Private Markets</div>
                  </div>
                  {privateMarketsCount > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      activeTab === "private-markets"
                        ? "bg-accent-cyan text-primary-dark"
                        : "bg-white/20 text-white"
                    }`}>
                      {privateMarketsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("esg")}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 text-center transition-colors ${
                    activeTab === "esg"
                      ? "bg-accent-cyan/20 border-b-2 border-accent-cyan"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    activeTab === "esg" ? "bg-accent-cyan" : "bg-white/20"
                  }`}>
                    <Leaf className={`w-3 h-3 ${
                      activeTab === "esg" ? "text-primary-dark" : "text-white"
                    }`} />
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">ESG</div>
                  </div>
                  {esgCount > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      activeTab === "esg"
                        ? "bg-accent-cyan text-primary-dark"
                        : "bg-white/20 text-white"
                    }`}>
                      {esgCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* View Toggle Controls */}
          <div className="mb-6 flex justify-between items-center relative z-10">
            <div className="text-white">
              <span className="text-sm text-gray-300">
                Showing {filteredTickets.length} of {tickets.length} tickets
              </span>
            </div>
            
            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300 mr-2">Sort:</span>
              
              {/* Priority Sort */}
              <button
                onClick={() => {
                  const nextOrder = prioritySortOrder === "none" ? "high" : prioritySortOrder === "high" ? "low" : "none";
                  setPrioritySortOrder(nextOrder);
                  if (nextOrder !== "none") {
                    setSentimentSortOrder("none");
                  }
                }}
                className={`flex items-center gap-2 px-3 py-2 bg-[#092946]/80 border border-[#71FDFF]/30 rounded-lg backdrop-blur-sm transition-all duration-200 hover:border-[#71FDFF]/50 hover:bg-[#092946]/90 ${
                  prioritySortOrder !== "none" ? "ring-1 ring-accent-cyan/50" : ""
                }`}
                type="button"
              >
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-white">
                  {prioritySortOrder === "none" ? "Priority" : prioritySortOrder === "high" ? "High First" : "Low First"}
                </span>
                {prioritySortOrder !== "none" && <ArrowUpDown className="w-3 h-3 text-accent-cyan" />}
              </button>

              {/* Sentiment Sort */}
              <button
                onClick={() => {
                  const nextOrder = sentimentSortOrder === "none" ? "negative" : sentimentSortOrder === "negative" ? "positive" : "none";
                  setSentimentSortOrder(nextOrder);
                  if (nextOrder !== "none") {
                    setPrioritySortOrder("none");
                  }
                }}
                className={`flex items-center gap-2 px-3 py-2 bg-[#092946]/80 border border-[#71FDFF]/30 rounded-lg backdrop-blur-sm transition-all duration-200 hover:border-[#71FDFF]/50 hover:bg-[#092946]/90 ${
                  sentimentSortOrder !== "none" ? "ring-1 ring-accent-cyan/50" : ""
                }`}
                type="button"
              >
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm text-white">
                  {sentimentSortOrder === "none" ? "Sentiment" : sentimentSortOrder === "negative" ? "Most Upset First" : "Happiest First"}
                </span>
                {sentimentSortOrder !== "none" && <ArrowUpDown className="w-3 h-3 text-accent-cyan" />}
              </button>

              {/* Date Sort */}
              <button
                onClick={() => setDateSortOrder(dateSortOrder === "newest" ? "oldest" : "newest")}
                className="flex items-center gap-2 px-3 py-2 bg-[#092946]/80 border border-[#71FDFF]/30 rounded-lg backdrop-blur-sm transition-all duration-200 hover:border-[#71FDFF]/50 hover:bg-[#092946]/90"
                type="button"
              >
                <Clock className="w-4 h-4 text-accent-cyan" />
                <span className="text-sm text-white">
                  {dateSortOrder === "newest" ? "Newest" : "Oldest"}
                </span>
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300 mr-2">View:</span>
              <div className="flex bg-[#092946]/80 border border-[#71FDFF]/30 rounded-lg p-1 backdrop-blur-sm gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-accent-cyan text-primary-dark shadow-lg shadow-cyan-500/25"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  data-testid="grid-view-button"
                  type="button"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
                    viewMode === "list"
                      ? "bg-accent-cyan text-primary-dark shadow-lg shadow-cyan-500/25"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  data-testid="list-view-button"
                  type="button"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Tickets Display - Grid or List View */}
          {viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredTickets.map((ticket, index) => {
                const assignee = generateAssignee(ticket, index);
                return (
                  <TicketCard
                    key={ticket.ticket_id}
                    ticket={ticket}
                    index={index}
                    assignee={assignee}
                    formatTimeAgo={formatTimeAgo}
                  />
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {filteredTickets.map((ticket, index) => {
                const assignee = generateAssignee(ticket, index);
                return (
                  <TicketListItem
                    key={ticket.ticket_id}
                    ticket={ticket}
                    index={index}
                    assignee={assignee}
                    formatTimeAgo={formatTimeAgo}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
