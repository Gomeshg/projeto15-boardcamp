import express from "express";
import cors from "cors";

import router from "./routes/indexRouter.js";
const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

import dotenv from "dotenv";
// import pg from "pg";

dotenv.config();
const PORT = process.env.PORT;

// const { Pool } = pg;
// const connection = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// server.get("/customers", async (req, res) => {
//   try {
//     const users = await connection.query("SELECT * from customers;");
//     res.status(200).send(users.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// server.get("/categories", async (req, res) => {
//   try {
//     const users = await connection.query("SELECT * from categories;");
//     res.status(200).send(users.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// server.post("/categories", async (req, res) => {
//   const { name } = req.body;
//   try {
//     await connection.query("INSERT INTO categories(name) VALUES($1);", [name]);
//     res.sendStatus(201);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// server.get("/games", async (req, res) => {
//   try {
//     const users = await connection.query("SELECT * from games;");
//     res.status(200).send(users.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// server.get("/rentals", async (req, res) => {
//   try {
//     const users = await connection.query("SELECT * from rentals;");
//     res.status(200).send(users.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

server.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
