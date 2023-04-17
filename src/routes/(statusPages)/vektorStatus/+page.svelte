<script lang="ts">
    import { Map, View } from "ol";
    import { onMount } from "svelte";
    import { vektorStatusLayers} from "../../../lib/utils/mapLayers";
    import { createLayerSwitcher, getLegendUrl,  setOpacitySliders, setOpacity, addPointLayer, addMapClickEvent} from "../../../lib/utils/mapFunctions";
	import { vektorStatusUrl } from "$lib/utils/stores";
	import { register } from "ol/proj/proj4";
	import proj4 from "proj4";
	import { get } from "ol/proj";

    let map: Map;
    export const title = "DataFordeleren Tiles";

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

   

    onMount(()=> { 

        // create map
        map = new Map({
            layers: [...vektorStatusLayers],
            target: 'map',
            view: mapView1,
            controls: []
        });

        
        createLayerSwitcher(vektorStatusLayers, 'layerSwitcher', false , 'map', 'Layers', vektorStatusUrl );

        setOpacity(2, vektorStatusLayers);
        setOpacity(3, vektorStatusLayers);
        setOpacity(4, vektorStatusLayers);
        setOpacitySliders(2);
        setOpacitySliders(3);
        setOpacitySliders(4);

        vektorStatusUrl.set(getLegendUrl(vektorStatusLayers[2]));
        let pointLayerSource = addPointLayer(map);
        const infoLayer = [vektorStatusLayers[2], vektorStatusLayers[3]];
        addMapClickEvent(map, infoLayer, pointLayerSource);
        
    })

</script>

<div class="title">
    <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="80">
    <h1>vektor Status</h1>
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
        <div class="wmsRes">
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