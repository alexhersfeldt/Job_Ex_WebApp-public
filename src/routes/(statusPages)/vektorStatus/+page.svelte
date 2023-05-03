<script lang="ts">
    import { Map, View } from "ol";
    import { onMount } from "svelte";
    import { addLayerSwitcher, addTitleH2, getLegendUrlFromLayer, setOpacityToHalf } from "$lib/utils/mapOverlayFunctions";
	import { addPointLayer, getWMSInfoAndAddPointArray } from "$lib/utils/mapFunctions";
	
    import { vektorStatusLayers, statusMapsBaseLayers} from "../../../lib/utils/mapLayers";
	import { vektorStatusUrl } from "$lib/utils/stores";
    import { makeMapView } from "$lib/utils/mapView";

    let map: Map;
    export const title = "DataFordeleren Tiles";
    const zoom = 8;
   

    onMount(()=> { 

        // create map
        map = new Map({
            layers: [ ...statusMapsBaseLayers,...vektorStatusLayers],
            target: 'map',
            view: makeMapView(zoom),
            controls: []
        });
        addTitleH2('GeoDK Status', 'layerSwitcher')
        addLayerSwitcher(statusMapsBaseLayers, 'layerSwitcher', true , 'map');
        addLayerSwitcher(vektorStatusLayers, 'layerSwitcher', true , 'map');

        

        vektorStatusUrl.set(getLegendUrlFromLayer(vektorStatusLayers[0]));
        let pointLayerSource = addPointLayer(map);
        const infoLayer = [vektorStatusLayers[0]];
        getWMSInfoAndAddPointArray(map, vektorStatusLayers, pointLayerSource);
        
    })

</script>

<div class="title">
    <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="80">
    <h1>GeoDK Status</h1>
</div>
<div class="mapCon">
    <div id="map">
    </div>
    <div class="mapOverlay leftOverlay" id="panel" >
        <div id="layerSwitcher">
        </div>
        {#if vektorStatusUrl}
            <div class="legend" id="legend">
                <h2 class="legendTitle">Legend</h2>
                <img id="legendImage" src= {$vektorStatusUrl} alt="Legend">
            </div>
        {/if} 
        
    </div>
    <div class="mapOverlay rightOverlay" id="panel" >
        
        <h2>Info</h2>
        <hr class="solid">
        <div id="wmsRes">
        </div>
        
    </div>
</div> 



<style>
     #panel{
        width:15%;
    }
    hr{
        border: #71a5de 3px solid; 
        border-radius: 3px;
        width: 100%;
    } 
    .title {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
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
    
    
</style>