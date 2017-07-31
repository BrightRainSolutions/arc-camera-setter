require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/Camera",
    "esri/geometry/Point",
    "dojo/domReady!"
], function(Map, SceneView, FeatureLayer, Camera, Point){

    var serviceUrl = "http://services1.arcgis.com/mRXrgD3LWwGHJmpS/arcgis/rest/services/noco_rec_sites/FeatureServer/4";
    var view;
    var map;
    var initialCamera = {
        "position": [
            -105.79092962768539,
            40.55333706867913,
            11606.354150707833
        ],
        "heading": 314.45970774351497,
        "tilt": 48.867987042748716
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