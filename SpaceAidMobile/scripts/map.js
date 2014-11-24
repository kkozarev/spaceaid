//pseudocode:
//onDeviceReady:
//var layerOne = L.mapbox.tileLayer('id', { detectRetina: true, maxZoom: 19 });
//var layerTwo...
//var map = L.mapbox.map('map', null, { layers: [layerOne], zoomControl: false });
//var baseLayers = { "First": layerOne, "Second": layerTwo };
//L.control.layers(baseLayers).addTo(map);
