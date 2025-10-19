# NAAC NBA Services Backend API

This is the backend API for the NAAC NBA Services website, handling form submissions, database operations, and email notifications.

## Features

- **Demo Request Management**: Handle demo request form submissions with email notifications
- **Contact Form Processing**: Process contact form submissions
- **Email Notifications**: Automated email confirmations and admin notifications
- **MySQL Database**: Persistent data storage with proper indexing
- **CORS Support**: Cross-origin requests from frontend
- **Error Handling**: Comprehensive error handling and logging

## Tech Stack

- **Node.js** with Express.js
- **MySQL** for database
- **Nodemailer** for email sending
- **JWT** for future authentication
- **bcryptjs** for password hashing (future use)

## Quick Start

### Prerequisites

1. **Node.js** (v16 or higher)
2. **MySQL** server running locally
3. **Gmail account** for email sending (or other SMTP service)

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   
   Update `.env` file with your actual values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=naac_nba_db
   DB_PORT=3306

   # Email Configuration (Gmail example)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=madhusamala.trainer@gmail.com

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

3. **Set up Gmail App Password:**
   - Go to Google Account settings
   - Enable 2-factor authentication
   - Generate an App Password for this application
   - Use the App Password in `EMAIL_PASSWORD`

4. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

5. **Verify setup:**
   - Visit `http://localhost:5000/health` to check server status
   - Database tables will be created automatically

## API Endpoints

### Demo Requests

#### Submit Demo Request
```http
POST /api/demo/request
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@university.edu",
  "phone": "+91-9876543210",
  "institution_name": "ABC University",
  "designation": "Director",
  "service_type": "NAAC",
  "message": "We need help with NAAC accreditation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Demo request submitted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@university.edu",
    "institution_name": "ABC University",
    "service_type": "NAAC",
    "submitted_at": "2024-01-15T10:30:00.000Z"
  },
  "emails": {
    "confirmation_sent": true,
    "notification_sent": true
  }
}
```

#### Get Demo Requests (Admin)
```http
GET /api/demo/requests?status=pending&limit=10&offset=0
```

#### Update Request Status (Admin)
```http
PATCH /api/demo/requests/1/status
Content-Type: application/json

{
  "status": "contacted"
}
```

### Contact Form

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "General Inquiry",
  "message": "I have a question about your services"
}
```

### Health Check

```http
GET /health
```

## Database Schema

### request_demo Table
```sql
CREATE TABLE request_demo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  institution_name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  service_type ENUM('NAAC', 'NBA', 'NIRF', 'All Services') NOT NULL,
  message TEXT,
  status ENUM('pending', 'contacted', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### contacts Table
```sql
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status ENUM('pending', 'replied', 'resolved') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Email Templates

The system sends two types of emails for demo requests:

1. **Confirmation Email** to the user acknowledging their request
2. **Notification Email** to admin (`madhusamala.trainer@gmail.com`) with request details

Both emails are professionally formatted with HTML templates.

## Error Handling

- **Validation Errors**: 400 status with specific error messages
- **Not Found**: 404 status for missing resources
- **Server Errors**: 500 status with error logging
- **Email Failures**: Graceful handling with status reporting

## Security Features

- **Input Validation**: Email format, required fields, service type validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Restricted origins
- **Error Sanitization**: No sensitive data in production error responses

## Development

### Running in Development Mode
```bash
npm run dev
```

This uses `nodemon` for automatic server restart on file changes.

### Testing Emails

1. Use a real Gmail account with App Password
2. Test with the `/health` endpoint first
3. Check console logs for email sending status
4. Verify emails in both sender and recipient inboxes

### Database Management

The application automatically:
- Creates the database if it doesn't exist
- Creates all required tables with proper indexes
- Handles connection pooling for performance

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DB_HOST=your-cloud-db-host
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
EMAIL_USER=your-production-email@domain.com
EMAIL_PASSWORD=your-secure-app-password
```

### Cloud Database Migration

When moving to cloud database:
1. Update `DB_HOST`, `DB_USER`, `DB_PASSWORD` in `.env`
2. Ensure database server allows connections from your application server
3. Update CORS origins for production domain

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL server is running
   - Verify credentials in `.env`
   - Check port 3306 is accessible

2. **Email Not Sending**
   - Verify Gmail App Password is correct
   - Check 2-factor authentication is enabled
   - Ensure `EMAIL_USER` and `EMAIL_PASSWORD` are correct

3. **CORS Errors**
   - Update CORS origins in `server.js`
   - Check frontend is running on allowed port

### Logs

All important operations are logged to console:
- ✅ Success operations (green checkmark)
- ❌ Error operations (red X)
- Database connections, email sending, request processing

## Support

For issues or questions:
- Check the console logs for detailed error messages
- Verify all environment variables are set correctly
- Test individual components (database, email) separately