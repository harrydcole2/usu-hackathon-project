import { Sql } from "postgres";

interface UserResult {
  id?: number;
  username: string;
  password_hash: string;
  first_name: string;
  last_name: string;
}

export default class Users {
  sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  // Get user by username
  public async getUser(username: string) {
    try {
      const result = await this.sql`
        SELECT id, username, password_hash, first_name, last_name
        FROM users
        WHERE users.username = ${username}
      `;

      console.log("This is result in getUser: ", result);

      const user = result[0] as UserResult;
      console.log("This is the user we are returning in getUser: ", user);
      return user || null; // Return null if no user is found
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  }

  // Insert user data (username, password_hash)
  public async insertUser(username: string, password_hash: string, firstName: string, lastName: string) {
    try {
      const users = await this.sql`
        INSERT INTO users 
          (username, password_hash, first_name, last_name)
        VALUES (${username}, ${password_hash}, ${firstName}, ${lastName})
        RETURNING username, password_hash
      `;

      console.log("Inserted user:", users);

      const user = users[0];
      return user;
    } catch (error) {
      console.error("Error inserting user:", error);
      throw new Error("Failed to insert user");
    }
  }

  // Delete user by ID
  public async deleteUser(id: number) {
    try {
      const result = await this.sql`
        DELETE FROM users
        WHERE id = ${id}
        RETURNING id, username, password_hash
      `;

      console.log("Deleted user:", result);

      return result[0] || null; // Return null if no user was deleted
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }

  // Update password by ID
  public async updatePassword(id: number, new_hash: string) {
    console.log(id, new_hash)

    try {
      const result = await this.sql`
        UPDATE users
        SET password_hash = ${new_hash}
        WHERE id = ${id}
        RETURNING id, username, password_hash
      `;

      console.log("Updated password for user:", result);

      return result[0] || null; // Return null if no rows were updated
    } catch (error) {
      console.error("Error updating password:", error);
      throw new Error("Failed to update password");
    }
  }
}
