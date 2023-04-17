import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile.js';
import type Layer from 'ol/layer/Layer';
import { OSM } from 'ol/source';

const kmsTicket = '0e6c47c3ae394ea5629267c83f6b2092';
const dataforsyningenUrl = 'https://api.dataforsyningen.dk'
const kortforsyningenUrl = 'https://kortforsyningen.kms.dk'

export let mapBaseLayers: Layer<any>[] = []
export let mapTileLayers: Layer<any>[] = []
export let dashboardLayers: Layer<any>[] = []
export let fotoLayers: Layer<any>[] = []
export let obliqueLayers: Layer<any>[] = []
export let sopLayers: Layer<any>[] = []
export let lidarLayers: Layer<any>[] = []
export let fotoStatusLayers: Layer<any>[] = []
export let lidarStatusLayers: Layer<any>[] = []
export let obliqueStatusLayers: Layer<any>[] = []
export let sopStatusLayers: Layer<any>[] = []



// add OSM layer
// const osmLayer: Layer<any> = new TileLayer({
//     visible: true,
//     properties:{
//         title: 'OSM',
//         group: 'base',
//     },
//     source: new OSM()
// })
// mapBaseLayers.push(osmLayer);

// layer params

const mapBaseLayerParams = [
    // {
    //     title: 'Skærmkort Dæmpet',
    //     url: `${dataforsyningenUrl}/topo_skaermkort_DAF?`,
    //     layers: 'dtk_skaermkort_daempet',
    //     format: 'image/png',
    //     visible: false
    // },
    {
        title: 'Skærmkort',
        url: `${dataforsyningenUrl}/topo_skaermkort_DAF?`,
        layers: 'dtk_skaermkort',
        format: 'image/png',
        visible: true
    },
    {
        title: 'Ortofoto forår',
        url: `${dataforsyningenUrl}/orto_foraar_DAF?`,
        layers: ['orto_foraar_12_5'],
        format: 'image/jpeg',
        visible: false
    },
]
const mapTileLayerParams = [
    {
        title: 'Tiles 1km',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        layers: 'Tiles_1km',
        format: 'image/png',
        visible: true
    },
    {
        title: 'Tiles 10km 10cm',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        layers: 'Tiles_10km_100mm',
        format: 'image/png',
        visible: false
    },
    {
        title: 'Tiles 10km 12.5cm',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        layers: 'Tiles_10km_125mm',
        format: 'image/png',
        visible: false
    },
    
    {
        title: 'Tiles 20km',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        layers: 'Tiles_20km',
        format: 'image/png',
        visible: false
    },
]
const dashboardLayerParams = [
    { 
        title: 'Active Flights',
        layers: ['Fotofly'],
        query_layers: ['Fotofly'],
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
    { 
        title: 'Flighttracks Today',
        layers: ['Flighttracks'],
        query_layers: ['Flighttracks'],
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
    {
        title: 'Active NoFly Zones',
        layers: 'NoFly_Today',
        query_layers: 'NoFly_Today',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: false
    },
    {
        title: 'Paspunkter',
        layers: 'gcp',
        query_layers: 'gcp',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: false
    },
    
    
    
    
]
const fotoLayerParams = [
    
    {
        title: 'Foto status',
        layers: 'Fotoblokke',
        query_layers: 'Fotoblokke',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
    {
        title: 'Flighttracks Spring',
        layers: 'FlighttracksSpring',
        query_layers: 'FlighttracksSpring',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
    {
        title: 'Spring tracks this Year',
        layers: 'SpringTracksThisYear',
        query_layers: 'SpringTracksThisYear',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: false
    },
    
]
const obliqueLayerParams = [
    {
        title: 'Oblique Status',
        layers: 'Obliqueblokke',
        query_layers: 'Obliqueblokke',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
    { 
        title: 'Oblique Flight Tracks Today',
        layers: ['FlighttracksOblique'],
        query_layers: ['FlighttracksOblique'],
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
    {
        title: 'Oblique tracks this year',
        layers: 'ObliqueTracksThisYear',
        query_layers: 'ObliqueTracksThisYear',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: false
    },
    
]
const sopLayerParams = [
    {
        title: 'SOP Status',
        layers: 'SOPblokke',
        query_layers: 'SOPblokke',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: false
    },
    {
        title: 'SOP tracks this year',
        layers: 'SOPTracksThisYear',
        query_layers: 'SOPTracksThisYear',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: false
    },
    { 
        title: 'SOP Flight Tracks Today',
        layers: ['FlighttracksSummer'],
        query_layers: ['FlighttracksSummer'],
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: false
    },
]
const lidarLayerParams = [
    {
        title: 'LiDAR Status',
        layers: 'LiDARblokke',
        query_layers: 'LiDARblokke',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
    { 
        title: 'LiDAR Flight Tracks Today',
        layers: ['FlighttracksLiDAR'],
        query_layers: ['FlighttracksLiDAR'],
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
    {
        title: 'LiDAR tracks this year',
        layers: 'LiDARTracksThisYear',
        query_layers: 'LiDARTracksThisYear',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: false
    },
    {
        title: 'LiDAR lots',
        layers: 'LiDAR_Lot',
        query_layers: 'LiDAR_Lot',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: false
    },
    
    
]

const fotoStatusParams = [
    
    {
        title: 'Foto status',
        layers: 'Fotoblokke',
        query_layers: 'Fotoblokke',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },  
]
const lidarStatusParams = [
    {
        title: 'LiDAR Status',
        layers: 'LiDARblokke',
        query_layers: 'LiDARblokke',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
]
const obliqueStatusParams = [
    {
        title: 'Oblique Status',
        layers: 'Obliqueblokke',
        query_layers: 'Obliqueblokke',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
    
]
const sopStatusParams = [
    {
        title: 'SOP Status',
        layers: 'SOPblokke',
        query_layers: 'SOPblokke',
        url: `${dataforsyningenUrl}/fotoflyvning_app?`,
        format: 'image/png',
        visible: true
    },
]





// function to build map layers
const buildMapLayersWithBaseLayers = (layerParams: any, layerArray: Layer<any>[]) => {
    
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
                group: 'base',
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

}
const buildMapLayers = (layerParams: any, layerArray: Layer<any>[]) => {
    
   
    
    for (const layer of layerParams) {
        const newLayer = new TileLayer({
            visible: layer.visible,
            properties:{
                title: layer.title,
                group: 'base',
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

}



// build layers
buildMapLayers(mapBaseLayerParams, mapBaseLayers)
buildMapLayers(mapTileLayerParams, mapTileLayers)
buildMapLayersWithBaseLayers(dashboardLayerParams, dashboardLayers)
buildMapLayersWithBaseLayers(fotoLayerParams, fotoLayers)
buildMapLayersWithBaseLayers(obliqueLayerParams, obliqueLayers)
buildMapLayersWithBaseLayers(sopLayerParams, sopLayers)
buildMapLayersWithBaseLayers(lidarLayerParams, lidarLayers)

buildMapLayersWithBaseLayers(fotoStatusParams, fotoStatusLayers)
buildMapLayersWithBaseLayers(lidarStatusParams, lidarStatusLayers)
buildMapLayersWithBaseLayers(obliqueStatusParams, obliqueStatusLayers)
buildMapLayersWithBaseLayers(sopStatusParams, sopStatusLayers)




// unused layers from KMS server
// {
    //     title: 'Ortofoto',
    //     layers: 'Ortofoto',
    //     query_layers: 'Ortofoto',
    //     url: `${dataforsyningenUrl}/fotoflyvning_app?`,
    //     format: 'image/png',
    //     visible: false
    // },

// { 
    //     title: 'Fotofly Foto',
    //     layers: ['FotoflyFoto'],
    //     query_layers: ['FotoflyFoto'],
    //     url: `${dataforsyningenUrl}/fotoflyvning_app?`,
    //     format: 'image/png',
    //     visible: false
    // },

    // {
    //     title: 'Vektor Status',
    //     layers: 'Vektorblokke',
    //     query_layers: 'Vektorblokke',
    //     url: `${dataforsyningenUrl}/fotoflyvning_app?`,
    //     format: 'image/png',
    //     visible: false
    // },
    // { 
    //     title: 'Fotofly LiDAR',
    //     layers: ['FotoflyLiDAR'],
    //     query_layers: ['FotoflyLiDAR'],
    //     url: `${dataforsyningenUrl}/fotoflyvning_app?`,
    //     format: 'image/png',
    //     visible: false
    // },