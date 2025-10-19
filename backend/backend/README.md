# NAAC NBA Services Backend API

This is the backend API for the NAAC NBA Services website, handling form submissions, database operations, and email notifications via Microsoft Outlook.

## Features

- **Demo Request Management**: Handle demo request form submissions with email notifications
- **Contact Form Processing**: Process contact form submissions
- **Microsoft Outlook Email**: Automated email confirmations and admin notifications via Outlook
- **MySQL Database**: Persistent data storage with proper indexing
- **CORS Support**: Cross-origin requests from frontend
- **Error Handling**: Comprehensive error handling and logging

## Tech Stack

- **Node.js** with Express.js
- **MySQL** for database
- **Nodemailer** with Microsoft Outlook SMTP
- **JWT** for future authentication
- **bcryptjs** for password hashing (future use)

## Quick Start

### Prerequisites

1. **Node.js** (v16 or higher)
2. **MySQL** server running locally
3. **Microsoft Outlook account** for email sending

### Installation

1. **Install dependencies:**
   ```bash
   cd backend/backend
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

   # Microsoft Outlook Email Configuration
   EMAIL_HOST=smtp-mail.outlook.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@outlook.com
   EMAIL_PASSWORD=your-outlook-password
   ADMIN_EMAIL=madhusamala.trainer@gmail.com

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

3. **Set up Microsoft Outlook Email:**
   - Use your Outlook email address in `EMAIL_USER`
   - Use your Outlook password in `EMAIL_PASSWORD`
   - For Microsoft 365 accounts, create an App Password
   - See `SETUP_OUTLOOK.md` for detailed instructions

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
   - Check console for email configuration verification

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

## Email Configuration

### Microsoft Outlook Setup

The system is configured to use Microsoft Outlook SMTP:

- **SMTP Server**: `smtp-mail.outlook.com`
- **Port**: 587 (STARTTLS)
- **Authentication**: Username/Password or App Password

### Email Templates

The system sends two types of emails for demo requests:

1. **Confirmation Email** to the user acknowledging their request
2. **Notification Email** to admin (`madhusamala.trainer@gmail.com`) with request details

Both emails are professionally formatted with HTML templates optimized for Outlook.

### Troubleshooting Email Issues

If emails are not sending:

1. **Check Outlook credentials** in `.env` file
2. **Verify account security settings** - enable "Less secure app access" if needed
3. **Use App Password** for Microsoft 365 accounts
4. **Check console logs** for detailed error messages
5. **Test with simple email client** first

See `SETUP_OUTLOOK.md` for comprehensive email setup guide.

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

## Error Handling

- **Validation Errors**: 400 status with specific error messages
- **Not Found**: 404 status for missing resources
- **Server Errors**: 500 status with error logging
- **Email Failures**: Graceful handling with status reporting
- **Database Failures**: Fallback to email-only mode

## Security Features

- **Input Validation**: Email format, required fields, service type validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Restricted origins
- **Error Sanitization**: No sensitive data in production error responses
- **Rate Limiting**: Prevent email spam (can be implemented)

## Development

### Running in Development Mode
```bash
npm run dev
```

This uses `nodemon` for automatic server restart on file changes.

### Testing Emails

1. Use a real Outlook account with proper credentials
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
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_USER=your-production-email@outlook.com
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

2. **Outlook Email Not Sending**
   - Verify Outlook credentials are correct
   - Check if 2FA is enabled (use App Password)
   - Ensure "Less secure app access" is enabled if needed
   - Try alternative SMTP settings (see SETUP_OUTLOOK.md)

3. **CORS Errors**
   - Update CORS origins in `server.js`
   - Check frontend is running on allowed port

### Logs

All important operations are logged to console:
- ✅ Success operations (green checkmark)
- ❌ Error operations (red X)
- Database connections, email sending, request processing

## Alternative Email Providers

If Outlook doesn't work for your use case:

1. **SendGrid** (Recommended for production)
2. **Amazon SES**
3. **Mailgun**
4. **Gmail** (with App Passwords)
5. **Postmark**

## Support

For issues or questions:
- Check the console logs for detailed error messages
- Verify all environment variables are set correctly
- Test individual components (database, email) separately
- Review `SETUP_OUTLOOK.md` for email-specific issues
- Check Microsoft Outlook SMTP documentation