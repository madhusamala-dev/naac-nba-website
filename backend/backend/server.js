const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection, initializeDatabase } = require('./config/database');
const { verifyEmailConfig } = require('./config/email');

// Import routes
const demoRoutes = require('./routes/demo');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Global database status
let isDatabaseConnected = false;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com', 'https://www.your-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database status middleware
app.use((req, res, next) => {
  req.isDatabaseConnected = isDatabaseConnected;
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: isDatabaseConnected ? 'Connected' : 'Disconnected',
    services: {
      api: 'Running',
      database: isDatabaseConnected ? 'Available' : 'Unavailable',
      email: 'Configured'
    }
  });
});

// API Routes
app.use('/api/demo', demoRoutes);
app.use('/api/contact', contactRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'NAAC NBA Services Backend API',
    version: '1.0.0',
    status: 'Running',
    database: isDatabaseConnected ? 'Connected' : 'Disconnected',
    endpoints: {
      health: 'GET /health',
      demo_request: 'POST /api/demo/request',
      demo_list: 'GET /api/demo/requests',
      contact: 'POST /api/contact'
    },
    setup: isDatabaseConnected ? null : {
      message: 'Database not connected. Install MySQL to enable full functionality.',
      instructions: [
        'Install MySQL: https://dev.mysql.com/downloads/mysql/',
        'Start MySQL service',
        'Update .env with correct database credentials',
        'Or use Docker: docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0'
      ]
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Initialize and start server
async function startServer() {
  try {
    console.log('🚀 Starting NAAC NBA Services Backend...');
    
    // Test database connection (non-blocking)
    isDatabaseConnected = await testConnection();
    
    if (isDatabaseConnected) {
      // Initialize database only if connected
      await initializeDatabase();
    } else {
      console.log('⚠️  Server will start without database. Email-only mode enabled.');
    }

    // Verify email configuration (non-blocking)
    const emailConfigured = await verifyEmailConfig();
    if (!emailConfigured) {
      console.log('⚠️  Email not configured. Check EMAIL_USER and EMAIL_PASSWORD in .env');
    }

    // Start server regardless of database status
    app.listen(PORT, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`💾 Database: ${isDatabaseConnected ? '✅ Connected' : '❌ Disconnected'}`);
      console.log(`📬 Email: ${emailConfigured ? '✅ Configured' : '❌ Not configured'}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      if (!isDatabaseConnected) {
        console.log('');
        console.log('🔧 To enable database functionality:');
        console.log('   1. Install MySQL: https://dev.mysql.com/downloads/mysql/');
        console.log('   2. Start MySQL service');
        console.log('   3. Update .env with correct credentials');
        console.log('   4. Restart the server');
        console.log('');
      }
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;