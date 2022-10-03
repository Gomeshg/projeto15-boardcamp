import { Router } from "express";
import {
  postRentals,
  getRentals,
  deleteRentals,
} from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", postRentals);
rentalsRouter.get("/rentals/:id?", getRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
