//Populate the City Dropdown
fetch('http://127.0.0.1:5000/api/v1.0/historical')
        .then(response => response.json())
        .then(data => {
              // Extract all unique cities from the data
            const uniqueCities = [...new Set(data.map(entry => entry.City))];

            // Populate the dropdown options with unique cities
            const citySelect = document.getElementById("citySelect");
            uniqueCities.forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }) 
        .catch(error => console.error('Error fetching data:', error));

// Create event listener for a change in the City dropdown
let userSelectedCity = "";
function updateCity(city){
    userSelectedCity = city;
};
const selectedCity = document.getElementById('citySelect');
selectedCity.addEventListener('change', function(){
    const selectedOption = selectedCity.value;
    console.log(selectedOption);
    updateCity(selectedOption)
    
});

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

function createChart(data){
    let xValues = ['2000','2001','2002','2003','2004',
                   '2005','2006','2007','2008','2009',
                   '2010','2011','2012','2013','2014',
                   '2015','2016','2017','2018','2019',
                   '2020','2021','2022']
    let yValues = [];
    for (let i=0; i<xValues.length; i++){
        yValues.push(data[0][xValues[i]]);
    }

    var graphDiv = document.getElementById('myChart')

    var trace = [{
        x: xValues,
        y: yValues,
        type: 'scatter'
        }];

    var layout = {
    title: 'Sales Growth',
    xaxis: {
        title: 'Year',
        showgrid: false,
        zeroline: false
        },
    yaxis: {
        title: 'Percent',
        showline: false
        }
    };
    console.log(trace)
    Plotly.newPlot(graphDiv, trace, layout);
}

function buttonClick(){
    fetch('http://127.0.0.1:5000/api/v1.0/historical')
        .then(response => response.json())
        .then(data => {
            // Filter the data based on dropdown selections
            const filteredData = data.filter((item) => item.Pollutant == userSelectedPollutant && item.City == userSelectedCity);
            console.log(filteredData);
            createChart(filteredData);
        }) 
        .catch(error => console.error('Error fetching data:', error));
}