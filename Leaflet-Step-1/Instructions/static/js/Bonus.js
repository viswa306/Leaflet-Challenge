// Perform API call to USGS API to get earthquake data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function (data) {
    createFeatures(data.features);
});


function getColor(depth) {
  return depth > 90 ? '#800026' :
  depth > 70 ? '#BD0026' :
  depth > 50  ? '#E31A1C' :
  depth > 30 ? '#FC4E2A' :
  depth >10   ? '#FD8D3C' :
 '#FEB24C' ;
         
}
  
// Create feature function

function createFeatures(earthquakeData) {
    console.log("test------------------")
    // ?Define a function we want to run once for each feature in the feature Array
    
        // Give each feature a popup describing with information pertinent to it
       function onEachFeature(feature, layer){
         layer.bindPopup("<h3>  Magnitude:  " + feature.properties.mag +
            "</h3><hr><h3>  Depth:  " + feature.geometry.coordinates[2] + "</h3>");

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

var Grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
  var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });

// Define lightmap, outdoorsmap, and satelliemap layers
let mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

var satellitemap = L.tileLayer(mapboxUrl, {id: 'mapbox.satellite', maxZoom: 20, accessToken: API_KEY});

// initialize all of the layergroups we will be using
var tectonicPlates = new L.LayerGroup();
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json", function (plateData) {
      L.geoJSON(plateData,
        {
          color: 'red',
          weight: 2
        })
        .addTo(tectonicPlates);
    });    


//   define  a baseMaps object to hold our base layers
var baseMaps ={
    "Street Map": streetmap,
     "Grayscale": Grayscale,
    "outdoorsmap" :outdoorsmap,
    " satellitemap":satellitemap
    

}
 // Create overlay object to hold our overlay layer
 var overlayMaps = {
    Earthquakes: earthquakes,
    TectonicPlates: tectonicPlates
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
    depth= [-10,10,30,50,70,90]
       
       

        div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>" 
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depth.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(depth[i] + 1) + '"></i> ' +
          depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);






}

