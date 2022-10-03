import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/indexRouter.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

dotenv.config();
const PORT = process.env.PORT;

// server.get("/customers", async (req, res) => {
//   try {
//     const users = await connection.query("SELECT * from customers;");
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
