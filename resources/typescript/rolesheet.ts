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

    let fatherId:string = event.target.id;

    switch(type) {
        case 'cell':
            bossElement = core.cell(fatherId);
            break;
    }
    bossElement.addEventListener('click', select);
}

function select(event) {
    selectedElement = event.target;

    let border:string[] = selectedElement.style.border.split(' ');

    document.querySelector<HTMLInputElement>('#pp-bordersize').value = border[0];

}

window.onload = () => {

    selectedElement = document.querySelector('#canvas');
    console.log(selectedElement.id);

};



