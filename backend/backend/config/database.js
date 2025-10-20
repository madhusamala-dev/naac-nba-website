const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'naac_nba_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
let pool = null;

// Test database connection
async function testConnection() {
  try {
    if (!pool) {
      pool = mysql.createPool(dbConfig);
    }
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 To fix this:');
    console.log('   1. Install MySQL: https://dev.mysql.com/downloads/mysql/');
    console.log('   2. Start MySQL service');
    console.log('   3. Create database user with credentials in .env');
    console.log('   4. Or use Docker: docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0');
    return false;
  }
}

// Initialize database and tables
async function initializeDatabase() {
  try {
    if (!pool) {
      throw new Error('Database pool not initialized');
    }

    // Create database if it doesn't exist
    const tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      port: process.env.DB_PORT || 3306
    });

    await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'naac_nba_db'}`);
    await tempConnection.end();

    // Create tables
    await createTables();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
}

// Create required tables
async function createTables() {
  const createRequestDemoTable = `
    CREATE TABLE IF NOT EXISTS request_demo (
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
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_service_type (service_type),
      INDEX idx_status (status),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createContactsTable = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status ENUM('pending', 'replied', 'resolved') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_status (status),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createNirfAssessmentTable = `
    CREATE TABLE IF NOT EXISTS nirf_assessments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      institution_name VARCHAR(255) NOT NULL,
      contact_email VARCHAR(255) NOT NULL,
      contact_name VARCHAR(255) NOT NULL,
      contact_number VARCHAR(20),
      total_score INT NOT NULL,
      readiness_level VARCHAR(100) NOT NULL,
      rank_band VARCHAR(50) NOT NULL,
      answers JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (contact_email),
      INDEX idx_score (total_score),
      INDEX idx_readiness_level (readiness_level),
      INDEX idx_rank_band (rank_band),
      INDEX idx_institution (institution_name),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  if (pool) {
    await pool.execute(createRequestDemoTable);
    await pool.execute(createContactsTable);
    await pool.execute(createNirfAssessmentTable);
  }
}

// Get pool instance
function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

module.exports = {
  pool: getPool(),
  testConnection,
  initializeDatabase
};