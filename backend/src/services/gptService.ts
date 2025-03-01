import OpenAI from "openai";
import FoodItems from "../db/foodItems";
import Recipes from "../db/recipes";
const openai = new OpenAI();

export class GptService {
  private foodItems: FoodItems;
  private recipes: Recipes;

  public constructor(foodItems: FoodItems, recipes: Recipes) {
    this.foodItems = foodItems;
    this.recipes = recipes;
  }
  public async getRecipes(user_id: number) {
    const userFridge = await this.foodItems.getUserFridge(user_id);
    const queryString = `
  This is all the items that a user has in their fridge/pantry.
  Generate a few recipes based off of their items, prioritizing the items that are going to expire soon:
  ${userFridge}
`;
    const response = await this.generateQuery(queryString);
    return response;
  }

  public async checkAndModifyRecipe(user_id: number, recipe_id: number) {
    const userFridge = await this.foodItems.getUserFridge(user_id);
    const recipe = await this.recipes.getRecipe(recipe_id);
    const queryString = `
    I want to make this recipe: 
      ${recipe}. This is what is in my fridge:
      ${userFridge}. Do I have enough ingredients to make the recipe? If not, is there a similar meal I could make? 
      If so, what is the recipe for that meal? 
    `;
    const response = await this.generateQuery(queryString);
    return response;
  }

  private async generateQuery(queryString: string): Promise<string | null> {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: queryString,
        },
      ],
      store: true,
    });

    return response.choices[0].message.content;
  }
}
