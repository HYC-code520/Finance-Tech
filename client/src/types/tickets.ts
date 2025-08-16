/**
 * TypeScript types for Capital IQ Strategic Intelligence Engine
 * Based on SQL schema from 01_schema.sql
 */

// Base support ticket from database schema
export interface SupportTicket {
  ticket_id: string;
  timestamp_utc: string;
  user_id: string;
  user_persona: string | null;
  client_firm_tier: number;
  product_area: string | null;
  ticket_status: 'open' | 'closed' | 'escalated';
  ticket_priority: 'low' | 'medium' | 'high' | 'urgent';
  ticket_subject: string | null;
  ticket_body: string;
}

// Enriched feedback from database schema
export interface EnrichedFeedback {
  enrichment_id: number;
  ticket_id: string;
  processed_at_utc: string;
  feedback_category: string | null;
  detected_topics: string[] | null;
  sentiment_score: number | null;
  priority_score: number | null;
  mentioned_entities: Record<string, any> | null;
  is_churn_risk: boolean;
  llm_summary: string | null;
}

// Combined ticket with enrichment data
export interface TicketWithEnrichment extends SupportTicket {
  enrichment?: EnrichedFeedback;
}

// Filter interface for querying tickets
export interface TicketFilters {
  status?: 'open' | 'closed' | 'escalated';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  product_area?: string;
  user_persona?: string;
  client_firm_tier?: number;
  date_range?: {
    start: string;
    end: string;
  };
}

// Analytics interface
export interface TicketAnalytics {
  total_tickets: number;
  status_breakdown: Record<string, number>;
  priority_breakdown: Record<string, number>;
  product_area_breakdown: Record<string, number>;
  recent_trends: {
    trending_topics: string[];
    volume_change: string;
    priority_escalation: string;
  };
}

// Strategic signal categorization (for AI analysis)
export interface TicketCategory {
  category: 'noise' | 'strategic_signal' | 'opportunity_signal';
  strategic_initiative?: 'GenAI' | 'Private_Markets' | 'ESG';
  confidence_score: number;
}

// Enhanced ticket with AI analysis
export interface EnrichedTicket extends SupportTicket {
  category: TicketCategory;
  sentiment_score: number;
  priority_score: number;
  mentioned_entities: string[];
  is_churn_risk: boolean;
  llm_summary: string;
}
