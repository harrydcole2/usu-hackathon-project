import postgres from 'postgres'
import Users from './db/users';
import AuthService from './services/authService';

export interface Dependencies {
  authService: AuthService
}


export default class Config {

  setupDependencies(): Dependencies {
    const sql = postgres(process.env.DB_CONNSTRING ?? "");

    const users = new Users(sql)

    const authService = new AuthService(users)


    return {
      authService
    }
  }

}