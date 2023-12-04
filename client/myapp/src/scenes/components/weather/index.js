import { faBolt, faCloud, faCloudShowersHeavy, faCloudSunRain, faSnowflake, faSun, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles.css';
const Weather = ({onClick}) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '5bf0dc644b6de975192bba3ead4c5b92';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const possible = ["Clouds", "Clear", "Atmosphere", "Snow", "Rain", "Drizzle", "Thuderstorm"];
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

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clouds':
        return <FontAwesomeIcon icon={faCloud} />;
      case 'Clear':
        return <FontAwesomeIcon icon={faSun} />;
      case 'Atmosphere':
        return <FontAwesomeIcon icon={faWind} />;
      case 'Snow':
        return <FontAwesomeIcon icon={faSnowflake} />;
      case 'Rain':
        return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      case 'Drizzle':
        return <FontAwesomeIcon icon={faCloudSunRain} />;
      case 'Thunderstorm':
        return <FontAwesomeIcon icon={faBolt} />;
      default:
        return null;
    }
  };

  return (
    <div onClick={onClick}>
      {!userLocation ? (
        <p>Getting your location...</p>
      ) : (
        <>
          {weather ? (
            <div className='Holder'>
              <div className='TempHolder'>
                <p1>{weather.name}</p1>
                <p1>{weather.main.temp} °F</p1>
              </div>
              <div className='WeatherHolder'>
                {weather.weather[0].main && (
                  <p1>
                    {getWeatherIcon(weather.weather[0].main)}
                  </p1>
                )}
                <p1>{weather.weather[0].description}</p1>
              </div>
              
              
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
