
// Create event listener for a change in the Pollutant dropdown
let userSelectedPollutant = "";
function updatePollutant(pollutant){
    userSelectedPollutant = pollutant;
};
const selectedPollutant = document.getElementById('pollutionDropdown');
selectedPollutant.addEventListener('change', function(){
    const selectedOption = selectedPollutant.value;
    console.log(selectedOption);
    updatePollutant(selectedOption)
    
});

// Create event listener for a change in the Year dropdown
let userSelectedYear = "";
function updateYear(year){
    userSelectedYear = year;
};
const selectedYear = document.getElementById('yearDropdown');
selectedYear.addEventListener('change', function(){
    const selectedOption = selectedYear.value;
    console.log(selectedOption);
    updateYear(selectedOption);
});

//Initialize heatmap instance
var cfg = {
    "radius": 2,
    "maxOpacity": .8,
    "scaleRadius": true,
    "useLocalExtrema": false,
    "latField": 'Lat',
    "lngField": 'Lon',
    "valueField": 'Data'
};

var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map('heatmap',{
    center: new L.LatLng(37.0902, -95.7129),
    zoom: 4,
    layers: [baseLayer, heatmapLayer]
});

// Function to create a heat map
function createHeatMap(data) {
        //find max value in dataset
        let testmax = 0;
        for (let i = 0; i<data.length; i++){
            if (data[i][userSelectedYear] > testmax){
                testmax = data[i][userSelectedYear];
            };
        };
        let max = 0;
        if (userSelectedPollutant == "O3"){
            max = 0.2;
        }
        if (userSelectedPollutant == "PM2.5"){
            max = 50;
        }
        if (userSelectedPollutant == "SO2"){
            max = 200;
        }
        if (userSelectedPollutant == "CO"){
            max = 10;
        }
        if (userSelectedPollutant == "NO2"){
            max = 100;
        }
        if (userSelectedPollutant == "PM10"){
            max = 100;
        }
        
        console.log(testmax);
        console.log(max);
        heatmapLayer.setData({"max":max,"min":0,"data":data});

};

   
function buttonClick(){
    // Fetch data and populate dropdowns when the page loads
    fetch('../data/histUpdate.json')
        .then(response => response.json())
        .then(data => {
            // Filter the data based on dropdown selections
            console.log(userSelectedYear);
            const filteredData = data.filter((item) => item.Pollutant == userSelectedPollutant);
            for (let i = 0; i<filteredData.length; i++){
                filteredData[i]['Data']=filteredData[i][userSelectedYear]
            }
            console.log(filteredData);
            createHeatMap(filteredData);
        }) 
        .catch(error => console.error('Error fetching data:', error));
}
