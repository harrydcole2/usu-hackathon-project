import { Dependencies } from "./config";
import { Express } from "express";


export default function setupRoutes(app: Express, dependencies: Dependencies) {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
}