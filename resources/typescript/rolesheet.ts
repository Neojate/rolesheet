var undoList: string[] = [];
var selectedElement: HTMLElement = null;
var numberColumns: number = 2;
var inputList: SelectedInput[] = [];

var divideObject: DivideObject = null;

/****************************************************************/
/* HTML EVENTS                                                  */
/****************************************************************/
function setNumberColumns() {
    document.querySelector<HTMLInputElement>('#btn_modal_col').click();
}

function setDividePerCent() {
    document.querySelector<HTMLButtonElement>('#btn_modal_divide').click();
}

function save() {
    let code: string = document.querySelector<HTMLElement>('#canvas').outerHTML;
    window.alert(code);
}

function allowDrop(event: Event): void {
    event.preventDefault();
}

function drag(event: any): void {
    event.dataTransfer.setData('drag', event.target.dataset.type);
}

function drop(event: any): void {
    event.preventDefault();
    let type: string = event.dataTransfer.getData('drag');

    let core: Core = new Core(event.target.id);
    let bossElement: HTMLElement = null;

    switch (type) {
        case 'cell':
            bossElement = core.cell();
            break;
        case 'col':
            bossElement = core.col();
            break;
        case 'divide':
            bossElement = core.divide();
            break;
        case 'span':
            bossElement = core.span();
            break;
        case 'input':
            bossElement = core.input();
            break
    }
    bossElement.addEventListener('click', select);
}

function select(event: any): void {
    //desmarcamos
    if (selectedElement !== null)
        selectedElement.style.boxShadow = 'none';

    //marcamos el nuevo
    selectedElement = event.target;
    selectedElement.style.boxShadow = '0 0 5px 2px green';

    let border: string[] = selectedElement.style.border.split(' ');

    document.querySelector<HTMLInputElement>('#pp-bordersize').value = border[0];
    document.querySelector<HTMLInputElement>('#pp-bordercolor').value = border[2];

    for (let input of inputList) {
        try {
            input.element.value = selectedElement.style[input.property];
            input.element.disabled = false;
        } catch (e) {
            input.element.disabled = true;
        }
    }
}


/****************************************************************/
/* ONLOAD                                                       */
/****************************************************************/
window.onload = () => {

    document.querySelector<HTMLButtonElement>('#btn_modal_divide').addEventListener('click', function() {
        divideObject = new DivideObject();
        divideObject.init();
    });

    inputList = [
        new SelectedInput('pp-bordersize', 'borderWidth'),
        new SelectedInput('pp-bordercolor', 'borderColor'),
        new SelectedInput('pp-bgcolor', 'backgroundColor'),
        new SelectedInput('pp-margin', 'margin'),
        new SelectedInput('pp-padding', 'padding'),
        new SelectedInput('pp-size', 'width'),
        new SelectedInput('pp-fontsize', 'fontSize'),
        new SelectedInput('pp-fontcolor', 'color'),
    ];


    for (let input of inputList) {
        try {
            input.element.addEventListener('change', () => {
                selectedElement.style[input.property] = input.element.value;
            });
        } catch (e) { }
    }

    try {
        document.querySelector<HTMLSelectElement>('#pp-textalign').addEventListener('change', function () {
            selectedElement.style.textAlign = this.value;
        });
    } catch (e) { }

    try {
        document.querySelector<HTMLInputElement>('#pp-text').addEventListener('keydown', function () {
            selectedElement.innerText = this.value;
        });
        document.querySelector<HTMLInputElement>('#pp-text').addEventListener('change', function () {
            selectedElement.innerText = this.value;
        });
    } catch (e) { }

}



/****************************************************************/
/* CORE                                                         */
/****************************************************************/
class Core {
    fatherId: string;
    constructor(fatherId: string) {
        this.fatherId = fatherId;
    }

