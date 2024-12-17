import { readFileJSON, writeFileJSON } from "../../common/fayl.service.js";

const ADDRESS = "./weathers.json"

export async function addWeather(req, res) {
  try {
    const weather = req.body;
    weather.id = Math.round(Math.random() * 10000);
    const weathers = await readFileJSON(ADDRESS);

    if(!weathers) {
        await writeFileJSON(ADDRESS, [weather]);
    } else {
        weathers.push(weather);
        await writeFileJSON(ADDRESS, weathers);
    }
    res.send("Weather succesfully added")
  } catch (err) {
    console.log(err);
    res.send("There's something wrong")
  }
}
export async function getAllWeather(req, res) {
  try {
    const weathers = await readFileJSON(ADDRESS);
    res.send(weathers)
  } catch (err){
    res.send(err.message)
  }
}
export async function getWeather(req, res) {
  try {
    const {id} = req.params;
    const weathers = await readFileJSON(ADDRESS);
    res.send(weathers.find((weather) => weather.id === id))

  } catch (err){
    res.send(err.message)
  }
}
export async function getWeatherCity(req, res) {
  try {
    const {city} = req.params;
    const weathers = await readFileJSON(ADDRESS);
    res.send(weathers.find((weather) => weather.city === city))
  } catch (err) {
    res.send(err.message)
  }
}
export async function updateWeather(req, res) {
  try {
    const {id} = req.params;
    const weather = req.body;
    const weathers = await readFileJSON(ADDRESS);
    const index = weathers.findIndex((weather) => weather.id === id);
    if(index < 0){
      return res.send("We couldn't update weather")
    }
    weathers[index] = {...weathers[index], ...weather};
    await writeFileJSON(ADDRESS, weathers);
    res.send(weather[index])
  } catch (err) {
    res.send(err.message)
  }
}
export async function deleteWeather(req, res) {
  try {
    const {id} = req.params;
    const weathers = await readFileJSON(ADDRESS);
    const index = weathers.findIndex((weather) => weather.id === parseInt(id))
    if(index < 0){
      return res.send("We couldn't find object")
    }
    weathers.splice(index, 1)
    await writeFileJSON(ADDRESS, weathers);
    res.send("Weather succesfully removed")
  } catch (err) {
    res.send("Something wrong in removing weather")
  }
}
