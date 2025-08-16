import { useState } from "react";
import { Search, User, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import backgroundImage from "@assets/Blue and Black Modern Technology Presentation_1755117076617.png";

// Mock support ticket data
const mockTickets = [
  {
    id: "#2460",
    title: "Can't connect to remote MySQL",
    category: "Report a problem",
    subcategory: "PC / Laptops",
    priority: "Urgent",
    status: "AGENT",
    assignee: {
      name: "Sofia Serrano",
      avatar: "",
      role: "Developer"
    },
    responses: 4,
    requester: 6,
    timeAgo: "5 min",
    progress: 65
  },
  {
    id: "#2448",
    title: "My computer doesn't work",
    category: "My devices",
    subcategory: "PC / Laptops", 
    priority: "Low",
    status: "AGENT",
    assignee: {
      name: "Daniela Gonzalez",
      avatar: "",
      role: "HR"
    },
    responses: 6,
    requester: 8,
    timeAgo: "2 min",
    progress: 45
  },
  {
    id: "#2447",
    title: "Windows license has expired",
    category: "Report a problem",
    subcategory: "Licenses",
    priority: "Medium",
    status: "APPROVAL",
    assignee: {
      name: "Travis Garcia",
      avatar: "",
      role: "Architect"
    },
    responses: 4,
    requester: 6,
    timeAgo: "1 day",
    progress: 80
  },
  {
    id: "#44",
    title: "Can't connect to remote MySQL",
    category: "Report a problem", 
    subcategory: "My devices",
    priority: "Low",
    status: "JIRA",
    assignee: {
      name: "Sofia Serrano",
      avatar: "",
      role: "Developer"
    },
    responses: 6,
    requester: 8,
    timeAgo: "3 days",
    progress: 90
  },
  {
    id: "#2505",
    title: "I need to install an Antivirus",
    category: "I have a question",
    subcategory: "",
    priority: "Low",
    status: "SOLVED",
    assignee: {
      name: "Anne Flits",
      avatar: "",
      role: "Architect"
    },
    responses: 3,
    requester: 0,
    timeAgo: "5 min",
    progress: 100
  },
  {
    id: "#2500",
    title: "The client is not updating the info",
    category: "My devices",
    subcategory: "PC / Laptops",
    priority: "High",
    status: "AGENT",
    assignee: {
      name: "John Thomas",
      avatar: "",
      role: "PR"
    },
    responses: 3,
    requester: 6,
    timeAgo: "6 min",
    progress: 30
  },
  {
    id: "#2514",
    title: "Email Account is Blocked",
    category: "Report a problem",
    subcategory: "Access / Internet",
    priority: "Medium",
    status: "AGENT",
    assignee: {
      name: "Travis Garcia",
      avatar: "",
      role: "Architect"
    },
    responses: 4,
    requester: 5,
    timeAgo: "1 day",
    progress: 60
  },
  {
    id: "#2417",
    title: "Can't connect to remote MySQL",
    category: "Report a problem",
    subcategory: "",
    priority: "Medium",
    status: "AGENT",
    assignee: {
      name: "Nathan Panzrama",
      avatar: "",
      role: "On vacation"
    },
    responses: 8,
    requester: 5,
    timeAgo: "47 days",
    progress: 25
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "AGENT":
      return "bg-red-500";
    case "APPROVAL":
      return "bg-gray-600";
    case "JIRA":
      return "bg-gray-700";
    case "SOLVED":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return "text-red-500";
    case "High":
      return "text-orange-500";
    case "Medium":
      return "text-yellow-500";
    case "Low":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "AGENT":
      return <AlertCircle className="w-4 h-4" />;
    case "APPROVAL":
      return <Clock className="w-4 h-4" />;
    case "JIRA":
      return <User className="w-4 h-4" />;
    case "SOLVED":
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <XCircle className="w-4 h-4" />;
  }
};

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = mockTickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.assignee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const assignedToMe = mockTickets.filter(ticket => 
    ticket.assignee.name === "Sofia Serrano"
  ).length;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div 
        className="flex-1 ml-16 min-h-screen relative overflow-hidden" 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        data-testid="dashboard-page"
      >
        {/* Navigation */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <Navigation />
        </div>

        {/* Dashboard Content */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
          
          {/* Left Sidebar - Stats */}
          <div className="w-full lg:w-64 space-y-4">
            
            {/* Assigned to Me Card */}
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {assignedToMe}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{assignedToMe}</div>
              <div className="text-gray-300 text-sm">ASSIGNED TO ME</div>
            </div>

            {/* Additional Stats */}
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <span className="text-white text-sm">Active Issues</span>
              </div>
              <div className="text-2xl font-bold text-white">12</div>
            </div>

            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-white text-sm">Resolved Today</span>
              </div>
              <div className="text-2xl font-bold text-white">8</div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for users, groups, companies, articles, requests, admin options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder-gray-300 focus:border-accent-cyan focus:ring-accent-cyan/30"
                data-testid="search-input"
              />
            </div>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredTickets.map((ticket, index) => (
                <div 
                  key={ticket.id}
                  className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-colors"
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

                  {/* Category Info */}
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-300">
                    <AlertCircle className="w-3 h-3" />
                    <span>{ticket.category}</span>
                    {ticket.subcategory && (
                      <>
                        <span>•</span>
                        <span>{ticket.subcategory}</span>
                      </>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                      <span>{ticket.responses} Resp</span>
                      <span>Req {ticket.requester}</span>
                      <span>{ticket.timeAgo}</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-1.5">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${ticket.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Assignee */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-gray-600 text-white text-xs">
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
                    <span className="text-gray-400 text-xs">{ticket.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}