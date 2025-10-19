const express = require('express');
const { pool } = require('../config/database');
const { sendEmail, emailTemplates } = require('../config/email');
const router = express.Router();

// Submit demo request
router.post('/request', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      institution_name,
      designation,
      service_type,
      message
    } = req.body;

    // Validate required fields
    if (!name || !email || !institution_name || !service_type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, institution_name, and service_type are required'
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

    // Validate service type
    const validServiceTypes = ['NAAC', 'NBA', 'NIRF', 'All Services'];
    if (!validServiceTypes.includes(service_type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service type. Must be one of: NAAC, NBA, NIRF, All Services'
      });
    }

    let databaseResult = null;

    // Try to save to database if connected
    if (req.isDatabaseConnected) {
      try {
        const insertQuery = `
          INSERT INTO request_demo (name, email, phone, institution_name, designation, service_type, message)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(insertQuery, [
          name,
          email,
          phone || null,
          institution_name,
          designation || null,
          service_type,
          message || null
        ]);

        databaseResult = result.insertId;
        console.log('✅ Demo request saved to database:', result.insertId);
      } catch (dbError) {
        console.error('❌ Database save failed:', dbError.message);
        // Continue with email sending even if database fails
      }
    } else {
      console.log('⚠️  Database not connected. Saving to email only.');
    }

    // Prepare email data
    const emailData = {
      name,
      email,
      phone,
      institution_name,
      designation,
      service_type,
      message
    };

    // Send confirmation email to user
    const userEmailTemplate = emailTemplates.requestDemoConfirmation(emailData);
    const userEmailResult = await sendEmail({
      to: email,
      subject: userEmailTemplate.subject,
      html: userEmailTemplate.html,
      text: userEmailTemplate.text
    });

    // Send notification email to admin
    const adminEmailTemplate = emailTemplates.requestDemoNotification(emailData);
    const adminEmailResult = await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: adminEmailTemplate.subject,
      html: adminEmailTemplate.html,
      text: adminEmailTemplate.text
    });

    // Response
    const response = {
      success: true,
      message: 'Demo request submitted successfully',
      data: {
        id: databaseResult,
        name,
        email,
        institution_name,
        service_type,
        submitted_at: new Date().toISOString(),
        saved_to_database: !!databaseResult
      },
      emails: {
        confirmation_sent: userEmailResult.success,
        notification_sent: adminEmailResult.success
      }
    };

    if (!userEmailResult.success || !adminEmailResult.success) {
      response.message += ' (Note: Some emails may not have been delivered)';
      response.email_errors = {
        confirmation_error: userEmailResult.success ? null : userEmailResult.error,
        notification_error: adminEmailResult.success ? null : adminEmailResult.error
      };
    }

    res.status(201).json(response);

  } catch (error) {
    console.error('❌ Error processing demo request:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all demo requests (admin endpoint)
router.get('/requests', async (req, res) => {
  try {
    if (!req.isDatabaseConnected) {
      return res.status(503).json({
        success: false,
        message: 'Database not available. Please configure MySQL database.',
        setup_instructions: [
          'Install MySQL server',
          'Update .env with database credentials',
          'Restart the application'
        ]
      });
    }

    const { status, service_type, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM request_demo WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (service_type) {
      query += ' AND service_type = ?';
      params.push(service_type);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM request_demo WHERE 1=1';
    const countParams = [];

    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    if (service_type) {
      countQuery += ' AND service_type = ?';
      countParams.push(service_type);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: rows,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        has_more: (parseInt(offset) + parseInt(limit)) < total
      }
    });

  } catch (error) {
    console.error('❌ Error fetching demo requests:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update demo request status (admin endpoint)
router.patch('/requests/:id/status', async (req, res) => {
  try {
    if (!req.isDatabaseConnected) {
      return res.status(503).json({
        success: false,
        message: 'Database not available. Please configure MySQL database.'
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'contacted', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, contacted, completed'
      });
    }

    const [result] = await pool.execute(
      'UPDATE request_demo SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Demo request not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: { id: parseInt(id), status }
    });

  } catch (error) {
    console.error('❌ Error updating demo request status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;