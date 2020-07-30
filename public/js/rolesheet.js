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
    var core = new Core();
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
}
window.onload = function () {
    var inputList = [
        new SelectedInput('pp-bgcolor', 'backgroundColor'),
        new SelectedInput('pp-margin', 'margin'),
        new SelectedInput('pp-padding', 'padding')
    ];
    document.querySelector('#pp-bordersize').addEventListener('change', function () {
        selectedElement.style.border = this.value + " solid " + document.querySelector('#pp-bordercolor').value;
    });
    document.querySelector('#pp-bordercolor').addEventListener('change', function () {
        selectedElement.style.border = document.querySelector('#pp-bordersize').value + " solid " + this.value;
    });
    var _loop_1 = function (input) {
        try {
            input.element.addEventListener('change', function () {
                selectedElement.style[input.property] = input.element.value;
            });
        }
        catch (e) { }
    };
    for (var _i = 0, inputList_1 = inputList; _i < inputList_1.length; _i++) {
        var input = inputList_1[_i];
        _loop_1(input);
    }
};
/*document.querySelector<HTMLInputElement>('#pp-bgcolor').addEventListener('change', function() {
    selectedElement.style.backgroundColor = this.value;
});

document.querySelector<HTMLInputElement>('#pp-padding').addEventListener('change', function() {
    selectedElement.style['padding'] = this.value;
});/

};

console.log('fiestaa');




/****************************************************************/
/* CORE                                                         */
/****************************************************************/
var Core = /** @class */ (function () {
    function Core() {
    }
    Core.prototype.cell = function (fatherId) {
        var divRow = this.createElement('div', fatherId, 'row', 'diwrow');
        var divCell = this.createElement('div', fatherId, 'col-sm-12', 'divcell');
        divCell.style.border = '1px solid black';
        divRow.appendChild(divCell);
        return divRow;
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
