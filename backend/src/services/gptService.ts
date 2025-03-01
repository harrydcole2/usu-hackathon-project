import OpenAI from "openai";
import FoodItems, { FoodItem } from "../db/foodItems";
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

const sampleDetailedRecipeResponse = `
Beef Stir-Fry Recipe:

Ingredients:
- Beef Strips: 500g
- Broccoli: 300g
- Carrots: 200g
- Bell Peppers: 300g
- Soy Sauce: 50ml

Directions:
1. Heat a skillet over high heat.
2. Add 500g of beef strips to the hot skillet and stir-fry until browned and cooked through.
3. Remove the beef from the skillet and set aside.
4. In the same skillet, add 200g of sliced carrots and cook for 2-3 minutes until slightly tender.
5. Add 300g of broccoli florets and 300g of sliced bell peppers to the skillet. Stir-fry for another 3-4 minutes until the vegetables are tender-crisp.
6. Return the cooked beef to the skillet.
7. Pour 50ml of soy sauce over the beef and vegetables. Stir well to combine and heat through.
8. Serve the beef stir-fry over cooked rice.

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

  async parseReceiptIntoFoodItems(
    receiptString: string,
    receiptDate: string
  ): Promise<FoodItem[]> {
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

    const response = await this.generateQuery(queryString);
    if (response == null) {
      throw new Error("GPT returned null :(");
    }
    console.log(response);

    const objectResponse = JSON.parse(response);

    return objectResponse;
  }

  public async getDetailedRecipe(user_id: number, recipe: string) {
    const userFridge = JSON.stringify(
      await this.foodItems.getUserFridge(user_id)
    );
    const queryString = `
    These are the ingredients that I currently have: ${userFridge}
    This is the recipe that I want to make: ${recipe}
    Given the quantities of food that I have in my fridge, give me back this recipe
    but with more detailed instructions and specific quantities for each food.
    Do not say anything before or after giving the recipe. 
    Here is a perfect sample response: ${sampleDetailedRecipeResponse}
    `;
    const response = await this.generateQuery(queryString);
    console.log(response);
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
