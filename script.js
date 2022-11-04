// Edit the center point and zoom level
var map = L.map('map', {
  center: [20,78],
  zoom: 8,
  minZoom : 5,
  scrollWheelZoom: true
});

// layer controls
var controlLayers = L.control.layers( null, null, {
     position:"topleft",
     collapsed: false // truw = closed by default
    }).addTo(map);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);


// custom popup image + text
const gibPopup =
  '<div class="customPopup"><figure><img src="great-india-bustard.JPG"><figcaption>GREAT INDIAN BUSTARD SITES</figcaption></figure><div>People from the Mangniyar community from this landscape are recognised for their folk music. We are currently working on outreach activities within the schools of this region where we share  information about Great Indian Bustard and the Orans - traditionally community-conserved areas, through music performances by the Mangniyars. The songs performed during these activities are written by Mangniyars by incorporating information on the ecology of the bird and Orans. <a href="https://india.wcs.org/wildlife/great-indian-bustard" target="_blank">→ show more</a></div></div>';

// specify popup options
const customOptions = {
  minWidth: "220", // set max-width
  maxWidth: "400",
  keepInView: true, // Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
};

// center map when click on marker
function clickZoom(e) {
  map.setView(e.target.getLatLng(), zoom);
}

$.getJSON("great-indian-bustard-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#42ff3f', weight:1, fillOpacity: 1},
        onEachFeature: onEachFeature
  })
.bindPopup(gibPopup, customOptions)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>GREAT INDIAN BUSTARD VILLAGES</b>');
});

$.getJSON("counter-wildlife-trafficking-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#42ff3f', weight:1, fillOpacity: 1},
        onEachFeature: onEachFeature
  })
.bindPopup(layer.feature.properties.description)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>COUNTER WILDLIFE TRAFFICKING WORKSHOPS</b>');
});


// This highlights the layer on hover, also for mobile
function highlightFeature(e) {
  resetHighlight(e);
  var layer = e.target;
  layer.setStyle({
    weight: 2,
    color: '#42ff3f',
    fillOpacity: 0
  });
  info.update(layer.feature.properties);
}

// This resets the highlight after hover moves away
function resetHighlight(e) {
  geoJsonLayer.setStyle(style);
  info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// This instructs highlight and reset functions on hover movement
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: highlightFeature,
    click: zoomToFeature
  });
}


// Creates an info box on the map
var info = L.control();
info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

// Edit info box text and variables to match those in your GeoJSON data
info.update = function (props) {
  this._div.innerHTML = '<h4>Circle Name <h4>' +  (props ?
    '<b>' + props.Program + ' ' + '</b><br /><b>' + props.description + '</b><br />' 
    : 'Click on a Circle');
};  


info.addTo(map);
