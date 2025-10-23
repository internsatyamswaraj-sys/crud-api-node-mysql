import { FastifyRequest, FastifyReply } from 'fastify';
import { AddressService } from '../services/AddressService';

export class AddressController {
  
  // Create Address
  public static async createAddress(request: FastifyRequest, reply: FastifyReply) {
    try {
      const addressData = request.body as any;
      const address = await AddressService.createAddress(addressData);

      return reply.status(201).send({
        success: true,
        data: address,
        message: 'Address created successfully',
      });
    } catch (error: any) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  // Get All Addresses
  public static async getAllAddresses(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { pincode, page = 1, limit = 10 } = request.query as any;
      const { addresses, total } = await AddressService.getAllAddresses(
        pincode, 
        parseInt(page), 
        parseInt(limit)
      );

      return reply.send({
        success: true,
        data: addresses,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // Get Address by ID
  public static async getAddressById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const address = await AddressService.getAddressById(parseInt(id));

      if (!address) {
        return reply.status(404).send({
          success: false,
          message: 'Address not found',
        });
      }

      return reply.send({
        success: true,
        data: address,
      });
    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // Update Address (PUT)
  public static async updateAddress(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const updateData = request.body as any;

      const address = await AddressService.updateAddress(parseInt(id), updateData);

      if (!address) {
        return reply.status(404).send({
          success: false,
          message: 'Address not found',
        });
      }

      return reply.send({
        success: true,
        data: address,
        message: 'Address updated successfully',
      });
    } catch (error: any) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  // Partial Update Address (PATCH)
  public static async patchAddress(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const updateData = request.body as any;

      const address = await AddressService.patchAddress(parseInt(id), updateData);

      if (!address) {
        return reply.status(404).send({
          success: false,
          message: 'Address not found',
        });
      }

      return reply.send({
        success: true,
        data: address,
        message: 'Address updated successfully',
      });
    } catch (error: any) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete Address
  public static async deleteAddress(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const deleted = await AddressService.deleteAddress(parseInt(id));

      if (!deleted) {
        return reply.status(404).send({
          success: false,
          message: 'Address not found',
        });
      }

      return reply.send({
        success: true,
        message: 'Address deleted successfully',
      });
    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}