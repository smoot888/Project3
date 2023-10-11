// Define chart variables in a broader scope
let coChart, no2Chart, so2Chart, pm10Chart, o3Chart;
let citySelect;
let selectedPollutant = "CO"; // Initialize with CO
let uniqueCities; // Declare uniqueCities here in the broader scope

// Fetch the JSON data using D3.js
d3.json("data/histUpdate.json").then(function (data) {
  console.log(data);
  // Extract all unique cities from the data
<<<<<<< HEAD
  const uniqueCities = [...new Set(data.map(entry => entry.City))];
=======
  uniqueCities = [...new Set(data.map(entry => entry.City))];
>>>>>>> da2f7f9e841f3a7779f8160f5360d9796c90f27d

  // Populate the dropdown options with unique cities
  citySelect = document.getElementById("citySelect");
  uniqueCities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });

  // Add an event listener to the dropdown to update the charts when a city is selected
  citySelect.addEventListener("change", function () {
    const selectedCity = citySelect.value;
    updateChart(selectedCity);
  });

  // Add an event listener to the button to update the charts when the button is clicked
  const updateChartButton = document.getElementById("updateChartButton");
  updateChartButton.addEventListener("click", function () {
    const selectedCity = citySelect.value;
    updateChart(selectedCity);
  });

  // Create separate canvas elements for each pollutant
  const coCanvas = document.getElementById("coChart");
  const no2Canvas = document.getElementById("no2Chart");
  const so2Canvas = document.getElementById("so2Chart");
  const pm10Canvas = document.getElementById("pm10Chart");
  const o3Canvas = document.getElementById("o3Chart");

  // Initialize all chart instances for different pollutants
  coChart = createChart(coCanvas, "CO");
  no2Chart = createChart(no2Canvas, "NO2");
  so2Chart = createChart(so2Canvas, "SO2");
  pm10Chart = createChart(pm10Canvas, "PM10");
  o3Chart = createChart(o3Canvas, "O3");

  // Function to create a chart with the specified canvas and pollutant
  function createChart(canvas, pollutant) {
    return new Chart(canvas, {
      type: "line",
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: `${pollutant} Levels`,
            },
          },
        },
      },
    });
  }

  // Initialize the chart with the first city in the dropdown
  const initialSelectedCity = uniqueCities[0];
  updateChart(initialSelectedCity);
});
