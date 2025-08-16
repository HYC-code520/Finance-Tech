@echo off
echo === Capital IQ Database Setup for Windows (Enhanced) ===
echo.

REM Get the PostgreSQL path
set PGPATH="C:\Program Files\PostgreSQL\17\bin"

echo Checking PostgreSQL installation...
%PGPATH%\psql.exe --version
if %errorlevel% neq 0 (
    echo ERROR: PostgreSQL not found at expected location
    echo Please check your PostgreSQL installation
    pause
    exit /b 1
)

echo.
echo === Password Setup Help ===
echo.
echo If you don't remember your postgres password:
echo 1. You set it during PostgreSQL installation
echo 2. Try common passwords: postgres, admin, your Windows password
echo 3. Password input is HIDDEN - you won't see what you type
echo 4. Just type slowly and press Enter
echo.

echo Attempting to create database (you'll need to enter postgres password)...
echo.

REM Try to create database
%PGPATH%\createdb.exe -U postgres capital_iq_dev
if %errorlevel% neq 0 (
    echo.
    echo === Database Creation Failed ===
    echo This usually means:
    echo 1. Wrong postgres password
    echo 2. Database already exists
    echo.
    echo Let's try to connect and check...
    %PGPATH%\psql.exe -U postgres -d postgres -c "SELECT 'Connection successful!';"
    if %errorlevel% neq 0 (
        echo.
        echo === PASSWORD RESET REQUIRED ===
        echo.
        echo Please follow these steps to reset your postgres password:
        echo.
        echo 1. Open Services (services.msc)
        echo 2. Find "postgresql-x64-17" service
        echo 3. Stop the service
        echo 4. Edit: C:\Program Files\PostgreSQL\17\data\pg_hba.conf
        echo 5. Change 'md5' to 'trust' for local connections
        echo 6. Restart the service
        echo 7. Run: psql -U postgres -c "ALTER USER postgres PASSWORD 'postgres';"
        echo 8. Change 'trust' back to 'md5' in pg_hba.conf
        echo 9. Restart service again
        echo.
        pause
        exit /b 1
    )
) else (
    echo ✅ Database created successfully!
)

echo.
echo Running schema setup...
%PGPATH%\psql.exe -U postgres -d capital_iq_dev -f sql\01_schema.sql
if %errorlevel% neq 0 (
    echo ❌ Schema setup failed
    pause
    exit /b 1
)

echo.
echo Loading sample data...
%PGPATH%\psql.exe -U postgres -d capital_iq_dev -f sql\02_data.sql
if %errorlevel% neq 0 (
    echo ❌ Data loading failed
    pause
    exit /b 1
)

echo.
echo ✅ Database setup complete!
echo Database: capital_iq_dev
echo Tables: support_tickets, enriched_feedback
echo Sample data: 10 support tickets loaded

echo.
echo Testing connection...
%PGPATH%\psql.exe -U postgres -d capital_iq_dev -c "SELECT COUNT(*) as ticket_count FROM support_tickets;"

echo.
echo Next steps:
echo 1. Update .env file with your postgres password if different
echo 2. Run: npm run dev
echo 3. Your API will be available at http://localhost:3001/api

pause
