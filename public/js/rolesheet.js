var undoList = [];
var selectedElement = null;
var numberColumns = 2;
var inputList = [];
/****************************************************************/
/* HTML EVENTS                                                  */
/****************************************************************/
function setNumberColumns(event) {
    numberColumns = parseInt(window.prompt('How many columns do you want?'));
}
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData('drag', event.target.dataset.type);
}
function drop(event) {
    event.preventDefault();
    var type = event.dataTransfer.getData('drag');
    var core = new Core(event.target.id);
    var bossElement = null;
    switch (type) {
        case 'cell':
            bossElement = core.cell();
            break;
        case 'divide':
            bossElement = core.divide();
            break;
        case 'span':
            bossElement = core.span();
            break;
        case 'input':
            bossElement = core.input();
            break;
    }
    bossElement.addEventListener('click', select);
}
function select(event) {
    //desmarcamos
    if (selectedElement !== null)
        selectedElement.style.boxShadow = 'none';
    //marcamos el nuevo
    selectedElement = event.target;
    selectedElement.style.boxShadow = '0 0 5px 2px green';
    var border = selectedElement.style.border.split(' ');
    document.querySelector('#pp-bordersize').value = border[0];
    document.querySelector('#pp-bordercolor').value = border[2];
    for (var _i = 0, inputList_1 = inputList; _i < inputList_1.length; _i++) {
        var input = inputList_1[_i];
        try {
            input.element.value = selectedElement.style[input.property];
            input.element.disabled = false;
        }
        catch (e) {
            input.element.disabled = true;
        }
    }
}
/****************************************************************/
/* ONLOAD                                                       */
/****************************************************************/
window.onload = function () {
    inputList = [
        new SelectedInput('pp-bordersize', 'borderWidth'),
        new SelectedInput('pp-bordercolor', 'borderColor'),
        new SelectedInput('pp-bgcolor', 'backgroundColor'),
        new SelectedInput('pp-margin', 'margin'),
        new SelectedInput('pp-padding', 'padding'),
        new SelectedInput('pp-fontsize', 'fontSize'),
        new SelectedInput('pp-fontcolor', 'color')
    ];
    var _loop_1 = function (input) {
        try {
            input.element.addEventListener('change', function () {
                selectedElement.style[input.property] = input.element.value;
            });
        }
        catch (e) { }
    };
    for (var _i = 0, inputList_2 = inputList; _i < inputList_2.length; _i++) {
        var input = inputList_2[_i];
        _loop_1(input);
    }
    try {
        document.querySelector('#pp-textalign').addEventListener('change', function () {
            selectedElement.style.textAlign = this.value;
        });
    }
    catch (e) { }
    try {
        document.querySelector('#pp-text').addEventListener('keydown', function () {
            selectedElement.innerText = this.value;
        });
    }
    catch (e) { }
};
/****************************************************************/
/* CORE                                                         */
/****************************************************************/
var Core = /** @class */ (function () {
    function Core(fatherId) {
        this.fatherId = fatherId;
    }
    Core.prototype.cell = function () {
        var divRow = this.createElement('div', this.fatherId, 'row', 'diwrow');
        var divCell = this.createElement('div', this.fatherId, 'col-sm-12', 'divcell');
        divCell.style.border = '1px solid black';
        divRow.appendChild(divCell);
        return divRow;
    };
    Core.prototype.divide = function () {
        var divRow = this.createElement('div', this.fatherId, 'row', 'diwrow');
        var colsm = this.chooseColSm(numberColumns);
        for (var i = 0; i < numberColumns; i++) {
            var divCol = this.createElement('div', divRow.id, "col-sm-" + colsm, 'divcol');
            divCol.style.border = '1px solid black';
            divRow.appendChild(divCol);
        }
        return divRow;
    };
    Core.prototype.span = function () {
        var span = this.createElement('span', this.fatherId, null, 'span');
        span.appendChild(document.createTextNode('Default Text'));
        //this.setStyle(span, 'span');
        return span;
    };
    Core.prototype.input = function () {
        var input = this.createElement('input', this.fatherId, null, 'input');
        input.style.width = '100%';
        return input;
    };
    Core.prototype.createElement = function (elementName, fatherId, className, prefix) {
        var element = document.createElement(elementName);
        if (className !== null)
            element.classList.add(className);
        element.id = this.assignRandomId(prefix);
        document.getElementById(fatherId).appendChild(element);
        return element;
    };
    Core.prototype.assignRandomId = function (prefix) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 10; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
    };
    Core.prototype.chooseColSm = function (numberColumns) {
        if (numberColumns == 2)
            return 6;
        if (numberColumns == 3)
            return 4;
        if (numberColumns == 4)
            return 4;
        if (numberColumns == 6)
            return 2;
        return 6;
    };
    Core.prototype.setStyle = function (elemenet, type) {
        switch (type) {
            case 'span':
                elemenet.style.borderWidth = '0px';
                elemenet.style.borderColor = 'transparent';
                elemenet.style.backgroundColor = 'transparent';
                break;
        }
        elemenet.style.padding = '0px';
        elemenet.style.margin = '0px';
    };
    return Core;
}());
/****************************************************************/
/* SELECTEDINPUT                                                */
/****************************************************************/
var SelectedInput = /** @class */ (function () {
    function SelectedInput(inputId, property) {
        this.element = document.getElementById(inputId);
        this.property = property;
    }
    return SelectedInput;
}());
