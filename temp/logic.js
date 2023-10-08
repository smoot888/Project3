// Function to update dropdowns with unique city names and pollution types
function populateDropdowns(data) {
    const locationDropdown = document.getElementById("locationDropdown");
    const pollutionDropdown = document.getElementById("pollutionDropdown");

    // Create arrays to store unique city names and pollution types
    const uniqueCities = [];
    const uniquePollutionTypes = [];

    // Iterate through the data to find unique values
    data.forEach(item => {
        if (!uniqueCities.includes(item.City)) {
            uniqueCities.push(item.City);
        }
        if (!uniquePollutionTypes.includes(item.Pollutant)) {
            uniquePollutionTypes.push(item.Pollutant);
        }
    });

    // Populate the location (city) dropdown
    locationDropdown.innerHTML = '<option value="all">All Locations</option>';
    uniqueCities.forEach(city => {
        locationDropdown.innerHTML += `<option value="${city}">${city}</option>`;
    });

    // Populate the pollution dropdown
    pollutionDropdown.innerHTML = '<option value="all">All Pollution</option>';
    uniquePollutionTypes.forEach(pollution => {
        pollutionDropdown.innerHTML += `<option value="${pollution}">${pollution}</option>`;
    });
}

// Function to update the displayed JSON data based on dropdown selections
function updateData(location, pollutant) {
    fetch('data/histUpdate.json')
        .then(response => response.json())
        .then(data => {
            // Filter the data based on dropdown selections
            const filteredData = data.filter(item => {
                return (location === "all" || item.City === location) &&
                       (pollutant === "all" || item.Pollutant === pollutant);
            });

            // Display the JSON data
            const sampleDataContainer = document.getElementById("sampleData");
            const jsonPre = sampleDataContainer.querySelector("pre");
            jsonPre.textContent = JSON.stringify(filteredData, null, 2);

            // Clear the existing markers on the map
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add markers for each filtered data point on the map
            filteredData.forEach(item => {
                // Use "lat" and "lon" coordinates from JSON data
                const lat = parseFloat(item.lat);
                const lon = parseFloat(item.lon);
                if (!isNaN(lat) && !isNaN(lon)) {
                    L.marker([lat, lon]).addTo(map)
                        .bindPopup(`${item.City}, ${item.State}<br>Pollution: ${item.Pollutant}<br>Value: ${item['2022']} (2022)`); // Customize the popup content
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Fetch data and populate dropdowns when the page loads
    fetch('data/histUpdate.json')
        .then(response => response.json())
        .then(data => {
            populateDropdowns(data); // Populate dropdowns with unique values
            updateData("all", "all"); // Initial data update
        })
        .catch(error => console.error('Error fetching data:', error));

    // Create a Leaflet map centered on the USA
    const map = L.map('map').setView([37.0902, -95.7129], 4); // Centered on the USA (latitude, longitude, zoom level)

    // Add a tile layer (you can use your preferred map provider)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);


    // Function to create a line graph
    function createLineGraph(data) {
        // Your line graph creation code here
        // Use data to generate the line graph
    }

    // Function to create a heat map
    function createHeatMap(data) {
        // Your heat map creation code here
        // Use data to generate the heat map
    }

    // Function to create a choropleth map
    function createChoropleth(data) {
        // Your choropleth map creation code here
        // Use data to generate the choropleth map
    }
});
