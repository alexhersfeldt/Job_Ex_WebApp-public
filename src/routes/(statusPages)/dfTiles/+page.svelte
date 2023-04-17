<script lang="ts">
    import { Map, View } from "ol";
    import { onMount } from "svelte";
    import { mapBaseLayers, mapTileLayers } from "../../../lib/utils/mapLayers";
    import { createLayerSwitcher, getLegendUrl,  setOpacitySliders, setOpacity, addPointLayer, addMapClickEvent} from "../../../lib/utils/mapFunctions";
    import { mapView } from "../../../lib/utils/mapView";
	import { dftilesURL } from "$lib/utils/stores";
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

    // Map views for each map

    const mapView1 = new View({
        center: [x, y], 
        projection: <any> dkProjection, 
        zoom: zoom 
    });

   

    onMount(()=> { 

        // create map
        map = new Map({
            layers: [...mapBaseLayers, ...mapTileLayers],
            target: 'map',
            view: mapView1,
            controls: []
        });

        // create layer switcher
        createLayerSwitcher(mapBaseLayers, 'baseLayerSwitcher', true, 'map', 'Background');
        createLayerSwitcher(mapTileLayers, 'layerSwitcher', true , 'map', 'Tiles', dftilesURL );

        // set opacity using index in layer array
        setOpacity(0, mapTileLayers);
        setOpacity(1, mapTileLayers);
        setOpacity(2, mapTileLayers);
        setOpacity(3, mapTileLayers);

        // set opacityslider start positions using index of all map layers
        setOpacitySliders(2);
        setOpacitySliders(3);
        setOpacitySliders(4);
        setOpacitySliders(5);
        
        let pointLayerSource = addPointLayer(map);
        addMapClickEvent(map, mapTileLayers, pointLayerSource);

        dftilesURL.set(getLegendUrl(mapTileLayers[0]));
        
    })

</script>

<div class="title">
    <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="80">
    <h1>Tile Info</h1>
</div>
<div class="mapCon">
    <div id="map">
    </div>
    <div class="mapOverlay leftOverlay" >
        <div id="baseLayerSwitcher">   
        </div>
        <hr class="solid">
        <div id="layerSwitcher">
        </div>
        
    </div>
    <div class="mapOverlay rightOverlay">
        {#if dftilesURL}
            <div class="legend" id="legend">
                <h2>Legend</h2>
                <img id="legendImage" src= {$dftilesURL} alt="Legend">
            </div>
        {/if}   
        
        <hr class="solid">
        <div class="wmsRes">
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

    #rightOverlay {   
        right: 20px;   
    }
    #leftOverlay {   
        left: 20px;   
    }
    hr{
        border: #71a5de 0px solid; 
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
    .wmsRes {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    
    
</style>