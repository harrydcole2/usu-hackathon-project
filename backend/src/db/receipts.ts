import { Sql } from "postgres";

export interface receiptResult {
  id: number;
  user_id: number;
  name: string;
  data: Date;
}

export default class Receipts {
  sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  public async getAllReceipts() {
    try {
      const results = await this.sql<receiptResult[]>`
      SELECT * FROM receipts
      `;
      return results as receiptResult[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getReceiptByUser(user_id: number) {
    try {
      const results = await this.sql<receiptResult[]>`
      SELECT * FROM receipts
      WHERE receipts.user_id = ${user_id}
      `;
      return results as receiptResult[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getReceiptByID(receipt_id: number) {
    try {
      const results = await this.sql<receiptResult[]>`
      SELECT * FROM receipts
      WHERE receipt.id = ${receipt_id}
      `;
      return results[0] as receiptResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async deleteReceipt(receipt_id: number) {
    try {
      const result = await this.sql`
      DELETE FROM receipts
      WHERE receipt.id = ${receipt_id}
      `;
      return result.count > 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async createReceipt(name: string, date: Date, user_id: number) {
    try {
      const result = await this.sql`
      INSERT INTO receipts (name, data, user_id)
      VALUES (${name}, ${date}, ${user_id})
      RETURNING *
      `;
      return result[0] as receiptResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateDateReceipt(receipt_id: number, new_date: Date) {
    try {
      const result = await this.sql`
        UPDATE receipts
        SET date = ${new_date}
        WHERE id = ${receipt_id}
        RETURNING *
      `;
      return result[0] as receiptResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateNameReceipt(receipt_id: number, new_name: string) {
    try {
      const result = await this.sql`
        UPDATE receipts
        SET name = ${new_name}
        WHERE id = ${receipt_id}
        RETURNING *
      `;
      return result[0] as receiptResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
