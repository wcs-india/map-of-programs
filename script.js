let config = {
  minZoom: 1,
  maxZoom: 15,
};
// magnification with which the map will start
const zoom = 4;
// co-ordinates 24.524496, 77.951236
const lat = 24.5;
const lng = 77.9;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);
// layer controls
var controlLayers = L.control.layers( null, null, {
     position:"topleft",
     collapsed: false // truw = closed by default
    }).addTo(map);


L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);;

const funny = L.icon({
  iconUrl: "http://grzegorztomicki.pl/serwisy/pin.png",
  iconSize: [30, 40], // size of the icon
  iconAnchor: [20, 58], // changed marker icon position
  popupAnchor: [0, -60], // changed popup position
});


// specify popup options
const customOptions = {
  minWidth: "220", // set max-width
  //maxWidth: "auto",
  keepInView: true, // Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
};

// center map when click on marker
function clickZoom(e) {
  map.setView(e.target.getLatLng(), zoom);
}


//-----------------GREAT INDIAN BUSTARD-------------------------

// custom popup image + text
const gibPopup =
  '<div class="customPopup"><figure><img src="great-india-bustard.JPG"><figcaption><b>GREAT INDIAN BUSTARD VILLAGES</b></figcaption></figure><div>People from the Mangniyar community from this landscape are recognised for their folk music. We are currently working on outreach activities within the schools of this region where we share  information about Great Indian Bustard and the Orans - traditionally community-conserved areas, through music performances by the Mangniyars. The songs performed during these activities are written by Mangniyars by incorporating information on the ecology of the bird and Orans. <a href="https://india.wcs.org/wildlife/great-indian-bustard" target="_blank">→ show more</a></div></div>';

$.getJSON("great-indian-bustard-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
  icon: funny,
        
  })
.bindPopup(gibPopup, customOptions).on("click", clickZoom)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>GREAT INDIAN BUSTARD</b>');
});

//----------------------------COUNTER WILDLIFE TRAFFICKING----------------------------------------------------/


const cwtPopup =
  '<div class="customPopup"><figure><img src="CWT-training-kit.png"><figcaption><b>COUNTER WILDLIFE TRAFFICKING WORKSHOPS</b></figcaption></figure><div>WCS-India’s Counter Wildlife Trafficking program was initiated in 2018 to address the growing challenge of wildlife trafficking in India. CWT works across India, with a special focus on Northeast India, Western Ghats and Eastern Ghats. Our activities currently are: Conducting capacity building workshops for officers on effective prevention, detection, investigation, and prosecution of wildlife. Providing technical support to law enforcement officers in multiple aspects of wildlife crime<a href="https://india.wcs.org/Counter-Wildlife-Trafficking-CWT" target="_blank">→ show more</a></div></div>';


$.getJSON("counter-wildlife-trafficking-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    
})
.bindPopup(cwtPopup, customOptions).on("click", clickZoom)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>COUNTER WILDLIFE TRAFFICKING</b>');
});

///-------------------------LIVELIHOOD SUPPORT--------------------------------------------------------------

const livsupPopup =
  '<div class="customPopup"><figure><img src="livelihood-support.jpg"><figcaption><b>LIVELIHOOD SUPPORT PROTECTED AREAS</b></figcaption></figure><div>The major area of focus in support the families relocated under Government Sponsored Relocation Program and intelligence gathering. Support to voluntary relocation program- Livelihood support team provided support to the relocated families  in the field of agriculture, documentation, training etc.<a href="https://india.wcs.org/Programmes/Livelihood-Support2" target="_blank">→ show more</a></div></div>';


$.getJSON("livelihood-support.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#ce6251', weight:1, fillOpacity: 1}
        
})
.bindPopup(livsupPopup, customOptions).on("click", clickZoom)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>LIVELIHOOD SUPPORT</b>');
});


///----------------------------------EASTERN GHATS-----------------------------------------------------

const egPopup =
  '<div class="customPopup"><figure><img src="eastern-ghats.JPG"><figcaption><b>EASTERN GHATS PROGRAM</b></figcaption></figure><div>Since 2012, WCS-India has been involved in tiger and prey monitoring in the region, which includes the Nagarjunasagar Srisailam Tiger Reserve (NSTR) in Andhra Pradesh and the Amrabad Tiger Reserve (ATR) in Telangana. Our work in the region has since expanded to human-wildlife conflict mitigation, voluntary relocation, capacity building workshops for law enforcement, legal interventions, community-based conservation interventions, and strengthening protected areas. Our long-term goal is to ensure there are thriving populations of all species in the Nallamala landscape.<a href="https://india.wcs.org/Programmes/Eastern-Ghats-Telangana" target="_blank">→ show more</a></div></div>';


$.getJSON("eastern-ghats.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#40bd81', weight:1, fillOpacity: 1}
        
})
.bindPopup(egPopup, customOptions).on("click", clickZoom)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>EASTERN GHATS</b>');
});


///-----------------------------CARNIVORE & HERBIVORE ECOLOGY & CONSERVATION----------------------------------------------------------

