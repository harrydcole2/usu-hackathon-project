
import express from 'express';
import dotenv from 'dotenv';
import setupRoutes from "./routes"
import Config from "./config"

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

const config = new Config();

const dependencies = config.setupDependencies()

// Install Routes to the Express system
setupRoutes(app, dependencies)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});