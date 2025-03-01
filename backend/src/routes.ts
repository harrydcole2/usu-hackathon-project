import { Dependencies } from "./config";
import { Express } from "express";


export default function setupRoutes(app: Express, dependencies: Dependencies) {
  
  
  
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username == null || password == null) {
      res.status(400).send("Missing Username and/or Password")
    }

    try {
      const token = await dependencies.authService.login(username, password)

      res.send({ token })
    } catch (error: any) {
      if (error.message === 'User Not Found' || error.message === 'Password Incorrect') {
        res.status(404).send('Incorrect Credentials')
      }
      res.status(500).send('Server Error')
    }
  })
}