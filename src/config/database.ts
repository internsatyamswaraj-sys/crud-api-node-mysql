import { Sequelize } from 'sequelize';
import { EnvironmentConfig } from './env';

export class DatabaseConnection {
  private static instance: Sequelize;

  // Singleton Pattern
  public static getInstance(): Sequelize {
    if (!DatabaseConnection.instance) {
      const dbConfig = EnvironmentConfig.getDatabaseConfig();
      
      DatabaseConnection.instance = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        {
          host: dbConfig.host,
          port: dbConfig.port,
          dialect: 'mysql',
          logging: process.env.NODE_ENV === 'development' ? console.log : false,
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      );
    }

    return DatabaseConnection.instance;
  }

  public static async connect(): Promise<void> {
    try {
      await this.getInstance().authenticate();
      console.log(' Database connected successfully');
    } catch (error) {
      console.error(' Database connection failed:', error);
      throw error;
    }
  }

  public static async disconnect(): Promise<void> {
    try {
      await this.getInstance().close();
      console.log(' Database disconnected successfully');
    } catch (error) {
      console.error(' Database disconnection failed:', error);
      throw error;
    }
  }
}