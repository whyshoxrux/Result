import {Router} from "express"
import { add, getAll } from "../core/books/books.service.js"

const booksRouter = Router()

booksRouter.post("/", add)
booksRouter.get("/", getAll)

export default booksRouter;