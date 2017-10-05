require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/Camera",
    "esri/geometry/Point",
    "esri/widgets/Search",
    "dojo/domReady!"
], function(Map, SceneView, FeatureLayer, Camera, Point, Search){

    var serviceUrl = "http://services1.arcgis.com/mRXrgD3LWwGHJmpS/arcgis/rest/services/noco_rec_sites/FeatureServer/4";
    var view;
    var map;
    var initialCamera = {
        "position": [
            -105.42775673320733,
            40.72251708321131,
            4716.164163470268
        ],
        "heading": 221.26084949235252,
        "tilt": 80.32454718245218
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

    view.then(function() {
        displayCameraStuff();
    });

    var searchWidget = new Search({
        view: view
    });

    // Add the search widget to the very top left corner of the view
    view.ui.add(searchWidget, {
        position: "top-left",
        index: 0
    });

    var layer = new FeatureLayer({
        url: serviceUrl
    });
    map.layers.add(layer);

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