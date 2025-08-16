@echo off
echo === Capital IQ Database Setup for Windows ===
echo.

echo 1. Creating database...
createdb -U postgres capital_iq_dev

echo 2. Running schema setup...
psql -U postgres -d capital_iq_dev -f sql\01_schema.sql

echo 3. Loading sample data...
psql -U postgres -d capital_iq_dev -f sql\02_data.sql

echo.
echo ✅ Database setup complete!
echo Database: capital_iq_dev
echo Tables: support_tickets, enriched_feedback
echo Sample data: 10 support tickets loaded

echo.
echo Next steps:
echo 1. Update .env file with your postgres password if different
echo 2. Run: npm run dev
echo 3. Your API will be available at http://localhost:3001/api

pause
