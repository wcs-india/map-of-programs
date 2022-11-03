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

// new L.tileLayer('https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   ,var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//         attribution: '©OpenStreetMap, ©CartoDB'
// }).addTo(map);


// Edit links to your GitHub repo and data source credit
map.attributionControl.addAttribution('View <a href="https://gitlab.com/monsoonforest/nasa-landslide-nowcast">open-source code on GitLab</a>');
map.attributionControl.addAttribution('Landslide Nowcast &copy; <a href="https://gpm.nasa.gov/data/visualizations/precip-apps">NASA GPM </a>');


new L.esri.basemapLayer('Imagery').addTo(map);
new L.esri.basemapLayer('ImageryLabels').addTo(map);

$.getJSON("great-indian-bustard-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#42ff3f', weight:1, fillOpacity: 0},
        onEachFeature: onEachFeature
  }).addTo(map);
  controlLayers.addOverlay(geoJsonLayer, '<b>GREAT INDIAN BUSTARD</b>');
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
  info.update(layer.feature.Program);
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
