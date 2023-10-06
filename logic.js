document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    var map = L.map('map').setView([0, 0], 2);

    // Create a tile layer using OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    var cityDropdown = document.getElementById('cityDropdown');

    // Fetch data from the API endpoint using D3
    d3.json('http://127.0.0.1:5000/api/v1.0/city')
        .then(function (data) {
            // Extract the first record (key '0') from the API response
            var firstRecord = data['0'];

            // Assuming the first record contains city names as values
            for (var key in firstRecord) {
                if (key !== '0') {
                    var option = document.createElement('option');
                    option.value = firstRecord[key];
                    option.textContent = firstRecord[key];
                    cityDropdown.appendChild(option);
                }
            }

            // Event listener for dropdown selection change
            cityDropdown.addEventListener('change', function () {
                var selectedCityName = cityDropdown.value;

                // Find the selected city's coordinates from the API data
                var selectedCity = data[selectedCityName];

                if (selectedCity) {
                    // Update the map view to the selected city's coordinates
                    map.setView([selectedCity[10], selectedCity[11]], 10);
                }
            });
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
});
