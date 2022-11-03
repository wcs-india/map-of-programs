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

// layer controls
var controlLayers = L.control.layers( null, null, {
     position:"topleft",
     collapsed: false // truw = closed by default
    }).addTo(map);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// custom popup image + text
const customPopup =
  '<div class="customPopup"><figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg/1920px-A-10_Sukiennice_w_Krakowie_Krak%C3%B3w%2C_Rynek_G%C5%82%C3%B3wny_MM.jpg"><figcaption>Source: wikipedia.org</figcaption></figure><div>Kraków,[a] also written in English as Krakow and traditionally known as Cracow, is the second-largest and one of the oldest cities in Poland. Situated on the Vistula River in Lesser Poland Voivodeship... <a href="https://en.wikipedia.org/wiki/Krak%C3%B3w" target="_blank">→ show more</a></div></div>';

// specify popup options
const customOptions = {
  minWidth: "220", // set max-width
  keepInView: true, // Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
};
function onEachFeature(feature, layer) {
  layer.bindPopup(customPopup, customOptions)
  .on("click", clickZoom)
  .addTo(map);

// adding geojson by fetch
// of course you can use jquery, axios etc.
fetch("../static/great-indian-bustard-sites.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // use geoJSON
    L.geoJSON(data, {
      style: {color: '#42ff3f', weight:1, fillOpacity: 0},
      onEachFeature: onEachFeature
    }).addTo(map);
  });


// center map when click on marker
function clickZoom(e) {
  map.setView(e.target.getLatLng(), zoom);
}
