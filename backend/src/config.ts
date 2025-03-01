import postgres from "postgres";
import Users from "./db/users";
import FoodItems from "./db/foodItems";
import UserAuthService from "./services/userAuthService";

export interface Dependencies {
  authService: UserAuthService;
  foodItems: FoodItems;
}

export default class Config {
  setupDependencies(): Dependencies {
    const sql = postgres(process.env.DB_CONNSTRING ?? "");

    const users = new Users(sql);
    const foodItems = new FoodItems(sql);

    const authService = new UserAuthService(users);

    return {
      authService,
      foodItems,
    };
  }
}
