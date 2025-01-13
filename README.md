# Weather Forecast App ☀️

A beautiful and responsive weather forecast application built with React that provides current weather conditions and a 7-day forecast for any city worldwide.

![Weather App Screenshot](https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=1200)

## Features 🌟

- **Current Weather Display**
  - Temperature and weather conditions
  - Feels like temperature
  - Humidity levels
  - Wind speed
  - Cloud coverage
  - Sunrise and sunset times

- **7-Day Forecast**
  - Daily temperature predictions
  - Weather conditions for each day
  - Visual weather indicators with emojis

- **User Interface**
  - Clean, modern design with gradient backgrounds
  - Responsive layout for all devices
  - Intuitive city search
  - Loading states and error handling
  - Weather-specific emoji indicators

## Technologies Used 🛠️

- React
- Tailwind CSS
- OpenWeather API
- Lucide React Icons

## Getting Started 🚀

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

## Usage 📱

1. On first load, enter your city name in the welcome screen
2. View detailed current weather information
3. Scroll down to see the 7-day forecast
4. Use the search bar at the top to change cities
5. Enjoy real-time weather updates with beautiful visuals!

## API Reference 🌐

This app uses the OpenWeather API for weather data:
- Current Weather: `/data/2.5/weather`
- Forecast: `/data/2.5/forecast`

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Design inspired by modern weather applications