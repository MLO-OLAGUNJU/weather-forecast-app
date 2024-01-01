const searchButton = document.querySelector(".search-btn ");
const cityInput = document.querySelector(".city-input");

const API_KEY = "c1cf14a5afcbeb0d190735f2379a7f1c"; //API KEY FOR OpenweatherMap API

const getWeatherDetails = (cityName, lat, lon) => {
  const WAETHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WAETHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_text).getDate();
      });
    })
    .catch(() => {
      alert("An error occurred while fetching the weather forecast!");
    });
};

const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  if (cityName === "") return;
  const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  // Get entered city coordinates (latitude, longitude, and name) from the API response
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { lat, lon, name } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("An error occurred while fetching the coordinates!");
    });
};

searchButton.addEventListener("click", getCityCoordinates);
