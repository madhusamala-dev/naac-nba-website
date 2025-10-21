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
  }),

  nirfAssessmentThankYou: (data) => ({
    subject: `Thank You! Your NIRF Assessment Results - ${data.total_score}/100 Points`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>NIRF Assessment Results</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .score-box { background: white; padding: 25px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4f46e5; text-align: center; }
          .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .score { font-size: 48px; font-weight: bold; color: #4f46e5; margin-bottom: 10px; }
          .readiness { font-size: 20px; font-weight: bold; color: #10b981; margin-bottom: 10px; }
          .rank-band { font-size: 16px; color: #7c3aed; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏆 Thank You for Your Assessment!</h1>
            <p>Your NIRF Readiness Results are Ready</p>
          </div>
          <div class="content">
            <p>Dear ${data.contact_name},</p>
            
            <p>Thank you for completing the NIRF Readiness Assessment for <strong>${data.institution_name}</strong>. We appreciate your time and interest in improving your institution's ranking potential.</p>
            
            <div class="score-box">
              <div class="score">${data.total_score}/100</div>
              <div class="readiness">${data.readiness_level}</div>
              <div class="rank-band">Indicative NIRF Rank Band: ${data.rank_band}</div>
            </div>
            
            <div class="info-box">
              <h3>📊 Your Assessment Summary:</h3>
              <p><strong>Institution:</strong> ${data.institution_name}</p>
              <p><strong>Total Score:</strong> ${data.total_score} out of 100 points</p>
              <p><strong>Readiness Level:</strong> ${data.readiness_level}</p>
              <p><strong>Potential Ranking Band:</strong> ${data.rank_band}</p>
              <p><strong>Assessment Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="info-box">
              <h3>🎯 What This Means for Your Institution:</h3>
              ${data.total_score >= 85 ? `
                <p style="color: #10b981;"><strong>Excellent Performance!</strong> Your institution shows strong NIRF readiness across all parameters. You're well-positioned for top rankings.</p>
              ` : data.total_score >= 70 ? `
                <p style="color: #3b82f6;"><strong>Strong Foundation!</strong> Your institution has good potential with focused improvements in key areas.</p>
              ` : data.total_score >= 50 ? `
                <p style="color: #f59e0b;"><strong>Good Potential!</strong> With targeted improvements, your institution can significantly enhance its ranking prospects.</p>
              ` : `
                <p style="color: #ef4444;"><strong>Development Opportunity!</strong> There's substantial room for improvement across multiple parameters.</p>
              `}
            </div>
            
            <div style="background: #eff6ff; padding: 25px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-bottom: 15px;">🚀 Ready to Improve Your Ranking?</h3>
              <p style="margin-bottom: 20px;">Our NIRF experts can help you implement targeted strategies to enhance your ranking potential and achieve your goals.</p>
              <p style="margin: 15px 0;">
                <a href="mailto:${process.env.ADMIN_EMAIL}?subject=NIRF Consultation Request - ${data.institution_name}&body=Hello, I completed the NIRF assessment and scored ${data.total_score}/100. I would like to discuss improvement strategies for ${data.institution_name}." 
                   style="background: #1e40af; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  📞 Schedule Free Consultation
                </a>
              </p>
              <p style="font-size: 14px; color: #6b7280;">Get personalized recommendations and implementation roadmap</p>
            </div>
            
            <div class="info-box">
              <h3>📈 Next Steps:</h3>
              <ul>
                <li>Review your detailed parameter-wise scores</li>
                <li>Focus on areas with improvement potential</li>
                <li>Consider our expert consultation for targeted guidance</li>
                <li>Implement systematic changes for better NIRF performance</li>
                <li>Track progress with periodic reassessments</li>
              </ul>
            </div>
            
            <p>We're committed to helping institutions like yours achieve excellence in education and research. If you have any questions about your results or would like to discuss improvement strategies, please don't hesitate to reach out.</p>
            
            <p>Best regards,<br>
            <strong>NAAC NBA Services Team</strong><br>
            <em>Your Partners in Educational Excellence</em></p>
          </div>
          <div class="footer">
            <p>This assessment provides indicative guidance based on NIRF parameters and your responses.</p>
            <p>© 2024 NAAC NBA Services. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Thank You! Your NIRF Assessment Results - NAAC NBA Services
      
      Dear ${data.contact_name},
      
      Thank you for completing the NIRF Readiness Assessment for ${data.institution_name}.
      
      Your Results:
      - Total Score: ${data.total_score}/100 points
      - Readiness Level: ${data.readiness_level}
      - Potential Ranking Band: ${data.rank_band}
      - Assessment Date: ${new Date().toLocaleDateString()}
      
      Our NIRF experts can help you improve your ranking potential. 
      Contact us at ${process.env.ADMIN_EMAIL} for a free consultation.
      
      Best regards,
      NAAC NBA Services Team
    `
  }),

  nirfAssessmentAdminNotification: (data) => ({
    subject: `🎯 New NIRF Assessment Lead - ${data.institution_name} (${data.total_score}/100 Points)`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New NIRF Assessment Lead</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #7c3aed; color: white; padding: 25px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #7c3aed; }
          .score-highlight { background: #eff6ff; padding: 20px; border-radius: 8px; text-align: center; margin: 15px 0; }
          .score { font-size: 32px; font-weight: bold; color: #1e40af; }
          .priority { background: #fef3c7; border-left-color: #f59e0b; padding: 15px; margin: 15px 0; border-radius: 5px; }
          .high-priority { background: #d1fae5; border-left-color: #10b981; padding: 15px; margin: 15px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 New NIRF Assessment Completed</h1>
            <p>Fresh lead with detailed scoring breakdown</p>
          </div>
          <div class="content">
            <div class="score-highlight">
              <div class="score">${data.total_score}/100 Points</div>
              <p style="font-size: 18px; font-weight: bold; color: #7c3aed;">${data.readiness_level}</p>
              <p style="color: #6b7280;">Rank Band: ${data.rank_band}</p>
            </div>
            
            ${data.total_score >= 70 ? `
            <div class="high-priority">
              <strong>🔥 HIGH PRIORITY LEAD:</strong> This institution shows strong NIRF potential (${data.total_score}/100). Immediate follow-up recommended for conversion.
            </div>
            ` : data.total_score >= 50 ? `
            <div class="priority">
              <strong>⭐ GOOD POTENTIAL LEAD:</strong> Institution has solid foundation (${data.total_score}/100). Good opportunity for consultation services.
            </div>
            ` : ''}
            
            <div class="info-box">
              <h3>👤 Contact Details:</h3>
              <p><strong>Name:</strong> ${data.contact_name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.contact_email}">${data.contact_email}</a></p>
              <p><strong>Phone:</strong> ${data.contact_number || 'Not provided'}</p>
              <p><strong>Institution:</strong> ${data.institution_name}</p>
              <p><strong>Assessment Completed:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="info-box">
              <h3>📈 Scoring Breakdown:</h3>
              <p><strong>Total Score:</strong> ${data.total_score}/100 points</p>
              <p><strong>Readiness Level:</strong> ${data.readiness_level}</p>
              <p><strong>Rank Band:</strong> ${data.rank_band}</p>
              <p><strong>Assessment Parameters:</strong> 10 key NIRF criteria evaluated</p>
            </div>
            
            <div class="info-box">
              <h3>🎯 Recommended Actions:</h3>
              <ul>
                <li><strong>Priority:</strong> ${data.total_score >= 70 ? 'HIGH - Contact within 4 hours' : data.total_score >= 50 ? 'MEDIUM - Contact within 24 hours' : 'STANDARD - Contact within 48 hours'}</li>
                <li>Review detailed assessment responses in admin dashboard</li>
                <li>Prepare customized improvement recommendations</li>
                <li>Schedule consultation call to discuss NIRF strategy</li>
                <li>Send relevant case studies and success stories</li>
                <li>Propose specific service packages based on their score</li>
              </ul>
            </div>
            
            <div class="info-box">
              <h3>💼 Business Opportunity:</h3>
              <p><strong>Service Potential:</strong> ${data.total_score >= 85 ? 'Premium NIRF optimization services' : data.total_score >= 70 ? 'Comprehensive NIRF improvement program' : data.total_score >= 50 ? 'Targeted NIRF enhancement services' : 'Complete NIRF readiness development'}</p>
              <p><strong>Estimated Engagement:</strong> ${data.total_score >= 70 ? '6-12 months comprehensive program' : data.total_score >= 50 ? '12-18 months improvement program' : '18-24 months development program'}</p>
            </div>
            
            <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h3 style="color: white; margin-bottom: 10px;">📞 Contact Information</h3>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.contact_email}" style="color: #bfdbfe;">${data.contact_email}</a></p>
              ${data.contact_number ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${data.contact_number}</p>` : ''}
              <p style="margin: 5px 0;"><strong>Institution:</strong> ${data.institution_name}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New NIRF Assessment Lead - ${data.institution_name}
      
      SCORE: ${data.total_score}/100 Points
      LEVEL: ${data.readiness_level}
      RANK BAND: ${data.rank_band}
      
      Contact Details:
      - Name: ${data.contact_name}
      - Email: ${data.contact_email}
      - Phone: ${data.contact_number || 'Not provided'}
      - Institution: ${data.institution_name}
      - Completed: ${new Date().toLocaleString()}
      
      Priority: ${data.total_score >= 70 ? 'HIGH - Contact within 4 hours' : data.total_score >= 50 ? 'MEDIUM - Contact within 24 hours' : 'STANDARD - Contact within 48 hours'}
      
      ${data.total_score >= 70 ? 'HIGH PRIORITY LEAD - Strong NIRF potential!' : ''}
    `
  })
};

module.exports = {
  transporter,
  verifyEmailConfig,
  sendEmail,
  emailTemplates
};