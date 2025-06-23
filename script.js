// Ambil elemen DOM
const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("getWeather");
const weatherDisplay = document.getElementById("weather");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const iconDisplay = document.getElementById("icon");

// API Key OpenWeather (ganti dengan API Key Anda)
const API_KEY = "2fa4e7737c1d6754ed6219555efe1823"; // Ini adalah contoh API Key, GANTI DENGAN API KEY ANDA YANG VALID

// Fungsi untuk mengambil data cuaca
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("Kota tidak ditemukan!");
        }

        const data = await response.json();

        // Update DOM dengan data cuaca
        locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
        temperatureDisplay.textContent = `Suhu: ${data.main.temp}°C`;
        descriptionDisplay.textContent = `Kondisi: ${data.weather[0].description}`;
        iconDisplay.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherDisplay.classList.remove("hidden");
    } catch (error) {
        alert(error.message);
    }
}

// Event listener untuk tombol "Cari"
getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Masukkan nama kota!");
    }
});

// Anda juga bisa menambahkan event listener untuk Enter key pada input kota
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert("Masukkan nama kota!");
        }
    }
});

// Anda mungkin perlu menambahkan CSS untuk kelas .hidden agar elemen tersebut tersembunyi secara default
// .hidden { display: none; }