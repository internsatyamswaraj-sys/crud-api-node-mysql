import * as dotenv from 'dotenv';

dotenv.config();

export class EnvironmentConfig {
  private static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static getDatabaseConfig() {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      database: process.env.DB_NAME || 'crud_db',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Stashfin',
    };
  }

  static getAppConfig() {
    return {
      port: parseInt(process.env.PORT || '3000'),
      environment: process.env.NODE_ENV || 'development',
    };
  }

  // SRP: Single Responsibility - Email validation logic separated
  static validateUserEmail(email: string): void {
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    if (!email.endsWith('@gmail.com')) {
      throw new Error('Only @gmail.com emails are allowed');
    }
  }
}