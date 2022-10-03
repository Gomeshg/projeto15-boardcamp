import { Router } from "express";

import {
  getCustomers,
  getOneCustomer,
  postCustomer,
  updateCustomer,
} from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers/:id", getOneCustomer);
customersRouter.get("/customers/:cpf?", getCustomers);
customersRouter.put("/customers/:id", updateCustomer);
customersRouter.post("/customers", postCustomer);

export default customersRouter;
