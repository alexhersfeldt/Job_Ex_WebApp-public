<script lang="ts">
    // Imports
    
	import { Map, Overlay } from "ol";
	import { onMount } from "svelte";
	import { map1URL, map2URL, map3URL, map4URL } from "$lib/utils/stores";
	import { makeMapView } from "$lib/utils/mapView";
	import { dashboardLayers, fotoLayers, lidarLayers, obliqueLayers } from "$lib/utils/mapLayers";
	import { addLayerSwitcher, addTitleH2, getLegendUrlFromLayer } from "$lib/utils/mapOverlayFunctions";
	import { getWMSInfoAndAddPopup, refreshLayer } from "$lib/utils/mapFunctions";

    // Variables
    let map1: Map;
    let map2: Map;
    let map3: Map;
    let map4: Map;

   
    const zoom = 8.5;

    onMount(()=> { 
        
        // Create maps
        map1 = new Map({
            layers: [...dashboardLayers],
            target: 'map1',
            view: makeMapView(zoom),
            controls: []
        });
        addTitleH2('Overblik', 'map1Layerswitcher')
        addLayerSwitcher(dashboardLayers, 'map1Layerswitcher', false, 'map1')

        map2 = new Map({
            layers: [...obliqueLayers],
            target: 'map2',
            view: makeMapView(zoom),
            controls: []
        });
        addTitleH2('Oblique', 'map2Layerswitcher')
        addLayerSwitcher(obliqueLayers, 'map2Layerswitcher', false, 'map2')

        map3 = new Map({
            layers: [...fotoLayers],
            target: 'map3',
            view: makeMapView(zoom),
            controls: []
        });
        addTitleH2('GeoDK', 'map3Layerswitcher')
        addLayerSwitcher(fotoLayers, 'map3Layerswitcher', false, 'map3')

        map4 = new Map({
            layers: [ ...lidarLayers],
            target: 'map4',
            view: makeMapView(zoom),
            controls: []
        });
        addTitleH2('Lidar', 'map4Layerswitcher')
        addLayerSwitcher(lidarLayers, 'map4Layerswitcher', false, 'map4' )


        // Refreshes active fly layer every minute
        refreshLayer(dashboardLayers[2], 60000, map1)
        refreshLayer(dashboardLayers[3], 60000, map1)

        refreshLayer(obliqueLayers[2], 60000, map2)
        refreshLayer(obliqueLayers[3], 300000, map2)
        refreshLayer(obliqueLayers[4], 300000, map2)

        refreshLayer(fotoLayers[2], 60000, map3)
        refreshLayer(fotoLayers[3], 300000, map3)
        refreshLayer(fotoLayers[4], 300000, map3)

        refreshLayer(lidarLayers[2], 60000, map4)
        refreshLayer(lidarLayers[3], 300000, map4)
        refreshLayer(lidarLayers[4], 300000, map4)


        // test popup
        getWMSInfoAndAddPopup(map1, dashboardLayers, 'popup1', 'popup-content1', 'popup-closer1')
        getWMSInfoAndAddPopup(map2, obliqueLayers, 'popup2', 'popup-content2', 'popup-closer2')
        getWMSInfoAndAddPopup(map3, fotoLayers, 'popup3', 'popup-content3', 'popup-closer3')
        getWMSInfoAndAddPopup(map4, lidarLayers, 'popup4', 'popup-content4', 'popup-closer4')

        map1URL.set(getLegendUrlFromLayer(dashboardLayers[3]));
        map2URL.set(getLegendUrlFromLayer(obliqueLayers[2]));
        map3URL.set(getLegendUrlFromLayer(fotoLayers[2]));
        map4URL.set(getLegendUrlFromLayer(lidarLayers[2]));
        
        

    })

    

</script>

<div id="popup1" class="ol-popup">
    <div id="popup-content1"></div>
    <button id="popup-closer1" class="ol-popup-closer">Close</button>
</div>

<div id="popup2" class="ol-popup">
    <div id="popup-content2"></div>
    <button id="popup-closer2" class="ol-popup-closer">Close</button>
</div> 

<div id="popup3" class="ol-popup">
    <div id="popup-content3"></div>
    <button id="popup-closer3" class="ol-popup-closer">Close</button>
</div>

<div id="popup4" class="ol-popup">
    <div id="popup-content4"></div>
    <button id="popup-closer4" class="ol-popup-closer">Close</button>
</div>

<div class="title">
    <div class="iconwrapper">
        <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="100">
    </div>
    <div class="titlewrapper">
        <h1>Job Dashboard</h1>
    </div>
    
    <div class="FrameWrapper">
        <iframe src="https://dmweb.sdfe.dk/maps/C1507145_PullFR24.html" title="description" frameborder=0 ></iframe>
        <iframe src="https://dmweb.sdfe.dk/maps/C1507145_PullFR24_Vik.html" title="description" frameborder=0 ></iframe>
        <form action="/logout" method="POST">
            <button class="btn logout" type="submit">Logout</button>
        </form>
    </div>
    
    </div>
<div class="mapConDash">
    <div id="map1">
        <div class="mapOverlay leftOverlay" id="map1Layerswitcher"></div>
        {#if map1URL}
            <div class="mapOverlay rightOverlay" id="legend">
                <h2 class="legendTitle">Legend</h2>
                <img id="legendImage" src= {$map1URL} alt="Legend">
            </div>
        {/if} 
        
    </div>
    <div id="map2">
        {#if map2URL}
            <div class="mapOverlay leftOverlay" id="legend">
                <h2 class="legendTitle">Legend</h2>
                <img id="legendImage" src= {$map2URL} alt="Legend">
            </div>
        {/if}
        
        <div class="mapOverlay rightOverlay" id="map2Layerswitcher"></div>
        
    </div>
    <div id="map3">
        {#if map3URL}
            <div class="mapOverlay rightOverlay" id="legend">
                <h2 class="legendTitle">Legend</h2>
                <img id="legendImage" src= {$map3URL} alt="Legend">
            </div>
        {/if}
        
        <div class="mapOverlay leftOverlay" id="map3Layerswitcher"></div>
        
    </div>
    <div id="map4">
        {#if map4URL}
            <div class="mapOverlay leftOverlay" id="legend">
                <h2 class="legendTitle">Legend</h2>
                <img id="legendImage" src= {$map4URL} alt="Legend">
            </div>
        {/if}
        
        <div class="mapOverlay rightOverlay" id="map4Layerswitcher"></div>
        
    </div>
</div>



    



<style>
    .mapConDash {
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
    }
    #map1, #map3 {
        border-right: #71a5de 3px solid;
    }
    #map2, #map4 {
        border-left:#71a5de 3px solid;
    }
    #map1, #map2 {
        border-bottom: #71a5de 3px solid;
    }
    #map3, #map4 {
        border-top: #71a5de 3px solid;
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
        background-color: #71a5de;
        color: aliceblue;
        margin: 0px;
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
    .iconwrapper {
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
        min-width: 250px;
    }

    button {
        background-color: #71a5de;
        border: none;
        color: white;
        padding: 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        margin-top: 20px;
        cursor: pointer;
        border-radius: 12px;
        width: 100%;
    }
    button:hover {
        box-shadow:0px 0px 0px 3px #166cc9 inset;
    }

    .logout {
        border : 1px solid #3e6b9b;
    }

    
    
</style>