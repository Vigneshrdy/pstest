const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const socketIO = require('socket.io');
const http = require('http');
require('dotenv').config();

// Import utilities and services
const logger = require('./utils/logger');
const { connectRabbitMQ } = require('./services/messageQueue');
const { connectElasticsearch } = require('./services/elasticsearch');
const { connectRedis } = require('./services/redis');
const errorHandler = require('./middleware/errorHandler');
const { authenticateSocket } = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions');
const uploadRoutes = require('./routes/upload');
const analyticsRoutes = require('./routes/analytics');
const searchRoutes = require('./routes/search');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(limiter); // Apply rate limiting
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/search', searchRoutes);

// WebSocket authentication middleware
io.use(authenticateSocket);

// WebSocket connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.userId}`);
  
  // Join user to their personal room
  socket.join(`user_${socket.userId}`);
  
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.userId}`);
  });
  
  // Handle real-time transaction updates
  socket.on('subscribe_transactions', (accountId) => {
    socket.join(`account_${accountId}`);
    logger.info(`User ${socket.userId} subscribed to account ${accountId} transactions`);
  });
  
  socket.on('unsubscribe_transactions', (accountId) => {
    socket.leave(`account_${accountId}`);
    logger.info(`User ${socket.userId} unsubscribed from account ${accountId} transactions`);
  });
});

// Make io available to routes
app.set('io', io);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use(errorHandler);

// Database connection
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('Database connection error:', error);
    process.exit(1);
  }
};

// Initialize all services
const initializeServices = async () => {
  try {
    await connectDatabase();
    await connectRabbitMQ();
    await connectElasticsearch();
    await connectRedis();
    
    logger.info('All services initialized successfully');
  } catch (error) {
    logger.error('Service initialization error:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = () => {
  logger.info('Received shutdown signal, shutting down gracefully...');
  
  server.close(() => {
    logger.info('HTTP server closed');
    
    mongoose.connection.close(false, () => {
      logger.info('MongoDB connection closed');
      process.exit(0);
    });
  });
  
  // Force close server after 30secs
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 3001;

initializeServices().then(() => {
  server.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`🚀 Banking System Server started on http://localhost:${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  });
});

module.exports = { app, server, io };