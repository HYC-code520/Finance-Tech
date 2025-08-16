import { useState, useEffect } from "react";
import { Search, AlertCircle } from "lucide-react";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { databaseService } from "@/services/databaseService";
import type { SupportTicket } from "@/types/tickets";

export default function Dashboard() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter tickets based on search term
  const filteredTickets = tickets.filter(ticket =>
    ticket.ticket_subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticket_body.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.ticket_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navigation />
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading tickets from database...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navigation />
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <p className="mt-4 text-red-600">Error loading tickets: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navigation />
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Strategic Intelligence Dashboard</h1>
              <p className="text-gray-600">Real-time support ticket analysis from PostgreSQL</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {tickets.length} tickets loaded
              </Badge>
            </div>
          </div>
          
          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tickets by ID, subject, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tickets List */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No tickets found matching your search.</p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.ticket_id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {ticket.ticket_subject || 'No Subject'}
                        </h3>
                        <Badge className={getPriorityColor(ticket.ticket_priority)}>
                          {ticket.ticket_priority}
                        </Badge>
                        <Badge className={getStatusColor(ticket.ticket_status)}>
                          {ticket.ticket_status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span>ID: {ticket.ticket_id}</span>
                        <span>Tier {ticket.client_firm_tier} Client</span>
                        <span>{ticket.product_area}</span>
                        <span>{ticket.user_persona}</span>
                        <span>{formatTime(ticket.timestamp_utc)}</span>
                      </div>
                      
                      <p className="text-gray-700 text-sm">
                        {ticket.ticket_body.length > 200 
                          ? ticket.ticket_body.substring(0, 200) + '...' 
                          : ticket.ticket_body
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
