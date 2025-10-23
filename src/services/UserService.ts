import { User } from '../models/User';
import { Address } from '../models/Address';
import { EnvironmentConfig } from '../config/env';
import { Op } from 'sequelize';

export class UserService {
  
  
  public static async createUser(userData: {
    first_name: string;
    last_name: string;
    email: string;
  }): Promise<User> {
    try {
    
      EnvironmentConfig.validateUserEmail(userData.email);

      
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  }

 
  public static async getAllUsers(page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit;
    
    const { rows: users, count: total } = await User.findAndCountAll({
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });

    return { users, total };
  }

 
  public static async getUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  
  public static async updateUser(id: number, updateData: {
    first_name?: string;
    last_name?: string;
    email?: string;
  }): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    if (updateData.email) {
      EnvironmentConfig.validateUserEmail(updateData.email);
      
      
      const existingUser = await User.findOne({ 
        where: { 
          email: updateData.email,
          id: { [Op.ne]: id } // Fixed: Using Op.ne directly
        } 
      });
      
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    await user.update(updateData);
    return user;
  }

 
  public static async patchUser(id: number, updateData: Partial<{
    first_name: string;
    last_name: string;
    email: string;
  }>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    if (updateData.email) {
      EnvironmentConfig.validateUserEmail(updateData.email);
      
      const existingUser = await User.findOne({ 
        where: { 
          email: updateData.email,
          id: { [Op.ne]: id } 
        } 
      });
      
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    await user.update(updateData);
    return user;
  }

  // Delete user
  public static async deleteUser(id: number): Promise<boolean> {
    const deletedCount = await User.destroy({ where: { id } });
    return deletedCount > 0;
  }

  // Get users with their addresses (aggregate API)
  public static async getUsersWithAddresses(): Promise<User[]> {
    return await User.findAll({
      include: [{
        model: Address,
        as: 'addresses',
        attributes: ['id', 'street', 'city', 'state', 'pincode'],
      }],
      order: [['created_at', 'DESC']],
    });
  }
}