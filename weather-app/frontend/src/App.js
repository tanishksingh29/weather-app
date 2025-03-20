import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            setError('');
            const res = await axios.get(`http://localhost:5000/weather?city=${city}`);
            setWeather(res.data);

            const forecastRes = await axios.get(`http://localhost:5000/forecast?city=${city}`);
            setForecast(forecastRes.data);
        } catch (err) {
            setError('City not found. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Weather Dashboard</h1>
            <input 
                type="text" 
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weather && (
                <div>
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Condition: {weather.weather[0].description}</p>
                </div>
            )}

            {forecast && (
                <div>
                    <h3>5-Day Forecast</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {forecast.list.filter((_, index) => index % 8 === 0).map((item) => (
                            <div key={item.dt} style={{ border: '1px solid gray', padding: '10px' }}>
                                <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                                <p>{item.main.temp}°C</p>
                                <p>{item.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
