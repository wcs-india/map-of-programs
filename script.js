/* eslint-disable no-undef */
/**
 * tabs in popup
 */

// config map
let config = {
  minZoom: 1,
  maxZoom: 18,
};
// magnification with which the map will start
const zoom = 5;
// co-ordinates
const lat = 20;
const lng = 79;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// // layer controls
// var controlLayers = L.control.layers( null, null, {
//      position:"topleft",
//      collapsed: false // truw = closed by default
//     }).addTo(map);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// custom popup image + text
const customPopup = `<div class="customPopup">
    <ul class="tabs-example" data-tabs>
      <li><a data-tabby-default href="#sukiennice">Sukiennice</a></li>
      <li><a href="#town-hall-tower">Town Hall Tower</a></li>
    </ul>
    <div id="sukiennice">
      <figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg/1920px-A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg"><figcaption>Source: wikipedia.org</figcaption></figure><div>Kraków,[a] also written in English as Krakow and traditionally known as Cracow, is the second-largest and one of the oldest cities in Poland. Situated on the Vistula River in Lesser Poland Voivodeship... <a href="https://en.wikipedia.org/wiki/Krak%C3%B3w" target="_blank">→ show more</a></div>
    </div>
    <div id="town-hall-tower">
      <figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Krak%C3%B3w_-_Town_Hall_Tower_01a.jpg/315px-Krak%C3%B3w_-_Town_Hall_Tower_01a.jpg" style="height: 202px; width: auto; margin: auto;"></figure>
      <figcaption>Source: wikipedia.org</figcaption>
      <div>Town Hall Tower in Kraków, Poland (Polish: Wieża ratuszowa w Krakowie) is one of the main focal points of the Main Market Square in the Old Town district of Kraków. The Tower is the only... <a href="https://en.wikipedia.org/wiki/Town_Hall_Tower,_Krak%C3%B3w" target="_blank">→ show more</a></div>
    </div>
  </div>`;

// specify popup options
const customOptions = {
  minWidth: "220", // set max-width
  keepInView: true, // Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
};

// create marker object, pass custom icon as option, pass content and options to popup, add to map
const marker = L.marker([50.0616, 19.9373])
  .bindPopup(customPopup, customOptions)
  .on("click", runTabs);

  marker.addTo(map)

  $.getJSON("great-indian-bustard-sites.geojson", function (data) {
  GIBLAYER = L.geoJson(data, {
    style: {color: '#42ff3f', weight:1, fillOpacity: 0},
    onEachFeature: onEachFeature    
  }).addTo(map);
});




// center map when click on marker
function runTabs() {
  const tabs = new Tabby("[data-tabs]");
}

const gib = new L.FeatureGroup();

// adding polugons to the map
gib.addLayer(GIBLAYER);

// object with layers
const overlayMaps = {
  GIBLAYER: gib,
};


// centering a group of markers
map.on("layeradd", function () {
  // Create new empty bounds
  let bounds = new L.LatLngBounds();
  map.eachLayer(function (layer) {
    // Check if layer is a featuregroup
    if (layer instanceof L.FeatureGroup) {
      // Extend bounds with group's bounds
      bounds.extend(layer.getBounds());
    }
  });

  // Check if bounds are valid (could be empty)
  if (bounds.isValid()) {
    // Valid, fit bounds
    map.flyToBounds(bounds);
  } else {
    // Invalid, fit world
    // map.fitWorld();
  }
});

L.Control.CustomButtons = L.Control.Layers.extend({
  onAdd: function () {
    this._initLayout();
    this._removePolygons();
    this._update();
    return this._container;
  },
  _removePolygons: function () {
    this.createButton("remove", "Remove all polygons");
  },
  createButton: function (type, Program) {
    const elements = this._container.getElementsByClassName(
      "leaflet-control-layers-list"
    );
    const button = L.DomUtil.create(
      "button",
      `btn-markers ${Program}`,
      elements[0]
    );
    button.textContent = Program;

    L.DomEvent.on(button, "click", function (e) {
      const checkbox = document.querySelectorAll(
        ".leaflet-control-layers-overlays input[type=checkbox]"
      );

      // Remove/add all layer from map when click on button
      [].slice.call(checkbox).map((el) => {
        el.checked = type === "add" ? false : true;
        el.click();
      });
    });
  },
});

new L.Control.CustomButtons(null, overlayMaps, { collapsed: false }).addTo(map);
