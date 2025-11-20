# Real-Time Data Flow Banking Sector Architecture

## Project Overview
A full-stack, event-driven banking platform with Next.js frontend and Node.js backend, capable of processing multiple financial operations in real-time using asynchronous background task execution.

## Features
- 🏦 Real-time transaction processing
- ⚛️ Next.js frontend with TypeScript
- 🔒 JWT-based authentication & authorization  
- 📊 Event-driven architecture with RabbitMQ
- 🔍 Advanced search with Elasticsearch
- 💾 MongoDB for data persistence
- 📁 Secure file upload system
- 🔄 WebSocket real-time notifications
- 📈 Transaction analytics & reporting
- 🛡️ Security & rate limiting

## Tech Stack
### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI + Heroicons
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form
- **Real-time**: Socket.IO Client

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Message Queue**: RabbitMQ
- **Search Engine**: Elasticsearch  
- **Real-time**: Socket.IO
- **Authentication**: JWT
- **Cache**: Redis
- **File Storage**: Multer

## Project Structure
```
real-time-banking-architecture/
├── frontend/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   ├── components/         # Reusable components
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # API services
│   │   ├── types/              # TypeScript types
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static assets
│   └── package.json
├── backend/                     # Node.js Backend
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Custom middleware
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── services/               # Business logic
│   ├── utils/                  # Utility functions
│   ├── uploads/                # File uploads
│   ├── logs/                   # Application logs
│   └── server.js              # Main entry point
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (v5.0+)
- RabbitMQ (v3.11+)
- Elasticsearch (v8.0+)
- Redis (v6.0+)

### Quick Start

1. **Clone and setup the project:**
```bash
git clone <repository-url>
cd real-time-banking-architecture
```

2. **Setup Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Setup Frontend (in a new terminal):**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

### Environment Configuration

#### Backend (.env)
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/banking-system
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
RABBITMQ_URL=amqp://localhost
ELASTICSEARCH_URL=http://localhost:9200
REDIS_URL=redis://localhost:6379
CLIENT_URL=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Account Management
- `GET /api/accounts` - Get user accounts
- `POST /api/accounts` - Create new account
- `GET /api/accounts/:id` - Get specific account
- `PUT /api/accounts/:id` - Update account
- `GET /api/accounts/:id/balance` - Get account balance

### Transactions
- `GET /api/transactions` - Get transaction history
- `POST /api/transactions/transfer` - Transfer funds
- `POST /api/transactions/deposit` - Deposit funds
- `POST /api/transactions/withdraw` - Withdraw funds
- `GET /api/transactions/:id` - Get specific transaction

### File Management
- `POST /api/upload` - Upload documents
- `GET /api/files/:id` - Download files
- `DELETE /api/files/:id` - Delete files

### Analytics & Reporting
- `GET /api/analytics/dashboard` - Get dashboard data
- `GET /api/analytics/spending/:accountId` - Spending analysis
- `GET /api/reports/transactions` - Transaction reports

### Search
- `POST /api/search/transactions` - Search transactions
- `GET /api/search/accounts` - Search accounts

## Real-time Events (WebSocket)

### Client -> Server Events
- `subscribe_transactions` - Subscribe to account transaction updates
- `unsubscribe_transactions` - Unsubscribe from transaction updates

### Server -> Client Events
- `transaction_created` - New transaction notification
- `transaction_updated` - Transaction status update
- `balance_updated` - Account balance change
- `security_alert` - Security-related alerts
- `system_notification` - System messages

## Development

### Running the Full Stack
```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend
npm run dev

# Or run separately:
npm run dev:backend    # Backend only (port 3001)
npm run dev:frontend   # Frontend only (port 3000)
```

### Database Setup
```bash
# Make sure MongoDB is running locally
mongod

# Seed the database with sample data
cd backend
npm run seed
```

### Services Setup
Make sure these services are running:

1. **MongoDB**: `mongod`
2. **RabbitMQ**: `rabbitmq-server`
3. **Elasticsearch**: `elasticsearch`
4. **Redis**: `redis-server`

### Testing
```bash
# Run backend tests
cd backend
npm test

# Run frontend type checking
cd frontend
npm run type-check
```

## Production Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Features Implementation Status

### ✅ Completed
- [x] Next.js frontend with TypeScript
- [x] Node.js backend with Express
- [x] JWT authentication system
- [x] MongoDB user and account models
- [x] Real-time WebSocket setup
- [x] API service layer
- [x] Authentication pages (login/register)
- [x] Responsive design with Tailwind CSS

### 🚧 In Progress
- [ ] Transaction processing system
- [ ] Banking dashboard components
- [ ] File upload functionality
- [ ] RabbitMQ message queuing
- [ ] Elasticsearch integration

### 📋 Planned
- [ ] Account management UI
- [ ] Transaction history
- [ ] Analytics dashboard
- [ ] Security features
- [ ] Admin panel
- [ ] Mobile responsiveness
- [ ] Testing suite
- [ ] Docker deployment

## Demo Accounts

For testing purposes, you can use these demo credentials:

**Customer Account:**
- Email: demo@bankflow.com
- Password: demo123

**Admin Account:**
- Email: admin@bankflow.com  
- Password: admin123

## Security Features

- 🔒 JWT token-based authentication
- 🛡️ Rate limiting and DDoS protection
- 🔐 Password encryption with bcrypt
- 🚫 Input validation and sanitization
- 👥 Role-based access control
- 📊 Audit logging
- 🔍 Fraud detection alerts
- 💳 Secure transaction processing

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please create an issue in the repository or contact the development team.

---

**Built with ❤️ for the Real-Time Banking Architecture Project**

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Account Management
- `GET /api/accounts` - Get user accounts
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account

### Transactions
- `GET /api/transactions` - Get transaction history
- `POST /api/transactions/transfer` - Transfer funds
- `POST /api/transactions/deposit` - Deposit funds
- `POST /api/transactions/withdraw` - Withdraw funds

### File Management
- `POST /api/upload` - Upload documents
- `GET /api/files/:id` - Download files

### Analytics & Reporting
- `GET /api/analytics/dashboard` - Get dashboard data
- `GET /api/reports/transactions` - Transaction reports
- `GET /api/search/transactions` - Search transactions

## Real-time Events
- Transaction notifications
- Account balance updates
- System alerts
- Fraud detection alerts

## Security Features
- JWT authentication
- Rate limiting
- Input validation
- File type validation
- CORS protection
- Helmet security headers

## Event-Driven Architecture
The system uses RabbitMQ for:
- Async transaction processing
- Event notifications
- Audit logging
- Report generation
- Fraud detection

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
MIT License