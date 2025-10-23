import fastify, { FastifyInstance } from 'fastify';
import { userRoutes } from './routes/userRoutes';
import { addressRoutes } from './routes/addressRoutes';
import { DatabaseConnection } from './config/database';
import { setupAssociations } from './models';
import { EnvironmentConfig } from './config/env';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';

export class Application {
  private app: FastifyInstance;

  constructor() {
    this.app = fastify({ logger: true });
  }

  // Setup method to register everything
  public async initialize(): Promise<void> {
    await this.setupCORS();
    await this.setupSwagger();
    await this.setupDatabase();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private async setupCORS(): Promise<void> {
    await this.app.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    });
    console.log(' CORS enabled');
  }

  private async setupSwagger(): Promise<void> {
    await this.app.register(fastifySwagger, {
      swagger: {
        info: {
          title: 'CRUD API Documentation',
          description: 'CRUD API for Users and Addresses management with MySQL',
          version: '1.0.0',
        },
        host: 'localhost:8080',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          { name: 'Users', description: 'User related endpoints' },
          { name: 'Addresses', description: 'Address related endpoints' },
        ],
      },
    });

    await this.app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
      uiConfig: { docExpansion: 'full', deepLinking: false },
      staticCSP: true,
    });

    console.log(' Swagger UI ready at /docs');
  }

  private async setupDatabase(): Promise<void> {
    try {
      setupAssociations();
      await DatabaseConnection.connect();
      await DatabaseConnection.getInstance().sync({ force: false });
      console.log(' Database synced successfully');
    } catch (error) {
      console.error('   Database setup failed:', error);
      process.exit(1);
    }
  }

  private setupRoutes(): void {
    this.app.register(userRoutes, { prefix: '/api' });
    this.app.register(addressRoutes, { prefix: '/api' });

    this.app.get('/health', async () => ({
      status: 'OK',
      timestamp: new Date().toISOString(),
    }));

    this.app.get('/', async () => ({
      message: 'CRUD API is running!',
      documentation: 'Visit /docs for API documentation',
    }));
  }

  private setupErrorHandling(): void {
    this.app.setErrorHandler((error, request, reply) => {
      this.app.log.error(error);
      if (error.validation) {
        return reply.status(400).send({
          success: false,
          message: 'Validation error',
          errors: error.validation,
        });
      }
      reply.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    });
  }

  public getInstance(): FastifyInstance {
    return this.app;
  }

  public async start(): Promise<void> {
    try {
      const { port } = EnvironmentConfig.getAppConfig();
      await this.app.listen({ port, host: '0.0.0.0' });
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📘 API Docs: http://localhost:${port}/docs`);
    } catch (error) {
      this.app.log.error(error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    await this.app.close();
    await DatabaseConnection.disconnect();
  }
}
