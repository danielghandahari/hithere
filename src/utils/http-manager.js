import axios from "axios";

const OPEN_WEATHER_API_KEY = "f0b395ff9e7f2543b078688e23d329e7";

export async function fetchWeather(lat, lon) {
  let jsonRes = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${OPEN_WEATHER_API_KEY}&units=metric`
  );

  return jsonRes.data;
}

export async function randomQuote() {
  let quote = "";
  let validQuoteFound = false;

  for (; !validQuoteFound; ) {
    quote = (await axios({
      method: "GET",
      url:
        "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback="
    })).data;

    validQuoteFound = quote && quote[0].content.length < 130;
  }
  // console.log({ quote: quote[0].content.length });

  return quote;
}
