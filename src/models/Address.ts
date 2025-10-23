import { DataTypes, Model, Optional } from 'sequelize';
import { DatabaseConnection } from '../config/database';
import { User } from './User';

// Interface for Address attributes
interface AddressAttributes {
  id: number;
  user_id: number;
  street: string;
  city: string;
  state: string;
  pincode: string;
  created_at?: Date;
  updated_at?: Date;
}

// Interface for Address creation attributes
interface AddressCreationAttributes extends Optional<AddressAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
  public id!: number;
  public user_id!: number;
  public street!: string;
  public city!: string;
  public state!: string;
  public pincode!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// Model initialization
Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pincode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DatabaseConnection.getInstance(),
    tableName: 'addresses',
    timestamps: true,
    underscored: true,
  }
);

