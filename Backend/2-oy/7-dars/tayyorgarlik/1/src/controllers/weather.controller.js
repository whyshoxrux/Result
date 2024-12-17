import { Router } from "express";
import {
  addWeather,
  getAllWeather,
  getWeatherCity,
  getWeather,
  updateWeather,
  deleteWeather,
} from "../core/weather/weather.service.js";

const weatherRouter = Router();

weatherRouter.post('/', addWeather)
weatherRouter.get('/', getAllWeather)
weatherRouter.get('/:id', getWeather)
weatherRouter.get('/city/:city', getWeatherCity)
weatherRouter.put('/:id', updateWeather)
weatherRouter.delete('/:id', deleteWeather)

export default weatherRouter;
