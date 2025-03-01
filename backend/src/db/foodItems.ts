import { Sql } from "postgres";

interface FoodItem {
  item_name: string;
  quantity: number;
  unit: string;
  expiration_date: string;
  id?: number;
  user_id?: number;
  receipt_id?: number;
}

export default class FoodItems {
  sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  // get fridge by userID
  public async getUserFridge(user_id: number) {
    try {
      const result = await this.sql`
    SELECT food_items.id, item_name, quantity, receipt_id, unit, expiration_date, date as receipt_date
    FROM food_items
    INNER JOIN receipts ON food_items.receipt_id = receipts.id
    WHERE food_items.user_id = ${user_id}
    `;
      return result as unknown as FoodItem[];
    } catch (error: any) {
      console.error(
        `Failed to receive user's foodItems with id ${user_id}'s fridge: ${error.message}`
      );
      throw Error(`Failed to receive user's foodItems with id ${user_id}'s fridge`);
    }
  }

  // get food items by receipt
  public async getReceiptFridge(receipt_id: number) {
    try {
      const result = await this.sql`
    SELECT food_items.id, item_name, quantity, receipt_id, unit, expiration_date, date as receipt_date
    FROM food_items
    INNER JOIN receipts ON food_items.receipt_id = receipts.id
    WHERE receipt_id = ${receipt_id}
    `;
      return result;
    } catch (error) {
      console.error(
        `Failed to receive receipt's foodItems with id ${receipt_id}'s fridge`
      );
      throw Error(`Failed to receive receipt's foodItems with id ${receipt_id}'s fridge`);
    }
  }

  public async getFoodItem(id: number) {
    try {
      const result = await this.sql`
    SELECT id, item_name, quantity, unit, expiration_date
    FROM food_items
    WHERE id = ${id}
    `;
      return result;
    } catch (error) {
      console.error(`Failed to retrieve food_item with id: ${id}`);
      throw Error(`Failed to retrieve food_item with id: ${id}`);
    }
  }

  public async addFoodItem(item: FoodItem): Promise<void> {
    console.log(item);

    try {
      await this.sql`
      INSERT INTO food_items (user_id, item_name, quantity, receipt_id, unit, expiration_date)
      VALUES (${item.user_id ?? ""}, ${item.item_name}, ${item.quantity}, ${
        item.receipt_id ?? ""
      }, ${item.unit}, ${item.expiration_date})`;
    } catch (error: any) {
      console.error(`Failed to insert new food item: ${error.message}`);
      throw Error("Failed to Insert Food Item");
    }
  }

  public async addBatchFoodItems(items: FoodItem[]) {
    try {
      await this.sql`
      INSERT INTO food_items (user_id, item_name, quantity, receipt_id, unit, expiration_date)
      VALUES ${this.sql(items.map(item => 
        [item.user_id ?? "", item.item_name, item.quantity, item.receipt_id ?? "", item.unit, item.expiration_date]
      ))}
    `;
    } catch (error: any) {
      console.error(`Failed to insert new food item: ${error.message}`);
      throw Error("Failed to Insert Food Item");
    }
  }

  public async removeFoodItem(itemId: number, userId: number) {
    try {
      await this.sql`
      DELETE FROM food_items
      WHERE id = ${itemId} AND user_id = ${userId}`;
    } catch (error: any) {
      console.error(`Failed to Delete food item: ${error.message}`);
      throw Error("Failed to Delete Food Item");
    }
  }

  public async updateFoodItem(updatedItem: FoodItem) {
    try {
      await this.sql`
      UPDATE food_items
      SET item_name = ${updatedItem.item_name}, quantity = ${
        updatedItem.quantity
      }, receipt_id = ${updatedItem.receipt_id ?? ""}, unit = ${
        updatedItem.unit
      }, expiration_date = ${updatedItem.expiration_date}
      WHERE id = ${updatedItem.id ?? ""}`;
    } catch (error: any) {
      console.error(`Failed to Update food item: ${error.message}`);
      throw Error("Failed to Update Food Item");
    }
  }

  public async updateBatchFoodItems(updatedItems: FoodItem[]) {
    try {
      updatedItems.forEach(async (updatedItem) => {
        await this.sql`
        UPDATE food_items
        SET item_name = ${updatedItem.item_name}, quantity = ${
          updatedItem.quantity
        }, receipt_id = ${updatedItem.receipt_id ?? ""}, unit = ${
          updatedItem.unit
        }, expiration_date = ${updatedItem.expiration_date}
        WHERE id = ${updatedItem.id ?? ""}`;
      });
    } catch (error: any) {
      console.error(`Failed to Update food item: ${error.message}`);
      throw Error("Failed to Update Food Item");
    }
  }
}
