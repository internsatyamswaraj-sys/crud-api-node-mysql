import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController';
import { 
  createUserSchema, 
  updateUserSchema, 
  patchUserSchema 
} from '../schemas/userSchemas';

export async function userRoutes(fastify: FastifyInstance) {
  
  fastify.post('/users', {
    schema: {
      ...createUserSchema,
      tags: ['Users'],
      summary: 'Create a new user',
      description: 'Create a new user with first name, last name, and email. Email must be @gmail.com',
      
    },
  }, UserController.createUser);

 
  fastify.get('/users', {
    schema: {
      tags: ['Users'],
      summary: 'Get all users',
      description: 'Retrieve all users with pagination',
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number', default: 1 },
          limit: { type: 'number', default: 10 },
        },
      },
    
    },
  }, UserController.getAllUsers);

  
  fastify.get('/users/:id', {
    schema: {
      tags: ['Users'],
      summary: 'Get user by ID',
      description: 'Retrieve a specific user by their ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
        },
      },
    
    },
  }, UserController.getUserById);

  
  fastify.put('/users/:id', {
    schema: {
      ...updateUserSchema,
      tags: ['Users'],
      summary: 'Update user (full update)',
      description: 'Update all fields of a user. All fields are required for PUT',
     
    },
  }, UserController.updateUser);

 
  fastify.patch('/users/:id', {
    schema: {
      ...patchUserSchema,
      tags: ['Users'],
      summary: 'Partially update user',
      description: 'Update only the provided fields of a user',
      
    },
  }, UserController.patchUser);

 
  fastify.delete('/users/:id', {
    schema: {
      tags: ['Users'],
      summary: 'Delete user',
      description: 'Delete a user by their ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
        },
      },
      
    },
  }, UserController.deleteUser);

  
  fastify.get('/users-with-addresses', {
    schema: {
      tags: ['Users'],
      summary: 'Get users with addresses',
      description: 'Retrieve all users with their addresses nested in the response',
     
    },
  }, UserController.getUsersWithAddresses);
}