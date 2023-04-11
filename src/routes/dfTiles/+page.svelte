<script lang="ts">
    import { Map } from "ol";
    import { onMount } from "svelte";
    import { mapBaseLayers, mapTileLayers } from "../../lib/utils/mapLayers";
    import { createLayerSwitcher,  setOpacitySliders, setOpacity, addPointLayer, addMapClickEvent } from "../../lib/utils/mapFunctions";
    import { mapView } from "../../lib/utils/mapView";

    let map: Map;

    onMount(()=> { 

        // create map
        map = new Map({
            layers: [...mapBaseLayers, ...mapTileLayers],
            target: 'map',
            view: mapView,
            controls: []
        });

        // create layer switcher
        createLayerSwitcher(mapBaseLayers, 'baseLayerSwitcher', true, 'map');
        createLayerSwitcher(mapTileLayers, 'tileLayerSwitcher', true , 'map');

        // set opacity using index in layer array
        setOpacity(0, mapTileLayers);
        setOpacity(1, mapTileLayers);
        setOpacity(2, mapTileLayers);
        setOpacity(3, mapTileLayers);

        // set opacityslider start positions using index of all map layers
        setOpacitySliders(4);
        setOpacitySliders(5);
        setOpacitySliders(6);
        setOpacitySliders(7);
        
        let pointLayerSource = addPointLayer(map);
        addMapClickEvent(map, mapTileLayers, pointLayerSource);
    
    })

</script>



<div class="title">
<img src="https://raw.githubusercontent.com/SDFIdk/.github/main/SDFI_DK_Hvid.svg" alt="SDFI logo" height="80">
<h1>DataFordeleren Tiles</h1>
</div>

<div class="mapCon">
    <div id="map">
    </div>
    <div id="mapInfo">
        <div id="baseLayerSwitcher"> 
        </div>
        <hr class="solid">
        <div id="tileLayerSwitcher">
        </div>
    </div>
    <div class="featureInfo">
        <h2>Tile Info</h2>
        <hr class="solid">
        <div class="wmsRes">
        </div>
    </div>
</div> 



<style>
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
        width: 200px;
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
        height: calc(100vh - 100px);
        box-sizing: border-box;
        width: 100%;
        top: 100px;
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
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #71a5de;
        border-radius: 15px;
        /* margin: 10px; */
    } 
    
</style>