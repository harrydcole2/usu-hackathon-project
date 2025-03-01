import Users from "../db/users";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export default class AuthService {
  users: Users;

  constructor(users: Users) {
    this.users = users;
  }

  async login (username: string, password: string): Promise<string> {
    const userData = { id: '', username: '', passwordHash: '' } // this.users.getUser(username)
    if (userData == null) {
      throw new Error('User Not Found')
    }

    if (!(await this.verifyPassword(userData.passwordHash, password))) {
      throw new Error('Password Incorrect')
    }

    return jwt.sign({ userId: userData.id }, process.env.JWT_KEY ?? 'secretDONOTUSETHIS')
  }

  async createUser(username: string, password: string): Promise<void> {
    const passwordHash = await this.hashPassword(password)

    // await this.users.insertUser(username, passwordHash)
  }

  async removeUser(userId: number): Promise<void> {
    // await this.users.removeUser(userId)
  }

  async updatePassword (userId: number, newPassword: string): Promise<void> {
    const passwordHash = await this.hashPassword(newPassword)

    // await this.users.updatePassword(userId, passwordHash)
  }

  private async hashPassword(password: string): Promise<string | undefined> {
    try {
      const hash = await argon2.hash(password);
      return hash;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  private async verifyPassword(hash: string, passwordAttempt: string): Promise<boolean> {
    try {
      if (await argon2.verify(hash, passwordAttempt)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
