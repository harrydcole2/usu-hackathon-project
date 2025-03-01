import postgres from "postgres";

const sql = postgres(process.env.DB_CONNSTRING ?? "");

export default sql;
