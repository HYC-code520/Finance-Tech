@echo off
echo === Capital IQ Database Setup - Working Version ===
echo.

REM Set PostgreSQL password as environment variable to avoid terminal input issues
set PGPASSWORD=postgres
set PGPATH="C:\Program Files\PostgreSQL\17\bin"

echo 1. Creating database...
%PGPATH%\createdb.exe -U postgres capital_iq_dev
if %errorlevel% equ 0 (
    echo ✅ Database created successfully
) else (
    echo ⚠️  Database already exists or creation failed
)

echo.
echo 2. Running schema setup...
%PGPATH%\psql.exe -U postgres -d capital_iq_dev -f sql\01_schema.sql
if %errorlevel% equ 0 (
    echo ✅ Schema setup complete
) else (
    echo ❌ Schema setup failed
    pause
    exit /b 1
)

echo.
echo 3. Loading sample data...
%PGPATH%\psql.exe -U postgres -d capital_iq_dev -f sql\02_data.sql
if %errorlevel% equ 0 (
    echo ✅ Data loaded successfully
) else (
    echo ❌ Data loading failed
    pause
    exit /b 1
)

echo.
echo 4. Verifying setup...
%PGPATH%\psql.exe -U postgres -d capital_iq_dev -c "SELECT COUNT(*) as total_tickets FROM support_tickets;"

echo.
echo ✅ Database setup complete!
echo Database: capital_iq_dev
echo Tables: support_tickets, enriched_feedback
echo Sample data: 10 support tickets loaded
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Visit: http://localhost:3001/api/tickets
echo 3. Frontend: http://localhost:5173

pause
