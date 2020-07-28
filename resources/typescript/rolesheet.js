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
    switch (type) {
        case 'cell':
            bossElement = core.cell(type);
            break;
    }
}
window.onload = function () {
    selectedElement = document.querySelector('#canvas');
    console.log(selectedElement.id);
};
