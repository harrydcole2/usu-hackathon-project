import { Dependencies } from "./config";
import { Express } from "express";
import { Request as JWTRequest } from "express-jwt";

export default function setupRoutes(app: Express, dependencies: Dependencies) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // Authentication Routes

  app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username == null || password == null) {
      res.status(400).send("Missing Username and/or Password");
    }

    try {
      const token = await dependencies.authService.login(username, password);

      res.send({ token });
    } catch (error: any) {
      if (error.message === "User Not Found" || error.message === "Password Incorrect") {
        res.status(404).send("Incorrect Credentials");
      }
      res.status(500).send("Server Error");
    }
  });

  app.put("/users", async (req: JWTRequest, res) => {
    const targetUser = req.auth?.userId;
    const password = req.body.password;

    if (password == null) {
      res.status(400).send("Missing new Password");
    }

    try {
      await dependencies.authService.updatePassword(targetUser, password);

      res.send("Password Update Complete");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  app.post("/newUser", async (req: JWTRequest, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username == null || password == null) {
      res.status(400).send("Missing Username and/or Password");
    }

    try {
      await dependencies.authService.createUser(username, password);

      res.send("User Creation Complete");
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error')
    }
  });

  app.delete("/users", async (req: JWTRequest, res) => {
    const targetUser = req.auth?.userId;

    if (targetUser == null) {
      res.status(400).send('Missing Authentication Information')
    }

    try {
      await dependencies.authService.removeUser(targetUser)
      res.send('Deletion Complete')
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
  });
}
