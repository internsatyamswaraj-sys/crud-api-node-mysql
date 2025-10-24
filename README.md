 CRUD API - Node.js + MySQL + TypeScript

A complete CRUD (Create, Read, Update, Delete) API for managing Users and their Addresses, built with Node.js, TypeScript, Fastify, MySQL, and Sequelize ORM.

demo

- API Base URL: https://crud-api-node-mysql.onrender.com
- **Swagger UI Documentation**: https://crud-api-node-mysql.onrender.com/docs/static/index.html
- **Database Dashboard**: https://railway.com/project/6fc26602-0e45-4a1b-ac49-e86b438434de/service/3ce6ec63-8e9d-4e9e-b297-7a4f0611bfd0/database?environmentId=90152b3b-9126-42ec-8bb7-516a788f8991&state=table&table=addresses





Tech Stack

Runtime: Node.js
Language: TypeScript
Framework: Fastify
Database: MySQL
ORM: Sequelize
Validation: JSON Schema
Documentation: Swagger/OpenAPI
Deployment: Render
Database Hosting: Railway


   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```






Users Table
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

Addresses Table
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






 Environment Variables for Production
```env
DB_HOST=your_production_db_host
DB_PORT=3306
DB_NAME=your_production_db_name
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
PORT=10000
NODE_ENV=production
```

 Build and Deploy
```bash
npm run build
npm start
```



**Note**: This API is designed following REST principles and includes comprehensive documentation via Swagger UI. Make sure to check the live documentation for the most up-to-date endpoint details and request/response examples.
