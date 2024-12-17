import {Router} from 'express';
import { add, getAll } from '../core/users/users.service.js';

const usersRouter = Router();

usersRouter.post("/", add);
usersRouter.get("/", getAll);

export default usersRouter;