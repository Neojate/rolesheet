"use strict";
exports.__esModule = true;
exports.Core = void 0;
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
exports.Core = Core;
