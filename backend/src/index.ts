import express from "express";
import dotenv from "dotenv";
import setupRoutes from "./routes";
import Config from "./config";
import { expressjwt } from "express-jwt";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

const config = new Config();

const dependencies = config.setupDependencies();

app.use(
  expressjwt({
    secret: process.env.JWT_KEY ?? 'secretDONOTUSETHIS',
    algorithms: ["HS256"],
  }).unless({ path: ["/login"] })
);

// Install Routes to the Express system
setupRoutes(app, dependencies);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
