import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles.css';
const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '5bf0dc644b6de975192bba3ead4c5b92';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setLoading(false); 
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLoading(false); 
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
      setLoading(false); 
    }
  }, []); 

  useEffect(() => {
    
    if (userLocation) {
      getWeatherData();
    }
  }, [userLocation]); 

  const getWeatherData = async () => {
    try {
      const apiUrl = `${API_URL}?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=imperial`;
      const response = await axios.get(apiUrl);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      {!userLocation ? (
        <p>Getting your location...</p>
      ) : (
        <>
          {weather ? (
            <div className='Holder'>
                {console.log(weather)}
              <h2>Weather in {weather.name}, {weather.sys.country}</h2>
              <p>Temperature: {weather.main.temp} °F</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
          ) : (
            <p>Retrieving weather info...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
