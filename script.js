/* eslint-disable no-undef */
/**
 * sidebar replacing popup
 */

// config map
let config = {
  minZoom: 5,
  maxZoom: 18,
};
// magnification with which the map will start
const zoom = 6;
// co-ordinates


const lat = 20;
const lng = 77;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
// 
// ------------------------------------------------------------
// async function to get data from json
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// --------------------------------------------------
// button to close sidebar
const buttonClose = document.querySelector(".close-button");

let featureGroups = [];
let groupBounds;
let latlngs = [];

// function to add markers to map
fetchData("counter-wildlife-trafficking-sites.geojson")
  .then((data) => {
    // create markers width "marker-options-id"
    data.map((marker) => {
      featureGroups.push(
        L.marker(marker.coordinates, {
          icon: L.divIcon({
            className: "leaflet-marker-icon",
            html: `${marker.fid}`,
            iconSize: L.point(30, 30),
            popupAnchor: [3, -5],
          }),
          "marker-options-id": marker.fid,
        })
      );
      latlngs.push(marker.coordinates);
    });
    L.polyline(latlngs, {
      color: "#ff3939",
      weight: 2,
    }).addTo(map);

    return data;
  })
  .then((data) => {
    // create feature group
    // add markers to map
    featureGroups.map((marker) => {
      marker.addTo(map);
    });

    // create feature group with markers
    groupBounds = new L.featureGroup(featureGroups);

    // fitBounds of feature group to map
    map.fitBounds(groupBounds.getBounds(), {
      padding: [50, 50],
    });

    // add event listener to markers to open sidebar
    groupBounds.on("click", function (e) {
      if (e.layer instanceof L.Marker) {
        showSidebarWidthText(e.layer.options["marker-options-id"]);
      }
    });

    // add comment to sodebar depending on marker id
    function showSidebarWidthText(id) {
      data.filter((marker) => {
        if (marker.fid === id) {
          document.body.classList.add("active-sidebar");
          addContentToSidebar(marker);
        }
      });
    }
  });

// --------------------------------------------------
// close when click esc
document.addEventListener("keydown", function (event) {
  // close sidebar when press esc
  if (event.key === "Escape") {
    closeSidebar();
  }
});

// close sidebar when click on close button
buttonClose.addEventListener("click", () => {
  // close sidebar when click on close button
  closeSidebar();
});

// close sidebar when click outside
// document.addEventListener("click", (e) => {
//   const target = e.target;
//   if (
//     !target.closest(".sidebar") &&
//     !target.classList.contains("leaflet-marker-icon")
//   ) {
//     closeSidebar();
//   }
// });

// --------------------------------------------------
// close sidebar

function closeSidebar() {
  // remove class active-sidebar
  document.body.classList.remove("active-sidebar");

  // bounds map to default
  boundsMap();
}

// --------------------------------------------------
// add content to sidebar

function addContentToSidebar(marker) {
  const { fid, Program, small, description, img, geometry } = marker;
  const smallInfo = small !== undefined ? `<small>${small}</small>` : "";

  // create sidebar content
  const sidebarTemplate = `
    <article class="sidebar-content">
      <h1>${Program}</h1>
      <div class="marker-id">${fid}</div>
      <div class="info-content">
        <img class="img-zoom" src="${img}" >
        ${smallInfo}
        <div class="info-description">${description}</div>
      </div>
    </article>
  `;

  const sidebar = document.querySelector(".sidebar");
  const sidebarContent = document.querySelector(".sidebar-content");

  // always remove content before adding new one
  sidebarContent?.remove();

  // add content to sidebar
  sidebar.insertAdjacentHTML("beforeend", sidebarTemplate);

  // set bounds depending on marker coords
  boundsMap(geometry.coordinates);
}

// --------------------------------------------------
// bounds map when sidebar is open
function boundsMap(geometry) {
  const sidebar = document.querySelector(".sidebar").offsetWidth;

  const marker = L.marker(geometry.coordinates);
  const group = L.featureGroup([marker]);

  // bounds depending on whether we have a marker or not
  const bounds = geometry.coordinates  ? group.getBounds() : groupBounds.getBounds();

  // set bounds of map depending on sidebar
  // width and feature group bounds
  map.fitBounds(bounds, {
    paddingTopLeft: [geometry.coordinates  ? sidebar : 0, 10],
  });
}
//--------------------------------------------------------


// const CWT = new L.getJSON("counter-wildlife-trafficking-sites.geojson", function (data) {
//   geoJsonLayer = L.geoJson(data, {
//     style: {color: 'white', weight:1.5},
    
//   }).addTo(map);
// });

// const GIB = new L.getJSON("great-indian-bustard-sites.geojson", function (data) {
//   geoJsonLayer = L.geoJson(data, {
//     style: {color: 'white', weight:1.5},
    
//   }).addTo(map);
// });


// // Extended `LayerGroup` that makes it easy
// // to do the same for all layers of its members
// const cwt = new L.FeatureGroup();
// const gib = new L.FeatureGroup();

// // adding polugons to the map
// cwt.addLayer(CWT);
// gib.addLayer(GIB);

// // object with layers
// const overlayMaps = {
//   CWT: cwt,
//   GIB: gib,
// };

// // centering a group of markers
// map.on("layeradd", function () {
//   // Create new empty bounds
//   let bounds = new L.LatLngBounds();
//   map.eachLayer(function (layer) {
//     // Check if layer is a featuregroup
//     if (layer instanceof L.FeatureGroup) {
//       // Extend bounds with group's bounds
//       bounds.extend(layer.getBounds());
//     }
//   });

//   // Check if bounds are valid (could be empty)
//   if (bounds.isValid()) {
//     // Valid, fit bounds
//     map.flyToBounds(bounds);
//   } else {
//     // Invalid, fit world
//     // map.fitWorld();
//   }
// });

// L.Control.CustomButtons = L.Control.Layers.extend({
//   onAdd: function () {
//     this._initLayout();
//     this._removePolygons();
//     this._update();
//     return this._container;
//   },
//   _removePolygons: function () {
//     this.createButton("remove", "Remove all polygons");
//   },
//   createButton: function (type, Program) {
//     const elements = this._container.getElementsByClassName(
//       "leaflet-control-layers-list"
//     );
//     const button = L.DomUtil.create(
//       "button",
//       `btn-markers ${Program}`,
//       elements[0]
//     );
//     button.textContent = Program;

//     L.DomEvent.on(button, "click", function (e) {
//       const checkbox = document.querySelectorAll(
//         ".leaflet-control-layers-overlays input[type=checkbox]"
//       );

//       // Remove/add all layer from map when click on button
//       [].slice.call(checkbox).map((el) => {
//         el.checked = type === "add" ? false : true;
//         el.click();
//       });
//     });
//   },
// });

// new L.Control.CustomButtons(null, overlayMaps, { collapsed: false }).addTo(map);
