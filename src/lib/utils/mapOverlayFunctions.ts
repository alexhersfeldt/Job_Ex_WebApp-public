import type Layer from "ol/layer/Layer";
import type LayerRenderer from "ol/renderer/Layer";
import type { Writable } from "svelte/store";
import { convertToNumber, removeSpacesAndLowercase } from "./genralFunctions";

// Create slider to change each layer's opacity

// style variables for DOM elements

const buttonStyle = 'width:95%; height:30px; border:none; border-radius:10px; margin:5px;';
const titleStyle = 'width:100%; height:30px; border:none; margin:5px; text-align:center;';
const buttonLight= '#f8f9fb';
const buttonDark = '#83b0e1';

// Internal Functions for other functions in this file -----------------------------------------------

async function addOpacitySlider(layer: Layer<any, LayerRenderer<any>>, target: string) {
    const layerSwitcher = document.getElementById(target)!;
    const opacitySlider = document.createElement('input')!;
    opacitySlider.className = 'opacitySlider' + removeSpacesAndLowercase(layer.get('title'));
    opacitySlider.setAttribute('type', 'range');
    opacitySlider.setAttribute('min', '0');
    opacitySlider.setAttribute('max', '1');
    opacitySlider.setAttribute('value', '1');
    opacitySlider.setAttribute('step', '0.1');
    opacitySlider.setAttribute('id', 'opacitySlider');
    opacitySlider.style.cssText = 'width:95%; height:30px; border:none; border-radius:10px; margin:5px;';
    opacitySlider.addEventListener('input', function () {
        layer.setOpacity(convertToNumber(opacitySlider.value));
    });
    layerSwitcher.appendChild(opacitySlider);
}

function addToggleLayerButton(layer: Layer<any, LayerRenderer<any>>, mapName: string, urlStore: Writable<any> | undefined, exclusive: boolean, layers: Layer<any, LayerRenderer<any>>[], target: string) {
    
    const parentDiv = document.getElementById(target)!;
    const button = document.createElement('button');
    button.id = removeSpacesAndLowercase(layer.get('title') + mapName);
    button.innerHTML = layer.get('title');
    button.style.cssText = buttonStyle;

    // set button to color based off visibility
    if (layer.getVisible()) {
        button.style.backgroundColor = buttonDark;
    } else {
        button.style.backgroundColor = buttonLight;
    }

    // change button color on hover
    button.onmouseout = () => { button.style.boxShadow = 'none'; };
    button.onmouseover = () => { button.style.boxShadow = "0px 0px 0px 3px #166cc9 inset"; };

    // add event listener to button
    button.addEventListener('click', function () {
        // set layer to visible if invisible and vice versa
        if (layer.getVisible()) {

            // set layer to invisible and change button color
            layer.setVisible(false);
            button.style.backgroundColor = buttonLight;

        } else {

            // set layer to visible, change button color, refresh layer, set legend url, and set all other layers to invisible if exclusive is true
            layer.setVisible(true);
            button.style.backgroundColor = buttonDark;

            const now = new Date();
            layer.getSource().updateParams({ 'TIME': now.getTime() });
            if (urlStore) { urlStore.set(getLegendUrlFromLayer(layer)); }

            // set all other layers to invisible if exclusive is true
            if (exclusive) {
                layers.forEach(layer => {
                    if (layer.get('title') !== button.innerHTML) {
                        layer.setVisible(false);
                        const otherButton = document.getElementById(removeSpacesAndLowercase(layer.get('title') + mapName)) as HTMLButtonElement;
                        otherButton.style.backgroundColor = buttonLight;
                    }
                });
            }
        }

    });
    parentDiv.appendChild(button);
}

function setOpacitySlider(target: string) {
    const opacitySlider = document.getElementsByClassName(target)[0] as HTMLInputElement;
    opacitySlider.value = '0.5';
   
}




// Exported Functions --------------------------------------------------------------------------------

export async function addLayerSwitcher(layers: Layer<any, LayerRenderer<any>>[], target: string, exclusive: boolean, mapName: string, urlStore?: Writable<any>) {
    // create button for each layer
    layers.forEach(layer => {
 
        addToggleLayerButton(layer, mapName, urlStore, exclusive, layers, target);  
        addOpacitySlider(layer, target);
    });

    // Setting the first button to visible
    const firstButton = document.getElementById(removeSpacesAndLowercase(layers[0].get('title') + mapName)) as HTMLButtonElement;
    firstButton.style.backgroundColor = buttonDark;
}

export function addTitleH2(title: string, target: string) {
    const parentDiv = document.getElementById(target)!;
    const titleDiv = document.createElement('h2');
    titleDiv.innerHTML = title;
    titleDiv.style.cssText = titleStyle;
    parentDiv.appendChild(titleDiv);
}

export function getLegendUrlFromLayer(layer: Layer<any, LayerRenderer<any>>) {
    const legendUrl = layer.getSource().getLegendUrl(null, { 'LAYER': layer.getSource().getParams().layers });
    return legendUrl;
}

export function getActiveLayers(layers: Layer<any, LayerRenderer<any>>[]) {
    const activeLayers: Layer<any, LayerRenderer<any>>[] = [];
    layers.forEach(layer => {
        if (layer.getVisible()) {
            activeLayers.push(layer);
        }
    });
    return activeLayers;
}

export async function setOpacityToHalf(index: number, layers: Layer<any, LayerRenderer<any>>[]) {
    layers[index].setOpacity(0.5);
    setOpacitySlider('opacitySlider' + removeSpacesAndLowercase(layers[index].get('title')));
}



