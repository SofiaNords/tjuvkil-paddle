const apiKey = "eaa060c139865127fb1a852acd62c9c0";
const city = "Tjuvkil"; 

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const weather = data.weather[0].description;
    const temp = data.main.temp - 273.15; 
    const windSpeed = data.wind.speed;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(); 
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(); 
    document.getElementById('weather').innerHTML = `<h3>Weather in ${city}:</h3>
     <p>Temperature: ${temp.toFixed(1)}°C, Wind Speed: ${windSpeed} m/s</p>
     <p>Sunrise: ${sunrise}, Sunset: ${sunset}</p>
      `;
  })
  .catch(error => console.error("Error:", error));