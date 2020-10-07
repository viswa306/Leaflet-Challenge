// Perform API call to USGS API to get earthquake data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function (data) {
    createFeatures(data.features);
});


function getColor(mag) {
  return mag > 8 ? '#800026' :
          mag > 7 ? '#BD0026' :
          mag > 6  ? '#E31A1C' :
          mag > 5  ? '#FC4E2A' :
          mag > 4   ? '#FD8D3C' :
          mag > 3 ? '#FEB24C' :
          mag > 2   ? '#FED976' :
                            '#FFEDA0';
}
  
// Create feature function

function createFeatures(earthquakeData) {
    console.log("test------------------")
    // ?Define a function we want to run once for each feature in the feature Array
    
        // Give each feature a popup describing with information pertinent to it
       function onEachFeature(feature, layer){
         layer.bindPopup("<h3>  Magnitude:  " + feature.properties.mag +
            "</h3><hr><h3>  Depth:  " + feature.geometry.coordinates[2] + "</h3>");
// layer.bindPopup(`<h3>  Magnitude:   ${feature.properties.mag}
//             </h3><hr><h3>  Depth:   ${feature.geometry.coordinates[2]} </h3>`);
        
        }
   
    
         function pointToLayer(feature, latlng){
          //  console.log(`${latlng}`)
          return new L.CircleMarker(latlng,
         { 
           radius:(feature.properties.mag)*3,
           fillColor: getColor(feature.properties.mag),
            fillOpacity: .8,
            color: 'red',
            weight: .5
          });
        }    
     
    
      // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer

    });
      createMap(earthquakes);
    };  
      
function createMap(earthquakes){
// Define streetmap and darkmap layers
var streetmap =     L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});
//   define  a baseMaps object to hold our base layers
var baseMaps ={
    "Street Map": streetmap
    

}
 // Create overlay object to hold our overlay layer
 var overlayMaps = {
    Earthquakes: earthquakes
  };
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


// Creating legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    magnitude= [2,3,4,5,6,7]
        // labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(magnitude[i] + 1) + '"></i> ' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);






}


