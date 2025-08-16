-- =================================================================
--  Professionally Fortified Dummy Data for the support_tickets table
--  Version: 3.0
-- =================================================================

INSERT INTO support_tickets (ticket_id, timestamp_utc, user_id, user_persona, client_firm_tier, product_area, ticket_status, ticket_priority, ticket_subject, ticket_body) VALUES

-- Strategic Initiative: GenAI / Kensho
('ST-50101', '2025-08-01T10:05:00Z', 'er.assoc9', 'Equity_Research_Associate', 1, 'AI_Features', 'open', 'medium', 'Kensho Chart Explainer Missing Nuance', $$The new 'Chart Explainer' AI feature is a great start, but it often misses key nuances in financial statements. Can we get Kensho to also analyze the MD&A section of the 10-K for a more complete picture? This would be a game changer.$$),

-- Strategic Initiative: Private Markets / IHS Integration
('ST-50102', '2025-08-01T11:22:00Z', 'ib.analyst7', 'Investment_Banking_Analyst', 1, 'Excel_Plugin', 'escalated', 'urgent', 'CRITICAL: Private Data Failing to Load in Model', $$Running into a critical issue. The private company data from the IHS Markit integration is not flowing into my valuation models correctly via the Excel Plug-in. The revenue figures seem to be a quarter behind. This is impacting a live, confidential M&A deal.$$),

-- Strategic Initiative: ESG
('ST-50103', '2025-08-01T12:45:00Z', 'pm.global4', 'Portfolio_Manager', 2, 'Screening', 'open', 'high', 'ESG Screening for Labor Policies is Unintuitive', $$I am having a very difficult time screening for companies with specific ESG supply chain labor policies. The data is in the system, but the screening tool is not intuitive for these advanced ESG metrics. It takes me hours to do what should take minutes.$$),

-- Emerging Use-Case: API & Python Automation
('ST-50104', '2025-08-02T09:15:00Z', 'quant.lead1', 'Quantitative_Analyst', 1, 'API', 'open', 'high', 'API Endpoint Request for Point-in-Time Data', $$My team is trying to build a custom risk model using your API and our internal Python environment. We desperately need an API endpoint to pull historical point-in-time fundamental data to avoid lookahead bias. We are automating our entire research process and this is a major blocker.$$),

-- Emerging Use-Case: Data Science & Custom Models
('ST-50105', '2025-08-02T14:30:00Z', 'ds.team5', 'Data_Scientist', 2, 'Data_Exports', 'open', 'medium', 'Request for Bulk Sector Data Export for ML Training', $$Is there a way to get bulk data exports for an entire sector? My data science team is building a custom model to predict earnings surprises and we need clean training data. We can't pull it one company at a time via the standard interface.$$),

-- Combination: Strategic Initiative (GenAI) + Bug Report
('ST-50106', '2025-08-03T16:02:00Z', 'ib.analyst12', 'Investment_Banking_Analyst', 3, 'AI_Features', 'closed', 'low', 'Bug with Copy/Paste in Kensho Document Search', $$The Kensho-powered document search is incredible for finding obscure facts in filings, but the 'Copy to Clipboard' function is buggy and doesn't preserve the source link, which is essential for our audit trail.$$),

-- Combination: Strategic Initiative (Private Markets) + Emerging Use-Case (API)
('ST-50107', '2025-08-03T17:00:00Z', 'quant.analyst3', 'Quantitative_Analyst', 1, 'API', 'open', 'high', 'API Latency Issues with Private Market Data', $$The API endpoint for the new IHS private market funding rounds data is very slow and often times out. We need reliable, low-latency access to automate our tracking of venture-backed competitors.$$),

-- More Examples for Robustness
('ST-50108', '2025-08-04T09:00:00Z', 'er.assoc21', 'Equity_Research_Associate', 2, 'AI_Features', 'open', 'medium', 'Feature Request: AI-Generated Competitive Summary from Transcripts', $$Request for Kensho: Can you build an AI tool that automatically generates a summary of a company's competitive advantages based on its latest earnings call transcript? Reading them all takes forever.$$),
('ST-50109', '2025-08-04T11:45:00Z', 'pm.esghead', 'Portfolio_Manager', 1, 'ESG_Data', 'escalated', 'urgent', 'URGENT: Inconsistent Scope 3 Emissions Data', $$The quality of your Scope 3 emissions data for the ESG module is inconsistent across industries. This is a critical datapoint for our sustainable investing funds. We need better coverage and validation.$$),
('ST-50110', '2025-08-05T15:18:00Z', 'ib.analyst2', 'Investment_Banking_Analyst', 2, 'Excel_Plugin', 'open', 'medium', 'Feature Request: Data Lineage Flag for IHS vs S&P Data', $$The Excel Plug-in needs a feature to flag which data points in my model came from the new IHS Markit private datasets versus the original S&P public data. It's crucial for data lineage and transparency.$$);