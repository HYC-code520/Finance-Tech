-- =================================================================
--  Schema for the Capital IQ Strategic Intelligence Engine
--  Version: 3.0 (Local-First, Professional Support Ticket Schema)
-- =================================================================

-- Drop tables in reverse order of creation to handle foreign keys
DROP TABLE IF EXISTS enriched_feedback;
DROP TABLE IF EXISTS support_tickets;

-- Table 1: A proper schema for ingesting support tickets
-- RENAMED from feedback_log to be more specific to the MVP's scope.
CREATE TABLE support_tickets (
    ticket_id VARCHAR(255) PRIMARY KEY,
    timestamp_utc TIMESTAMPTZ NOT NULL,
    user_id VARCHAR(255) NOT NULL, -- Abstracted user identifier
    user_persona VARCHAR(50),
    client_firm_tier INTEGER NOT NULL,
    product_area VARCHAR(50), -- A dedicated field for routing and analysis
    ticket_status VARCHAR(20) CHECK (ticket_status IN ('open', 'closed', 'escalated')), -- Enforces data integrity
    ticket_priority VARCHAR(20) CHECK (ticket_priority IN ('low', 'medium', 'high', 'urgent')), -- Enforces data integrity
    ticket_subject TEXT, -- A realistic field for the ticket's title
    ticket_body TEXT NOT NULL -- The core unstructured text for our AI
);

-- Table 2: AI-enriched data (output of our future pipeline)
-- This structure remains excellent, just updated the foreign key reference.
CREATE TABLE enriched_feedback (
    enrichment_id SERIAL PRIMARY KEY,
    ticket_id VARCHAR(255) NOT NULL REFERENCES support_tickets(ticket_id),
    processed_at_utc TIMESTAMPTZ NOT NULL,
    feedback_category VARCHAR(50),
    detected_topics TEXT[],
    sentiment_score NUMERIC(4, 3),
    priority_score NUMERIC(5, 2),
    mentioned_entities JSONB,
    is_churn_risk BOOLEAN DEFAULT FALSE,
    llm_summary TEXT
);

-- Index for faster joins.
CREATE INDEX idx_enriched_feedback_ticket_id ON enriched_feedback(ticket_id);