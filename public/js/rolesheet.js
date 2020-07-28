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
    console.log(type);
}
window.onload = function () {
    selectedElement = document.querySelector('#canvas');
    console.log(selectedElement.id);
};