const chePopup =
  '<div class="customPopup"><figure><img src="cwe-photo.JPG"><figcaption><b>CARNIVORE & HERBIVORE ECOLOGY & CONSERVATION</b></figcaption></figure><div>Tigers are a priority species for WCS-India. Our long-term goal for tiger conservation efforts is to support Government efforts to ensure that there are multiple thriving populations of tigers in India. We contribute to the conservation of tigers primarily through the wide variety of field activities we pursue in the Western and Eastern Ghats landscapes, as well as through policy efforts, voluntary relocation, carnivore conflict management, support to enforcement agencies, and capacity building.<a href="https://india.wcs.org/Programmes/Carnivore-Herbivore-Ecology-Conservation" target="_blank">→ show more</a></div></div>';


$.getJSON("carnivore-herbivore-ecology.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#b2392f', weight:1, fillOpacity: 1}
        
})
.bindPopup(chePopup, customOptions).on("click", clickZoom)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>CARNIVORE & HERBIVORE ECOLOGY & CONSERVATION</b>');
});

///----------------------------------MARINE----------------------------------------------------

const marinePopup =
  '<div class="customPopup"><figure><img src="marine.JPG"><figcaption><b>MARINE PROGRAM</b></figcaption></figure><div>The WCS-India Marine Program aims to conserve the unique diversity of India’s coastal habitats and seas by working with communities and partner organizations to overcome these challenges through a multidisciplinary approach. The program’s efforts are focused on five broad themes: (1) strengthening the existing Marine Protected Area (MPA) network (2) mitigating marine megafaunal bycatch (3) strengthening shark and ray management (4) helping incorporate sustainability into marine-centric tourism and (5) promoting and supporting sustainable fisheries.<a href="https://india.wcs.org/Programmes/Marine-program" target="_blank">→ show more</a></div></div>';


$.getJSON("marine-program-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#2986cc', weight:1, fillOpacity: 1}
        
})
.bindPopup(marinePopup, customOptions).on("click", clickZoom)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>MARINE</b>');
});

///------------------------------------HUMAN WILDLIFE CONFLICT---------------------------------------------------

const hwcPopup =
  '<div class="customPopup"><figure><img src="human-wildlife-conflict.jpeg"><figcaption><b>HUMAN WILDLIFE CONFLICT PROGRAM</b></figcaption></figure><div>Today human-wildlife conflict is an issue that has gained a lot of importance globally and nationally. While it negatively affects both humans and wildlife, many of the latter are endangered and threatened. WCS-India’s work with leopards has been on the forefront of this field of knowledge, with its continuous study of not just the ecology of the wildlife, but also how humans react and respond to the presence of the wildlife in human-use landscapes. <a href="https://india.wcs.org/Programmes/Human-wildlife-interactions" target="_blank">→ show more</a></div></div>';


$.getJSON("human-wildlife-conflict.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#6040a0', weight:1, fillOpacity: 1}
        
})
.bindPopup(hwcPopup, customOptions).on("click", clickZoom)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>HUMAN WILDLIFE CONFLICT</b>');
});

///-----------------------------------HUMAN WILDLIFE INTERACTIONS----------------------------------------------------

const hwiPopup =
  '<div class="customPopup"><figure><img src="human-wildlife-interactions.JPG"><figcaption><b>HUMAN WILDLIFE INTERACTIONS PROGRAM</b></figcaption></figure><div>Today human-wildlife conflict is an issue that has gained a lot of importance globally and nationally. While it negatively affects both humans and wildlife, many of the latter are endangered and threatened. WCS-India’s work with leopards has been on the forefront of this field of knowledge, with its continuous study of not just the ecology of the wildlife, but also how humans react and respond to the presence of the wildlife in human-use landscapes. <a href="https://india.wcs.org/Programmes/Human-wildlife-interactions" target="_blank">→ show more</a></div></div>';


$.getJSON("human-wildlife-interactions.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#e37934', weight:1, fillOpacity: 1}
        
})
.bindPopup(hwiPopup, customOptions).on("click", clickZoom)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>HUMAN WILDLIFE INTERACTIONS</b>');
});


///-----------------------------------CENTRAL WESTERN GHATS----------------------------------------------------

const cwgPopup =
  '<div class="customPopup"><figure><img src="Western-ghats.jpg"><figcaption><b>CENTRAL WESTERN GHATS PROGRAM</b></figcaption></figure><div>The main objectives of this prgram are enhancing protection of crucial wildlife habitats by notifying new Protected areas (PA) and expanding existing Protected areas. Consolidation of critical wildlife habitats by  relocating strategic small hamlets which are inside protected areas. Establishing & developing strong local intelligence network to effectively tackle and reduce the Forest & wildlife related offenses like Illegal poaching of wildlife, Forest encroachment, Smuggling and trade through effective collaboration with various enforcement agencies. Ensuring better protection and management of Protected areas through supporting forest department and policy level interventions. <a href="https://india.wcs.org/Programmes/Western-Ghats" target="_blank">→ show more</a></div></div>';


$.getJSON("western-ghats-sites.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: {color: '#0CDF76', weight:1, fillOpacity: 1}
        
})
.bindPopup(cwgPopup, customOptions).on("click", clickZoom)
.addTo(map);
controlLayers.addOverlay(geoJsonLayer, '<b>CENTREAL WESTERN GHATS</b>');
});
