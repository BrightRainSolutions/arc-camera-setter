require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Search",
    "dojo/domReady!"
], function (Map, SceneView, FeatureLayer, Search) {
    const app = new Vue({
        el: "#app",
        data: {
            map: Object,
            view: Object,
            camera: {
                position: {
                    latitude: 0,
                    longitude: 0,
                    z: 0   
                },
                heading: 0,
                tilt: 0,
                fov: 0
            },
            initialCamera: {
                "position": [
                    -105.4278,
                    40.72,
                    4716
                ],
                "heading": 0,
                "tilt": 50
            },
            serviceUrl: "http://services1.arcgis.com/mRXrgD3LWwGHJmpS/arcgis/rest/services/noco_rec_sites/FeatureServer/4"
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.map = new Map({
                    //basemap: "topo-vector",
                    //basemap: "terrain",
                    //basemap: "satellite",
                    basemap: "hybrid",
                    ground: "world-elevation"
                });

                this.view = new SceneView({
                    container: "map",
                    map: this.map,
                    camera: this.initialCamera,
                    constraints: {
                        maxScale: 0 // User can overzoom tiles
                    }
                });

                this.view.when(() => {
                    this.camera = this.view.camera;
                    var layer = new FeatureLayer({
                        url: this.serviceUrl
                    });
                    this.map.layers.add(layer);
                    layer.when(() => {
                        this.view.extent = layer.fullExtent;
                        this.updateCameraDisplay();
                    });
                });

                var searchWidget = new Search({
                    view: this.view
                });

                // Add the search widget to the very top left corner of the view
                this.view.ui.add(searchWidget, {
                    position: "top-left",
                    index: 0
                });

                this.view.on("drag", this.updateCameraDisplay);
                this.view.on("mouse-wheel", this.updateCameraDisplay);

                var clipboard = new Clipboard('#copyCamera');
                clipboard.on('success', function (e) {
                    e.clearSelection();
                    var s = document.getElementById('copySuccess').style;
                    s.display = "block";
                    setTimeout(function () {
                        s.display = "none";
                    }, 1500);
                });
            },
            updateCameraDisplay() {
                // just re-setting our vue data camera to the view camera forces the update
                // ToDo: is there a way to get a 'live' handle to the camera so we don't even have to hook up events?
                this.camera = this.view.camera;
            }
        }
    });
});