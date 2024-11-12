const express = require("express");
const app = express();
const axios = require("axios");
const port = 3000;
require('dotenv').config(); 

const apiKey = process.env.api_key;

app.get("/", (req, res) => {
  res.send(`
        <html>
            <form id="inputForm" method="GET" action="/weather">
              <input type="text" name="city" placeholder="Enter city name">
              <button type="submit">Submit</button>
            </form>
        </html>
    `);
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;

  try {
    const response = await axios.get(url);
    const weather = response.data;
    const temp = weather.main.temp;
    const condition = weather.weather[0].main; // Access the first element in the weather array

    res.send(
      `The temp for ${city} is ${temp}°F and the condition is ${condition}`
    );
  } catch (error) {
    res.send("Please try again. Unable to fetch weather information.");
  }
});

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
