const apiKey = "f0aeff7b452e5975ba468f1d8a1c905c"; // your key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

async function getWeather(city) {
  try {
    // Use direct API call first (no proxy)
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${apiKey}`;

    let response = await fetch(apiUrl);

    // If CORS blocked, use backup proxy automatically
    if (!response.ok) {
      console.warn("Direct fetch failed, trying proxy...");
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
      response = await fetch(proxyUrl);
    }

    if (!response.ok) throw new Error(`Network response was not ok`);

    const data = await response.json();

    // Debugging help
    console.log("Weather data:", data);

    // If OpenWeather returns 404 or wrong city
    if (!data || data.cod == "404" || !data.main) {
      weatherInfo.innerHTML = `<h2>City not found 😞</h2>`;
      return;
    }

    // Render data
    weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.sys?.country || "N/A"}</h2>
      <p>🌡 Temperature: ${data.main.temp}°C</p>
      <p>🌥 Condition: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherInfo.innerHTML = `<h2>Error fetching weather data ❌</h2>
      <p style="font-size:14px;color:#333">(${error.message})</p>`;
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
  else weatherInfo.innerHTML = `<h2>Please enter a city name 🔍</h2>`;
});
