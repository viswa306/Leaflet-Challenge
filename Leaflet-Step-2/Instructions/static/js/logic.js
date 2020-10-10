// initialize the map
var map = L.map('mapid').setView([37.09, -95.71], 13);
 
// load a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
   tileSize: 512,
   maxZoom: 18,
   zoomOffset: -1,
   id: "mapbox/streets-v11",
   accessToken: API_KEY
 }).addTo(map);
  
map.setZoom(12);
var geoJsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(geoJsonUrl, function(data) {
 function getRadius(magnitude) {
   if(magnitude ===1 ){
     return 1;
   }
   return magnitude*50;
 }
 console.log(data);
 
 var eArray = [];
  for(var i = 0; i < data.features.length; i++){
    var location = data.features[i].geometry.coordinates;
    var intensity = data.features[i].properties.mag ? data.features[i].properties.mag * 4 : 1;
    console.log( data.features[i].properties.mag)
        console.log( data.features[i].properties.mag * 4 )
    
    if(location) {
      eArray.push([location[1], location[0], intensity]);
    }
  }

  var heat = L.heatLayer(eArray, {
    radius: 25, 
    blur:5,
    "scaleRadius":true,
    "useLocalExtrema": true,
  }).addTo(map);

 
});
