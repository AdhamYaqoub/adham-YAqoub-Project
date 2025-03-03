const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('dist'));

// بيانات افتراضية لتحل محل APIs
const mockGeonamesData = {
  geonames: [
    {
      lat: "40.7128",
      lng: "-74.0060",
      name: "New York",
      countryName: "United States"
    }
  ]
};

const mockWeatherbitData = {
  data: [
    {
      datetime: "2023-10-15",
      weather: {
        description: "Partly cloudy",
        icon: "c02d"
      },
      temp: 22
    }
  ]
};

const mockPixabayData = {
  hits: [
    {
      webformatURL: "https://example.com/image.jpg",
      tags: "new york, city, skyline"
    }
  ]
};

// Routes
app.get('/api/geonames', (req, res) => {
  const location = req.query.location;
  console.log(`Mock Geonames API called for location: ${location}`);
  res.send(mockGeonamesData);
});

app.get('/api/weatherbit', (req, res) => {
  const { lat, lon } = req.query;
  console.log(`Mock Weatherbit API called for coordinates: lat=${lat}, lon=${lon}`);
  res.send(mockWeatherbitData);
});

app.get('/api/pixabay', (req, res) => {
  const location = req.query.location;
  console.log(`Mock Pixabay API called for location: ${location}`);
  res.send(mockPixabayData);
});

const server = app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
module.exports = server;



