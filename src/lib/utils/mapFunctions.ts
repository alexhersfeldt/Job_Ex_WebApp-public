import type Layer from "ol/layer/Layer"
import type LayerRenderer from "ol/renderer/Layer"
import { onMount } from "svelte";
import { Feature, Map, Overlay } from "ol";
import { mapView } from "../utils/mapView";	
import type { TileWMS } from "ol/source";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import CircleStyle from 'ol/style/Circle.js';
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import type { ProjectionLike } from "ol/proj";


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
export async function createLayerSwitcher(layers : Layer<any, LayerRenderer<any>>[], target: string, exclusive: boolean, mapName: string) {
    let layerSwitcher = document.getElementById(target)!
    layers.forEach(layer => {
        let button = document.createElement('button')
        button.className = removeSpacesAndLowercase(layer.get('title') + mapName)
        button.innerHTML = layer.get('title')
        button.style.cssText = 'width:95%; height:30px; border:none; border-radius:10px; margin:5px;'
        if (layer.getVisible()) {
            button.style.backgroundColor = '#83b0e1'
        } else {
            button.style.backgroundColor = '#f8f9fb'
        }
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
                if (exclusive) {
                    layers.forEach(layer => {
                        if (layer.get('title') !== button.innerHTML) {
                            layer.setVisible(false)
                            let otherButton = document.getElementsByClassName(removeSpacesAndLowercase(layer.get('title')))[0] as HTMLButtonElement
                            otherButton.style.backgroundColor = '#f8f9fb'
                        }
                    })    
                }  
            }
        })
        layerSwitcher.appendChild(button)
        createOpacitySlider(layer, target)
    })

    // get first button and set it to active
    let firstButton = document.getElementsByClassName(removeSpacesAndLowercase(layers[0].get('title') + mapName))[0] as HTMLButtonElement
    firstButton.style.backgroundColor = '#83b0e1'
    // layerSwitcher.appendChild(firstButton)
}

// function that returns active layers on map
export function getActiveLayers(layers: Layer<any, LayerRenderer<any>>[]) {
    let activeLayers: Layer<any, LayerRenderer<any>>[] = [] 
    layers.forEach(layer => {
        if (layer.getVisible()) {
            activeLayers.push(layer)
        }
    })
    return activeLayers
}

// set opacity of each layer in a layer group to 0.5
export async function setOpacity(index:number,  layers: Layer<any, LayerRenderer<any>>[]) {
    layers[index].setOpacity(0.5)
}

// set opacity slider to 0.5 for each  tile layer
export function setOpacitySliders(index: number) {
    let opacitySliders = document.getElementsByClassName('opacitySlider')
    let opacitySlider = opacitySliders[index] as HTMLInputElement
    opacitySlider.value = '0.5'
    
}

// layer for storing clicked point
export function addPointLayer(map: Map) {
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
export function addMapClickEvent(map: Map, wmsLayers: Layer<any, LayerRenderer<any>>[], pointLayerSource: VectorSource) {
    map.on('singleclick', function(event) {
    let coordinate = event.coordinate

    // add single blue point on click
    let point = new Feature({
        geometry: new Point(coordinate)
    })
    let pointStyle = new Style({
        image: new CircleStyle({
            radius: 5,
            fill: new Fill({
                color: 'blue'
            })
        })
    })
    pointLayerSource.clear()
    point.setStyle(pointStyle)
    pointLayerSource.addFeature(point)

    // for loop that calls getFeatureInfoUrl on each active layer

    let activeLayers = getActiveLayers(wmsLayers)
    activeLayers.forEach(layer => { 
        let layerSource: TileWMS = layer.getSource()
        let url = layerSource.getFeatureInfoUrl(
            coordinate, 
            mapView.getResolution()!,
            mapView.getProjection()!, 
            {'INFO_FORMAT': 'text/html', 'QUERY_LAYERS': layerSource.getParams().layers}
        )
        if (url) {
            fetch(url)
            .then(response => response.text())
            .then(data => {
                
                let featureInfoDiv = document.getElementsByClassName('wmsRes')[0] as HTMLDivElement
                featureInfoDiv.innerHTML = data
            })
            .catch(error => console.log(error))
            }    
    })
}) 
}

export function getInfo(map: Map, wmsLayers: Layer<any, LayerRenderer<any>>[], containerName: string, contentName: string, closerName: string) {
    const container = document.getElementById(containerName)!;
    const content = document.getElementById(contentName)!;
    const closer = document.getElementById(closerName)!;

    const popup = new Overlay({
        element: container,
        autoPan: true,
    });

    // function that closes popup when user clicks on x
    closer.onclick = function() {
        map.removeOverlay(popup);
    };

    map.on('singleclick', function(event) {
        
    map.addOverlay(popup);
    popup.setPosition(undefined);
    content.innerHTML = '';
    let coordinate = event.coordinate

    // for loop that calls getFeatureInfoUrl on each active layer

    let activeLayers = getActiveLayers(wmsLayers)
    activeLayers.forEach((layer) => { 

        if (layer.get('title') !== 'Skærmkort') {
  
            let layerSource: TileWMS = layer.getSource()
            let url = layerSource.getFeatureInfoUrl(
                coordinate, 
                mapView.getResolution()!,
                mapView.getProjection()!, 
                {'INFO_FORMAT': 'text/html', 'QUERY_LAYERS': layerSource.getParams().layers}
            )
            if (url) {
                fetch(url)
                .then(response => response.text())
                .then((html) => {
                    if (html != "") {
                        console.log(html);
                        
                        content.innerHTML = html;
                        popup.setPosition(event.coordinate);
                    }
                })
                .catch(error => console.log(error))
            }  
        }  
    })
}) 
}

// function that takes a layer and refreshes it
export async function refreshLayer(layer: Layer<any, LayerRenderer<any>>, interval: number) {
    function doSomething() {
        layer.getSource().refresh()
        
        console.log('Refreshed Layer ' + layer.get('title'));
        setTimeout(doSomething, interval);
    }
    
    setTimeout(doSomething, interval);
}