<script lang="ts">
    // Imports
    import OpenLayerMap from "../../lib/components/OpenLayerMap.svelte";
	import type Layer from "ol/layer/Layer";
	import TileLayer from "ol/layer/Tile";
	import { OSM } from "ol/source";
	import { Map, Overlay } from "ol";
	import { onMount } from "svelte";
    import { mapBaseLayers, mapTileLayers, dashboardLayers, obliqueLayers, sopLayers, lidarLayers, fotoLayers } from "../../lib/utils/mapLayers";
    import { createLayerSwitcher, refreshLayer, getInfo } from "../../lib/utils/mapFunctions";
    import { getFR24EX, getFR24Vik} from "../../lib/utils/heartbeatFunctions";
    import { mapView } from "../../lib/utils/mapView";
    import View from 'ol/View';
    import proj4 from "proj4";
    import { get } from "ol/proj";
    import { register } from "ol/proj/proj4";

    

    

   

    // Variables
    let map1: Map;
    let map2: Map;
    let map3: Map;
    let map4: Map;

    const x = 607933;
    const y = 6230000;
    const zoom = 8;

    const mapSrs = "EPSG:25832"
    proj4.defs(mapSrs,"+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    register(proj4);
    const dkProjection = get(mapSrs);

    const mapView1 = new View({
        center: [x, y], 
        projection: <any> dkProjection, 
        zoom: zoom 
    });

    const mapView2 = new View({
        center: [x, y], 
        projection: <any> dkProjection, 
        zoom: zoom 
    });

    const mapView3 = new View({
        center: [x, y], 
        projection: <any> dkProjection, 
        zoom: zoom 
    });

    const mapView4 = new View({
        center: [x, y], 
        projection: <any> dkProjection, 
        zoom: zoom 
    });
    
    
    


    onMount(()=> { 
        
        map1 = new Map({
            layers: [...dashboardLayers],
            target: 'map1',
            view: mapView1,
            controls: []
        });
        createLayerSwitcher(dashboardLayers, 'map1Layerswitcher', false, 'map1')

        map2 = new Map({
            layers: [...obliqueLayers],
            target: 'map2',
            view: mapView2,
            controls: []
        });
        createLayerSwitcher(obliqueLayers, 'map2Layerswitcher', false, 'map2')

        map3 = new Map({
            layers: [...fotoLayers],
            target: 'map3',
            view: mapView3,
            controls: []
        });
        createLayerSwitcher(fotoLayers, 'map3Layerswitcher', false, 'map3')

        map4 = new Map({
            layers: [ ...lidarLayers],
            target: 'map4',
            view: mapView4,
            controls: []
        });
        createLayerSwitcher(lidarLayers, 'map4Layerswitcher', false, 'map4')
        // Refreshes active fly layer every minute
        refreshLayer(dashboardLayers[2], 60000)
        refreshLayer(obliqueLayers[3], 300000)
        refreshLayer(obliqueLayers[4], 300000)
        refreshLayer(fotoLayers[3], 300000)
        refreshLayer(fotoLayers[4], 300000)
        refreshLayer(lidarLayers[3], 300000)
        refreshLayer(lidarLayers[4], 300000)


        // test popup
        getInfo(map1, dashboardLayers, 'popup1', 'popup-closer1', 'popup-content1')
        getInfo(map2, obliqueLayers, 'popup2', 'popup-closer2', 'popup-content2')
        getInfo(map3, fotoLayers, 'popup3', 'popup-closer3', 'popup-content3')
        getInfo(map4, lidarLayers, 'popup4', 'popup-closer4', 'popup-content4')

    })

    

</script>

<div id="popup1" class="ol-popup">
    <a href="#" id="popup-closer1" class="ol-popup-closer"></a>
    <div id="popup-content1"></div>
</div>
<div id="popup2" class="ol-popup">
    <a href="#" id="popup-closer2" class="ol-popup-closer"></a>
    <div id="popup-content2"></div>
</div>
<div id="popup3" class="ol-popup">
    <a href="#" id="popup-closer3" class="ol-popup-closer"></a>
    <div id="popup-content3"></div>
</div>
<div id="popup4" class="ol-popup">
    <a href="#" id="popup-closer4" class="ol-popup-closer"></a>
    <div id="popup-content4"></div>
</div>

<div class="title">
    <div class="titlewrapper">
        <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="100">
        <h1>Job dashboard</h1>
    </div>
    
    <div class="FrameWrapper">
        <iframe src="https://dmweb.sdfe.dk/maps/C1507145_PullFR24.html" title="description" frameborder=0 ></iframe>
        <iframe src="https://dmweb.sdfe.dk/maps/C1507145_PullFR24_Vik.html" title="description" frameborder=0 ></iframe>
    </div>
    
    </div>
<div class="mapCon">
    <div id="map1">
        <div class="controlPanel left" id="map1Layerswitcher"></div>
        
    </div>
    <div id="map2">
        
        <div class="controlPanel right" id="map2Layerswitcher"></div>
        
    </div>
    <div id="map3">
        
        <div class="controlPanel left" id="map3Layerswitcher"></div>
        
    </div>
    <div id="map4">
        
        <div class="controlPanel right" id="map4Layerswitcher"></div>
        
    </div>
</div>



    



<style>
    .mapCon {
        display: flex;
        flex-wrap: wrap;
        height: calc(100vh - 100px);
        box-sizing: border-box;
    }
    #map1, #map2, #map3, #map4 {
        position: relative;
        flex: 1 0 40%;
        border: #71a5de 6px solid;
        padding: 0px;
        margin: 5px;
    }
    #map1, #map2 {
        /* top: 100px; */
    }
    #map3, #map4 {
        /* bottom: 10px; */
    }
    #map1, #map3 {
        /* right: 5px; */
    }
    #map2, #map4 {
        /* left: 5px; */
    }
    .controlPanel {
        z-index: 1000;
        position: absolute;
        border: solid #71a5de 3px;
        border-radius: 20px;
        width: 200px;
        height: 90%;
        top: 20px;
        left: 20px;
        background-color: rgba(218, 218, 218, 0.836) ;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    .controlPanel.right {
        left: unset;
        right: 20px;
    }
    .controlPanel.left {
        left: 20px;
        right: unset;
    }
    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        width: 100%;
        font-size: 2em;
        font-weight: bold;
        box-sizing: border-box;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.61);
        border-radius: 20px;
        color: aliceblue;
    }
    iframe {
        height: 75px;
        width: 120px;
        border: 5px solid black;
        border-radius: 5px;
        background-color: aliceblue;
        margin-right: 10px;
    }
    .FrameWrapper {
        display: flex;
        flex-direction: row;
        justify-content: right;

        height: 100%;
        flex: 1;  
    }
    .titlewrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        flex: 1;
       
    }
    .ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
    }

    .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
    }

    .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
    }

    .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;
    }

    .ol-popup-closer:after {
        content: "✖";
    }

    
    
</style>