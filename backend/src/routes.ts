import { Dependencies } from "./config";
import { Express } from "express";
import { Request as JWTRequest } from "express-jwt";

export default function setupRoutes(app: Express, dependencies: Dependencies) {
  // Food Items Endpoints

  app.get("/foodItems/all", async (req: JWTRequest, res) => {
    try {
      const targetUser = req.auth?.userId;

      const foodResult = await dependencies.foodItems.getUserFridge(targetUser);
      console.log(foodResult);

      res.send(foodResult);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // Expecting body to be like { foodItem: { item_name, quantity, receipt_id, unit, expiration_date }}
  app.post("/foodItems", async (req: JWTRequest, res) => {
    try {
      const receivedFoodItem = req.body?.foodItem;
      const targetUser = req.auth?.userId;

      const newFoodItem = {
        ...receivedFoodItem,
        user_id: targetUser,
      };

      await dependencies.foodItems.addFoodItem(newFoodItem);

      res.send("Food Item Successfully Added");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // Expecting body to be like { foodItems: [{ item_name, quantity, receipt_id, unit, expiration_date }, { item_name, quantity, receipt_id, unit, expiration_date }]}
  app.post("/foodItems/batch", async (req: JWTRequest, res) => {
    try {
      const receivedFoodItems = req.body?.foodItems as any[];
      const targetUser = req.auth?.userId;

      const newFoodItems = receivedFoodItems.map((item) => {
        return {
          ...item,
          user_id: targetUser,
        };
      });

      await dependencies.foodItems.addBatchFoodItems(newFoodItems);
      res.send("Food Batch Items Successfully Added");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // Expecting body to be like { foodItem: { id, item_name, quantity, receipt_id, unit, expiration_date }}
  // NOTE THE id
  app.put("/foodItems", async (req: JWTRequest, res) => {
    try {
      const receivedFoodItem = req.body?.foodItem;
      const targetUser = req.auth?.userId;

      const newFoodItem = {
        ...receivedFoodItem,
        user_id: targetUser,
      };

      await dependencies.foodItems.updateFoodItem(newFoodItem);

      res.send("Food Item Successfully Updated");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // Expecting body to be like { foodItems: [{ id, item_name, quantity, receipt_id, unit, expiration_date }, { ... }]}
  // NOTE THE id
  app.put("/foodItems/batch", async (req: JWTRequest, res) => {
    try {
      const receivedFoodItems = req.body?.foodItems as any[];
      const targetUser = req.auth?.userId;

      const newFoodItems = receivedFoodItems.map((item) => {
        return {
          ...item,
          user_id: targetUser,
        };
      });

      await dependencies.foodItems.updateBatchFoodItems(newFoodItems);

      res.send("Food Item Successfully Updated");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  app.delete("/foodItems/:foodId", async (req: JWTRequest, res) => {
    try {
      const itemId = req.params?.foodId;
      const targetUser = req.auth?.userId;

      await dependencies.foodItems.removeFoodItem(Number(itemId), targetUser);

      res.send("Food Item Successfully Deleted");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // Receipt Routes

  // Gets all receipts for users
  app.get("/receipts", async (req: JWTRequest, res) => {
    try {
      const targetUser = req.auth?.userId;

      const receipts = await dependencies.receipts.getReceiptByUser(targetUser);
      res.send({ receipts });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // I'm expecting an object that looks like { receiptData: { name, date } }
  app.post("/receipts", async (req: JWTRequest, res) => {
    try {
      const receiptData = req.body?.receiptData;
      const targetUser = req.auth?.userId;

      const newReceipt = await dependencies.receipts.createReceipt(
        receiptData.name,
        receiptData.date,
        targetUser
      );
      res.send({
        message: "Successfully Created New Receipt",
        newReceiptId: newReceipt.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // I'm expecting an object that looks like { receiptData: { id, name, date }}
  app.put("/receipts", async (req: JWTRequest, res) => {
    try {
      const receiptData = req.body?.receiptData;
      const targetUser = req.auth?.userId;

      await dependencies.receipts.updateReceipt(
        receiptData.id,
        receiptData.date,
        receiptData.name,
        targetUser
      );
      res.send("Update on Receipt Complete");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  app.delete("/receipts/:receiptId", async (req: JWTRequest, res) => {
    try {
      const targetUser = req.auth?.userId;
      const receiptId = req.params?.receiptId;

      await dependencies.receipts.deleteReceipt(Number(receiptId), targetUser);
      res.send("Successfully Deleted Recipe");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // Authentication Routes

  app.post("/login", async (req, res) => {
    try {
      const username = req.body?.username;
      const password = req.body?.password;

      if (username == null || password == null) {
        res.status(400).send("Missing Username and/or Password");
      }

      const token = await dependencies.authService.login(username, password);

      res.send({ token });
    } catch (error: any) {
      if (
        error.message === "User Not Found" ||
        error.message === "Password Incorrect"
      ) {
        res.status(404).send("Incorrect Credentials");
      } else {
        console.error(error);
        res.status(500).send("Server Error");
      }
    }
  });

  app.put("/users", async (req: JWTRequest, res) => {
    try {
      const targetUser = req.auth?.userId;
      const password = req.body?.password;

      if (password == null) {
        res.status(400).send("Missing new Password");
      }

      await dependencies.authService.updatePassword(targetUser, password);

      res.send("Password Update Complete");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  app.post("/newUser", async (req: JWTRequest, res) => {
    try {
      console.log(req.body);
      const username = req.body?.username;
      const password = req.body?.password;
      const firstName = req.body?.firstName;
      const lastName = req.body?.lastName;

      if (username == null || password == null) {
        res.status(400).send("Missing Username and/or Password");
      } else {
        await dependencies.authService.createUser(
          username,
          password,
          firstName,
          lastName
        );

        res.send("User Creation Complete");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  app.delete("/users", async (req: JWTRequest, res) => {
    const targetUser = req.auth?.userId;

    try {
      await dependencies.authService.removeUser(targetUser);
      res.send("Deletion Complete");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // recipe routes

  // route to generate 5 recipes
  app.get("/recipe", async (req: JWTRequest, res) => {
    const user_id = req.auth?.userId;
    try {
      const queryResponse = await dependencies.gptService.getRecipes(user_id);
      res.send(queryResponse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // route to modify recipe
  app.put("/recipe", async (req: JWTRequest, res) => {
    const user_id = req.auth?.userId;
    const recipe_id = req.body.recipe_id;
    try {
      const queryResponse = await dependencies.gptService.checkAndModifyRecipe(
        user_id,
        recipe_id
      );
      res.send(queryResponse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // route to generate food items from receipt data
  // I'm expecting a body of { receipt: { receiptString: "A big long string of a receipt with as much information as possible", receiptId: 1 }
  app.post("/receiptParser", async (req: JWTRequest, res) => {
    try {
      const receiptString = req.body?.receipt.receiptString;
      const receiptId = req.body?.receipt.receiptId;

      const receiptResponse = await dependencies.receipts.getReceiptByID(
        receiptId
      );
      const receiptDate = receiptResponse.date;
      const gptResult = await dependencies.gptService.parseReceiptIntoFoodItems(
        receiptString,
        receiptDate
      );

      res.send(gptResult);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
  // save recipe

  // route to get more specifics on recipe
  app.post("/recipe/detail", async (req: JWTRequest, res) => {
    const user_id = req.auth?.userId;
    const recipe = req.body.recipe;
    try {
      const queryResponse = await dependencies.gptService.getDetailedRecipe(
        user_id,
        recipe
      );
      res.send(queryResponse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // route to get all recipes belonging to a user
  app.get("/recipe/all", async (req: JWTRequest, res) => {
    const user_id = req.auth?.userId;
    try {
      const queryResponse = await dependencies.recipes.getRecipes(user_id);
      res.send(queryResponse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // take a recipe string saves it
  app.put("/recipe/save", async (req: JWTRequest, res) => {
    const user_id = req.auth?.userId;
    const recipe = req.body.recipe;
    try {
      const queryResponse = await dependencies.recipes.insertRecipe(
        user_id,
        recipe
      );
      res.send(queryResponse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // test to generate detailed recipe and then save it
  // want to see how text is stored in the database
  app.post("/test/recipe", async (req: JWTRequest, res) => {
    const user_id = req.auth?.userId;
    const recipes = req.body.recipes;
    console.log("Here are the recipes: ", recipes);
    for (const recipe of recipes) {
      try {
        const detailedRecipe = await dependencies.gptService.getDetailedRecipe(
          user_id,
          recipe
        );
        console.log(detailedRecipe);
        const queryResponse = await dependencies.recipes.insertRecipe(
          user_id,
          detailedRecipe!
        );
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    }
  });
}
