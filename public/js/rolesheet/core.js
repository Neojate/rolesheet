/*********************************************/
/* métodos de los distintos elementos        */
/*********************************************/

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



/*********************************************/
/* métodos privados de creación              */
/*********************************************/
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

