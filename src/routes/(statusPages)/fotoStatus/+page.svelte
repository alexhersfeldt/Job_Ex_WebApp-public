<script lang="ts">
    import { Map, View } from "ol";
    import { onMount } from "svelte";
    import { fotoStatusLayers} from "../../../lib/utils/mapLayers";
    import { createLayerSwitcher, getLegendUrl,  setOpacitySliders, setOpacity, addPointLayer, addMapClickEvent} from "../../../lib/utils/mapFunctions";
	import { fotoStatusUrl } from "$lib/utils/stores";
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
            layers: [...fotoStatusLayers],
            target: 'map',
            view: mapView1,
            controls: []
        });

        
        createLayerSwitcher(fotoStatusLayers, 'tileLayerSwitcher', false , 'map', 'Layers', fotoStatusUrl );

        fotoStatusUrl.set(getLegendUrl(fotoStatusLayers[2]));
        
    })

</script>

<div class="title">
    <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="80">
    <h1>Tile Info</h1>
</div>
<div class="mapCon">
    <div id="map">
    </div>
    <div id="mapInfo">
        <!-- <div id="baseLayerSwitcher"> 
        </div>
        <hr class="solid"> -->
        <div id="tileLayerSwitcher">
        </div>
        
    </div>
    <div class="featureInfo">
        {#if fotoStatusUrl}
            <div class="legend" id="legend">
                <h2 class="legendTitle">Legend</h2>
                <img id="legendImage" src= {$fotoStatusUrl} alt="Legend">
            </div>
        {/if}   
        
        <hr class="solid">
        <h2>Info</h2>
        <hr class="solid">
        <div class="wmsRes">
        </div>
    </div>
</div> 



<style>
    .legend{
        
        width: 200px;
        height: 100%;
        top: 20px;
        right: 20px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
  #map {
        position: absolute;
        border-radius: 20px;
        margin: 0px;
        border: 0px;
        width: 100%;
        height: 100%;
        left: 0px;
    }
    #mapInfo {
        position: absolute;
        border: solid #71a5de 3px;
        border-radius: 20px;
        width: 15%;
        height: auto;
        top: 20px;
        left: 20px;
        background-color: rgba(218, 218, 218, 0.836) ;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    .mapCon {
        position: absolute;
        height: calc(100vh - 50px);
        box-sizing: border-box;
        width: 100%;
        top: 50px;
        left: 0px;
        border: #71a5de 5px solid;
    }
    .featureInfo {
        position: absolute;
        border: solid #71a5de 3px;
        border-radius: 20px;
        width:  auto;
        height: auto;
        top: 20px;
        right: 20px;
        background-color: rgba(218, 218, 218, 0.836) ;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
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