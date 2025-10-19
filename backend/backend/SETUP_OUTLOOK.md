# Microsoft Outlook Email Setup Guide

This guide will help you configure Microsoft Outlook email for the NAAC NBA Services backend.

## Email Configuration Options

### Option 1: Personal Outlook Account (@outlook.com, @hotmail.com)

1. **Update .env file:**
   ```env
   EMAIL_HOST=smtp-mail.outlook.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@outlook.com
   EMAIL_PASSWORD=your-outlook-password
   ADMIN_EMAIL=madhusamala.trainer@gmail.com
   ```

2. **Enable Less Secure Apps (if needed):**
   - Sign in to your Microsoft account
   - Go to Security settings
   - Enable "Less secure app access" if available

### Option 2: Microsoft 365 Business Account

1. **Update .env file:**
   ```env
   EMAIL_HOST=smtp.office365.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@yourdomain.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=madhusamala.trainer@gmail.com
   ```

2. **Create App Password:**
   - Sign in to Microsoft 365 admin center
   - Go to Security & Compliance
   - Create an App Password for this application
   - Use the App Password instead of your regular password

### Option 3: Azure AD Authentication (Advanced)

For enterprise applications, consider using Azure AD with OAuth2:

```javascript
// Advanced configuration (requires additional setup)
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    type: 'OAuth2',
    user: 'your-email@yourdomain.com',
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    refreshToken: 'your-refresh-token',
    accessToken: 'your-access-token'
  }
});
```

## Configuration Steps

### Step 1: Update Environment Variables

Edit `backend/.env` file:

```env
# Microsoft Outlook Configuration
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=madhusamala.trainer@outlook.com
EMAIL_PASSWORD=YourOutlookPassword123
ADMIN_EMAIL=madhusamala.trainer@gmail.com
```

### Step 2: Test Email Configuration

1. **Start the backend server:**
   ```bash
   cd backend/backend
   npm run dev
   ```

2. **Check for email verification:**
   Look for this message in console:
   ```
   ✅ Outlook email configuration verified
   ```

3. **Test email sending:**
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

## Troubleshooting

### Common Issues and Solutions

#### 1. Authentication Failed
```
Error: Invalid login: 535 5.7.3 Authentication unsuccessful
```

**Solutions:**
- Verify email and password are correct
- Check if 2FA is enabled (use App Password)
- Enable "Less secure app access" in Outlook settings
- Try using the full email address as username

#### 2. Connection Timeout
```
Error: connect ETIMEDOUT
```

**Solutions:**
- Check internet connection
- Verify SMTP server settings
- Check firewall/antivirus blocking port 587
- Try port 25 or 465 as alternatives

#### 3. TLS/SSL Errors
```
Error: unable to verify the first certificate
```

**Solutions:**
- Update the transporter configuration:
  ```javascript
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
  ```

#### 4. Rate Limiting
```
Error: 550 5.7.708 Service unavailable
```

**Solutions:**
- Reduce email sending frequency
- Implement retry logic with delays
- Consider using Microsoft Graph API for high volume

### Alternative SMTP Settings

If `smtp-mail.outlook.com` doesn't work, try:

```env
# Alternative Outlook SMTP settings
EMAIL_HOST=smtp.live.com
EMAIL_PORT=587

# Or for Office 365
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
```

## Security Best Practices

### 1. Use App Passwords
- Never use your main account password
- Generate App Passwords for applications
- Rotate passwords regularly

### 2. Environment Security
```env
# Use strong, unique passwords
EMAIL_PASSWORD=ComplexPassword123!@#

# Keep .env file secure
# Add .env to .gitignore
# Use environment variables in production
```

### 3. Rate Limiting
```javascript
// Implement rate limiting for email sending
const rateLimit = require('express-rate-limit');

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 emails per windowMs
  message: 'Too many emails sent, please try again later'
});

app.use('/api/demo/request', emailLimiter);
```

## Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=production-email@yourdomain.com
EMAIL_PASSWORD=SecureAppPassword123
ADMIN_EMAIL=admin@yourdomain.com
```

### Monitoring and Logging

```javascript
// Add email monitoring
const emailStats = {
  sent: 0,
  failed: 0,
  lastSent: null
};

// Log email statistics
app.get('/api/email/stats', (req, res) => {
  res.json(emailStats);
});
```

## Testing Checklist

- [ ] Email configuration verified in console
- [ ] Test email sent successfully
- [ ] Confirmation email received by user
- [ ] Notification email received by admin
- [ ] Email templates display correctly
- [ ] Error handling works when email fails
- [ ] Rate limiting prevents spam

## Alternative Email Services

If Outlook doesn't work, consider these alternatives:

1. **SendGrid** (Recommended for production)
2. **Amazon SES**
3. **Mailgun**
4. **Postmark**
5. **Gmail** (with App Passwords)

## Support

For additional help:

1. Check Microsoft Outlook SMTP documentation
2. Verify account security settings
3. Test with a simple email client first
4. Contact Microsoft Support for account issues
5. Consider using Microsoft Graph API for advanced scenarios

## Example Working Configuration

```javascript
// Working Outlook configuration
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@outlook.com',
    pass: 'your-app-password'
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});
```

This configuration should work with most Outlook accounts. Adjust settings based on your specific account type and security requirements.