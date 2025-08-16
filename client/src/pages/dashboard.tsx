import { useState, useRef, useEffect } from "react";
import { Search, User, Clock, AlertCircle, CheckCircle, XCircle, Bot } from "lucide-react";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import backgroundImage from "@assets/Blue and Black Modern Technology Presentation_1755117076617.png";

// Support ticket data matching the new professional schema
const mockTickets = [
  {
    id: "ST-50101",
    title: "Kensho Chart Explainer Missing Nuance",
    product_area: "AI_Features",
    user_persona: "Equity_Research_Associate",
    client_firm_tier: 1,
    priority: "medium",
    status: "open",
    assignee: {
      name: "Sofia Chen",
      avatar: "",
      role: "AI Product Specialist"
    },
    responses: 3,
    requester: 2,
    timeAgo: "5 min",
    progress: 35,
    ticket_body: "The new 'Chart Explainer' AI feature is a great start, but it often misses key nuances in financial statements."
  },
  {
    id: "ST-50102", 
    title: "CRITICAL: Private Data Failing to Load in Model",
    product_area: "Excel_Plugin",
    user_persona: "Investment_Banking_Analyst",
    client_firm_tier: 1,
    priority: "urgent",
    status: "escalated",
    assignee: {
      name: "Marcus Rodriguez",
      avatar: "",
      role: "Technical Support Lead"
    },
    responses: 8,
    requester: 1,
    timeAgo: "2 min",
    progress: 75,
    ticket_body: "Private company data from IHS Markit integration is not flowing into valuation models correctly via Excel Plug-in."
  },
  {
    id: "ST-50103",
    title: "ESG Screening for Labor Policies is Unintuitive", 
    product_area: "Screening",
    user_persona: "Portfolio_Manager",
    client_firm_tier: 2,
    priority: "high",
    status: "open",
    assignee: {
      name: "Elena Kowalski",
      avatar: "",
      role: "ESG Data Analyst"
    },
    responses: 4,
    requester: 3,
    timeAgo: "1 hour",
    progress: 20,
    ticket_body: "Having difficulty screening for companies with specific ESG supply chain labor policies. Tool is not intuitive."
  },
  {
    id: "ST-50104",
    title: "API Endpoint Request for Point-in-Time Data",
    product_area: "API", 
    user_persona: "Quantitative_Analyst",
    client_firm_tier: 1,
    priority: "high",
    status: "open",
    assignee: {
      name: "James Kim",
      avatar: "",
      role: "API Engineering"
    },
    responses: 2,
    requester: 5,
    timeAgo: "3 hours",
    progress: 10,
    ticket_body: "Need API endpoint to pull historical point-in-time fundamental data to avoid lookahead bias for custom risk model."
  },
  {
    id: "ST-50105",
    title: "Request for Bulk Sector Data Export for ML Training",
    product_area: "Data_Exports",
    user_persona: "Data_Scientist", 
    client_firm_tier: 2,
    priority: "medium",
    status: "open",
    assignee: {
      name: "Dr. Sarah Patel",
      avatar: "",
      role: "Data Solutions Architect"
    },
    responses: 1,
    requester: 4,
    timeAgo: "6 hours",
    progress: 5,
    ticket_body: "Need bulk data exports for entire sector to build custom model for predicting earnings surprises."
  },
  {
    id: "ST-50106",
    title: "Bug with Copy/Paste in Kensho Document Search",
    product_area: "AI_Features",
    user_persona: "Investment_Banking_Analyst",
    client_firm_tier: 3,
    priority: "low", 
    status: "closed",
    assignee: {
      name: "Alex Thompson",
      avatar: "",
      role: "Frontend Developer"
    },
    responses: 5,
    requester: 0,
    timeAgo: "1 day",
    progress: 100,
    ticket_body: "Kensho document search Copy to Clipboard function is buggy and doesn't preserve source link."
  },
  {
    id: "ST-50107",
    title: "API Latency Issues with Private Market Data",
    product_area: "API",
    user_persona: "Quantitative_Analyst",
    client_firm_tier: 1,
    priority: "high",
    status: "open",
    assignee: {
      name: "David Zhang",
      avatar: "",
      role: "Infrastructure Engineer"
    },
    responses: 4,
    requester: 5,
    timeAgo: "1 day",
    progress: 60,
    ticket_body: "API endpoint for IHS private market funding rounds data is very slow and often times out."
  },
  {
    id: "ST-50108",
    title: "AI-Generated Competitive Summary from Transcripts",
    product_area: "AI_Features",
    user_persona: "Equity_Research_Associate",
    client_firm_tier: 2,
    priority: "medium",
    status: "open",
    assignee: {
      name: "Dr. Lisa Wang",
      avatar: "",
      role: "AI Research Lead"
    },
    responses: 2,
    requester: 3,
    timeAgo: "2 days",
    progress: 15,
    ticket_body: "Request for Kensho: Can you build an AI tool that automatically generates competitive advantage summaries from earnings call transcripts?"
  }
];

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

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("assigned");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 50

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
        this.size = Math.random() * 40 + 15 // Increased size from 30+10 to 40+15
        this.speedX = (Math.random() - 0.5) * 24 // Tripled speed from 8 to 24
        this.speedY = (Math.random() - 0.5) * 24 // Tripled speed from 8 to 24
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.3 + 0.1})`
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
        
        // Add blur effect
        ctx.filter = 'blur(4px)'
        ctx.fillStyle = this.color
        ctx.beginPath()
        
        // Create vertical oval/ellipse shape (height > width)
        ctx.ellipse(this.x, this.y, this.size * 0.4, this.size, 0, 0, Math.PI * 2)
        ctx.fill()
        
        // Reset filter
        ctx.filter = 'none'
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new ParticleImpl())
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const filteredTickets = mockTickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.assignee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.product_area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.user_persona.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rawTicketsCount = mockTickets.length;

  const mentionedAI = mockTickets.filter(ticket => 
    ticket.title.toLowerCase().includes('ai') || 
    ticket.product_area.toLowerCase().includes('ai') ||
    ticket.ticket_body.toLowerCase().includes('ai')
  ).length;

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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#092946]/80 backdrop-blur-sm border-0 text-white placeholder:text-gray-300 focus:border-0 focus:ring-0 rounded-2xl"
              data-testid="search-input"
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
              {filteredTickets.map((ticket, index) => (
                <div 
                  key={ticket.id}
                  className="relative bg-[#092946]/50 border border-[#71FDFF]/30 rounded-2xl p-5 hover:border-[#71FDFF]/50 transition-all duration-300 backdrop-blur-sm"
                  data-testid={`ticket-card-${index}`}
                >
                  {/* Status and Priority Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`${getStatusColor(ticket.status)} text-white border-0 px-2 py-1 text-xs`}
                      >
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1">{ticket.status}</span>
                      </Badge>
                    </div>
                    <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>

                  {/* Ticket Title */}
                  <h3 className="text-white font-medium text-sm mb-3 line-clamp-2">
                    {ticket.title}
                  </h3>

                  {/* Product Area & User Persona Info */}
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-300">
                    <AlertCircle className="w-3 h-3" />
                    <span>{ticket.product_area.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>{ticket.user_persona.replace('_', ' ')}</span>
                    <span>•</span>
                    <span className="text-accent-cyan">Tier {ticket.client_firm_tier}</span>
                  </div>



                  {/* Assignee */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-[#041420] text-accent-cyan text-xs font-medium">
                          {ticket.assignee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white text-xs font-medium">
                          {ticket.assignee.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {ticket.assignee.role}
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
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}