import express from "express";
const server = express();

import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const user = process.env.user;
const password = process.env.password;
const host = process.env.host;
const port = process.env.port;
const database = process.env.database;
const PORT = process.env.PORT;

const { Pool } = pg;
const connection = new Pool({
  user,
  password,
  host,
  port,
  database,
});

server.get("/users", async (re, res) => {
  try {
    const users = await connection.query("SELECT * from users;");
    res.status(200).send(users.rows);
  } catch (err) {
    console.log(err.message);
  }
});

server.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
