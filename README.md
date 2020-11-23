# Leaflet-Challenge

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

## Prerequisites:
* In mapbox.com create apikey.
*  Add your Api key to the config.js file located in static/js file path before Enter your apikeyopening the index.html file.
* Level 1 visualization plots each earthquake occurences that has occured in the prior week (obtained from USGS last seven days dataset) on a standard mapbox.streets mapbox.streets basemap.Each circle is sized and colored based on the magnitude of the earthquake.A popup with each point where magnitude and Depth are associated.
## Images/Basic.jpg
* Leaflet challenge assignment  Earthquakes data is used ,The data is in the form of geojson format.
* Logic.js created functions and pointTolayer to create the markers as circles on the map.
## Images/Bonus.jpg
* Level 2  tectonic plates data is visualized using over layers on the base map .
* used mapbox to create the tile layers on the basemap like street view,lightmap,grayscale,satellite.
* using leaflet created the overlay maps to get the desired output.
* Used bidpopups to mark the markers.
* For the heat map we need to add leaflet-heat.js in the js folder and  this plugin is added in the index.html

