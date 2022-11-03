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


$.getJSON("great-indian-bustard-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#42ff3f', weight:1, fillOpacity: 1},
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
  info.update(layer.properties.Program);
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



// adding geojson by fetch
// of course you can use jquery, axios etc.
fetch("../static/wojewodztwa-medium.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let layer = new L.GeoJSON(data, {
      // A Function that will be called once for each
      // created Feature, after it has been created and styled
      onEachFeature: function (feature, layer) {
        layer.on("mouseover", function (e) {
          // bindPopup
          getVoivodeshipName(feature, layer);
          // show voivodeship
          addTextToDiv(feature.properties.nazwa);
          this.openPopup();
          // style
          this.setStyle({
            fillColor: "#eb4034",
            weight: 2,
            color: "#eb4034",
            fillOpacity: 0.7,
          });
        });
        layer.on("mouseout", function () {
          this.closePopup();
          // style
          this.setStyle({
            fillColor: "#3388ff",
            weight: 2,
            color: "#3388ff",
            fillOpacity: 0.2,
          });
        });
        layer.on("click", function () {
          // adding the province name to the visible div
          addTextToDiv(feature.properties.nazwa);
        });
      },
    }).addTo(map);
  });