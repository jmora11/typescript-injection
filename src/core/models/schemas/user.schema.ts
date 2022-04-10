import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/sequalize";
import { User } from "../database/user.model";

class UserSchema extends Model<User> {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

UserSchema.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    dateOfBirth: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
  }
);

export default UserSchema;
