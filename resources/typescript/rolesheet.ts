var undoList: string[] = [];
var selectedElement: HTMLElement = null;
var numberColumns: number = 2;
var inputList: SelectedInput[] = [];

/****************************************************************/
/* HTML EVENTS                                                  */
/****************************************************************/
function setNumberColumns(event: any) {
    numberColumns = parseInt(window.prompt('How many columns do you want?'));
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
    selectedElement = event.target;

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

    inputList = [
        new SelectedInput('pp-bordersize', 'borderWidth'),
        new SelectedInput('pp-bordercolor', 'borderColor'),
        new SelectedInput('pp-bgcolor', 'backgroundColor'),
        new SelectedInput('pp-margin', 'margin'),
        new SelectedInput('pp-padding', 'padding'),
        new SelectedInput('pp-fontsize', 'fontSize'),
        new SelectedInput('pp-fontcolor', 'color')
    ];

    for (let input of inputList) {
        try {
            input.element.addEventListener('change', () => {
                selectedElement.style[input.property] = input.element.value;
            });
        } catch (e) { }
    }

    try {
        document.querySelector<HTMLInputElement>('#pp-text').addEventListener('keydown', function() {
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

    divide(): HTMLElement {
        let divRow: HTMLElement = this.createElement('div', this.fatherId, 'row', 'diwrow');
        let colsm: number = this.chooseColSm(numberColumns);
        for (let i: number = 0; i < numberColumns; i++) {
            let divCol: HTMLElement = this.createElement('div', divRow.id, `col-sm-${colsm}`, 'divcol');
            divCol.style.border = '1px solid black';
            divRow.appendChild(divCol);
        }
        return divRow;
    }

    span(): HTMLElement {
        let span: HTMLElement = this.createElement('span', this.fatherId, null, 'span');
        span.appendChild(document.createTextNode('Default Text'));
        return span;
    }

    input(): HTMLElement {
        let input:HTMLElement = this.createElement('input', this.fatherId, null, 'input');
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

        return result;
    }

    private chooseColSm(numberColumns: number): number {
        if (numberColumns == 2) return 6;
        if (numberColumns == 3) return 4;
        if (numberColumns == 4) return 4;
        if (numberColumns == 6) return 2;
        return 6;
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




