const API_KEY = "7bb3190f639005ef840fcf8a26be2d45";

const getValidCity = () => {
  const city = prompt("Please enter your current city");

  if (!city || !/^[a-zA-Z\s-]+$/.test(city)) {
    return null;
  }

  return city;
};

const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.main.temp;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const updateHeading = (city, temperature) => {
  const heading = document.querySelector("h1");
  const emoji = temperature >= 30 ? "\u2639\ufe0f" : "\ud83d\ude04";
  const roundedTemperature = Math.floor(temperature);
  heading.innerHTML = `${emoji}<br />Currently ${roundedTemperature}&degC in ${city}`;
};


const handleCityChange = async () => {
  const city = getValidCity();

  if (city === null) {
    alert("Please enter a valid city name.");
    return;
  }

  const weather = await getWeather(city);

  if (weather === null) {
    alert("Failed to fetch weather data.");
    return;
  }

  updateHeading(city, weather);
};

const changeButton = document.querySelector("button");
changeButton.addEventListener("click", handleCityChange);
