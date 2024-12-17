import express from "express"
import dotenv from "dotenv"
import weatherRouter from "./controllerss/weather.controller.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json)

app.use("/weather", weatherRouter)
app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`))