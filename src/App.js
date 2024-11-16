import React, { useState } from 'react';
import './App.css'; 
//npm start
function App() {

  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city === '' || country === '') {
      setError('Ambos campos son obligatorios...');
      return;
    }

    callAPI(city, country);
  };

  const callAPI = (city, country) => {
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
      .then((response) => response.json())
      .then((dataJSON) => {
        if (dataJSON.cod === '404') {
          setError('Ciudad no encontrada...');
        } else {
          setWeather(dataJSON);
          setError('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const kelvinToCelsius = (temp) => {
    return parseInt(temp - 273.15);
  };

  const clearResults = () => {
    setWeather(null);
  };

  return (
    <section className="weather-content">
      <h1>Buscador del clima</h1>
      <div className="result">
        {error && <p className="alert-message">{error}</p>}
        {weather && (
          <div>
            <h5>Clima en {weather.name}</h5>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <h2>{kelvinToCelsius(weather.main.temp)}°C</h2>
            <p>Max: {kelvinToCelsius(weather.main.temp_max)}°C</p>
            <p>Min: {kelvinToCelsius(weather.main.temp_min)}°C</p>
          </div>
        )}
      </div>

      <form className="get-weather" onSubmit={handleSubmit}>
        <input
          type="text"
          id="city"
          placeholder="Escribe tu ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option disabled selected value="">
            Selecciona el pais
          </option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="PE">Peru</option>
        </select>
        <input type="submit" value="Consultar Clima" />
      </form>
    </section>
  );
}

export default App;