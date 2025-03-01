import postgres from 'postgres'
import Users from './db/users';
import UserAuthService from './services/userAuthService';

export interface Dependencies {
  authService: UserAuthService
}


export default class Config {

  setupDependencies(): Dependencies {
    const sql = postgres(process.env.DB_CONNSTRING ?? "");

    const users = new Users(sql)

    const authService = new UserAuthService(users)

    return {
      authService
    }
  }

}