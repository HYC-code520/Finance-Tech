# PostgreSQL Password Reset Guide for Windows

## If you can't remember your postgres password, follow these steps:

### Method 1: Reset using pg_hba.conf (Recommended)

1. **Open Services**
   ```
   Press Win+R, type: services.msc
   ```

2. **Stop PostgreSQL Service**
   - Find "postgresql-x64-17" 
   - Right-click → Stop

3. **Edit Authentication File**
   - Open: `C:\Program Files\PostgreSQL\17\data\pg_hba.conf`
   - Find lines that look like:
   ```
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            md5
   # IPv6 local connections:
   host    all             all             ::1/128                 md5
   ```
   - Change `md5` to `trust`:
   ```
   host    all             all             127.0.0.1/32            trust
   host    all             all             ::1/128                 trust
   ```

4. **Start PostgreSQL Service**
   - Go back to Services
   - Right-click postgresql-x64-17 → Start

5. **Reset Password**
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "ALTER USER postgres PASSWORD 'postgres';"
   ```

6. **Restore Security**
   - Edit `pg_hba.conf` again
   - Change `trust` back to `md5`
   - Restart PostgreSQL service

7. **Test Connection**
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "SELECT 'Password reset successful!';"
   ```
   - Password should now be: `postgres`

### Method 2: Remember Installation Password

During PostgreSQL installation, you set a password. Common ones:
- `postgres`
- `admin` 
- Your Windows password
- `password`
- `123456`

### Method 3: Alternative Setup (Skip password issues)

We can also set up the project to use SQLite for local development:

1. Update `.env`:
   ```
   VITE_DATABASE_TYPE=sqlite
   ```

2. The app will create a local SQLite file instead

---

## Next Steps After Password Reset

Once you have the postgres password working:

1. Run: `.\setup-database-enhanced.bat`
2. Update `.env` file with correct password
3. Start development: `npm run dev`
