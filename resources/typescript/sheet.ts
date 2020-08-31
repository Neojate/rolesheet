/****************************************************************/
/* CONSTANTES                                                   */
/****************************************************************/
const idCanvas: string = '#canvas_sheet';
const inputWidth: number = 200;
const inputHeight: number = 50;
const validClass: string = 'valid';
let grid: Grid;

let panelProps: PanelProps;
let panelHistorical: PanelHistorical;

/****************************************************************/
/* ONLOAD                                                  */
/****************************************************************/
window.onload = () => {

    grid = new Grid(true, 10, 10);

    panelProps = new PanelProps();
    panelHistorical = new PanelHistorical();

}

/****************************************************************/
/* EVENTOS HTML                                                 */
/****************************************************************/
function allowDrop(event: Event): void {
    event.preventDefault();

    //poner aquí el grid
    if (grid.isActive) {

    }
}

function drag(event: any): void {
    event.dataTransfer.setData('drag', event.target.dataset.type);
}

function drop(event: any): void {
    event.preventDefault();
    let type: InputType = event.dataTransfer.getData('drag');

    let mouseEvent: MouseEvent = event as MouseEvent;
    let mousePos: Point = new Point(
        mouseEvent.pageX,
        mouseEvent.pageY
    );

    let canvas: HTMLElement = document.querySelector<HTMLElement>(idCanvas);
    mousePos = relativePosFromCanvas(canvas, mousePos);

    addInput(type, canvas, mousePos);
}

function canvasClick(event: any) {
    //handleProperties(Property.canvas);
    panelProps.handleVisibility(Property.canvas);
}

function historicalClick(event: any) {
    let target: HTMLElement = document.getElementById(event.target.innerText) as HTMLElement;

    if (target.classList.contains(validClass))
        target.classList.remove(validClass);

    panelProps.handleVisibility(Property.input);
    panelProps.handleValue(Property.input, target);
}

