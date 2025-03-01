import Users from "../db/users";
import argon2 from "argon2";



export default class AuthService {
  users: Users;

  constructor (users: Users) {
    this.users = users;
  }

  async login (username: string, password: string): Promise<string> {
    


    return "eyJasdlfkjalsdfjkalsdjfalsjkdfajsdfoaijfpoiajvbpvoianergoihjg"
  }

  async createUser (username: string, password: string): Promise<number> {




    return 2
  }

  async removeUser (userId: number) {

  }


  private async hashPassword(password: string): Promise<string> {
    try {
      const hash = await argon2.hash(password);
      return hash;
    } catch (error) {
      // Handle error
      throw new Error("Hashing failed");
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
         console.error(error)
         throw new Error("Verification failed");
      }
  }
}