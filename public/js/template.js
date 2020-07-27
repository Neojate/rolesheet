var undoPile = [];
var savedProperties;
var selectedElement = null;

var divElements = ['cell', 'divide'];
var textElements = ['span'];

var numberColumns = 2;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('drag', event.target.dataset.type)
}

function drop(event) {
    event.preventDefault();
    let type = event.dataTransfer.getData('drag');

    let bossElement = null;
    switch (type) {
        case 'cell':
            bossElement = cell(event.target.id);
            break;
        case 'divide':
            bossElement = divide(event.target.id);
            break;
        case 'jump':
            bossElement = jump(event.target.id);
            break;
        case 'span':
            bossElement = span(event.target.id);
            break;
        case 'input':
            bossElement = field(event.target.id);
            break;
    }
    undoPile.push(bossElement.id);
    selectedElement = bossElement;

}

function select(event) {
    selectedElement = document.getElementById(event.target.id);

    $('#pp-id').val(selectedElement.id);

    //guardado
    let border = selectedElement.style.border.split(' ');
    savedProperties = {
        'bsize': border[0],
        'bstyle': border[1],
        'bcolor': border[2],
        'bgcolor': selectedElement.style.backgroundColor !== '' ? selectedElement.style.backgroundColor : 'none',
        'fsize': selectedElement.style.fontSize,
        'margin': selectedElement.style.margin,
        'padding': selectedElement.style.padding
    }

    $('#pp-bordersize').val(savedProperties.bsize);
    $('#pp-bordercolor').val(savedProperties.bcolor);
    $('#pp-bgcolor').val(savedProperties.bgcolor);
    $('#pp-margin').val(savedProperties.margin);

    if (selectedElement.id.includes('span')) {
        $('#cont-pp-fontsize').show();
    } else {
        $('#cont-pp-fontsize').hide();
    }

}

function undo() {
    let toDeleteId = undoPile.pop();
    document.getElementById(toDeleteId).remove();
}

function span(destinyId) {
    let span = createElement('span', destinyId, null, 'span');
    createTextNode(span.id, 'Default text');
    return span;
}

function divide(destinyId) {
    let divRow = createElement('div', destinyId, 'row', 'divrow');
    let colsm = chooseColSm(numberColumns);
    for (var i = 0; i < numberColumns; i++) {
        let divCol = createElement('div', divRow.id, 'col-sm-' + chooseColSm(numberColumns), 'divcol');
        divCol.style.border = '1px solid black';
    }
    return divRow;
}

function jump(destinyId) {
    return createElement('br', destinyId, null, 'br');
}

function cell(destinyId) {
    let divRow = createElement('div', destinyId, 'row', 'divrow');
    let divCell = createElement('div', divRow.id, 'col-sm-12', 'divcell');
    divCell.style.border = '1px solid black';
    return divRow;
}

function field(destinyId) {
    return input = createElement('input', destinyId, null, 'span');
}



function createElement(origin, destinyId, className, prefix) {
    let element = document.createElement(origin);

    if (className !== null)
        element.classList.add(className);

    element.id = assignRandomId(prefix);
    element.addEventListener('click', select);
    document.getElementById(destinyId).appendChild(element);

    return element;
}

function createTextNode(destinyId, text) {
    let txt = document.createTextNode(text);
    document.getElementById(destinyId).appendChild(txt);
}

function assignRandomId(prefix) {
    return prefix + '-' + generateRandomString();
}

function generateRandomString() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++)
        result += characters.charAt(Math.floor(Math.random() * characters.length));

    return result;
}

function setNumberColumns() {
    numberColumns = prompt('Cuantas columnas deseas crear?');
}

function chooseColSm(number) {
    if (number == 2) return 6;
    if (number == 3) return 4;
    if (number == 4) return 3;
    if (number == 6) return 2;
    return 6;
}

$(document).ready(() => {

    $('#pp-bordersize').change(function () {
        selectedElement.style.border = this.value + 'px solid ' + $('#pp-bordercolor').val();
    });

    $('#pp-bordercolor').change(function () {
        selectedElement.style.border = $('#pp-bordersize').val() + 'px solid ' + this.value;
    });

    $('#pp-bgcolor').change(function () {
        selectedElement.style.backgroundColor = this.value;
    });

    $('#pp-margin').change(function () {
        selectedElement.style.margin = this.value;
    })

    $('#pp-padding').change(function () {
        selectedElement.style.padding = this.value;
    });

    $('#pp-fontsize').change(function () {
        selectedElement.style.fontSize = this.value;
    })

});
