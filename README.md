# USU Hackathon Project: PantryAI

HackUSU is Utah's largest collegiate 24-hour coding competition. This repository houses the frontend and backend code for our group's PantryAI (formerly FridgeAI) submission. The idea of this app is to scan in receipts you get from online grocery orders, and turn those into rows of food data in your pantry. It includes when you bought the food, when it will expire, and how much of it you have. That user data is then used to generate recipes that use only food available in your pantry while emphasizing items that are soon to expire so your food doesn't go to waste. To use the app, you can login or register with basic information. From there, you can add your pantry items via form, and connect them to receipts in the side menu. Once you have filled out your pantry appropriately, the recipes tab can be used to generate recipe suggestions and save suggested recipes for another time.

This project was built in Typescript, using an Express backend, a React frontend, and a Postgres database hosted on Supabase. Our team had four developers, and so we divided into a frontend and backend team and managed our work in a GitHub project. To run the app, type "npm run dev" when you are in the frontend and backend directories. The backend requires a DB_CONNSTRING, OPENAI_API_KEY, SERVER_PORT, and JWT_KEY to properly run, which is not available in this repo.

In the future, we would like to make data entry into the pantry easier and via some kind of document scanning (either AI based, by barcode, photo recognition with EasyOCR, etc.). It is also important for used recipes to decrement quantities in our pantry appropriately, and that process could be more intuitive and useful. We have the endpoints for a batch load, for verifying a recipe fits your pantry, and deleting/managing recipes that we didn't get to hook up in our MVP model due to time constraints. It was a phenomenal experience!


## Screenshots

![Screenshot 2025-03-05 195735](https://github.com/user-attachments/assets/9fc04b51-33fb-4c67-b2d2-6a669f4f820e)
![Screenshot 2025-03-05 195445](https://github.com/user-attachments/assets/88562ec5-d43d-4f13-8921-792ba76520b6)
![Screenshot 2025-03-05 195604](https://github.com/user-attachments/assets/40bed009-ed4f-4c6a-9383-ffd4947d961f)
![Screenshot 2025-03-05 195646](https://github.com/user-attachments/assets/29f9969c-dfdc-43d7-b023-2df0760263df)
![Screenshot 2025-03-05 195618](https://github.com/user-attachments/assets/52a72e57-37b0-4f23-bf83-6ab208c53ae8)
![Screenshot 2025-03-05 201903](https://github.com/user-attachments/assets/0e35f31d-2831-4e2b-8948-6134d7b1bc8c)
![Screenshot 2025-03-05 201916](https://github.com/user-attachments/assets/13acdb64-1f2d-4475-af2d-319c3b20d44a)
![Screenshot 2025-03-05 195701](https://github.com/user-attachments/assets/e247095f-0cfd-4e17-9574-7e8787a46450)
