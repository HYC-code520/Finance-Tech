---
applyTo: "**/supabase/**,**/api/**,**/*.sql"
description: "Supabase and database specific guidelines for vector search and API implementation"
---

# Supabase & Database Guidelines

Apply the [general coding guidelines](../copilot-instructions.md) to all database and API code.

## Database Schema Standards

### Naming Conventions
- Use `snake_case` for table and column names
- Include `created_at` and `updated_at` on all tables
- Use descriptive, singular table names (e.g., `feedback_item`, not `feedbacks`)

### Vector Storage
- Store embeddings in `VECTOR(1536)` columns for OpenAI embeddings
- Create proper indexes for vector similarity search
- Use `vector_cosine_ops` for cosine similarity operations

Example schema:

```sql
CREATE TABLE feedback_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  source TEXT NOT NULL,
  client_id TEXT,
  sentiment FLOAT CHECK (sentiment >= -1 AND sentiment <= 1),
  embedding VECTOR(1536),
  initiatives TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vector similarity index
CREATE INDEX ON feedback_items USING ivfflat (embedding vector_cosine_ops);
```

## Edge Function Patterns

### Standard Edge Function Structure

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Input validation
    const { query, initiative, limit = 10 } = await req.json();
    
    if (!query || typeof query !== 'string') {
      throw new Error('Query parameter is required and must be a string');
    }
    
    // Business logic
    const result = await processRequest(query, initiative, limit);
    
    return new Response(JSON.stringify({ data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
```

## Vector Search Implementation

### Embedding Generation
- Use OpenAI's `text-embedding-ada-002` model
- Batch process embeddings to avoid rate limits
- Normalize embeddings before storage
- Handle API errors gracefully

### Vector Queries
- Use cosine similarity for semantic search
- Combine vector search with keyword filtering
- Implement proper indexing for performance
- Use approximate nearest neighbor for large datasets

Example vector search:

```sql
SELECT id, title, description, 
       1 - (embedding <=> $1) as similarity
FROM feedback_items
WHERE ($2::text IS NULL OR initiatives @> ARRAY[$2])
  AND (embedding <=> $1) < 0.5  -- Similarity threshold
ORDER BY embedding <=> $1
LIMIT $3;
```

## API Error Handling

### Input Validation
```typescript
const validateSearchInput = (input: any) => {
  const { query, initiative, limit } = input;
  
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    throw new Error('Query is required and must be a non-empty string');
  }
  
  if (initiative && !['genai', 'privateMarkets', 'esg'].includes(initiative)) {
    throw new Error('Initiative must be one of: genai, privateMarkets, esg');
  }
  
  if (limit && (typeof limit !== 'number' || limit < 1 || limit > 50)) {
    throw new Error('Limit must be a number between 1 and 50');
  }
  
  return { query: query.trim(), initiative, limit: limit || 10 };
};
```

### Performance Optimization
- Implement query result caching where appropriate
- Use connection pooling for database connections
- Monitor and log query performance
- Implement rate limiting for API endpoints

### Security Best Practices
- Validate all input parameters
- Use parameterized queries to prevent SQL injection
- Implement proper authentication checks
- Apply rate limiting to prevent abuse
- Log security-relevant events
