const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter configuration for Microsoft Outlook
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

// Verify email configuration
async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('✅ Outlook email configuration verified');
    return true;
  } catch (error) {
    console.error('❌ Outlook email configuration failed:', error.message);
    console.log('💡 To fix Outlook email:');
    console.log('   1. Use your full Outlook email address as EMAIL_USER');
    console.log('   2. Use your Outlook password as EMAIL_PASSWORD');
    console.log('   3. Enable "Less secure app access" if using basic auth');
    console.log('   4. Or use App Password for Microsoft 365 accounts');
    return false;
  }
}

// Send email function
async function sendEmail({ to, subject, html, text }) {
  try {
    const mailOptions = {
      from: `"NAAC NBA Services" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Outlook:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Outlook email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Email templates
const emailTemplates = {
  requestDemoConfirmation: (data) => ({
    subject: 'Demo Request Confirmation - NAAC NBA Services',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Demo Request Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Demo Request Received</h1>
            <p>Thank you for your interest in our accreditation services</p>
          </div>
          <div class="content">
            <p>Dear ${data.name},</p>
            
            <p>We have successfully received your demo request for <strong>${data.service_type}</strong> services. Our team will review your requirements and get back to you within 24 hours.</p>
            
            <div class="info-box">
              <h3>Your Request Details:</h3>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Institution:</strong> ${data.institution_name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              <p><strong>Designation:</strong> ${data.designation || 'Not provided'}</p>
              <p><strong>Service Type:</strong> ${data.service_type}</p>
              ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
            </div>
            
            <p>In the meantime, you can:</p>
            <ul>
              <li>Explore our comprehensive service offerings</li>
              <li>Take our NIRF Readiness Assessment</li>
              <li>Download our service brochures</li>
            </ul>
            
            <p>If you have any immediate questions, please don't hesitate to contact us at <a href="mailto:${process.env.ADMIN_EMAIL}">${process.env.ADMIN_EMAIL}</a></p>
            
            <p>Best regards,<br>
            <strong>NAAC NBA Services Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply directly to this email.</p>
            <p>© 2024 NAAC NBA Services. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Demo Request Confirmation - NAAC NBA Services
      
      Dear ${data.name},
      
      We have successfully received your demo request for ${data.service_type} services. Our team will review your requirements and get back to you within 24 hours.
      
      Your Request Details:
      - Name: ${data.name}
      - Institution: ${data.institution_name}
      - Email: ${data.email}
      - Phone: ${data.phone || 'Not provided'}
      - Designation: ${data.designation || 'Not provided'}
      - Service Type: ${data.service_type}
      ${data.message ? `- Message: ${data.message}` : ''}
      
      Best regards,
      NAAC NBA Services Team
    `
  }),

  requestDemoNotification: (data) => ({
    subject: `New Demo Request - ${data.service_type} from ${data.institution_name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Demo Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #dc3545; }
          .urgent { background: #fff3cd; border-left-color: #ffc107; padding: 15px; margin: 15px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 New Demo Request Alert</h1>
            <p>A new demo request has been submitted</p>
          </div>
          <div class="content">
            <div class="urgent">
              <strong>⏰ Action Required:</strong> Please respond to this request within 24 hours
            </div>
            
            <div class="info-box">
              <h3>Request Details:</h3>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Institution:</strong> ${data.institution_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              <p><strong>Designation:</strong> ${data.designation || 'Not provided'}</p>
              <p><strong>Service Type:</strong> <strong style="color: #dc3545;">${data.service_type}</strong></p>
              ${data.message ? `<p><strong>Message:</strong><br>${data.message}</p>` : ''}
              <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="info-box">
              <h3>Recommended Next Steps:</h3>
              <ul>
                <li>Review the request details above</li>
                <li>Prepare relevant service materials for ${data.service_type}</li>
                <li>Schedule a follow-up call within 24 hours</li>
                <li>Send personalized service information</li>
              </ul>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Demo Request Alert - NAAC NBA Services
      
      A new demo request has been submitted for ${data.service_type} services.
      
      Request Details:
      - Name: ${data.name}
      - Institution: ${data.institution_name}
      - Email: ${data.email}
      - Phone: ${data.phone || 'Not provided'}
      - Designation: ${data.designation || 'Not provided'}
      - Service Type: ${data.service_type}
      ${data.message ? `- Message: ${data.message}` : ''}
      - Submitted At: ${new Date().toLocaleString()}
      
      Please respond within 24 hours.
    `
  })
};

module.exports = {
  transporter,
  verifyEmailConfig,
  sendEmail,
  emailTemplates
};