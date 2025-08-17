import type { Express } from "express";
import { createServer, type Server } from "http";
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection configuration for Windows
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'capital_iq_dev',
  password: process.env.DB_PASSWORD || process.env.PGPASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
};

console.log('🔧 Database config:', { ...dbConfig, password: '***' });

const pool = new Pool(dbConfig);

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Health check endpoint for Docker
  app.get("/api/health", async (req, res) => {
    try {
      // Test database connection
      const result = await pool.query('SELECT 1');
      res.status(200).json({ 
        status: 'healthy', 
        database: 'connected',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Health check failed:', error);
      res.status(503).json({ 
        status: 'unhealthy', 
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Get all tickets with optional filtering
  app.get("/api/tickets", async (req, res) => {
    try {
      let query = `
        SELECT ticket_id, timestamp_utc, user_id, user_persona, 
               client_firm_tier, product_area, ticket_status, 
               ticket_priority, ticket_subject, ticket_body
        FROM support_tickets
      `;
      
      const conditions: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      // Add filters
      if (req.query.status) {
        conditions.push(`ticket_status = $${paramIndex++}`);
        params.push(req.query.status);
      }
      
      if (req.query.priority) {
        conditions.push(`ticket_priority = $${paramIndex++}`);
        params.push(req.query.priority);
      }
      
      if (req.query.product_area) {
        conditions.push(`product_area = $${paramIndex++}`);
        params.push(req.query.product_area);
      }
      
      if (req.query.user_persona) {
        conditions.push(`user_persona = $${paramIndex++}`);
        params.push(req.query.user_persona);
      }
      
      if (req.query.client_firm_tier) {
        conditions.push(`client_firm_tier = $${paramIndex++}`);
        params.push(parseInt(req.query.client_firm_tier as string));
      }

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }
      
      query += ` ORDER BY timestamp_utc DESC`;

      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      res.status(500).json({ error: 'Failed to fetch tickets' });
    }
  });

  // Get single ticket by ID
  app.get("/api/tickets/:ticketId", async (req, res) => {
    try {
      const { ticketId } = req.params;
      const result = await pool.query(
        'SELECT * FROM support_tickets WHERE ticket_id = $1',
        [ticketId]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      res.status(500).json({ error: 'Failed to fetch ticket' });
    }
  });

  // Search tickets
  app.get("/api/tickets/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ error: 'Query parameter required' });
      }
      
      const result = await pool.query(`
        SELECT ticket_id, timestamp_utc, user_id, user_persona, 
               client_firm_tier, product_area, ticket_status, 
               ticket_priority, ticket_subject, ticket_body
        FROM support_tickets 
        WHERE ticket_subject ILIKE $1 
           OR ticket_body ILIKE $1
        ORDER BY timestamp_utc DESC
      `, [`%${q}%`]);
      
      res.json(result.rows);
    } catch (error) {
      console.error('Error searching tickets:', error);
      res.status(500).json({ error: 'Failed to search tickets' });
    }
  });

  // Get enriched tickets (with AI analysis)
  app.get("/api/tickets/enriched", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT 
          st.*,
          ef.enrichment_id,
          ef.processed_at_utc,
          ef.feedback_category,
          ef.detected_topics,
          ef.sentiment_score,
          ef.priority_score,
          ef.mentioned_entities,
          ef.is_churn_risk,
          ef.llm_summary
        FROM support_tickets st
        LEFT JOIN enriched_feedback ef ON st.ticket_id = ef.ticket_id
        ORDER BY st.timestamp_utc DESC
      `);
      
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching enriched tickets:', error);
      res.status(500).json({ error: 'Failed to fetch enriched tickets' });
    }
  });

  // Get analytics
  app.get("/api/analytics", async (req, res) => {
    try {
      const [totalTickets, statusBreakdown, priorityBreakdown, productAreaBreakdown] = await Promise.all([
        pool.query('SELECT COUNT(*) as total FROM support_tickets'),
        pool.query('SELECT ticket_status, COUNT(*) as count FROM support_tickets GROUP BY ticket_status'),
        pool.query('SELECT ticket_priority, COUNT(*) as count FROM support_tickets GROUP BY ticket_priority'),
        pool.query('SELECT product_area, COUNT(*) as count FROM support_tickets GROUP BY product_area')
      ]);

      const analytics = {
        total_tickets: parseInt(totalTickets.rows[0].total),
        status_breakdown: statusBreakdown.rows.reduce((acc, row) => {
          acc[row.ticket_status] = parseInt(row.count);
          return acc;
        }, {}),
        priority_breakdown: priorityBreakdown.rows.reduce((acc, row) => {
          acc[row.ticket_priority] = parseInt(row.count);
          return acc;
        }, {}),
        product_area_breakdown: productAreaBreakdown.rows.reduce((acc, row) => {
          acc[row.product_area] = parseInt(row.count);
          return acc;
        }, {}),
        recent_trends: {
          trending_topics: ['API Integration', 'ESG Data Quality', 'Kensho AI Features'],
          volume_change: '+15%',
          priority_escalation: '+8%'
        }
      };

      res.json(analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  });

  // Future: Enrich ticket with AI
  app.post("/api/tickets/:ticketId/enrich", async (req, res) => {
    try {
      // This is where you'll integrate with OpenAI/AI services later
      res.status(501).json({ error: 'AI enrichment not implemented yet' });
    } catch (error) {
      console.error('Error enriching ticket:', error);
      res.status(500).json({ error: 'Failed to enrich ticket' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
