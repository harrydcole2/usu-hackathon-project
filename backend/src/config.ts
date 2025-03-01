import { Sql } from 'postgres'
import sql from './db/pgConnection'

export interface Dependencies {
  sql: Sql
}


export default class Config {

  setupDependencies(): Dependencies {


    return {
      sql
    }
  }

}