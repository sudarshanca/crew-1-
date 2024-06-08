// Initialize and add the map
let map;

async function initMap() {

    const position = { lat: 45.617797, lng: -122.601673 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        center: position,
        zoom: 10,
        mapId: "4b2dddd7241f0f38",
        disableDefaultUI: true
    });
    
    const priceTag = document.createElement("div");
    priceTag.className = "price-tag";
    priceTag.textContent = "Property Type";

     //The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "",
        content: priceTag
    });
}

initMap();