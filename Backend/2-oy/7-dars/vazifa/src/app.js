import dotenv from "dotenv";
import express from "express";
import weatherRouter from "./controllers/weather.controller.js";
import ToDoRouter from "./controllers/todos.controller.js";

dotenv.config({ path: ".maxfiy" });
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/weather", weatherRouter);
app.use("/todo", ToDoRouter);

app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
