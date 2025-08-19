-- =================================================================
--  Additional Mock Data - 10 More Tickets (Batch 3)
--  Version: 1.1
--  Following the "Finding the Golden Signals" narrative framework.
-- =================================================================

INSERT INTO support_tickets (ticket_id, timestamp_utc, user_id, user_persona, client_firm_tier, product_area, ticket_status, ticket_priority, ticket_subject, ticket_body) VALUES

-- Category 1: The Noise (7 More Tickets)
('ST-117', '2025-08-14T09:05:00Z', 'gvi.analyst18', 'Everyday Analyst', 3, 'General', 'closed', 'low', 'Can I change my username?', $$My username is an old employee ID and I would like to change it to my email address. I can''t find an option in the account settings to do this. Is it possible?$$),
('ST-118', '2025-08-14T11:30:00Z', 'se.analyst11', 'Power User', 2, 'Data_Quality', 'open', 'medium', 'Inconsistent Ticker Symbol', $$The ticker for a company that recently IPO''d is showing up as its temporary symbol on some pages but the permanent one on others. This is causing VLOOKUP errors in my Excel models.$$),
('ST-119', '2025-08-15T15:00:00Z', 'nyu.student22', 'Everyday Analyst', 4, 'Charting', 'closed', 'low', 'Export Chart as Image', $$How do I export a chart I''ve made as a high-resolution PNG or JPG file for my presentation? The screenshot quality is not good enough.$$),
('ST-120', '2025-08-16T10:15:00Z', 'gvi.pm3', 'Everyday Analyst', 3, 'Excel_Plugin', 'open', 'high', 'Excel Plug-in Error 404', $$When I try to pull data for a specific private company in the Excel Plug-in, I keep getting a 'Error 404: Data not found' message, but I can see the company just fine on the web platform.$$),
('ST-121', '2025-08-16T14:45:00Z', 'se.analyst12', 'Power User', 2, 'Screening', 'open', 'medium', 'Screening Tool Timeouts', $$My multi-condition screen with over 15 parameters keeps timing out and failing. Can the screener handle complex queries or am I hitting a limit?$$),
('ST-122', '2025-08-17T12:00:00Z', 'gvi.analyst18', 'Everyday Analyst', 3, 'Data_Coverage', 'closed', 'low', 'Missing officer information', $$I was looking at the management team for a small-cap company and the page for the CFO is blank. Can this data be added?$$),
('ST-123', '2025-08-18T16:20:00Z', 'nyu.student25', 'Everyday Analyst', 4, 'General', 'closed', 'low', 'Training video request', $$Do you have any video tutorials on how to perform a DCF valuation using the templates in Capital IQ? The documentation is a bit dense.$$),

-- Category 2: The Strategic Signals (2 More Tickets)
('ST-210', '2025-08-15T11:00:00Z', 'ac.pmlead', 'Strategic Leader', 1, 'AI_Features', 'open', 'urgent', 'Kensho for Portfolio Monitoring', $$Following up on our last QBR. My PMs need a Kensho-powered feature that actively monitors our portfolio companies and provides real-time alerts and summaries of any material events found in news or filings. This is a key feature in competing platforms.$$),
('ST-211', '2025-08-18T13:30:00Z', 'se.analyst11', 'Power User', 2, 'Private_Markets', 'open', 'high', 'Data Gap: Private Company Credit Data', $$We are increasingly evaluating the debt of private, sponsor-backed companies. The IHS data is great for equity, but we can''t find any credit-related data (e.g., debt tranches, interest rates). This data is available in PitchBook and is critical for our analysis.$$),

-- Category 3: The Opportunity Signals (1 More Ticket)
('ST-307', '2025-08-14T17:00:00Z', 'qla.quant5', 'Power User', 2, 'API', 'open', 'high', 'API Request: Real-time News Feed', $$We need a streaming, low-latency API endpoint for your real-time news feed. We want to run our own NLP sentiment analysis models on the news as it breaks to inform our automated trading strategies. A standard REST API is too slow for this use case.$$);