    cell(): HTMLElement {
        let divRow: HTMLElement = this.createElement('div', this.fatherId, 'row', 'diwrow');
        let divCell: HTMLElement = this.createElement('div', this.fatherId, 'col-sm-12', 'divcell');
        divCell.style.border = '1px solid black';
        divRow.appendChild(divCell);
        return divRow;
    }

    col(): HTMLElement {
        let divRow: HTMLElement = this.createElement('div', this.fatherId, 'row', 'diwrow');
        let colsm: number = this.chooseColSm(numberColumns);
        for (let i: number = 0; i < numberColumns; i++) {
            let divCol: HTMLElement = this.createElement('div', divRow.id, `col-sm-${colsm}`, 'divcol');
            divCol.style.border = '1px solid black';
            divRow.appendChild(divCol);
        }
        return divRow;
    }

    divide(): HTMLElement {
        let divRow: HTMLElement = this.createElement('div', this.fatherId, 'row', 'divrow');
        let percernts: number[] = [divideObject.colLeft(), divideObject.colRight()];
        for (let i: number = 0; i < 2; i++) {
            let divCol: HTMLElement = this.createElement('div', divRow.id, `col-sm-${percernts[i]}`, 'divcol');
            divCol.style.border = '1px solid black';
            divRow.appendChild(divCol);
        }
        return divRow;
    }

    span(): HTMLElement {
        let span: HTMLElement = this.createElement('span', this.fatherId, null, 'span');
        span.appendChild(document.createTextNode('Default Text'));
        //this.setStyle(span, 'span');
        return span;
    }

    input(): HTMLElement {
        let input: HTMLElement = this.createElement('input', this.fatherId, null, 'input');
        input.style.width = '100%';
        return input;
    }

    private createElement(elementName: string, fatherId: string, className: string, prefix: string): HTMLElement {
        let element: HTMLElement = document.createElement(elementName);

        if (className !== null)
            element.classList.add(className);

        element.id = this.assignRandomId(prefix);
        document.getElementById(fatherId).appendChild(element);

        return element;
    }

    private assignRandomId(prefix: string): string {
        let result: string = '';
        let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i: number = 0; i < 10; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));

        return `${prefix}_${result}`;
    }

    private chooseColSm(numberColumns: number): number {
        if (numberColumns == 2) return 6;
        if (numberColumns == 3) return 4;
        if (numberColumns == 4) return 4;
        if (numberColumns == 6) return 2;
        return 6;
    }

    private setStyle(elemenet: HTMLElement, type: string) {
        switch (type) {
            case 'span':
                elemenet.style.borderWidth = '0px';
                elemenet.style.borderColor = 'transparent';
                elemenet.style.backgroundColor = 'transparent';
                break;
        }
        elemenet.style.padding = '0px';
        elemenet.style.margin = '0px';

    }
}



/****************************************************************/
/* SELECTEDINPUT                                                */
/****************************************************************/
class SelectedInput {

    element: HTMLInputElement;
    property: string;

    constructor(inputId: string, property: string) {
        this.element = document.getElementById(inputId) as HTMLInputElement;
        this.property = property;
    }
}



/****************************************************************/
/* DIVIDEOBJECT                                                 */
/****************************************************************/
class DivideObject {
    percent: number;
    isLeft: boolean;

    constructor() {
        this.percent = 6;
        this.isLeft = true;
    }

    init() {
        this.percent = parseInt(document.querySelector<HTMLInputElement>('#modal_divide_percent').value);
        this.isLeft = document.querySelector<HTMLInputElement>('#modal_divide_left').checked;
    }

    colLeft(): number {
        return this.isLeft ? this.percent : 12 - this.percent;
    }

    colRight(): number {
        return this.isLeft? 12 - this.percent : this.percent;
    }
}

class ColObject {
    bootstrapCols: number;

    constructor() {
        this.bootstrapCols = 6;
    }

    init() {
        this.bootstrapCols = parseInt(document.querySelector<HTMLInputElement>('#modal_number_columns').value);
    }

}
