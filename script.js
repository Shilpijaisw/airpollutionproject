// Smooth Scroll for Navbar Links
// script.js
// Load JSON data and render it dynamically
fetch("data.json")
    .then(response => response.json())
    .then(data => renderContent(data))
    .catch(error => console.error("Error loading JSON:", error));

// Function to render content dynamically
function renderContent(data) {
    // Render Causes
    const causesList = document.getElementById("causes-list");
    data.causes.forEach(cause => {
        const li = document.createElement("li");
        li.textContent = cause;
        causesList.appendChild(li);
    });

    // Render Effects
    const effectsList = document.getElementById("effects-list");
    data.effects.forEach(effect => {
        const li = document.createElement("li");
        li.textContent = effect;
        effectsList.appendChild(li);
    });

    // Render Solutions
    const solutionsList = document.getElementById("solutions-list");
    data.solutions.forEach(solution => {
        const li = document.createElement("li");
        li.textContent = solution;
        solutionsList.appendChild(li);
    });

    // Render Global Statistics
    document.getElementById("avg-aqi").textContent = `Average AQI: ${data.global_statistics.average_aqi}`;
    document.getElementById("countries-monitored").textContent = `Countries Monitored: ${data.global_statistics.countries_monitored}`;
    document.getElementById("most-polluted-city").textContent = `Most Polluted City: ${data.global_statistics.most_polluted_city}`;
    document.getElementById("least-polluted-city").textContent = `Least Polluted City: ${data.global_statistics.least_polluted_city}`;
}

document.getElementById("checkAqi").addEventListener("click", () => {
    const city = document.getElementById("city").value.trim();
    const resultDiv = document.getElementById("result");

    if (!city) {
        resultDiv.textContent = "Please enter a city name.";
        return;
    }

    // Mock API Key and Endpoint
    const apiKey = "8fb77b24e145918dfcb74eca5b1061bd52a97df2"; // Replace with your actual API key
    const url = `https://api.waqi.info/feed/${city}/?token=${apiKey}`;

    // Mock Data for Testing (if no API key available)
    const mockData = {
        status: "ok",
        data: { aqi: 85, city: { name: city }, dominentpol: "pm10" },
    };

    // Function to render AQI data
    const renderAQI = (data) => {
        if (data.status === "ok") {
            const { aqi, city, dominentpol } = data.data;
            resultDiv.innerHTML = `
                <h2>Air Quality Index</h2>
                <p><strong>City:</strong> ${city.name}</p>
                <p><strong>AQI:</strong> ${aqi}</p>
                <p><strong>Main Pollutant:</strong> ${dominentpol}</p>
            `;
        } else {
            resultDiv.textContent = "City not found or API error.";
        }
    };

    // Fetch data from API or use mock
    fetch(url)
        .then((response) => response.json())
        .then(renderAQI)
        .catch(() => renderAQI(mockData)); // Use mock data on API failure
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });

  let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
  
  // Dynamic Fun Facts (Optional)
  const funFacts = [
    "Air pollution kills 7 million people annually.",
    "90% of people breathe polluted air daily.",
    "Switching to electric vehicles can reduce emissions by 30%."
  ];
  setInterval(() => {
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    console.log(fact);
  }, 5000);
  