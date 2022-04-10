import { IRepository } from "../core/interfaces/irepository";
import { User } from "../core/models/database/user.model";
import UserSchema from "../core/models/schemas/user.schema";

export class UserRepository implements IRepository {
  async getAll(): Promise<User[]> {
    return UserSchema.findAll();
  }

  async get(id: string): Promise<User> {
    return await UserSchema.findByPk(id);
  }

  async insert(user: User): Promise<User> {
    const result = await UserSchema.create(user);
    return result;
  }

  async update(user: User): Promise<User> {
    await UserSchema.sync();

    const userFound = await UserSchema.findOne({ where: { id: user.id } });
    userFound.firstName = user.firstName;
    userFound.lastName = user.lastName;
    userFound.dateOfBirth = user.dateOfBirth;
    const result = userFound.save();

    return result;
  }

  async delete(id: string): Promise<boolean> {
    return await UserSchema.destroy({
      where: {
        id
      }
    });
  }

  async initData(): Promise<string> {
    await UserSchema.sync({ force: true });

    const usersWrite = [
      ["John", "Hancock"],
      ["Liz", "Smith"],
      ["Ahmed", "Khan"]
    ];

    await UserSchema.bulkCreate(
      usersWrite.map(([firstName, lastName]) => ({ firstName, lastName }))
    );

    return "Completed Data Initialization";
  }

  async syncUsers(): Promise<void> {
    await UserSchema.sync();
  }
}
