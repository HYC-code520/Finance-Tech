import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Search, User, Clock, AlertCircle, CheckCircle, XCircle, Bot } from "lucide-react";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { databaseService } from "@/services/databaseService";
import type { SupportTicket } from "@/types/tickets";

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
  assignee 
}: { 
  ticket: SupportTicket; 
  index: number; 
  assignee: { name: string; role: string } 
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
      <span className={`text-xs font-medium ${getPriorityColor(ticket.ticket_priority)}`}>
        {ticket.ticket_priority}
      </span>
    </div>

    {/* Ticket Title */}
    <h3 className="text-white font-medium text-sm mb-3 line-clamp-2">
      {ticket.ticket_subject || 'No Subject'}
    </h3>

    {/* Product Area & User Persona Info */}
    <div className="flex items-center gap-2 mb-3 text-xs text-gray-300">
      <AlertCircle className="w-3 h-3" />
      <span>{ticket.product_area?.replace('_', ' ') || 'Unknown'}</span>
      <span>•</span>
      <span>{ticket.user_persona?.replace('_', ' ') || 'Unknown'}</span>
      <span>•</span>
      <span className="text-accent-cyan">Tier {ticket.client_firm_tier}</span>
    </div>

    {/* Assignee */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
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
      <div className="absolute bottom-4 right-0">
        <div 
          className="bg-[#71FDFF] text-black px-4 py-1 text-xs font-medium"
          style={{
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
        >
          #{index + 1}
        </div>
      </div>
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

  // Filter tickets based on search term and database data - Memoized for performance
  const filteredTickets = useMemo(() => {
    if (!searchTerm.trim()) return tickets;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return tickets.filter(ticket =>
      ticket.ticket_subject?.toLowerCase().includes(lowerSearchTerm) ||
      ticket.ticket_body.toLowerCase().includes(lowerSearchTerm) ||
      ticket.ticket_id.toLowerCase().includes(lowerSearchTerm) ||
      ticket.product_area?.toLowerCase().includes(lowerSearchTerm) ||
      ticket.user_persona?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [tickets, searchTerm]);

  const rawTicketsCount = tickets.length;

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
              placeholder="Search for users, groups, companies, articles, requests, admin options..."
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
                    <div className="text-white text-xs font-medium">Raw tickets</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    activeTab === "assigned"
                      ? "bg-accent-cyan text-primary-dark"
                      : "bg-white/20 text-white"
                  }`}>
                    {rawTicketsCount}
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
              </div>
            </div>
          </div>

          {/* Tickets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredTickets.map((ticket, index) => {
                const assignee = generateAssignee(ticket, index);
                return (
                  <TicketCard
                    key={ticket.ticket_id}
                    ticket={ticket}
                    index={index}
                    assignee={assignee}
                  />
                );
              })}
            </div>
        </div>
      </div>
    </div>
  );
}
