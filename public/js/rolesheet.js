"use strict";
exports.__esModule = true;
var core_js_1 = require("./core.js");
var undoList = [];
var selectedElement = null;
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData('drag', event.target.dataset.type);
}
function drop(event) {
    event.preventDefault();
    var type = event.dataTransfer.getData('drag');
    var core = new core_js_1.Core();
    var bossElement = null;
    var fatherId = event.target.id;
    switch (type) {
        case 'cell':
            bossElement = core.cell(fatherId);
            break;
    }
    bossElement.addEventListener('click', select);
}
function select(event) {
    selectedElement = event.target;
    var border = selectedElement.style.border.split(' ');
    document.querySelector('#pp-bordersize').value = border[0];
    document.querySelector('#pp-bordercolor').value = border[2];
    document.querySelector('#pp-bgcolor').value = selectedElement.style.backgroundColor;
    document.querySelector('#pp-margin').value = selectedElement.style.margin;
    document.querySelector('#pp-padding').value = selectedElement.style.padding;
    try {
        document.querySelector('#asdasda').value = 'adasdsa';
    }
    catch (error) { }
}
window.onload = function () {
    //bordes
    document.querySelector('#pp-bordersize').addEventListener('change', function () {
        selectedElement.style.border = this.value + ' solid ' + document.querySelector('#pp-bordercolor').value;
    });
    document.querySelector('#pp-bordercolor').addEventListener('change', function () {
        selectedElement.style.border = document.querySelector('#pp-bordersize').value + ' solid ' + this.value;
    });
    //color
    document.querySelector('#pp-bgcolor').addEventListener('change', function () {
        selectedElement.style.backgroundColor = this.value;
    });
    //margenes
    document.querySelector('#pp-margin').addEventListener('change', function () {
        selectedElement.style.margin = this.value;
    });
    //padding
    document.querySelector('#pp-padding').addEventListener('change', function () {
        selectedElement.style.padding = this.value;
    });
};
