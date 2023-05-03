import View from 'ol/View';
import proj4 from "proj4";
import { get } from "ol/proj";
import { register } from "ol/proj/proj4";

const mapSrs = "EPSG:25832"
proj4.defs(mapSrs,"+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
register(proj4);
const dkProjection = get(mapSrs);

const x = 607933;
const y = 6230000;



// wms konfigurationer
export function makeMapView(zoom?: number) {
    let mapView = new View({
        center: [x, y], 
        projection: <any> dkProjection, 
        zoom: zoom || 8.5, 
        enableRotation: false
    })
    return mapView
}