import { Sql } from "postgres";

export default class FoodItems {
  sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  // get fridge by userID
  public async getUserFridge(user_id: number) {
    try {
      const result = await this.sql`
    SELECT item_name, quantity, unit, expiration_date
    FROM food_items
    WHERE food_items.user_id = ${user_id}
    `;
      return result;
    } catch (error) {
      console.error(
        `Failed to receive user's foodItems with id ${user_id}'s fridge`
      );
      throw Error(
        `Failed to receive user's foodItems with id ${user_id}'s fridge`
      );
    }
  }

  // get food items by receipt
  public async getReceiptFridge(receipt_id: number) {
    try {
      const result = await this.sql`
    SELECT item_name, quantity, unit, expiration_date
    FROM food_items
    WHERE receipt_id = ${receipt_id}
    `;
      return result;
    } catch (error) {
      console.error(
        `Failed to receive receipt's foodItems with id ${receipt_id}'s fridge`
      );
      throw Error(
        `Failed to receive receipt's foodItems with id ${receipt_id}'s fridge`
      );
    }
  }

  public async getFoodItem(id: number) {
    try {
      const result = await this.sql`
    SELECT item_name, quantity, unit, expiration_date
    FROM food_items
    WHERE id = ${id}
    `;
      return result;
    } catch (error) {
      console.error(`Failed to retrieve food_item with id: ${id}`);
      throw Error(`Failed to retrieve food_item with id: ${id}`);
    }
  }
}
