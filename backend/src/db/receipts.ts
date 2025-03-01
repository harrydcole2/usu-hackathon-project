import { Sql } from "postgres";


export default class Receipts {
  sql: Sql

  constructor (sql: Sql) {
    this.sql = sql;
  }

  

}