function saveClick(event: any) {
    let canvas: HTMLElement = document.getElementById('canvas_sheet') as HTMLElement;
    let img: HTMLImageElement = document.getElementById('img_sheet') as HTMLImageElement;

    let data: any = {
        name: 'name',
        image: img.src,
    };

    let body: Array<JSON> = new Array<JSON>();
    for (let i = 0; i < canvas.getElementsByTagName('input').length; i++) {
        let element: HTMLElement = canvas.getElementsByTagName('input')[i];
        let json: any = {
            id: element.id,
            x: element.style.left,
            y: element.style.top,
            w: element.style.width,
            h: element.style.height,
            fontSize: element.style.fontSize
        }
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
/* FUNCIONES PRIVADAS                                           */
/****************************************************************/
function handleProperties(prop: Property) {
    let canvasProps: HTMLElement = document.getElementById('properties-canvas') as HTMLElement;
    let inputProps: HTMLElement = document.getElementById('properties-input') as HTMLElement;
    switch (prop) {
        case Property.canvas:
            canvasProps.style.display = 'block'
            inputProps.style.display = 'none';
            break;
        case Property.input:
            canvasProps.style.display = 'none'
            inputProps.style.display = 'block';
            break;
    }

}

function relativePosFromCanvas(canvas: HTMLElement, mousePos: Point): Point {
    let canvasChoords: DOMRect = canvas.getBoundingClientRect();
    return new Point(
        mousePos.x - canvasChoords.x,
        mousePos.y - canvasChoords.y
    );
}


function addInput(type: InputType, canvas: HTMLElement, mousePos: Point) {
    let inputClass: CanvasInput = new CanvasInput();

    switch (type) {
        case InputType.text:
            let input: HTMLInputElement = inputClass.createDefaultInputText(mousePos);

            if (grid.isActive) {
                getNearXGrid(input, mousePos, canvas);
            }

            canvas.appendChild(input);

            panelHistorical.fillHistorical(input);
            panelProps.handleVisibility(Property.input);
            panelProps.handleValue(Property.input, input);

            break;

    }
}

function getNearXGrid(input: HTMLInputElement, mousePos: Point, canvas: HTMLElement): void {

    let nearPoint: Point = new Point(9999, 9999);

    for (let i = 0; i < canvas.getElementsByTagName('input').length; i++) {
        let element: HTMLElement = canvas.getElementsByTagName('input')[i];
        let elementPos: Point = new Point(
            +element.style.left.split('px')[0],
            +element.style.top.split('px')[0]
        );

        //encontrar el punto más cercano
        let distance: number = Math.abs(mousePos.x - elementPos.x);
        if (distance < grid.xHardness && elementPos.x < nearPoint.x)
            nearPoint = elementPos;
    }

    //asignarlo
    if (nearPoint.x != 9999)
        input.style.left = `${nearPoint.x}px`;

}

/****************************************************************/
/* INTERFACES                                                   */
/****************************************************************/
interface IHtmlEvent {
    events(): void;
}


/****************************************************************/
/* ENUMS                                                        */
/****************************************************************/
enum InputType {
    text = 'text',
    checkbox = 'checkbox',
    area = 'area'
}

enum Property {
    canvas,
    input
}

/****************************************************************/
/* TIPOS DE DEFINICION                                          */
/****************************************************************/
class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Grid {
    isActive: boolean;
    xHardness: number;
    yHardness: number;

    constructor(isActive: boolean, xHardness: number, yHardness: number) {
        this.isActive = isActive;
        this.xHardness = xHardness;
        this.yHardness = yHardness;
    }
}

/****************************************************************/
/* OBJETOS                                                      */
/****************************************************************/
class PanelProps implements IHtmlEvent {
    canvasProps: HTMLElement;
    inputProps: HTMLElement;

    in_img: HTMLInputElement;

    in_id: HTMLInputElement;
    in_x: HTMLInputElement;
    in_y: HTMLInputElement;
    in_w: HTMLInputElement;
    in_h: HTMLInputElement;
    in_fontSize: HTMLInputElement;

    btn_valid: HTMLButtonElement;

    selectedElement: HTMLElement;

    canvasElements: Array<HTMLElement>;
    inputElements: Array<HTMLElement>;

    constructor() {
        this.canvasProps = document.getElementById('properties-canvas') as HTMLElement;
        this.inputProps = document.getElementById('properties-input') as HTMLElement;

        this.in_img = document.getElementById('props_img') as HTMLInputElement;

        this.in_id = document.getElementById('props_id') as HTMLInputElement;
        this.in_x = document.getElementById('props_x') as HTMLInputElement;
        this.in_y = document.getElementById('props_y') as HTMLInputElement;
        this.in_w = document.getElementById('props_w') as HTMLInputElement;
        this.in_h = document.getElementById('props_h') as HTMLInputElement;
        this.in_fontSize = document.getElementById('props_fontsize') as HTMLInputElement;

        this.btn_valid = document.getElementById('btn_validate') as HTMLButtonElement;

        this.events();

        this.handleVisibility(Property.canvas);
    }

    handleVisibility(type: Property): void {
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
    }

    handleValue(type: Property, element: HTMLElement): void {
        switch (type) {
            case Property.canvas:
                break;
            case Property.input:
                this.in_img.value = document.querySelector<HTMLImageElement>('#props_img').src;

                this.in_id.value = element.id;
                this.in_x.value = element.style.left.split('px')[0];
                this.in_y.value = element.style.top.split('px')[0];
                this.in_w.value = element.style.width.split('px')[0];
                this.in_h.value = element.style.height.split('px')[0];
                this.in_fontSize.value = element.style.fontSize.split('px')[0];

                this.selectedElement = element;

                break;
        }
    }

    events(): void {
        this.in_img.addEventListener('change', () => {
            let img: HTMLImageElement = document.getElementById('img_sheet') as HTMLImageElement;
            img.src = this.in_img.value;
        });


        this.in_id.addEventListener('change', () => {
            panelHistorical.updateHistoric(this.selectedElement.id, this.in_id.value);
            this.selectedElement.id = this.in_id.value;
        });

        this.in_x.addEventListener('change', () => {
            this.selectedElement.style.left = `${this.in_x.value}px`;
        });

        this.in_y.addEventListener('change', () => {
            this.selectedElement.style.top = `${this.in_y.value}px`;
        });

        this.in_w.addEventListener('change', () => {
            this.selectedElement.style.width = `${this.in_w.value}px`;
        });

        this.in_h.addEventListener('change', () => {
            this.selectedElement.style.height = `${this.in_h.value}px`;
        });

        this.in_fontSize.addEventListener('change', () => {
            this.selectedElement.style.fontSize = `${this.in_fontSize.value}px`;
        });

        this.btn_valid.addEventListener('click', () => {
            this.selectedElement.classList.add(validClass);
        });

    }
}

class PanelHistorical {
    historicalDiv: HTMLElement;

    constructor() {
        this.historicalDiv = document.getElementById('div_historical') as HTMLElement;

        this.init();
    }

    init(): void {
        let canvas: HTMLElement = document.getElementById('canvas_sheet') as HTMLElement;
        let inputCount = canvas.getElementsByTagName('input').length;
        for (let i = 0; i < inputCount; i++) {
            let child: HTMLElement = canvas.getElementsByTagName('input')[i];
            this.fillHistorical(child);
        }
    }

    fillHistorical(element: HTMLElement): void {
        let div: HTMLElement = document.createElement('div');
        div.addEventListener('click', historicalClick);
        let text: Text = document.createTextNode(element.id);
        div.appendChild(text);
        this.historicalDiv.appendChild(div);
    }

    updateHistoric(lastId: string, newId: string): void {
        for (let i = 0; i < this.historicalDiv.getElementsByTagName('div').length; i++) {
            let div: HTMLElement = this.historicalDiv.getElementsByTagName('div')[i] as HTMLElement;
            if (div.innerHTML == lastId) {
                div.innerHTML = newId;
                return;
            }
        }
    }

}

class CanvasInput {

    createDefaultInputText(mousePos: Point): HTMLInputElement {
        let input: HTMLInputElement = document.createElement('input');
        input.type = 'text';
        input.id = `${Math.random()}`;
        input.style.left = `${mousePos.x}px`;
        input.style.top = `${mousePos.y}px`;
        input.style.width = '200px';
        input.style.height = '30px';
        input.style.fontSize = '16px';
        return input;
    }

}
