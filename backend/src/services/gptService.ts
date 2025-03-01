import OpenAI from "openai";
import FoodItems from "../db/foodItems";
import Recipes from "../db/recipes";
import { ResponseParser } from "../parser/responseParser";

const sampleRecipeListResponse = `
Apple Banana Smoothie
- Ingredients: Apples, Bananas, Yogurt, Honey
- Directions: Blend the apples, bananas, yogurt, and honey together until smooth. Serve chilled.

***

Carrot and Bell Pepper Stir-Fry
- Ingredients: Carrots, Bell Peppers, Chicken Breast, Rice
- Directions: Stir-fry sliced carrots, bell peppers, and diced chicken breast in a pan. Serve over cooked rice.

***

Tomato and Mozzarella Salad
- Ingredients: Tomatoes, Cheese, Basil (if available)
- Directions: Slice tomatoes and cheese, arrange on a plate. Drizzle with olive oil, balsamic vinegar, and sprinkle with
basil if available.

`;

export class GptService {
  private foodItems: FoodItems;
  private recipes: Recipes;
  private openAI: OpenAI;
  private responseParser: ResponseParser;

  public constructor(foodItems: FoodItems, recipes: Recipes) {
    this.foodItems = foodItems;
    this.recipes = recipes;
    this.openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.responseParser = new ResponseParser();
  }
  public async getRecipes(user_id: number) {
    const userFridge = JSON.stringify(
      await this.foodItems.getUserFridge(user_id)
    );
    console.log(userFridge);
    const queryString = `
  This is all the items that a user has in their fridge/pantry: ${userFridge}
  Generate 5 recipes based off of their items, prioritizing the items that are going to expire soon. Do not number the recipes,
  do not say anything before listing the recipes or anything afterwards. Separate the reciples by "***". I want to be able to consistently
  parse the result, so be consistent. Here is an example response: ${sampleRecipeListResponse}.
  
`;
    const response = await this.generateQuery(queryString);
    const recipe_list = this.responseParser.parse(response!);
    return recipe_list;
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
    const response = await this.openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Spock from Star Trek" },
        {
          role: "user",
          content: queryString,
        },
      ],
      temperature: 0,
      store: true,
    });

    return response.choices[0].message.content;
  }
}
