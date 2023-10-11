


function createHeatMap(data){

    var cfg = {
        "radius": 2,
        "maxOpacity": .8,
        "scaleRadius": true,
        "useLocalExtrema": false,
        "latField": 'Lat',
        "lngField": 'Lon',
        "valueField": '2022'
    };

  

  var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

 

  var heatmapLayer = new HeatmapOverlay(cfg);

  var map = new L.Map('map',{
    center: new L.LatLng(37.0902, -95.7129),
    zoom: 4,
    layers: [baseLayer, heatmapLayer]
  });

  heatmapLayer.addData(data);
  //console.log(heatArray)
  //let heat = L.heatLayer(heatArray, {
      //radius: 50,
     // blur: 10,
     // max: 1000
     // }).addTo(myMap);
//}

};

fetch('data/histUpdate.json')
        .then(response => response.json())
        .then(data => {
            createHeatMap(data); // Populate dropdowns with unique values
            //updateData("all", "all"); // Initial data update
        })
        .catch(error => console.error('Error fetching data:', error));