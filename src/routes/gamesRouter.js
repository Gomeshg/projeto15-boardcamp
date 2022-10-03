import { Router } from "express";

import { getGames, postGames } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get("/games/:game?", getGames);
gamesRouter.post("/game", postGames);

export default gamesRouter;
