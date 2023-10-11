// Initialize map
var map = L.map('map').setView([39.8283, -98.5795], 4); // Centered on the United States with zoom level 4

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

console.log('Map created');  // Add this line for debugging

// Function to create map markers
function createMapMarkers(data) {
    // Remove existing markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add markers for the selected year
    data.forEach(function (item) {
        const lat = item.Lat;
        const lng = item.Lon;
        const city = item.City;
        const state = item.State;
        const year = userSelectedYear;
        const pollutantType = userSelectedPollutant;
        const value = item[year];

        // Create a marker with a popup
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`City: ${city}<br>State: ${state}<br>Year: ${year}<br>Pollutant: ${pollutantType}<br>Value: ${value}`);
    });
}

function buttonClick() {
    // Fetch data when the page loads
    fetch('../../data/histUpdate.json')
        .then(response => response.json())
        .then(data => {
            createMapMarkers(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Create event listener for a change in the Year dropdown
let userSelectedYear = "";
const selectedYear = document.getElementById('yearDropdown');
selectedYear.addEventListener('change', function () {
    const selectedOption = selectedYear.value;
    userSelectedYear = selectedOption;
    buttonClick(); // Call the function when the user changes the year
});

// Create event listener for a change in the Pollutant dropdown
let userSelectedPollutant = "";
const selectedPollutant = document.getElementById('pollutionDropdown');
selectedPollutant.addEventListener('change', function () {
    const selectedOption = selectedPollutant.value;
    userSelectedPollutant = selectedOption;
    buttonClick(); // Call the function when the user changes the pollutant
});
