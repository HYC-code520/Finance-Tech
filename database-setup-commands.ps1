# Capital IQ Database Setup - PowerShell Commands
# Run these commands one by one in PowerShell (after PostgreSQL is installed)

# 1. Create the database
createdb -U postgres capital_iq_dev

# 2. Run schema (creates tables)
psql -U postgres -d capital_iq_dev -f .\sql\01_schema.sql

# 3. Load sample data
psql -U postgres -d capital_iq_dev -f .\sql\02_data.sql

# 4. Verify data was loaded
psql -U postgres -d capital_iq_dev -c "SELECT COUNT(*) FROM support_tickets;"

# 5. Test a sample query
psql -U postgres -d capital_iq_dev -c "SELECT ticket_id, ticket_subject FROM support_tickets LIMIT 3;"
