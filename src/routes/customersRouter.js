import { Router } from "express";

import { getCustomers, postCustomer } from "../controllers/customersController";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.post("/customer", postCustomer);
