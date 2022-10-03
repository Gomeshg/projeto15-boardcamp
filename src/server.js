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

server.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
