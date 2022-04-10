import { User } from "../core/models/database/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private readonly _userRepository: UserRepository;
  constructor(container) {
    this._userRepository = container.userRepository;
  }

  getIndexFilePath(): string {
    return "/sandbox/public/index.html";
  }

  async initData(): Promise<string> {
    return await this._userRepository.initData();
  }

  async getUsersAsync(): Promise<User[]> {
    await this._userRepository.syncUsers();
    const users = await this._userRepository.getAll();
    return users;
  }

  async getUserByIdAsync(id: string): Promise<User> {
    const user = await this._userRepository.get(id);
    return user;
  }

  async saveUser(user: User): Promise<User> {
    return user.id ? this.updateUser(user) : this.addUser(user);
  }

  async delete(id: string): Promise<boolean> {
    await this._userRepository.syncUsers();
    const result = await this._userRepository.delete(id);

    return result;
  }

  private async addUser(user: User): Promise<User> {
    await this._userRepository.syncUsers();

    const userResult = await this._userRepository.insert(user);
    return userResult;
  }

  private async updateUser(user: User): Promise<User> {
    await this._userRepository.syncUsers();

    const userResult = await this._userRepository.update(user);
    return userResult;
  }
}
