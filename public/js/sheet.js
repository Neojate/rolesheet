/****************************************************************/
/* CONSTANTES                                                   */
/****************************************************************/
var idCanvas = '#canvas_sheet';
var inputWidth = 200;
var inputHeight = 50;
var validClass = 'valid';
var grid;
var panelProps;
var panelHistorical;
var panelCanvas;
/****************************************************************/
/* ONLOAD                                                  */
/****************************************************************/
window.onload = function () {
    grid = new Grid(true, 10, 10);
    panelProps = new PanelProps();
    panelHistorical = new PanelHistorical();
    panelCanvas = new PanelCanvas();
};
/****************************************************************/
/* EVENTOS HTML                                                 */
/****************************************************************/
function allowDrop(event) {
    event.preventDefault();
    //poner aquí el grid
    if (grid.isActive) {
    }
}
function drag(event) {
    event.dataTransfer.setData('drag', event.target.dataset.type);
}
function saveClick(event) {
    var canvas = document.getElementById('canvas_sheet');
    var img = document.getElementById('img_sheet');
    var data = {
        name: 'name',
        image: img.src
    };
    var body = new Array();
    for (var i = 0; i < canvas.getElementsByTagName('input').length; i++) {
        var element = canvas.getElementsByTagName('input')[i];
        var json = {
            id: element.id,
            x: element.style.left,
            y: element.style.top,
            w: element.style.width,
            h: element.style.height,
            fontSize: element.style.fontSize
        };
        //data.push(json);
        body.push(json);
    }
    data['body'] = body;
    fetch('/savesheet', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
}
/****************************************************************/
/* ENUMS                                                        */
/****************************************************************/
var InputType;
(function (InputType) {
    InputType["text"] = "text";
    InputType["checkbox"] = "checkbox";
    InputType["area"] = "area";
})(InputType || (InputType = {}));
var Property;
(function (Property) {
    Property[Property["canvas"] = 0] = "canvas";
    Property[Property["input"] = 1] = "input";
})(Property || (Property = {}));
var DirHist;
(function (DirHist) {
    DirHist[DirHist["up"] = -1] = "up";
    DirHist[DirHist["down"] = 1] = "down";
})(DirHist || (DirHist = {}));
/****************************************************************/
/* TIPOS DE DEFINICION                                          */
/****************************************************************/
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Grid = /** @class */ (function () {
    function Grid(isActive, xHardness, yHardness) {
        this.isActive = isActive;
        this.xHardness = xHardness;
        this.yHardness = yHardness;
    }
    return Grid;
}());
/****************************************************************/
/* OBJETOS                                                      */
/****************************************************************/
var PanelProps = /** @class */ (function () {
    function PanelProps() {
        this.canvasProps = document.getElementById('properties-canvas');
        this.inputProps = document.getElementById('properties-input');
        this.in_img = document.getElementById('props_img');
        this.in_id = document.getElementById('props_id');
        this.in_x = document.getElementById('props_x');
        this.in_y = document.getElementById('props_y');
        this.in_w = document.getElementById('props_w');
        this.in_h = document.getElementById('props_h');
        this.in_fontSize = document.getElementById('props_fontsize');
        this.btn_valid = document.getElementById('btn_validate');
        this.events();
        this.handleVisibility(Property.canvas);
    }
    PanelProps.prototype.handleVisibility = function (type) {
        switch (type) {
            case Property.canvas:
                this.canvasProps.style.display = 'block';
                this.inputProps.style.display = 'none';
                break;
            case Property.input:
                this.canvasProps.style.display = 'none';
                this.inputProps.style.display = 'block';
                break;
        }
    };
    PanelProps.prototype.handleValue = function (type, element) {
        switch (type) {
            case Property.canvas:
                break;
            case Property.input:
                this.in_img.value = document.querySelector('#props_img').src;
                this.in_id.value = element.id;
                this.in_x.value = element.style.left.split('px')[0];
                this.in_y.value = element.style.top.split('px')[0];
                this.in_w.value = element.style.width.split('px')[0];
                this.in_h.value = element.style.height.split('px')[0];
                this.in_fontSize.value = element.style.fontSize.split('px')[0];
                this.selectedElement = element;
                break;
        }
    };
    PanelProps.prototype.events = function () {
        var _this = this;
        this.in_img.addEventListener('change', function () {
            var img = document.getElementById('img_sheet');
            img.src = _this.in_img.value;
        });
        this.in_id.addEventListener('change', function () {
            panelHistorical.updateHistoric(_this.selectedElement.id, _this.in_id.value);
            _this.selectedElement.id = _this.in_id.value;
        });
        this.in_x.addEventListener('change', function () {
            _this.selectedElement.style.left = _this.in_x.value + "px";
        });
        this.in_y.addEventListener('change', function () {
            _this.selectedElement.style.top = _this.in_y.value + "px";
        });
        this.in_w.addEventListener('change', function () {
            _this.selectedElement.style.width = _this.in_w.value + "px";
        });
        this.in_h.addEventListener('change', function () {
            _this.selectedElement.style.height = _this.in_h.value + "px";
        });
        this.in_fontSize.addEventListener('change', function () {
            _this.selectedElement.style.fontSize = _this.in_fontSize.value + "px";
        });
        this.btn_valid.addEventListener('click', function () {
            _this.selectedElement.classList.add(validClass);
        });
    };
    return PanelProps;
}());
var PanelHistorical = /** @class */ (function () {
    function PanelHistorical() {
        this.idPrefix = 'hist_';
        this.historicalDiv = document.getElementById('div_historical');
        this.historicalList = document.getElementById('list_historical');
        this.init();
    }
    PanelHistorical.prototype.init = function () {
        var canvas = document.getElementById('canvas_sheet');
        var inputCount = canvas.getElementsByTagName('input').length;
        for (var i = 0; i < inputCount; i++) {
            var child = canvas.getElementsByTagName('input')[i];
            this.fillHistorical(child);
        }
    };
    PanelHistorical.prototype.fillHistorical = function (element) {
        var _this = this;
        var divFather = document.createElement('div');
        divFather.id = "" + this.idPrefix + element.id;
        var divText = document.createElement('div');
        divText.addEventListener('click', function () { return _this.selectInput(event); });
        divText.innerText = element.id;
        var divUp = document.createElement('div');
        var iUp = document.createElement('i');
        iUp.classList.add('fas');
        iUp.classList.add('fa-long-arrow-alt-up');
        divUp.addEventListener('click', function () { return _this.moveHistoric(DirHist.up, event); });
        divUp.appendChild(iUp);
        var divDown = document.createElement('div');
        var iDown = document.createElement('i');
        iDown.classList.add('fas');
        iDown.classList.add('fa-long-arrow-alt-down');
        divDown.addEventListener('click', function () { return _this.moveHistoric(DirHist.down, event); });
        divDown.appendChild(iDown);
        divFather.appendChild(divText);
        divFather.appendChild(divDown);
        divFather.appendChild(divUp);
        this.historicalList.appendChild(divFather);
    };
    PanelHistorical.prototype.selectInput = function (event) {
        var element = event.target;
        var id = element.textContent;
        var input = document.getElementById(id);
        panelProps.handleVisibility(Property.input);
        panelProps.handleValue(Property.input, input);
    };
    PanelHistorical.prototype.moveHistoric = function (dir, event) {
        var element = event.target;
        var id = element.parentElement.parentElement.id.split(this.idPrefix)[1];
        var input = document.getElementById(id);
        var listElements = this.historicalDiv.querySelectorAll('#list_historical > div');
        var canvas = document.getElementById('canvas_sheet');
        var listInputs = document.querySelectorAll('#canvas_sheet > input');
        for (var i = 0; i < listElements.length; i++) {
            var currentElement = listElements[i];
            if (currentElement.id.split(this.idPrefix)[1] == id) {
                var affectedElement = listElements[i + dir];
                var affectedInput = listInputs[i + dir];
                if (dir == DirHist.up && i > 0) {
                    this.historicalList.insertBefore(currentElement, affectedElement);
                    canvas.insertBefore(listInputs[i], affectedInput);
                }
                else if (dir == DirHist.down && i < listElements.length - 1) {
                    this.historicalList.insertBefore(affectedElement, currentElement);
                    canvas.insertBefore(affectedInput, listInputs[i]);
                }
                return;
            }
        }
    };
    PanelHistorical.prototype.updateHistoric = function (lastId, newId) {
        var div = document.getElementById("" + this.idPrefix + lastId);
        div.id = "" + this.idPrefix + newId;
        var divChild = div.firstElementChild;
        divChild.innerHTML = newId;
    };
    return PanelHistorical;
}());
var PanelCanvas = /** @class */ (function () {
    function PanelCanvas() {
        this.canvas = document.getElementById('canvas_sheet');
        this.grid = new Grid(true, 50, 50);
        this.events();
    }
    PanelCanvas.prototype.createDefaultInputText = function (mousePos) {
        var input = document.createElement('input');
        input.type = 'text';
        input.id = "" + Math.random();
        input.style.left = mousePos.x + "px";
        input.style.top = mousePos.y + "px";
        input.style.width = '200px';
        input.style.height = '30px';
        input.style.fontSize = '16px';
        return input;
    };
    PanelCanvas.prototype.events = function () {
        var _this = this;
        this.canvas.addEventListener('click', function () {
            panelProps.handleVisibility(Property.canvas);
        });
        this.canvas.addEventListener('drop', function (event) {
            event.preventDefault();
            var type = event.dataTransfer.getData('drag');
            var mouseEvent = event;
            var mousePos = new Point(mouseEvent.pageX, mouseEvent.pageY);
            mousePos = _this.relativePosFromcanvas(mousePos);
            _this.addInput(type, mousePos);
        });
    };
    PanelCanvas.prototype.addInput = function (type, mousePos) {
        switch (type) {
            case InputType.text:
                var input = this.createDefaultInputText(mousePos);
                if (this.grid.isActive)
                    this.getNearXGrid(input, mousePos);
                this.canvas.appendChild(input);
                panelHistorical.fillHistorical(input);
                panelProps.handleVisibility(Property.input);
                panelProps.handleValue(Property.input, input);
                break;
        }
    };
    PanelCanvas.prototype.getNearXGrid = function (input, mousePos) {
        var nearPoint = new Point(9999, 9999);
        var list = document.querySelectorAll('#canvas_sheet > input');
        for (var i = 0; i < list.length; i++) {
            var element = list[i];
            var elementPos = new Point(+element.style.left.split('px')[0], +element.style.top.split('px')[0]);
            //encontrar el punto más cercano
            var distance = Math.abs(mousePos.x - elementPos.x);
            if (distance < grid.xHardness && elementPos.x < nearPoint.x)
                nearPoint = elementPos;
        }
        //asignamos
        if (nearPoint.x != 9999)
            input.style.left = nearPoint.x + "px";
    };
    PanelCanvas.prototype.relativePosFromcanvas = function (mousePos) {
        var canvasChoords = this.canvas.getBoundingClientRect();
        return new Point(mousePos.x - canvasChoords.x, mousePos.y - canvasChoords.y);
    };
    return PanelCanvas;
}());
var CanvasInput = /** @class */ (function () {
    function CanvasInput() {
    }
    CanvasInput.prototype.createDefaultInputText = function (mousePos) {
        var input = document.createElement('input');
        input.type = 'text';
        input.id = "" + Math.random();
        input.style.left = mousePos.x + "px";
        input.style.top = mousePos.y + "px";
        input.style.width = '200px';
        input.style.height = '30px';
        input.style.fontSize = '16px';
        return input;
    };
    return CanvasInput;
}());
