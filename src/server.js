import express from "express";
const server = express();

import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const PORT = process.env.PORT;

const { Pool } = pg;
const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

server.get("/customers", async (re, res) => {
  try {
    const users = await connection.query("SELECT * from customers;");
    res.status(200).send(users.rows);
  } catch (err) {
    console.log(err.message);
  }
});

server.get("/categories", async (re, res) => {
  try {
    const users = await connection.query("SELECT * from categories;");
    res.status(200).send(users.rows);
  } catch (err) {
    console.log(err.message);
  }
});

server.get("/games", async (re, res) => {
  try {
    const users = await connection.query("SELECT * from games;");
    res.status(200).send(users.rows);
  } catch (err) {
    console.log(err.message);
  }
});

server.get("/rentals", async (re, res) => {
  try {
    const users = await connection.query("SELECT * from rentals;");
    res.status(200).send(users.rows);
  } catch (err) {
    console.log(err.message);
  }
});

server.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
