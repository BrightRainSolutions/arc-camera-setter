require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Search",
    "dojo/domReady!"
], function(Map, SceneView, FeatureLayer, Search){

    var serviceUrl = "http://services1.arcgis.com/mRXrgD3LWwGHJmpS/arcgis/rest/services/noco_rec_sites/FeatureServer/4";
    var view;
    var map;
    var initialCamera = {
        "position": [
            -105.4278,
            40.72,
            4716
        ],
        "heading": 0,
        "tilt": 50
    }

    map = new Map({
        //basemap: "topo-vector",
        //basemap: "terrain",
        //basemap: "satellite",
        basemap: "hybrid",
        ground: "world-elevation"
    });

    view = new SceneView({
        container: "map",
        map: map,
        camera: initialCamera,
        constraints: {
            maxScale: 0  // User can overzoom tiles
        }
    });

    view.when(function() {
        var layer = new FeatureLayer({
            url: serviceUrl
        });
        map.layers.add(layer);
        layer.when(function(){
            view.extent = layer.fullExtent;
            displayCameraStuff();
        });   
    });

    var searchWidget = new Search({
        view: view
    });

    // Add the search widget to the very top left corner of the view
    view.ui.add(searchWidget, {
        position: "top-left",
        index: 0
    });

    view.on("drag", displayCameraStuff);
    view.on("mouse-wheel", displayCameraStuff);

    function displayCameraStuff() {
        document.getElementById("xValue").innerHTML = view.camera.position.latitude;
        document.getElementById("yValue").innerHTML = view.camera.position.longitude;
        document.getElementById("altitudeValue").innerHTML = view.camera.position.z;
        document.getElementById("headingValue").innerHTML = view.camera.heading;
        document.getElementById("tiltValue").innerHTML = view.camera.tilt;
    }

    var clipboard = new Clipboard('#copyCamera');
    clipboard.on('success', function(e) {
        e.clearSelection();
        var s = document.getElementById('copySuccess').style;
        s.display = "block";
        setTimeout(function() {s.display="none";},1500);
    });
});