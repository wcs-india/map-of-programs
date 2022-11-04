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
  '<div class="customPopup"><figure><img src="great-india-bustard.JPG"><figcaption><b>GREAT INDIAN BUSTARD VILLAGES</b></figcaption></figure><div>People from the Mangniyar community from this landscape are recognised for their folk music. We are currently working on outreach activities within the schools of this region where we share  information about Great Indian Bustard and the Orans - traditionally community-conserved areas, through music performances by the Mangniyars. The songs performed during these activities are written by Mangniyars by incorporating information on the ecology of the bird and Orans. <a href="https://india.wcs.org/wildlife/great-indian-bustard" target="_blank">→ show more</a></div></div>';

// specify popup options
const customOptions = {
  minWidth: "220", // set max-width
  maxWidth: "200",
  keepInView: true, // Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
};

// center map when click on marker
function clickZoom(e) {
  map.setView(e.target.getLatLng(), zoom);
}

$.getJSON("great-indian-bustard-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#42ff3f', weight:1, fillOpacity: 1}
        
  })
.bindPopup(gibPopup, customOptions)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>GREAT INDIAN BUSTARD PROGRAM</b>');
});

const cwtPopup =
  '<div class="customPopup"><figure><img src="CWT-training-kit.png"><figcaption><b>COUNTER WILDLIFE TRAFFICKING WORKSHOPS</b></figcaption></figure><div>WCS-India’s Counter Wildlife Trafficking program was initiated in 2018 to address the growing challenge of wildlife trafficking in India. CWT works across India, with a special focus on Northeast India, Western Ghats and Eastern Ghats. Our activities currently are: Conducting capacity building workshops for officers on effective prevention, detection, investigation, and prosecution of wildlife. Providing technical support to law enforcement officers in multiple aspects of wildlife crime<a href="https://india.wcs.org/Counter-Wildlife-Trafficking-CWT" target="_blank">→ show more</a></div></div>';


$.getJSON("counter-wildlife-trafficking-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#42ff3f', weight:1, fillOpacity: 1}
        
.bindPopup(cwtPopup, customOptions)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>COUNTER WILDLIFE TRAFFICKING PROGRAM</b>');
});

