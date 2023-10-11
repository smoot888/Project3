let selectedPollutant = "CO"; // Initialize with CO

// Create separate chart variables for each pollutant
let coChart, no2Chart, so2Chart, pm10Chart, o3Chart;

// Create separate canvas elements for each pollutant
const coCanvas = document.getElementById("coChart");
const no2Canvas = document.getElementById("no2Chart");
const so2Canvas = document.getElementById("so2Chart");
const pm10Canvas = document.getElementById("pm10Chart");
const o3Canvas = document.getElementById("o3Chart");

// Initialize all chart instances for different pollutants
coChart = new Chart(coCanvas, {
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
          text: "CO Levels",
        },
      },
    },
  },
});

no2Chart = new Chart(no2Canvas, {
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
          text: "NO2 Levels",
        },
      },
    },
  },
});

so2Chart = new Chart(so2Canvas, {
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
          text: "SO2 Levels",
        },
      },
    },
  },
});

pm10Chart = new Chart(pm10Canvas, {
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
          text: "PM10 Levels",
        },
      },
    },
  },
});

o3Chart = new Chart(o3Canvas, {
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
          text: "O3 Levels",
        },
      },
    },
  },
});

// Fetch the JSON data using D3.js
d3.json("data/histUpdate.json").then(function (data) {
  console.log(data);
  // Extract all unique cities from the data
  const uniqueCities = [...new Set(data.map(entry => entry.City)];

  // Populate the dropdown options with unique cities
  const citySelect = document.getElementById("citySelect");
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
    // Extract years and values for the selected pollutant data within the range 2000 to 2022
    const years = Object.keys(filteredData[0]).filter(key => !isNaN(key) && key >= "2000" && key <= "2022");
    const values = years.map(year => parseFloat(filteredData[0][year]));
  
    // Destroy the previous chart instance if it exists and update the chart for the selected pollutant
    switch (selectedPollutant) {
      case "CO":
        if (coChart.destroy) {
          coChart.destroy();
        }
    }
  });
});

// Add an event listener to the button to update the charts when the button is clicked
const updateChartButton = document.getElementById("updateChartButton");
updateChartButton.addEventListener("click", function () {
  const selectedCity = citySelect.value;
  updateChart(selectedCity);
});

// Initialize the chart with the first city in the dropdown
const initialSelectedCity = uniqueCities[0];
updateChart(initialSelectedCity);
