import type Layer from "ol/layer/Layer"
import type LayerRenderer from "ol/renderer/Layer"
import { Feature, Map, Overlay, View } from "ol";
// import { mapView } from "../utils/mapView";	
import { OSM, TileWMS } from "ol/source";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import CircleStyle from 'ol/style/Circle.js';
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { getActiveLayers } from "./mapOverlayFunctions";
import TileLayer from "ol/layer/Tile";
import { dataforsyningenUrl, kmsTicket } from "./constants";
import type { Coordinate } from "ol/coordinate";



// Internal Functions for other functions in this file -----------------------------------------------

// function that adds response from getFeatureInfoUrl to html
function addResToHtml(wmsRes: string) {
    let featureInfoDiv = document.getElementById('wmsRes') as HTMLDivElement;
    featureInfoDiv.innerHTML = wmsRes;
}

// function that adds response from getFeatureInfoUrl to popup
async function addWmsResToPopup(content: HTMLElement, html: string, popup: Overlay, coordinate: Coordinate) {
    content.innerHTML = await html;
    popup.setPosition(coordinate);
}

// function that calls getFeatureInfoUrl on a layer and returns the response
async function callGetFeatureInfo(layer: Layer<any, LayerRenderer<any>>, coordinate: Coordinate, mapView: View): Promise<string> {
    let layerSource: TileWMS = layer.getSource();
    let url = layerSource.getFeatureInfoUrl(
      coordinate,
      mapView.getResolution()!,
      mapView.getProjection()!,
      { 'INFO_FORMAT': 'text/html', 'QUERY_LAYERS': layerSource.getParams().layers }
    );
    if (url) {
      try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
    return '';
  }




// -------------------------------------------------------------------------------------------------------





// layer for storing clicked point, required for getWMSInfoAndAddPointArray and getWMSInfoAndAddPointSingleLayer
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

// Diffrent functions for getting wms info
export function getWMSInfoAndAddPointArray(map: Map, wmsLayers: Layer<any, LayerRenderer<any>>[], pointLayerSource: VectorSource) {
    map.on('singleclick', async function(event) {
        let coordinate = event.coordinate
        let view = map.getView()

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
        let infoHtml = '';

        let activeLayers = getActiveLayers(wmsLayers);
        for (const layer of activeLayers) { 
            if (layer.get('title') !== 'Skærmkort') {
                const res = await callGetFeatureInfo(layer, coordinate, view);
                infoHtml += res;
            }  
        }

        addResToHtml(infoHtml);

    }) 
}

export function getWMSInfoAndAddPointSingleLayer(map: Map, wmsLayer: Layer<any, LayerRenderer<any>>, pointLayerSource: VectorSource) {
    map.on('singleclick', async function(event) {
        let coordinate = event.coordinate
        let view = map.getView()

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

        const res = await callGetFeatureInfo(wmsLayer, coordinate, view);
        addResToHtml(res); 
    }) 
}

export async function getWMSInfoAndAddPopup(map: Map, wmsLayers: Layer<any, LayerRenderer<any>>[], containerName: string, contentName: string, closerName: string) {
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

    map.on('singleclick', async function(event) {
                                            
        map.addOverlay(popup);
        popup.setPosition(undefined);
        content.innerHTML = '';
        let coordinate = event.coordinate
        let view = map.getView()

        // for loop that calls getFeatureInfoUrl on each active layer and adds response to popupContent
        let popupContent = '';

        let activeLayers = getActiveLayers(wmsLayers);
        for (const layer of activeLayers) { 
            if (layer.get('title') !== 'Skærmkort') {
                const res = await callGetFeatureInfo(layer, coordinate, view);
                popupContent += res;
            }  
        }

        addWmsResToPopup(content, popupContent, popup, coordinate);
        
    }) 

}



// -------------------------------------------------------------------------------------------------------



// function that refreshes layer by updating time parameter in wms url
export async function refreshLayer(layer: Layer<any, LayerRenderer<any>>, interval: number, map: Map) {
    function refresh() {
        
        const now = new Date()
        layer.getSource().updateParams({'TIME': now.getTime()})
        map.updateSize()
        
        console.log('Refreshed Layer ' + layer.get('title')+ ' at ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
        setTimeout(refresh, interval);
    }
    
    setTimeout(refresh, interval);
    
}


// Build layers from layerParams and returns an array of layers
export const buildMapLayersWithBaseLayers = (layerParams: any) => {
    
    let layerArray: Layer<any>[] = []
    const backgroundMap = new TileLayer({
        visible: true,
        properties:{
            title: 'Skærmkort',
        },
        source: new TileWMS({
            url: `${dataforsyningenUrl}/topo_skaermkort_DAF?`,
            params: {
                ticket: kmsTicket,
                transparent: 'TRUE',
                layers: 'dtk_skaermkort',
                format: 'image/png',
            },
        })
    })
     layerArray.push(backgroundMap)


     const osmLayer: Layer<any> = new TileLayer({
        visible: false,
        properties:{
            title: 'OSM',
            group: 'base',
        },
        source: new OSM()
    })
    layerArray.push(osmLayer)
    
    const now = new Date()
    for (const layer of layerParams) {
        const newLayer = new TileLayer({
            visible: layer.visible,
            properties:{
                title: layer.title,
            },
            source: new TileWMS({
                url: layer.url,
                params: {
                    ticket: kmsTicket,
                    transparent: 'TRUE',
                    layers: layer.layers,
                    format: layer.format,
                    time: now.getTime()
                },
            })
        })
        
        layerArray.push(newLayer)
    }
    return layerArray

}
export const buildMapLayers = (layerParams: any) => {
    
   
    let layerArray: Layer<any>[] = []
    for (const layer of layerParams) {
        const newLayer = new TileLayer({
            visible: layer.visible,
            properties:{
                title: layer.title,
            },
            source: new TileWMS({
                url: layer.url,
                params: {
                    ticket: kmsTicket,
                    transparent: 'TRUE',
                    layers: layer.layers,
                    format: layer.format,
                },
            })
        })
        
        layerArray.push(newLayer)
    }
    return layerArray

}

