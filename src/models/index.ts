import { User } from './User';
import { Address } from './Address';

// Export all models
export { User, Address };

// Export model associations - Define associations only here
export const setupAssociations = (): void => {
  // User has many Addresses
  User.hasMany(Address, { 
    foreignKey: 'user_id', 
    as: 'addresses',
    onDelete: 'CASCADE'
  });
  
  // Address belongs to User
  Address.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'user'
  });
};