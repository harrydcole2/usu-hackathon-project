import { Sql } from "postgres";
import sql from "./pgConnection";

export default class Users {
  sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  // get by username
  public async getUser(username: string) {
    const result = await this.sql`
      select username, password_hash
      from users
      where users.username = ${username}
    `;

    console.log("This is result in getUser: ", result);

    const user = result[0];
    console.log("This is the user we are returning in getuser: ", user);
  }

  // insert userData // username, hashpassword
  public async insertUser(username: string, password_hash: string) {
    const users = await this.sql`
    INSERT INTO users 
      (username, password_hash)
    VALUES (${username}, ${password_hash})
    RETURNING username, password_hash
  `;
    // users = Result [{ name: "userName", password_hash: "aweoifjawioejeo134" }]
    const user = users[0];
    return user;
  }

  // delete user by id
  public async deleteUser(id: number) {
    const result = await this.sql`
      DELETE FROM users
      WHERE id = ${id}
      RETURNING id, username, password_hash
    `;

    console.log("Deleted user:", result);

    return result[0] || null; // Return null if no user was deleted
  }

  // update password by id, and given new password
  public async updatePassword(id: number, new_hash: string) {
    const result = await this.sql`
    UPDATE users
    SET password_hash = ${new_hash}
    WHERE users.id = ${id}
    RETURNING id, username, password_hash
    `;
  }
}
