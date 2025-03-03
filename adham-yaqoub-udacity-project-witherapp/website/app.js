const apiKey = "fc468687acfe46135e54c81f8cbafb22&units=imperial";
const baseURL =
  "https://api.openweathermap.org/data/2.5/weather?zip=30301,us&appid=fc468687acfe46135e54c81f8cbafb22&units=imperial";

// Fetch weather data
const getWeather = async (zip) => {
  const response = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
  try {
    return await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

//Send data to the server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

// Update the interface
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const data = await request.json();
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${data.temperature}°F`;
    document.getElementById(
      "content"
    ).innerHTML = `Feeling: ${data.userResponse}`;
  } catch (error) {
    console.log("Error:", error);
  }
};

// Set up the event
document.getElementById("generate").addEventListener("click", async () => {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const weatherData = await getWeather(zip);

  if (weatherData.main) {
    const data = {
      temperature: weatherData.main.temp,
      date: new Date().toLocaleDateString(),
      userResponse: feelings,
    };
    await postData("/add", data);
    updateUI();
  } else {
    alert("Invalid ZIP Code");
  }
});
