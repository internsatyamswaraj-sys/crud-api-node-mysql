import { FastifyInstance } from 'fastify';
import { AddressController } from '../controllers/AddressController';
import { 
  createAddressSchema, 
  updateAddressSchema, 
  getAddressesQuerySchema 
} from '../schemas/addressSchemas';

export async function addressRoutes(fastify: FastifyInstance) {

  fastify.post('/addresses', {
    schema: {
      ...createAddressSchema,
      tags: ['Addresses'],
      summary: 'Create a new address',
      description: 'Create a new address for a user',
      
    },
  }, AddressController.createAddress);

 
  fastify.get('/addresses', {
    schema: {
      ...getAddressesQuerySchema,
      tags: ['Addresses'],
      summary: 'Get all addresses',
      description: 'Retrieve all addresses with optional pincode filter and pagination',
      querystring: {
        type: 'object',
        properties: {
          pincode: { type: 'string' },
          page: { type: 'number', default: 1 },
          limit: { type: 'number', default: 10 },
        },
      },
 
    },
  }, AddressController.getAllAddresses);

 
  fastify.get('/addresses/:id', {
    schema: {
      tags: ['Addresses'],
      summary: 'Get address by ID',
      description: 'Retrieve a specific address by its ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
        },
      },
   
    },
  }, AddressController.getAddressById);

 
  fastify.put('/addresses/:id', {
    schema: {
      ...updateAddressSchema,
      tags: ['Addresses'],
      summary: 'Update address (full update)',
      description: 'Update all fields of an address',
   
    },
  }, AddressController.updateAddress);

  
  fastify.patch('/addresses/:id', {
    schema: {
      tags: ['Addresses'],
      summary: 'Partially update address',
      description: 'Update only the provided fields of an address',
      body: {
        type: 'object',
        minProperties: 1,
        properties: {
          street: { type: 'string', minLength: 1 },
          city: { type: 'string', minLength: 1 },
          state: { type: 'string', minLength: 1 },
          pincode: { type: 'string', minLength: 1 },
        },
      },
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
        },
      },
     
    },
  }, AddressController.patchAddress);

  
  fastify.delete('/addresses/:id', {
    schema: {
      tags: ['Addresses'],
      summary: 'Delete address',
      description: 'Delete an address by its ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
        },
      },
    
    },
  }, AddressController.deleteAddress);
}