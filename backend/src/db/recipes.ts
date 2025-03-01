import { Sql } from "postgres";


export default class Recipes {
  sql: Sql

  constructor (sql: Sql) {
    this.sql = sql;
  }

  

}