// Edit the center point and zoom level
var map = L.map('map', {
  center: [27.355459,93.486109],
  zoom: 11  ,
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
// map.attributionControl.addAttribution('View <a href="https://github.com/monsoonforest/senior-citizens-sagalee">open-source code on GitHub</a>');
// map.attributionControl.addAttribution('Population data &copy; <a href="https://eci.gov.in/">ECI India </a>');


new L.esri.basemapLayer('Imagery').addTo(map);
new L.esri.basemapLayer('ImageryLabels').addTo(map);

// $.getJSON("arunachal-pradesh-districts.geojson", function (data) {
//   geoJsonLayer = L.geoJson(data, {
//     style: {color: '#42ff3f', weight:1, fillOpacity: 0}
//   }).addTo(map);
// });

// Edit to upload GeoJSON data file from your local directory
$.getJSON("test-program-sites.geojson", function (data) {
 geoJsonLayer = L.geoJson(data, {
    style: {color: '#42ff3f', weight:1, fillOpacity: 0},
    onEachFeature: onEachFeature
  }).addTo(map);
controlLayers.addOverlay(geoJsonLayer, 'Programs');

});


// This highlights the layer on hover, also for mobile
function highlightFeature(e) {
  resetHighlight(e);
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'red',
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

// Edit info box text and variables (such as elderly density 2014) to match those in your GeoJSON data
info.update = function (props) {
  this._div.innerHTML = '<h4>Sagalee Constituency<br />Population of Senior Citizens 2020</h4>' +  (props ?
    '<b>' + props.Program + ' ' + props.Site + '</b><br />' : 'Click');
};  


info.addTo(map);

