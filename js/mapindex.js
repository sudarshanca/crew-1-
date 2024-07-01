/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_advanced_markers_html]
// [START maps_advanced_markers_html_snippet]
let map;
var markersArray = [];
async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const center = { lat: 37.43238031167444, lng: -122.16795397128632 };
   map = new Map(document.getElementById("map"), {
    zoom: 11,
    center,
    mapId: "4504f8b37365c3d0",
  });

  for (const property of properties) {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(property),
      position: property.position,
      title: property.description,
    });
      markersArray.push(marker);
      marker.addListener("click", () => {    
         /* clearOverlays();*/
      toggleHighlight(marker, property);
    });
  }
}

function toggleHighlight(markerView, property) {   
   
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}
function clearOverlays() {
    if (markersArray) {
        for (var i in markersArray) {           
            if (markersArray[i].content.classList.contains("highlight")) {
                markersArray[i].content.classList.remove("highlight");
                markersArray[i].zIndex = null;
            }
        }
    }
}
function buildContent(property) {
  const content = document.createElement("div");

  content.classList.add("property");
  content.innerHTML = `
    <div class="icon">
        $800
    </div>
    <div class="details">
         <div class="position-relative border"
    style=" background-color: white; width: 100%; max-width: 272px; overflow: hidden; height: auto; top: 100%;">

    <div class="" style="width: 100%;">
      <div class="">
        <div class="d-flex1" style=" aspect-ratio: 16/12; width: 100%; display: flex; overflow: hidden; position: relative; width: 100%;" ontouchstart="handleTouchStart(event)" ontouchmove="handleTouchMove(event)">
            <div class="grid-item carousel-slide1" style="min-width: 100%; transition: transform 0.5s ease; display: block;">
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/251665804.jpg?k=d50b5df166124f6070be7a7a1158ed7bf82ba6a9ec6a5c6318863c67656e26f0&o=&hp=1" alt="Image 1" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="grid-item carousel-slide1" style="min-width: 100%; transition: transform 0.5s ease; display: none;">
                <img src="https://www.thegari.in/blog/wp-content/uploads/2020/10/pexels-media-1134176-scaled.jpeg" alt="Image 2" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <!-- Dots container -->
            <div class="dot-container1" id="dotContainer" style="position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); display: flex; justify-content: center; align-items: center;">
                <!-- Dots will be dynamically generated here -->
            </div>
        </div>
    </div>
    </div>


    <div style="padding:.5rem; display:flex; flex-direction:column; gap:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <p style="margin:0;">Apartment</p>
        <div style="display:flex; gap:.5rem; align-items:center;">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5.69908 3.00494C6.42325 0.776184 9.57635 0.776184 10.3005 3.00494C10.6244 4.00168 11.5532 4.67651 12.6012 4.67651C14.9447 4.67651 15.9191 7.67529 14.0232 9.05274C13.1753 9.66875 12.8205 10.7607 13.1444 11.7574C13.8685 13.9862 11.3176 15.8395 9.42172 14.4621C8.57385 13.846 7.42575 13.846 6.57788 14.4621C4.68198 15.8395 2.13107 13.9862 2.85524 11.7574C3.1791 10.7607 2.82431 9.66875 1.97644 9.05274C0.0805464 7.67529 1.05491 4.67651 3.39837 4.67651C4.44639 4.67651 5.37523 4.00168 5.69908 3.00494Z" fill="#EFD414"/>
            <path d="M9.33314 5.2574C9.54827 5.89249 10.1653 6.32248 10.8614 6.32248M3.39837 4.67651C4.44639 4.67651 5.37523 4.00168 5.69908 3.00494C6.42325 0.776184 9.57635 0.776184 10.3005 3.00494C10.6244 4.00168 11.5532 4.67651 12.6012 4.67651C14.9447 4.67651 15.9191 7.67529 14.0232 9.05274C13.1753 9.66875 12.8205 10.7607 13.1444 11.7574C13.8685 13.9862 11.3176 15.8395 9.42172 14.4621C8.57385 13.846 7.42575 13.846 6.57788 14.4621C4.68198 15.8395 2.13107 13.9862 2.85524 11.7574C3.1791 10.7607 2.82431 9.66875 1.97644 9.05274C0.0805464 7.67529 1.05491 4.67651 3.39837 4.67651Z" stroke="#EFD414" stroke-linecap="round"/>
         </svg>
          <p class="popup-font-2" style="margin:0;">4.0</p>
        </div>
      </div>

      <div>
        <p class="popup-font-3" style="margin:0;">Distance in kilometers/meters/miles</p>
        <p class="popup-font-3" style="margin:0;">Period of time</p>
      </div>
      <p class="popup-font">$300 <span class="popup-font-3">per night</span> </p>
    </div>
  </div>
    </div>
    `;
  return content;
}

