import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('http://localhost:5220/weatherforecast');
        const data = await response.json();
        setWeatherData(data);
      } catch(error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeatherData();
  }, []);

  if(loading) {
    return <div> Loading...</div>;
  }

  return (
    <div>
      <h1>Weather Forecast</h1>
      <ul>
        {weatherData.map((weather, index) => (
          <li key={index}>
            <strong>Date:</strong> {new Date(weather.date).toLocaleDateString()} <br />
            <strong>Temperature:</strong> {weather.temperatureC} °C / {weather.temperatureF} °F <br />
            <strong>Summary:</strong> {weather.summary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
