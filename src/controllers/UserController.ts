import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/UserService';

// SRP: Single Responsibility - Only handles HTTP requests/responses
export class UserController {
  
  // Create User
  public static async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userData = request.body as any;
      const user = await UserService.createUser(userData);

      return reply.status(201).send({
        success: true,
        data: user,
        message: 'User created successfully',
      });
    } catch (error: any) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  // Get All Users
  public static async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page = 1, limit = 10 } = request.query as any;
      const { users, total } = await UserService.getAllUsers(parseInt(page), parseInt(limit));

      return reply.send({
        success: true,
        data: users,
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

  // Get User by ID
  public static async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const user = await UserService.getUserById(parseInt(id));

      if (!user) {
        return reply.status(404).send({
          success: false,
          message: 'User not found',
        });
      }

      return reply.send({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // Update User (PUT)
  public static async updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const updateData = request.body as any;

      const user = await UserService.updateUser(parseInt(id), updateData);

      if (!user) {
        return reply.status(404).send({
          success: false,
          message: 'User not found',
        });
      }

      return reply.send({
        success: true,
        data: user,
        message: 'User updated successfully',
      });
    } catch (error: any) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  // Partial Update User (PATCH)
  public static async patchUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const updateData = request.body as any;

      const user = await UserService.patchUser(parseInt(id), updateData);

      if (!user) {
        return reply.status(404).send({
          success: false,
          message: 'User not found',
        });
      }

      return reply.send({
        success: true,
        data: user,
        message: 'User updated successfully',
      });
    } catch (error: any) {
      return reply.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete User
  public static async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const deleted = await UserService.deleteUser(parseInt(id));

      if (!deleted) {
        return reply.status(404).send({
          success: false,
          message: 'User not found',
        });
      }

      return reply.send({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // Get Users with Addresses
  public static async getUsersWithAddresses(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await UserService.getUsersWithAddresses();

      return reply.send({
        success: true,
        data: users,
      });
    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}