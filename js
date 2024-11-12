// Define a function to style each region based on temperature
function style(feature) {
    return {
        fillColor: getColor(feature.properties.temperature), // Set color based on temperature
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Function to get color based on temperature
function getColor(temperature) {
    return temperature > 30 ? '#800026' : // Red for hot temperatures
           temperature > 25 ? '#BD0026' :
           temperature > 20 ? '#E31A1C' :
           temperature > 15 ? '#FC4E2A' :
           temperature > 10 ? '#FD8D3C' :
           temperature > 5 ? '#FEB24C' :
           '#FFEDA0'; // Yellow for colder temperatures
}

// Adding GeoJSON layer to the map with choropleth style
L.geoJSON(geojsonData, { style: style }).addTo(map);

// Optional: Add a legend to describe the color scale
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    var grades = [0, 5, 10, 15, 20, 25, 30];
    var labels = [];
    
    for (var i = 0; i < grades.length; i++) {
        labels.push(
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+')
        );
    }
    div.innerHTML = labels.join('');
    return div;
};
legend.addTo(map);

