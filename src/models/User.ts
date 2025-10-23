import { DataTypes, Model, Optional } from 'sequelize';
import { DatabaseConnection } from '../config/database';
import { EnvironmentConfig } from '../config/env'; // Add this import

// Interface for User attributes
interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}


interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // OCP: Open for extension - We can add methods here without modifying base class
  public getFullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}

// Model initialization
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
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
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: (user: User) => {
        // Using our custom email validation
        EnvironmentConfig.validateUserEmail(user.email);
      },
      beforeUpdate: (user: User) => {
        if (user.changed('email')) {
          EnvironmentConfig.validateUserEmail(user.email);
        }
      },
    },
  }
);