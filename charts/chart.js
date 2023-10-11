// Initialize the chart with an empty object
let coChart = {};

// Fetch the JSON data using D3.js
d3.json("data/histUpdate.json").then(function (data) {
  // Extract unique cities from the data
  const uniqueCities = [...new Set(data.map(entry => entry.City))];

  // Populate the dropdown options with unique cities
  const citySelect = document.getElementById("citySelect");
  uniqueCities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });

  function updateChart(selectedCity) {
    // Filter the data for the selected city and "CO" pollutant
    const filteredData = data.filter(entry => entry.City === selectedCity && entry.Pollutant === "CO");

    // Check if data exists for the selected city and pollutant
    if (filteredData.length === 0) {
      console.log("No data found for the selected city and pollutant.");
      return;
    }

    // Extract years and values for CO data within the range 2000 to 2022
    const years = Object.keys(filteredData[0]).filter(key => !isNaN(key) && key >= "2000" && key <= "2022");
    const values = years.map(year => parseFloat(filteredData[0][year]));

    // Destroy the previous chart instance if it exists
    if (coChart.destroy) {
      coChart.destroy();
    }

    // Update the chart with the new data
    const ctx = document.getElementById("coChart").getContext("2d");
    coChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: years,
        datasets: [{
          label: `CO Levels in ${selectedCity}`,
          data: values,
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        }],
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
  }

  // Initialize the chart with the first city in the dropdown
  const initialSelectedCity = uniqueCities[0];
  updateChart(initialSelectedCity);
});
