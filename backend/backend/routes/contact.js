const express = require('express');
const { pool } = require('../config/database');
const { sendEmail } = require('../config/email');
const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Insert into database
    const insertQuery = `
      INSERT INTO contacts (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(insertQuery, [
      name,
      email,
      subject || 'General Inquiry',
      message
    ]);

    console.log('✅ Contact form saved to database:', result.insertId);

    // Send notification email to admin
    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${subject || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject || 'General Inquiry'}
        Message: ${message}
        Submitted At: ${new Date().toLocaleString()}
      `
    });

    // Send confirmation email to user
    const userEmailResult = await sendEmail({
      to: email,
      subject: 'Thank you for contacting us - NAAC NBA Services',
      html: `
        <h2>Thank you for your message</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p>Best regards,<br>NAAC NBA Services Team</p>
      `,
      text: `
        Thank you for your message
        
        Dear ${name},
        
        We have received your message and will get back to you within 24 hours.
        
        Your message: ${message}
        
        Best regards,
        NAAC NBA Services Team
      `
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: result.insertId,
        name,
        email,
        subject: subject || 'General Inquiry',
        submitted_at: new Date().toISOString()
      },
      emails: {
        confirmation_sent: userEmailResult.success,
        notification_sent: adminEmailResult.success
      }
    });

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;