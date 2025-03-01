import { Dependencies } from "./config";
import { Express } from "express";
import { Request as JWTRequest } from "express-jwt";

export default function setupRoutes(app: Express, dependencies: Dependencies) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  })

  // Food Items Endpoints

  app.get("/foodItems/all", async (req: JWTRequest, res) => {
    try {
      const targetUser = req.auth?.userId

      const foodResult = await dependencies.foodItems.getUserFridge(targetUser)
      console.log(foodResult)

      res.send(foodResult)
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  // Expecting body to be like { foodItem: { item_name, quantity, receipt_id, unit, expiration_date }}
  app.post("/foodItems", async (req: JWTRequest, res) => {
    try {
      const receivedFoodItem = req.body?.foodItem
      const targetUser = req.auth?.userId

      const newFoodItem = {
        ...receivedFoodItem, 
        user_id: targetUser
      }

      await dependencies.foodItems.addFoodItem(newFoodItem)

    } catch (error) {
      console.error(error)
      res.status(500).send("Server Error");
    }
  })

  // Expecting body to be like { foodItem: { id, item_name, quantity, receipt_id, unit, expiration_date }}
  // NOTE THE id
  app.put('/foodItems', async (req: JWTRequest, res) => {
    try {
      const receivedFoodItem = req.body?.foodItem
      const targetUser = req.auth?.userId

      const newFoodItem = {
        ...receivedFoodItem, 
        user_id: targetUser
      }

      await dependencies.foodItems.updateFoodItem(newFoodItem)
    } catch (error) {
      console.error(error)
      res.status(500).send("Server Error");
    }
  })

  app.delete('/foodItems/:foodId', async (req: JWTRequest, res) => {
    try {
      const itemId = req.params?.foodId
      const targetUser = req.auth?.userId

      await dependencies.foodItems.removeFoodItem(Number(itemId), targetUser)
    } catch (error) {
      console.error(error)
      res.status(500).send("Server Error");
    }
  })

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
      if (error.message === "User Not Found" || error.message === "Password Incorrect") {
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

      if (username == null || password == null) {
        res.status(400).send("Missing Username and/or Password");
      } else {
        await dependencies.authService.createUser(username, password);

        res.send("User Creation Complete");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  app.delete("/users", async (req: JWTRequest, res) => {
    try {
      const targetUser = req.auth?.userId;

      if (targetUser == null) {
        res.status(400).send("Missing Authentication Information");
      }

      await dependencies.authService.removeUser(targetUser);
      res.send("Deletion Complete");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
}
