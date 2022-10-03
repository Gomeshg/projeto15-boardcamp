import { Router } from "express";
import { postRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", postRentals);

export default rentalsRouter;
