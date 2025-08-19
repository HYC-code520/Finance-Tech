/**
 * Database service abstraction for Capital IQ Strategic Intelligence Engine
 * Supports both local PostgreSQL and Supabase backends
 */

import type { 
  SupportTicket, 
  EnrichedFeedback, 
  TicketWithEnrichment, 
  TicketFilters, 
  TicketAnalytics 
} from '@/types/tickets';

// Abstract database service interface
export interface DatabaseService {
  // Core CRUD operations
  getTickets(filters?: TicketFilters): Promise<SupportTicket[]>;
  getTicketById(ticketId: string): Promise<SupportTicket | null>;
  getEnrichedTickets(filters?: TicketFilters): Promise<TicketWithEnrichment[]>;
  
  // Search and analytics
  searchTickets(query: string): Promise<SupportTicket[]>;
  getAnalytics(): Promise<TicketAnalytics>;
  
  // Future enrichment operations
  enrichTicket(ticketId: string): Promise<EnrichedFeedback>;
}

// Local development implementation (connects to your local API)
export class LocalDatabaseService implements DatabaseService {
  private baseUrl: string;
  
  constructor(baseUrl = 'http://localhost:5001/api') {
    this.baseUrl = baseUrl;
  }
  
  async getTickets(filters?: TicketFilters): Promise<SupportTicket[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (typeof value === 'object' && 'start' in value) {
            // Handle date range
            params.append(`${key}_start`, value.start);
            params.append(`${key}_end`, value.end);
          } else {
            params.append(key, String(value));
          }
        }
      });
    }
    
    const response = await fetch(`${this.baseUrl}/tickets?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tickets: ${response.statusText}`);
    }
    return response.json();
  }

  async getTicketById(ticketId: string): Promise<SupportTicket | null> {
    const response = await fetch(`${this.baseUrl}/tickets/${ticketId}`);
    if (response.status === 404) return null;
    if (!response.ok) {
      throw new Error(`Failed to fetch ticket: ${response.statusText}`);
    }
    return response.json();
  }

  async getEnrichedTickets(filters?: TicketFilters): Promise<TicketWithEnrichment[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    
    const response = await fetch(`${this.baseUrl}/tickets/enriched?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch enriched tickets: ${response.statusText}`);
    }
    return response.json();
  }

  async searchTickets(query: string): Promise<SupportTicket[]> {
    const response = await fetch(`${this.baseUrl}/tickets/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Failed to search tickets: ${response.statusText}`);
    }
    return response.json();
  }

  async getAnalytics(): Promise<TicketAnalytics> {
    const response = await fetch(`${this.baseUrl}/analytics`);
    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.statusText}`);
    }
    return response.json();
  }

  async enrichTicket(ticketId: string): Promise<EnrichedFeedback> {
    const response = await fetch(`${this.baseUrl}/tickets/${ticketId}/enrich`, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error(`Failed to enrich ticket: ${response.statusText}`);
    }
    return response.json();
  }
}

// Supabase implementation (for production)
export class SupabaseDatabaseService implements DatabaseService {
  constructor(private supabaseUrl: string, private supabaseKey: string) {}
  
  async getTickets(filters?: TicketFilters): Promise<SupportTicket[]> {
    // TODO: Implement Supabase client calls
    throw new Error('Supabase implementation pending');
  }

  async getTicketById(ticketId: string): Promise<SupportTicket | null> {
    throw new Error('Supabase implementation pending');
  }

  async getEnrichedTickets(filters?: TicketFilters): Promise<TicketWithEnrichment[]> {
    throw new Error('Supabase implementation pending');
  }

  async searchTickets(query: string): Promise<SupportTicket[]> {
    throw new Error('Supabase implementation pending');
  }

  async getAnalytics(): Promise<TicketAnalytics> {
    throw new Error('Supabase implementation pending');
  }

  async enrichTicket(ticketId: string): Promise<EnrichedFeedback> {
    throw new Error('Supabase implementation pending');
  }
}

// Service factory based on environment
export function createDatabaseService(): DatabaseService {
  const environment = import.meta.env.VITE_DATABASE_TYPE || 'local';
  
  switch (environment) {
    case 'supabase':
      return new SupabaseDatabaseService(
        import.meta.env.VITE_SUPABASE_URL!,
        import.meta.env.VITE_SUPABASE_ANON_KEY!
      );
    case 'local':
    default:
      return new LocalDatabaseService(import.meta.env.VITE_API_BASE_URL);
  }
}

// Default export for easy importing
export const databaseService = createDatabaseService();
