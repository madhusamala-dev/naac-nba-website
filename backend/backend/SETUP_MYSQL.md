# MySQL Setup Guide for NAAC NBA Backend

This guide will help you set up MySQL database for the NAAC NBA Services backend.

## Option 1: Install MySQL Locally (Recommended)

### Windows
1. **Download MySQL Installer:**
   - Visit: https://dev.mysql.com/downloads/installer/
   - Download MySQL Installer for Windows
   - Run the installer and select "Developer Default"

2. **Configure MySQL:**
   - Set root password to `root` (or update .env file)
   - Keep default port 3306
   - Complete the installation

3. **Start MySQL Service:**
   - Open Services (services.msc)
   - Find "MySQL80" service
   - Start the service

### macOS
1. **Using Homebrew (Recommended):**
   ```bash
   # Install Homebrew if not installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install MySQL
   brew install mysql
   
   # Start MySQL
   brew services start mysql
   
   # Secure installation (set root password to 'root')
   mysql_secure_installation
   ```

2. **Using MySQL Installer:**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Install the .dmg package
   - Start MySQL from System Preferences

### Linux (Ubuntu/Debian)
```bash
# Update package list
sudo apt update

# Install MySQL Server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure installation
sudo mysql_secure_installation

# Set root password
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
EXIT;
```

## Option 2: Docker (Quick Setup)

If you have Docker installed:

```bash
# Run MySQL in Docker container
docker run --name mysql-naac \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=naac_nba_db \
  -p 3306:3306 \
  -d mysql:8.0

# Check if container is running
docker ps

# To stop the container
docker stop mysql-naac

# To start the container again
docker start mysql-naac
```

## Option 3: Cloud Database (Production)

For production deployment, consider using:
- **AWS RDS MySQL**
- **Google Cloud SQL**
- **Azure Database for MySQL**
- **PlanetScale** (MySQL-compatible)
- **Railway** (Simple deployment)

## Verify Installation

1. **Test MySQL Connection:**
   ```bash
   mysql -u root -p
   # Enter password: root
   ```

2. **Create Database (Optional):**
   ```sql
   CREATE DATABASE naac_nba_db;
   SHOW DATABASES;
   EXIT;
   ```

3. **Test Backend Connection:**
   ```bash
   cd backend
   npm run dev
   ```
   
   You should see:
   ```
   ✅ Database connected successfully
   ✅ Database initialized successfully
   ✅ Server running on port 5000
   ```

## Update Environment Variables

Make sure your `.env` file has correct database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=naac_nba_db
DB_PORT=3306
```

## Troubleshooting

### Connection Refused Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solutions:**
1. Check if MySQL service is running
2. Verify port 3306 is not blocked
3. Check credentials in .env file
4. Try connecting with MySQL client first

### Authentication Error
```
Error: ER_NOT_SUPPORTED_AUTH_MODE
```

**Solution:**
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
```

### Access Denied Error
```
Error: ER_ACCESS_DENIED_ERROR
```

**Solutions:**
1. Check username and password in .env
2. Create a new user if needed:
   ```sql
   CREATE USER 'naac_user'@'localhost' IDENTIFIED BY 'naac_password';
   GRANT ALL PRIVILEGES ON naac_nba_db.* TO 'naac_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Port Already in Use
```
Error: listen EADDRINUSE :::3306
```

**Solutions:**
1. Stop other MySQL instances
2. Change port in .env file
3. Kill process using port 3306

## Database Schema

Once connected, the application will automatically create these tables:

1. **request_demo** - Store demo request submissions
2. **contacts** - Store contact form submissions  
3. **nirf_assessments** - Store NIRF assessment results

## Next Steps

After MySQL is set up:

1. **Restart the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Test the API:**
   ```bash
   curl http://localhost:5000/health
   ```

3. **Submit a test demo request:**
   ```bash
   curl -X POST http://localhost:5000/api/demo/request \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "institution_name": "Test University",
       "service_type": "NAAC"
     }'
   ```

## Production Considerations

For production deployment:

1. **Use strong passwords**
2. **Enable SSL/TLS**
3. **Set up database backups**
4. **Configure firewall rules**
5. **Monitor database performance**
6. **Use connection pooling** (already implemented)

## Support

If you encounter issues:

1. Check the backend console logs
2. Verify MySQL service status
3. Test database connection separately
4. Review .env configuration
5. Check firewall and network settings