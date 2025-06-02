// Sample unemployment data for the requested states/regions
const unemploymentData = {
    "West Bengal": [
        { year: 2015, rate: 5.1 },
        { year: 2016, rate: 5.2 },
        { year: 2017, rate: 5.3 },
        { year: 2018, rate: 5.5 },
        { year: 2019, rate: 5.4 },
        { year: 2020, rate: 5.8 }
    ],
    "Delhi": [
        { year: 2015, rate: 6.0 },
        { year: 2016, rate: 6.1 },
        { year: 2017, rate: 6.2 },
        { year: 2018, rate: 6.0 },
        { year: 2019, rate: 5.8 },
        { year: 2020, rate: 6.3 }
    ],
    "Uttar Pradesh": [
        { year: 2015, rate: 7.5 },
        { year: 2016, rate: 7.8 },
        { year: 2017, rate: 8.0 },
        { year: 2018, rate: 7.9 },
        { year: 2019, rate: 7.7 },
        { year: 2020, rate: 8.1 }
    ],
    "Maharashtra": [
        { year: 2015, rate: 4.8 },
        { year: 2016, rate: 5.0 },
        { year: 2017, rate: 4.9 },
        { year: 2018, rate: 4.7 },
        { year: 2019, rate: 4.5 },
        { year: 2020, rate: 5.1 }
    ],
    "Bihar": [
        { year: 2015, rate: 6.4 },
        { year: 2016, rate: 6.6 },
        { year: 2017, rate: 6.7 },
        { year: 2018, rate: 6.9 },
        { year: 2019, rate: 7.0 },
        { year: 2020, rate: 7.4 }
    ],
    "Hyderabad": [
        { year: 2015, rate: 4.3 },
        { year: 2016, rate: 4.5 },
        { year: 2017, rate: 4.7 },
        { year: 2018, rate: 4.6 },
        { year: 2019, rate: 4.4 },
        { year: 2020, rate: 4.8 }
    ],
    "Tamil Nadu": [
        { year: 2015, rate: 5.8 },
        { year: 2016, rate: 5.9 },
        { year: 2017, rate: 5.6 },
        { year: 2018, rate: 5.5 },
        { year: 2019, rate: 5.3 },
        { year: 2020, rate: 5.9 }
    ],
    "Kashmir": [
        { year: 2015, rate: 6.7 },
        { year: 2016, rate: 6.8 },
        { year: 2017, rate: 7.0 },
        { year: 2018, rate: 7.1 },
        { year: 2019, rate: 7.3 },
        { year: 2020, rate: 7.5 }
    ],
    "Nepal": [
        { year: 2015, rate: 4.0 },
        { year: 2016, rate: 4.2 },
        { year: 2017, rate: 4.5 },
        { year: 2018, rate: 4.6 },
        { year: 2019, rate: 4.8 },
        { year: 2020, rate: 5.0 }
    ]
};

// Coordinates for each state
const stateCoordinates = {
    "West Bengal": [22.9868, 87.8550],
    "Delhi": [28.6139, 77.2090],
    "Uttar Pradesh": [26.8467, 80.9462],
    "Maharashtra": [19.7515, 75.7139],
    "Bihar": [25.0961, 85.3131],
    "Hyderabad": [17.385044, 78.486671],
    "Tamil Nadu": [11.1271, 78.6569],
    "Kashmir": [33.7782, 76.5762],
    "Nepal": [28.3949, 84.1240]
};

// Initialize the chart
const ctx = document.getElementById('unemploymentChart').getContext('2d');
let unemploymentChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Unemployment Rate',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Unemployment Rate Tracker'
            },
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Unemployment Rate (%)'
                },
                min: 0,
                max: 10
            }
        }
    }
});

// Initialize Leaflet map with restricted view to India
const map = L.map('map').setView([20.5937, 78.9629], 5); // Coordinates for India (lat, long) and zoom level 5

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example GeoJSON for states (replace with actual data)
const indiaStatesGeoJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "West Bengal"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [88.3, 22.9], [89.2, 23.3], [90.3, 22.5], [88.5, 22.0], [88.3, 22.9]
                ]]
            }
        },
        // Add other states here...
    ]
};

// Add GeoJSON layer to map
L.geoJSON(indiaStatesGeoJSON, {
    onEachFeature: function (feature, layer) {
        layer.on({
            click: function (e) {
                const stateName = feature.properties.name;
                console.log("State clicked: " + stateName); // Debugging
                updateChart(stateName);
                zoomToState(stateName); // Zoom to the clicked state
            }
        });
    },
    style: function () {
        return {
            fillColor: '#3e8e41',
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.5
        };
    }
}).addTo(map);

// Set the map bounds to cover only India
const indiaBounds = [[6.8, 68.1], [37.1, 97.4]]; // Latitudes and longitudes covering India
map.setMaxBounds(indiaBounds); // Restrict panning to these bounds

// Disable zooming out beyond the set bounds
map.on('drag', function () {
    map.panInsideBounds(indiaBounds);
});

// Function to update chart data based on selected state
function updateChart(state) {
    let years = [];
    let rates = [];
    
    if (unemploymentData[state]) {
        const stateData = unemploymentData[state];
        years = stateData.map(item => item.year);
        rates = stateData.map(item => item.rate);
    }

    console.log("Chart data for " + state, years, rates); // Debugging

    // Update chart
    unemploymentChart.data.labels = years;
    unemploymentChart.data.datasets[0].data = rates;
    unemploymentChart.update();
}

// Function to zoom in and pin the state
function zoomToState(state) {
    const coordinates = stateCoordinates[state];
    if (coordinates) {
        // Zoom to the state
        map.setView(coordinates, 7); // Zoom level 7 for state level view

        // Add a marker to the state
        L.marker(coordinates).addTo(map)
            .bindPopup(`<b>${state}</b>`)
            .openPopup();
    }
}

// Handle dropdown state selection
document.getElementById('stateSelect').addEventListener('change', function() {
    const selectedState = this.value;
    console.log("Dropdown selected state: " + selectedState); // Debugging
    if (selectedState) {
        updateChart(selectedState);
        zoomToState(selectedState);
    }
});

// Populate state dropdown dynamically
const stateSelect = document.getElementById('stateSelect');
const states = Object.keys(unemploymentData);
states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
});

// Initial chart update
updateChart('West Bengal');

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".navbar .toggle_btn");
    const dropdownMenu = document.querySelector(".dropdown_menu");

    toggleBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("open");
    });
});