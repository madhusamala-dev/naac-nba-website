const express = require('express');
const { pool } = require('../config/database');
const { sendEmailGraph, emailTemplates } = require('../config/email');
const router = express.Router();

// Submit NIRF assessment
router.post('/assessment', async (req, res) => {
  try {
    const {
      institution_name,
      contact_email,
      contact_name,
      contact_number,
      total_score,
      readiness_level,
      rank_band,
      answers
    } = req.body;

    // Validate required fields
    if (!institution_name || !contact_email || !contact_name || !total_score || !readiness_level || !rank_band || !answers) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: institution_name, contact_email, contact_name, total_score, readiness_level, rank_band, and answers are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact_email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate score range (updated for 100 points total)
    if (total_score < 0 || total_score > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid total score. Must be between 0 and 100'
      });
    }

    let databaseResult = null;

    // Try to save to database if connected
    if (req.isDatabaseConnected) {
      try {
        const insertQuery = `
          INSERT INTO nirf_assessments (
            institution_name, 
            contact_email, 
            contact_name, 
            contact_number, 
            total_score, 
            readiness_level, 
            rank_band, 
            answers
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(insertQuery, [
          institution_name,
          contact_email,
          contact_name,
          contact_number || null,
          total_score,
          readiness_level,
          rank_band,
          JSON.stringify(answers)
        ]);

        databaseResult = result.insertId;
        console.log('✅ NIRF assessment saved to database:', result.insertId);
      } catch (dbError) {
        console.error('❌ Database save failed:', dbError.message);
        // Continue with email sending even if database fails
      }
    } else {
      console.log('⚠️  Database not connected. Saving to email only.');
    }

    // Prepare email data
    const emailData = {
      institution_name,
      contact_email,
      contact_name,
      contact_number,
      total_score,
      readiness_level,
      rank_band,
      answers,
      percentage: Math.round((total_score / 100) * 100)
    };

    // Send thank you email with results to user
    const userEmailTemplate = emailTemplates.nirfAssessmentThankYou(emailData);
    const userEmailResult = await sendEmailGraph({
      to: contact_email,
      subject: userEmailTemplate.subject,
      html: userEmailTemplate.html,
      text: userEmailTemplate.text
    });

    console.log(userEmailResult)

    // Send notification email to admin with lead details
    const adminEmailTemplate = emailTemplates.nirfAssessmentAdminNotification(emailData);
    const adminEmailResult = await sendEmailGraph({
      to: process.env.ADMIN_EMAIL,
      subject: adminEmailTemplate.subject,
      html: adminEmailTemplate.html,
      text: adminEmailTemplate.text
    });

    // Response
    const response = {
      success: true,
      message: 'NIRF assessment submitted successfully',
      data: {
        id: databaseResult,
        institution_name,
        contact_email,
        contact_name,
        total_score,
        readiness_level,
        rank_band,
        percentage: emailData.percentage,
        submitted_at: new Date().toISOString(),
        saved_to_database: !!databaseResult
      },
      emails: {
        results_sent: userEmailResult.success,
        notification_sent: adminEmailResult.success
      }
    };

    if (!userEmailResult.success || !adminEmailResult.success) {
      response.message += ' (Note: Some emails may not have been delivered)';
      response.email_errors = {
        results_error: userEmailResult.success ? null : userEmailResult.error,
        notification_error: adminEmailResult.success ? null : adminEmailResult.error
      };
    }

    res.status(201).json(response);

  } catch (error) {
    console.error('❌ Error processing NIRF assessment:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all NIRF assessments (admin endpoint)
router.get('/assessments', async (req, res) => {
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

    const { readiness_level, rank_band, min_score, max_score, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM nirf_assessments WHERE 1=1';
    const params = [];

    if (readiness_level) {
      query += ' AND readiness_level LIKE ?';
      params.push(`%${readiness_level}%`);
    }

    if (rank_band) {
      query += ' AND rank_band = ?';
      params.push(rank_band);
    }

    if (min_score) {
      query += ' AND total_score >= ?';
      params.push(parseInt(min_score));
    }

    if (max_score) {
      query += ' AND total_score <= ?';
      params.push(parseInt(max_score));
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query, params);

    // Parse JSON answers for each row
    const assessments = rows.map(row => ({
      ...row,
      answers: typeof row.answers === 'string' ? JSON.parse(row.answers) : row.answers
    }));

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM nirf_assessments WHERE 1=1';
    const countParams = [];

    if (readiness_level) {
      countQuery += ' AND readiness_level LIKE ?';
      countParams.push(`%${readiness_level}%`);
    }

    if (rank_band) {
      countQuery += ' AND rank_band = ?';
      countParams.push(rank_band);
    }

    if (min_score) {
      countQuery += ' AND total_score >= ?';
      countParams.push(parseInt(min_score));
    }

    if (max_score) {
      countQuery += ' AND total_score <= ?';
      countParams.push(parseInt(max_score));
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: assessments,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        has_more: (parseInt(offset) + parseInt(limit)) < total
      }
    });

  } catch (error) {
    console.error('❌ Error fetching NIRF assessments:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get assessment statistics (admin endpoint)
router.get('/stats', async (req, res) => {
  try {
    if (!req.isDatabaseConnected) {
      return res.status(503).json({
        success: false,
        message: 'Database not available. Please configure MySQL database.'
      });
    }

    // Get overall statistics
    const [totalResult] = await pool.execute('SELECT COUNT(*) as total FROM nirf_assessments');
    const total = totalResult[0].total;

    // Get readiness level distribution
    const [readinessStats] = await pool.execute(`
      SELECT 
        readiness_level,
        COUNT(*) as count,
        ROUND(AVG(total_score), 2) as avg_score,
        MIN(total_score) as min_score,
        MAX(total_score) as max_score
      FROM nirf_assessments 
      GROUP BY readiness_level
      ORDER BY avg_score DESC
    `);

    // Get rank band distribution
    const [rankBandStats] = await pool.execute(`
      SELECT 
        rank_band,
        COUNT(*) as count,
        ROUND(AVG(total_score), 2) as avg_score
      FROM nirf_assessments 
      GROUP BY rank_band
      ORDER BY 
        CASE rank_band
          WHEN 'Top 100' THEN 1
          WHEN '100–200' THEN 2
          WHEN '200–300' THEN 3
          WHEN '300+' THEN 4
          WHEN 'Unranked' THEN 5
          ELSE 6
        END
    `);

    // Get recent assessments
    const [recentAssessments] = await pool.execute(`
      SELECT 
        institution_name, 
        contact_name,
        contact_email,
        total_score, 
        readiness_level, 
        rank_band,
        created_at
      FROM nirf_assessments 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

    // Get score distribution
    const [scoreStats] = await pool.execute(`
      SELECT 
        CASE 
          WHEN total_score >= 85 THEN 'Excellent (85-100)'
          WHEN total_score >= 70 THEN 'Strong (70-84)'
          WHEN total_score >= 50 THEN 'Average (50-69)'
          WHEN total_score >= 30 THEN 'Developing (30-49)'
          ELSE 'Foundational (<30)'
        END as score_range,
        COUNT(*) as count,
        ROUND(AVG(total_score), 2) as avg_score
      FROM nirf_assessments 
      GROUP BY score_range
      ORDER BY MIN(total_score) DESC
    `);

    // Get monthly trends (last 12 months)
    const [monthlyTrends] = await pool.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as assessments,
        ROUND(AVG(total_score), 2) as avg_score
      FROM nirf_assessments 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month DESC
      LIMIT 12
    `);

    res.json({
      success: true,
      data: {
        total_assessments: total,
        readiness_distribution: readinessStats,
        rank_band_distribution: rankBandStats,
        score_distribution: scoreStats,
        recent_assessments: recentAssessments,
        monthly_trends: monthlyTrends,
        generated_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Error fetching NIRF statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;