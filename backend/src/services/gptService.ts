import OpenAI from "openai";
import FoodItems, { FoodItem } from "../db/foodItems";
import Recipes from "../db/recipes";

export class GptService {
  private foodItems: FoodItems;
  private recipes: Recipes;
  private openAI: OpenAI;

  public constructor(foodItems: FoodItems, recipes: Recipes) {
    this.foodItems = foodItems;
    this.recipes = recipes;
    this.openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
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

  async parseReceiptIntoFoodItems(receiptString: string, receiptDate: string): Promise<FoodItem[]> {
    const queryString = `
      I have the following text that represents a user's receipt from visiting a store, and I want you to convert this text
      into JSON objects representing individual items in the receipt. Please only include the items that are food. Please 
      generate a suggested expiration date for each of the items that will likely expire, given that the date they were 
      purchased was ${receiptDate}. Here is the schema I want the items to be in - 
      { item_name: String, quantity: Number, unit: String, expiration_date: String }. 

      Return a list of objects containing this data: 

      ${receiptString}

      Don't add any extra content, and return the data in the format of "[ {item_name: string, quantity: number, unit: string, expiration_date: string}, { ... }, ... ]
    `;

    const response = await this.generateQuery(queryString)
    if (response == null) {
      throw new Error("GPT returned null :(")
    }
    console.log(response)

    const objectResponse = JSON.parse(response)

    return objectResponse
  }

  private async generateQuery(queryString: string): Promise<string | null> {
    const response = await this.openAI.chat.completions.create({
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
