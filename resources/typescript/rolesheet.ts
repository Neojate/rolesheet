import { Core } from './core.js';

var undoList:string[] = [];
var selectedElement:HTMLElement = null;

function allowDrop(event:Event) : void {
    event.preventDefault();
}

function drag(event) : void {
    event.dataTransfer.setData('drag', event.target.dataset.type);
}

function drop(event) : void {
    event.preventDefault();
    let type:string = event.dataTransfer.getData('drag');

    let core:Core = new Core();
    let bossElement:HTMLElement = null;

    switch(type) {
        case 'cell':
            bossElement = core.cell(type);
            break;
    }
}

window.onload = () => {

    selectedElement = document.querySelector('#canvas');
    console.log(selectedElement.id);

};



