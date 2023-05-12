<script lang="ts">
    import { Map, View } from "ol";
    import { onMount } from "svelte";
    import { histOrtoLayers} from "../../../lib/utils/mapLayers";
    import { createLayerSwitcher, getLegendUrl,  setOpacitySliders, setOpacity, addPointLayer, addMapClickEvent} from "../../../lib/utils/mapFunctions";
	import { fotoStatusUrl } from "$lib/utils/stores";
	import { register } from "ol/proj/proj4";
	import proj4 from "proj4";
	import { get } from "ol/proj";

    let map: Map;
    export const title = "DataFordeleren Tiles";

    const x = 720967;
    const y = 6212374;
    const zoom = 13;

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
            layers: [...histOrtoLayers],
            target: 'map',
            view: mapView1,
            controls: []
        });
        // build wms layer and add to map




        
        createLayerSwitcher(histOrtoLayers, 'layerSwitcher', false , 'map', 'Layers' );
    
        
    })

</script>

<div class="title">
    <img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="80">
    <h1>Hist Orto Fotos Demo</h1>
</div>
<div class="mapCon">
    <div id="map">
    </div>
    <div class="mapOverlay leftOverlay" id="panel" >
        <div id="layerSwitcher">
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