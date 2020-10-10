var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  // Grab the data with d3
  d3.json(queryUrl, function(data) {
   
    // Creating map object
var myMap = L.map("mapid", {
    center: [ 37.09, -95.71],
    zoom: 5
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  
    // Create a new marker cluster group
    var markers = new L.MarkerClusterGroup();
 
  
    // Loop through data
    for (var i = 0; i < data.features.length; i++) {
  
      // Set the data location property to a variable
      var location = data.features[i].geometry.coordinates;

    //   var location = features[i].geometry.coordinates;
      console.log(location)
  
      // Check for location property
      if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location[1], location[0]])
          .bindPopup(data.features[i].descriptor));
      }
  
    }
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });
  