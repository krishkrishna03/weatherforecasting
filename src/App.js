import React, { useState } from 'react';
import { Cloud, Wind, Droplets, Thermometer, Search, MapPin, Sunrise, Sunset, Calendar } from 'lucide-react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isInitial, setIsInitial] = useState(true);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError('');
      setIsInitial(false);

      // Current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3b0ea620367f4982f1e49ea7827db923`
      );
      if (!weatherResponse.ok) throw new Error('City not found');
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      // 7-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=3b0ea620367f4982f1e49ea7827db923`
      );
      if (!forecastResponse.ok) throw new Error('Forecast data not available');
      const forecastData = await forecastResponse.json();
      
      // Group forecast by day
      const dailyForecasts = forecastData.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!acc[date] && Object.keys(acc).length < 7) {
          acc[date] = item;
        }
        return acc;
      }, {});
      
      setForecast(Object.values(dailyForecasts));
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getWeatherEmoji = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return '⛈️';
    if (weatherId >= 300 && weatherId < 400) return '🌧️';
    if (weatherId >= 500 && weatherId < 600) return '🌧️';
    if (weatherId >= 600 && weatherId < 700) return '❄️';
    if (weatherId >= 700 && weatherId < 800) return '🌫️';
    if (weatherId === 800) return '☀️';
    if (weatherId > 800) return '☁️';
    return '🌈';
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isInitial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Weather Forecast 🌤️</h1>
          <p className="text-lg text-gray-600 mb-8">Enter your city name to get started!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 
                         focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 
                         transition-all duration-300 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl
                       text-lg font-semibold hover:opacity-90 transition-opacity duration-300"
            >
              Get Weather 🌈
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Weather Forecast</h1>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Change city..."
                className="px-4 py-2 rounded-xl border-2 border-gray-200 
                         focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 
                         transition-all duration-300 ease-in-out"
              />
              <button
                type="submit"
                className="bg-purple-500 text-white p-2 rounded-xl hover:bg-purple-600 transition-colors duration-300"
              >
                <Search size={24} />
              </button>
            </form>
          </div>
          
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center mb-6">
              {error}
            </div>
          )}

          {weather && !loading && (
            <>
              <div className="mb-12">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <MapPin className="text-purple-500" size={28} />
                    <h2 className="text-3xl font-bold text-gray-800">{weather.name}</h2>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-6xl">{getWeatherEmoji(weather.weather[0].id)}</div>
                    <div>
                      <p className="text-7xl font-bold text-gray-800 mb-2">
                        {Math.round(weather.main.temp)}°
                      </p>
                      <p className="text-xl text-gray-600 capitalize">
                        {weather.weather[0].description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Thermometer className="text-purple-500" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Feels Like</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">
                      {Math.round(weather.main.feels_like)}°C
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Droplets className="text-purple-500" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Humidity</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{weather.main.humidity}%</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Wind className="text-purple-500" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Wind</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{weather.wind.speed} m/s</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Cloud className="text-purple-500" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Clouds</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{weather.clouds.all}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Sunrise className="text-orange-500" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Sunrise</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatTime(weather.sys.sunrise)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Sunset className="text-indigo-500" size={24} />
                      <h3 className="text-lg font-semibold text-gray-800">Sunset</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatTime(weather.sys.sunset)}
                    </p>
                  </div>
                </div>
              </div>

              {forecast && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="text-purple-500" size={24} />
                    <h2 className="text-2xl font-bold text-gray-800">7-Day Forecast</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                    {forecast.map((day, index) => (
                      <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-2xl text-center">
                        <p className="font-semibold text-gray-600 mb-2">{formatDate(day.dt)}</p>
                        <div className="text-3xl mb-2">{getWeatherEmoji(day.weather[0].id)}</div>
                        <p className="text-2xl font-bold text-gray-800">{Math.round(day.main.temp)}°</p>
                        <p className="text-sm text-gray-600 capitalize">{day.weather[0].description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;