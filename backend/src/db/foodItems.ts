import { Sql } from "postgres";


export default class FoodItems {
  sql: Sql

  constructor (sql: Sql) {
    this.sql = sql;
  }

  

}