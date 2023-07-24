import React, { useState } from "react";
import cloudsIcon from "./Images/clouds.png";
import clearIcon from "./Images/clouds.png";
import rainIcon from "./Images/rain.png";
import drizzleIcon from "./Images/drizzle.png";
import mistIcon from "./Images/mist.png";
import humidityIcon from "./Images/humidity.png";
import windIcon from "./Images/wind.png";
import snowIcon from "./Images/snow.png";
import './App.css';

const Weather = () => {
  const apikey = "cd84970893ba5096fccf6809b43340c5";
  const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const checkWeather = async () => {
    try {
      const response = await fetch(apiurl + city + `&appid=${apikey}`);
      if (response.status === 404) {
        setError(true);
        setWeatherData(null);
      } else {
        const data = await response.json();
        console.log(data)
        setWeatherData(data);
        setError(false); 
      }
    } catch (error) {
      console.log(error); 
      setError(true);
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    checkWeather();
  };

  return (
    <div className="weather-app">
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error">City not found!</div>}
      {weatherData && (
        <div className="weather">
          <div className="city">{weatherData.name}</div>
          <div className="temp">{Math.round(weatherData.main.temp)}°C</div>
 {weatherData.weather.main === "Clouds" && (
  <img
  src={cloudsIcon}
  alt="clouds"
  className="weather-icon"
/>
)}
{weatherData.weather.main === "clear" && (
<img
  src={clearIcon}
  alt="Clear"
  className="weather-icon"
/>
)}
{weatherData.weather.main === "rain" && (
<img
  src={rainIcon}
  alt="Rain"
  className="weather-icon"
/>
)}
{weatherData.weather.main === "drizzle" && (
<img
  src={drizzleIcon}
  alt="Drizzle"
  className="weather-icon"
/>
)}
{weatherData.weather.main === "mist" && (
<img
  src={mistIcon}
  alt="Mist"
  className="weather-icon"
/>
)}
{weatherData.weather.main === "snow" && (
  <img
    src={snowIcon}
    alt="snow"
    className="weather-icon"
  />
)}
<br/>
<div>
  {weatherData && (
    <div className="humidity-wind">
      <div className="humidity">
        <img src={humidityIcon} alt="Humidity" className="humidity-icon" />
        <p className="humidity-text">{weatherData.main.humidity}%<span className="wind-subtext"><br/>Humidity  </span> 
        </p>
           
    
        <img src={windIcon} alt="Wind" className="wind-icon"/>
        <p className="wind-text">{Math.round(weatherData.wind.speed)} km/h<span className="wind-subtext"><br/>Wind</span>
         </p>
 </div>
    </div>
  )}
</div>
 </div>
      )}
    </div>
  );
};
export default Weather;