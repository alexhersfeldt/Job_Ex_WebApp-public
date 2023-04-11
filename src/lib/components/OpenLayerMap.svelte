<script lang="ts">

    // --------------------------------- Imports ---------------------------------
    
    import { onMount } from "svelte";
    // import { Feature, Map } from "ol";
	import { mapView } from "../utils/mapView";	
	import type Layer from "ol/layer/Layer";
    import type LayerRenderer from "ol/renderer/Layer";
	import type { TileWMS } from "ol/source";
	import { Point } from "ol/geom";
	import Style from "ol/style/Style";
	import Fill from "ol/style/Fill";
    import CircleStyle from 'ol/style/Circle.js';
	import VectorSource from "ol/source/Vector";
	import VectorLayer from "ol/layer/Vector";
	import type { ProjectionLike } from "ol/proj";
	


    // --------------------------------- Variables ---------------------------------
    // export let map: Map;
    // let view = mapView
    // export let baseLayers: Layer<any, LayerRenderer<any>>[]
    // export let infoLayers: Layer<any, LayerRenderer<any>>[]

    // --------------------------------- Functions ---------------------------------

    // convert string to number
    function convertToNumber(string: string) {
        let number = Number(string)
        return number
    }

    // Create slider to change each layer's opacity
    async function createOpacitySlider(layer: Layer<any, LayerRenderer<any>>, target: string) {
        let layerSwitcher = document.getElementById(target)!
        let opacitySlider = document.createElement('input')!
        opacitySlider.className = 'opacitySlider'
        opacitySlider.setAttribute('type', 'range')
        opacitySlider.setAttribute('min', '0')
        opacitySlider.setAttribute('max', '1')
        opacitySlider.setAttribute('value', '1')
        opacitySlider.setAttribute('step', '0.1')
        opacitySlider.setAttribute('id', 'opacitySlider')
        opacitySlider.style.cssText = 'width:95%; height:30px; border:none; border-radius:10px; margin:5px;'
        opacitySlider.addEventListener('input', function() {
            layer.setOpacity(convertToNumber(opacitySlider.value))
        })
        layerSwitcher.appendChild(opacitySlider)
    }
    
    // function that takes a string and removes spaces and makes it lowercase
    function removeSpacesAndLowercase(string: string) {
        let newString = string.replace(/\s/g, '')
        newString = newString.toLowerCase()
        return newString
    }

    // function that creates layer switcher and adds button for each map layer
    export async function createLayerSwitcher(layers : Layer<any, LayerRenderer<any>>[], target: string) {
        let layerSwitcher = document.getElementById(target)!
        layers.forEach(layer => {
            let button = document.createElement('button')
            button.className = removeSpacesAndLowercase(layer.get('title'))
            button.innerHTML = layer.get('title')
            button.style.cssText = 'width:95%; height:30px; border:none; border-radius:10px; margin:5px;'
            button.onmouseout = ()=> {button.style.border = 'none'}
            button.onmouseover = ()=> {button.style.border = '2px solid #71a5de'}
            button.addEventListener('click', function() {
                if (layer.getVisible()) {
                    layer.setVisible(false)
                    button.style.backgroundColor = '#f8f9fb' 
                } else {
                    button.style.backgroundColor = '#83b0e1'
                    layer.setVisible(true)
                    // set all other layers to invisible
                    layers.forEach(layer => {
                        if (layer.get('title') !== button.innerHTML) {
                            layer.setVisible(false)
                            let otherButton = document.getElementsByClassName(removeSpacesAndLowercase(layer.get('title')))[0] as HTMLButtonElement
                            otherButton.style.backgroundColor = '#f8f9fb'
                        }
                    })    
                }
            })
            layerSwitcher.appendChild(button)
            createOpacitySlider(layer, target)
        })
        // get first button and set it to active
        let firstButton = document.getElementsByClassName(removeSpacesAndLowercase(layers[0].get('title')))[0] as HTMLButtonElement
        // check if first button is OSM
        if (firstButton.innerHTML !== 'OSM') {
            firstButton.style.backgroundColor = '#f8f9fb'
        } else {
            firstButton.style.backgroundColor = '#83b0e1'
        }
    }

    // function that returns active layers on map
    // function getActiveLayers() {
    //     let activeLayers: Layer<any, LayerRenderer<any>>[] = []
    //     infoLayers.forEach(layer => {
    //         if (layer.getVisible()) {
    //             activeLayers.push(layer)
    //         }
    //     })
    //     return activeLayers
    // }

    // Run after html is loaded 
    onMount(()=> {

        // create map
        // map = new Map({
        //     layers: [...baseLayers, ...infoLayers],
        //     target: 'map',
        //     view: view,
        //     controls: []
        // });

        // add layer switcher
        // createLayerSwitcher(baseLayers, 'baseLayerSwitcher')
        // createLayerSwitcher(infoLayers, 'tileLayerSwitcher')

        // set opacity of each layer in a layer group to 0.5
        function setOpacity(layers: Layer<any, LayerRenderer<any>>[]) {
            layers.forEach(layer => {layer.setOpacity(0.5)})
        }
        
        
        // set opacity slider to 0.5 for each  tile layer
        function setOpacitySliders(index: number) {
            let opacitySliders = document.getElementsByClassName('opacitySlider')
            let opacitySlider = opacitySliders[index] as HTMLInputElement
            opacitySlider.value = '0.5'
            
        }

        // layer for storing clicked point
        function addPointLayer(map: Map) {
            let pointLayerSource = new VectorSource({
                    features: []
                })
            let pointLayer = new VectorLayer({
                source: pointLayerSource
            })
            map.addLayer(pointLayer)
            return pointLayerSource
        }
        
        // add click event to map that calls getFeatureInfoUrl on each active layer and adds a blue point to map
        // function addMapClickEvent(resoslution: number, projection: ProjectionLike, activeLayers: Layer<any, LayerRenderer<any>>[], pointLayerSource: VectorSource) {
        //     map.on('singleclick', function(event) {
        //     let coordinate = event.coordinate
        //     // let resoslution = mapView.getResolution()
        //     // let projection = mapView.getProjection()
        //     // let activeLayers = getActiveLayers()

        //     // add single blue point on click
        //     let point = new Feature({
        //         geometry: new Point(coordinate)
        //     })
        //     let pointStyle = new Style({
        //         image: new CircleStyle({
        //             radius: 5,
        //             fill: new Fill({
        //                 color: 'blue'
        //             })
        //         })
        //     })
        //     pointLayerSource.clear()
        //     point.setStyle(pointStyle)
        //     pointLayerSource.addFeature(point)

        //     // for loop that calls getFeatureInfoUrl on each active layer
        //     activeLayers.forEach(layer => { 
        //         let layerSource: TileWMS = layer.getSource()
        //         let url = layerSource.getFeatureInfoUrl(
        //             coordinate, 
        //             resoslution, 
        //             projection, 
        //             {'INFO_FORMAT': 'text/html', 'QUERY_LAYERS': layerSource.getParams().layers}
        //         )
        //         if (url) {
        //             fetch(url)
        //             .then(response => response.text())
        //             .then(data => {
        //                 let featureInfoDiv = document.getElementsByClassName('wmsRes')[0] as HTMLDivElement
        //                 featureInfoDiv.innerHTML = data
        //             })
        //             .catch(error => console.log(error))
        //             }    
        //     })
        // }) 
        // }
         
    })

</script>


<div class="mapCon">
    <div id="map">
    </div>
    <slot></slot>
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
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        border: #71a5de 5px solid;
        /* border-bottom: #71a5de 5px solid; */
    }
    .featureInfo {
        position: absolute;
        border: solid #71a5de 3px;
        border-radius: 20px;
        width: 200px;
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
</style>