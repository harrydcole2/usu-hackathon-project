import { Sql } from "postgres";


export default class Users {
  sql: Sql

  constructor (sql: Sql) {
    this.sql = sql;
  }

  

}