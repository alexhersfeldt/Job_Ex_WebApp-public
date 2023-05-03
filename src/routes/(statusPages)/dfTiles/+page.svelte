<script lang="ts">
    import { Map, View } from "ol";
    import { onMount } from "svelte";
    
	import { dfTilesURL } from "$lib/utils/stores";
	import { addLayerSwitcher, addTitleH2, getLegendUrlFromLayer, setOpacityToHalf } from "$lib/utils/mapOverlayFunctions";
	import { addPointLayer, getWMSInfoAndAddPointArray } from "$lib/utils/mapFunctions";
	import { mapBaseLayers, mapTileLayers } from "$lib/utils/mapLayers";
	import { makeMapView } from "$lib/utils/mapView";

    let map: Map;
    const zoom = 8;
   

    onMount(()=> { 

        // create map
        map = new Map({
            layers: [...mapBaseLayers, ...mapTileLayers],
            target: 'map',
            view: makeMapView(zoom),
            controls: []
        });

        // create layer switcher
        addTitleH2('Base Layers', 'baseLayerSwitcher');
        addLayerSwitcher(mapBaseLayers, 'baseLayerSwitcher', true, 'map');
        addLayerSwitcher(mapTileLayers, 'layerSwitcher', true , 'map', dfTilesURL );

        // set opacity using index in layer array
        setOpacityToHalf(0, mapTileLayers);
        setOpacityToHalf(1, mapTileLayers);
        setOpacityToHalf(2, mapTileLayers);
        setOpacityToHalf(3, mapTileLayers);
        
        let pointLayerSource = addPointLayer(map);
        getWMSInfoAndAddPointArray(map, mapTileLayers, pointLayerSource);

        dfTilesURL.set(getLegendUrlFromLayer(mapTileLayers[0]));
        
    })

</script>

<div class="title">
    <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="80">
    <h1>Tile Info</h1>
</div>
<div class="mapCon">
    <div id="map">
    </div>
    <div class="mapOverlay leftOverlay" id="layerSwitcher" >
        <div id="baseLayerSwitcher">   
        </div>
        <hr class="solid">
        <div id="layerSwitcher">
        </div>
        
    </div>
    <div class="mapOverlay rightOverlay">
        {#if dfTilesURL}
            <div class="legend" id="legend">
                <h2>Legend</h2>
                <img id="legendImage" src= {$dfTilesURL} alt="Legend">
            </div>
        {/if}   
        
        <hr class="solid">
        <div id="wmsRes">
        </div>
    </div>
</div> 



<style>
    .legend{
        
        width: 15%;
        height: 100%;
        background-color: rgba(218, 218, 218, 0.836) ;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }

    .rightOverlay {   
        right: 20px;   
    }
    .leftOverlay {   
        left: 20px;   
    }
    hr{
        border: #71a5de 0px solid; 
        border-radius: 3px;
        width: 15%;
    } 
    .title {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #71a5de;
    } 
    .title img {
        height: 45px;
        flex: 3;
    }
    .title h1 {
        flex: 4;
        font-size: 2rem;
        color: white;
    }
    #wmsRes {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    #layerSwitcher {
        width: 15%;
    }
    
</style>