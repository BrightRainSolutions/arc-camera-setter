require([
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/layers/ImageryLayer",
    "esri/layers/FeatureLayer",
    "esri/Camera",
    "esri/geometry/Point",
    "dojo/domReady!"
], function(Map, MapView, SceneView, ImageryLayer, FeatureLayer, Camera, Point){

    //var serviceUrl = "http://54.202.189.7:6080/arcgis/rest/services/Whiting/Whiting_Pad_Collection/ImageServer";
    var serviceUrl = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/CharlotteLAS/ImageServer";
    var view;
    var map;
    var initialCamera = {
        "position": [
            -103.2492333,
            47.4294789,
            25500
        ],
        "heading": 10.46,
        "tilt": 41.67
    }

    map = new Map({
        //basemap: "topo-vector",
        basemap: "terrain",
        //basemap: "satellite",
        //basemap: "hybrid",
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

    var imageLayer = new ImageryLayer({
        url: serviceUrl
    });
    map.layers.add(imageLayer);

    view.on("drag", displayCameraStuff);
    view.on("mouse-wheel", displayCameraStuff);

    function displayCameraStuff() {
        document.getElementById("xValue").innerHTML = view.camera.position.latitude;
        document.getElementById("yValue").innerHTML = view.camera.position.longitude;
        document.getElementById("altitudeValue").innerHTML = view.camera.position.z;
        document.getElementById("headingValue").innerHTML = view.camera.heading;
        document.getElementById("tiltValue").innerHTML = view.camera.tilt;
    }

    document.getElementById("tour").addEventListener("click", tour);
    document.getElementById("reset").addEventListener("click", resetView);

    function resetView() {
        view.camera.position = initialCamera.position;
        view.camera.heading = initialCamera.heading;
        view.camera.tilt = initialCamera.tilt;
    }

    function tour() {
        var tourCamera = new Camera({
            position: new Point({
                x: -80.56627846515312, // lon
                y: 39.525357954961194,      // lat
                z: 1000,   // elevation in meters
            }),

            heading: 152, // facing due south
            tilt: 62      // bird's eye view
        });
        view.goTo(tourCamera)
            .then(function() {
            displayCameraStuff();
            tourCamera.position.x = -80.55173152452032;
            tourCamera.position.y = 39.53050425687086;
            tourCamera.position.z = 1200;
            tourCamera.tilt = 62;
            tourCamera.heading = 191;
            return view.goTo(tourCamera);
        })
            .then(function() {
            displayCameraStuff();
            tourCamera.position.x = -80.5464600744797;
            tourCamera.position.y = 39.52532514723797;
            tourCamera.position.z = 1120;
            tourCamera.tilt = 68;
            tourCamera.heading = 207;
            return view.goTo(tourCamera);
        })
            .then(function() {
            displayCameraStuff();
            tourCamera.position.x = -80.57004058690616;
            tourCamera.position.y = 39.508238080894714;
            tourCamera.position.z = 1032;
            tourCamera.tilt = 70;
            tourCamera.heading = 192;
            return view.goTo(tourCamera);
        })
            .then(function() {
            displayCameraStuff();
            tourCamera.position.x = -80.56883042912347;
            tourCamera.position.y = 39.501104197327166;
            tourCamera.position.z = 439;
            tourCamera.tilt = 71;
            tourCamera.heading = 240;
            return view.goTo(tourCamera);
        })
            .then(function() {
            displayCameraStuff();
            tourCamera.position.x = -80.58325193899987;
            tourCamera.position.y = 39.50027792225329;
            tourCamera.position.z = 793;
            tourCamera.tilt = 73;
            tourCamera.heading = 178;
            return view.goTo(tourCamera);
        });;
    }

});