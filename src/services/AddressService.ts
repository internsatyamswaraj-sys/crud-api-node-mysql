import { Address } from '../models/Address';
import { User } from '../models/User';

export class AddressService {
  

  public static async createAddress(addressData: {
    user_id: number;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }): Promise<Address> {
    
    const user = await User.findByPk(addressData.user_id);
    if (!user) {
      throw new Error('User not found');
    }

    return await Address.create(addressData);
  }

  
  public static async getAllAddresses(pincode?: string, page: number = 1, limit: number = 10): Promise<{ addresses: Address[]; total: number }> {
    const offset = (page - 1) * limit;
    
    const whereCondition: any = {};
    if (pincode) {
      whereCondition.pincode = pincode;
    }

    const { rows: addresses, count: total } = await Address.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'first_name', 'last_name', 'email'],
      }],
      order: [['created_at', 'DESC']],
    });

    return { addresses, total };
  }


  public static async getAddressById(id: number): Promise<Address | null> {
    return await Address.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'first_name', 'last_name', 'email'],
      }],
    });
  }

 
  public static async updateAddress(id: number, updateData: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  }): Promise<Address | null> {
    const address = await Address.findByPk(id);
    if (!address) {
      return null;
    }

    await address.update(updateData);
    return address;
  }


  public static async patchAddress(id: number, updateData: Partial<{
    street: string;
    city: string;
    state: string;
    pincode: string;
  }>): Promise<Address | null> {
    const address = await Address.findByPk(id);
    if (!address) {
      return null;
    }

    await address.update(updateData);
    return address;
  }


  public static async deleteAddress(id: number): Promise<boolean> {
    const deletedCount = await Address.destroy({ where: { id } });
    return deletedCount > 0;
  }
}