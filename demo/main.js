/** Cartoviz demo by Ubimix (http://www.ubimix.com). */
$(function() {

    // Create a map
    var mapContainer = $('#map');
    var mapElement = mapContainer[0];
    var map = L.map(mapElement);

    // Add a background layer for the map.
    // We load the address for the map layer tiles from the map container
    // element ('data-tiles-url' attribute).
    var tilesUrl = mapContainer.data('tiles-url');
    var maxZoom = mapContainer.data('max-zoom');
    var attribution = mapContainer.data('attribution');
    var tilesLayer = L.tileLayer(tilesUrl, {
        attribution : attribution,
        maxZoom : maxZoom
    });
    map.addLayer(tilesLayer);

    // Load data and transform them into markers with basic interactivity
    // DATA object is defined in the './data.js' script.
    var markers = [];
    for (var i = 0; i < DATA.features.length; i++) {
        var point = DATA.features[i];
        var latlng = L.latLng(point.geometry.coordinates[1],
                point.geometry.coordinates[0]);
        var marker = new L.Marker(latlng);

        // Bind a marker popup
        var html = '<h3>' + point.properties.name + '</h3>' + '<p>'
                + point.properties.description + '</p>';
        marker.bindPopup(html);

        // Add marker to the list
        markers.push(marker);
    }

    // Create a cluster layer and add all markers to it.
    var clusterLayer = new L.MarkerClusterGroup();
    for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];
        clusterLayer.addLayer(marker);
    }
    map.addLayer(clusterLayer);

    // Visualize the map.
    // We get the map center and zoom from the container element.
    // ('data-center' and 'map-zoom' element attributes)
    var mapCenter = mapContainer.data('center');
    var mapZoom = mapContainer.data('zoom');
    map.setView(mapCenter, mapZoom);

})