const properties = [
  {
    address: "215 Emily St, MountainView, CA",
    description: "Single family house with modern design",
    price: "$ 3,889,000",
    type: "home",
    bed: 5,
    bath: 4.5,
    size: 300,
    position: {
      lat: 37.50024109655184,
      lng: -122.28528451834352,
    },
  },
  {
    address: "108 Squirrel Ln &#128063;, Menlo Park, CA",
    description: "Townhouse with friendly neighbors",
    price: "$ 3,050,000",
    type: "building",
    bed: 4,
    bath: 3,
    size: 200,
    position: {
      lat: 37.44440882321596,
      lng: -122.2160620727,
    },
  },
  // [END maps_advanced_markers_html_snippet]
  {
    address: "100 Chris St, Portola Valley, CA",
    description: "Spacious warehouse great for small business",
    price: "$ 3,125,000",
    type: "warehouse",
    bed: 4,
    bath: 4,
    size: 800,
    position: {
      lat: 37.39561833718522,
      lng: -122.21855116258479,
    },
  },
  {
    address: "98 Aleh Ave, Palo Alto, CA",
    description: "A lovely store on busy road",
    price: "$ 4,225,000",
    type: "store-alt",
    bed: 2,
    bath: 1,
    size: 210,
    position: {
      lat: 37.423928529779644,
      lng: -122.1087629822001,
    },
  },
  {
    address: "2117 Su St, MountainView, CA",
    description: "Single family house near golf club",
    price: "$ 1,700,000",
    type: "home",
    bed: 4,
    bath: 3,
    size: 200,
    position: {
      lat: 37.40578635332598,
      lng: -122.15043378466069,
    },
  },
  {
    address: "197 Alicia Dr, Santa Clara, CA",
    description: "Multifloor large warehouse",
    price: "$ 5,000,000",
    type: "warehouse",
    bed: 5,
    bath: 4,
    size: 700,
    position: {
      lat: 37.36399747905774,
      lng: -122.10465384268522,
    },
  },
  {
    address: "700 Jose Ave, Sunnyvale, CA",
    description: "3 storey townhouse with 2 car garage",
    price: "$ 3,850,000",
    type: "building",
    bed: 4,
    bath: 4,
    size: 600,
    position: {
      lat: 37.38343706184458,
      lng: -122.02340436985183,
    },
  },
  {
    address: "868 Will Ct, Cupertino, CA",
    description: "Single family house in great school zone",
    price: "$ 2,500,000",
    type: "home",
    bed: 3,
    bath: 2,
    size: 100,
    position: {
      lat: 37.34576403052,
      lng: -122.04455090047453,
    },
  },
  {
    address: "655 Haylee St, Santa Clara, CA",
    description: "2 storey store with large storage room",
    price: "$ 2,500,000",
    type: "store-alt",
    bed: 3,
    bath: 2,
    size: 450,
    position: {
      lat: 37.362863347890716,
      lng: -121.97802139023555,
    },
  },
  {
    address: "2019 Natasha Dr, San Jose, CA",
    description: "Single family house",
    price: "$ 2,325,000",
    type: "home",
    bed: 4,
    bath: 3.5,
    size: 500,
    position: {
      lat: 37.41391636421949,
      lng: -121.94592071575907,
    },
  },
];

initMap();
// [END maps_advanced_markers_html]
