import { Sql } from "postgres";
import { resourceLimits } from "worker_threads";

export default class Recipes {
  sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  // get all recipes based on user
  public async getRecipes(user_id: number) {
    try {
      const recipes = await this.sql`
      SELECT recipe_string
      FROM recipes
      WHERE recipes.user_id = ${user_id}
      `;

      return recipes;
    } catch (error) {
      console.error("Error retrieving recipes");
      throw new Error("Failes to get recipes");
    }
  }

  // insert recipe into database given username and recipe string
  public async insertRecipe(user_id: number, recipe: string) {
    try {
      const result = await this.sql`
        INSERT INTO recipes (user_id, recipe)
        VALUES (${user_id}, ${recipe})
        RETURNING user_id, recipe
      `;
      return result;
    } catch (error) {
      console.error("Error inserting recipe into db");
      throw new Error("Error inserting recipe into db");
    }
  }
}
