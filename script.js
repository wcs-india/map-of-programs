// Edit the center point and zoom level
var map = L.map('map', {
  center: [17.876475, 77.379697],
  zoom: 8  ,
  minZoom : 5,
  scrollWheelZoom: true
});


// layer controls
var controlLayers = L.control.layers( null, null, {
     position:"topleft",
     collapsed: false // truw = closed by default
    }).addTo(map);


new L.esri.basemapLayer('Imagery').addTo(map);
new L.esri.basemapLayer('ImageryLabels').addTo(map);


// Edit to upload GeoJSON data file from your local directory
$.getJSON("test-program-sites.geojson", function (data) {
 geoJsonLayer = L.geoJson(data, {
      style: {
      color: '#42ff3f', 
      weight:4, 
      fillOpacity: 0
    },
    onEachFeature: onEachFeature
  }).addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>PROGRAMS</b>');

});




// This highlights the layer on hover, also for mobile
function highlightFeature(e) {
  resetHighlight(e);
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'red',
    fillOpacity: 0.2
  });
  info.update(layer.feature.properties);
}

// // This resets the highlight after hover moves away
function resetHighlight(e) {
  geoJsonLayer.setStyle({
     color: '#42ff3f', 
      weight:3, 
      fillOpacity: 0
  });
  info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// This instructs highlight and reset functions on hover movement
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    //mouseout: highlightFeature,
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
  this._div.innerHTML = '<h4>PROGRAMS OF WCS-INDIA<br />PROJECT SITES</h4>' +  (props ?
    '<b>' + props.Program + ' Program' +'</b><br />' + props.Site + '</b><br />' + props.image +'</b><br />' + props.description + '</b><br />' : 'Click on feature to know more');
};  


info.addTo(map);
