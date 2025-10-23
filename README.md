# CRUD API - Node.js + MySQL + TypeScript

A complete CRUD (Create, Read, Update, Delete) API for managing Users and their Addresses, built with Node.js, TypeScript, Fastify, MySQL, and Sequelize ORM.

## 🚀 Live Demo

- **API Base URL**: https://crud-api-node-mysql.onrender.com
- **Swagger UI Documentation**: https://crud-api-node-mysql.onrender.com/docs/static/index.html
- **Database Dashboard**: https://railway.com/project/6fc26602-0e45-4a1b-ac49-e86b438434de/service/3ce6ec63-8e9d-4e9e-b297-7a4f0611bfd0/database?environmentId=90152b3b-9126-42ec-8bb7-516a788f8991&state=table&table=addresses

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Validation Rules](#validation-rules)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Full CRUD Operations** for Users and Addresses
- **RESTful API** with proper HTTP status codes
- **Input Validation** using JSON Schema
- **Pagination Support** for list endpoints
- **Filtering** (e.g., addresses by pincode)
- **Swagger Documentation** with interactive UI
- **CORS Enabled** for cross-origin requests
- **TypeScript** for type safety
- **Sequelize ORM** for database operations
- **MySQL Database** with proper relationships
- **Error Handling** with detailed responses
- **Logging** for debugging and monitoring
- **Environment-based Configuration**

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Fastify
- **Database**: MySQL
- **ORM**: Sequelize
- **Validation**: JSON Schema
- **Documentation**: Swagger/OpenAPI
- **Deployment**: Render
- **Database Hosting**: Railway

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL database (local or cloud)
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crud-api-node-mysql
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=crud_db
DB_USER=root
DB_PASSWORD=your_password

# Application Configuration
PORT=3000
NODE_ENV=development
```

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

### Available Routes
- **API Documentation**: `http://localhost:3000/docs`
- **Health Check**: `http://localhost:3000/health`
- **Root**: `http://localhost:3000/`

## 📚 API Endpoints

### Users Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users (with pagination) |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user (full update) |
| PATCH | `/api/users/:id` | Partially update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/users-with-addresses` | Get users with their addresses |

### Addresses Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/addresses` | Create a new address |
| GET | `/api/addresses` | Get all addresses (with optional pincode filter and pagination) |
| GET | `/api/addresses/:id` | Get address by ID |
| PUT | `/api/addresses/:id` | Update address (full update) |
| PATCH | `/api/addresses/:id` | Partially update address |
| DELETE | `/api/addresses/:id` | Delete address |

### Query Parameters

- **Pagination**: `?page=1&limit=10`
- **Address Filtering**: `?pincode=123456`

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Addresses Table
```sql
CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## ✅ Validation Rules

### User Validation
- **first_name**: Required, 1-100 characters
- **last_name**: Required, 1-100 characters
- **email**: Required, valid email format, must end with `@gmail.com`, unique

### Address Validation
- **user_id**: Required, must reference existing user
- **street**: Required, non-empty string
- **city**: Required, non-empty string
- **state**: Required, non-empty string
- **pincode**: Required, non-empty string

## 🚨 Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing

### Manual Testing
Use the Swagger UI at `/docs` for interactive testing.

### API Testing Tools
- Postman
- Insomnia
- curl

Example curl request:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@gmail.com"
  }'
```

## 🚀 Deployment

### Environment Variables for Production
```env
DB_HOST=your_production_db_host
DB_PORT=3306
DB_NAME=your_production_db_name
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
PORT=10000
NODE_ENV=production
```

### Build and Deploy
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



---

**Note**: This API is designed following REST principles and includes comprehensive documentation via Swagger UI. Make sure to check the live documentation for the most up-to-date endpoint details and request/response examples.
