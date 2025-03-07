import postgres from "postgres";
import Users from "./db/users";
import UserAuthService from "./services/userAuthService";
import FoodItems from "./db/foodItems";
import { GptService } from "./services/gptService";
import Recipes from "./db/recipes";
import Receipts from "./db/receipts";

export interface Dependencies {
  authService: UserAuthService;
  gptService: GptService;
  foodItems: FoodItems;
  receipts: Receipts;
  recipes: Recipes;
}

export default class Config {
  setupDependencies(): Dependencies {
    const sql = postgres(process.env.DB_CONNSTRING ?? "");

    const users = new Users(sql);
    const foodItems = new FoodItems(sql);
    const recipes = new Recipes(sql);
    const receipts = new Receipts(sql);

    const authService = new UserAuthService(users);
    const gptService = new GptService(foodItems, recipes);

    return {
      authService,
      gptService,
      foodItems,
      receipts,
      recipes,
    };
  }
}
