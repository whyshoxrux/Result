import { Router } from "express";
import { add } from "../core/cars/cars.service.js";
import notFoundRouter from "../common/middleware/notFoundRouter.middleware.js";

const carsRouter = Router();

carsRouter.post("/register", notFoundRouter, add);

export default carsRouter;
