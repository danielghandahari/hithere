import axios from "axios";

export async function fetchWeather() {
  return await axios.get(
    "http://api.openweathermap.org/data/2.5/weather?lat=59.862561299999996&lon=17.6174662&APPID=f0b395ff9e7f2543b078688e23d329e7"
  );
}
