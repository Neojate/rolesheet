var undoList: string[] = [];
var selectedElement: HTMLElement = null;

function allowDrop(event: Event): void {
    event.preventDefault();
}

function drag(event: any): void {
    event.dataTransfer.setData('drag', event.target.dataset.type);
}

function drop(event: any): void {
    event.preventDefault();
    let type: string = event.dataTransfer.getData('drag');

    let core: Core = new Core();
    let bossElement: HTMLElement = null;

    let fatherId: string = event.target.id;

    switch (type) {
        case 'cell':
            bossElement = core.cell(fatherId);
            break;
    }
    bossElement.addEventListener('click', select);
}

function select(event: any): void {
    selectedElement = event.target;

    let border: string[] = selectedElement.style.border.split(' ');

    document.querySelector<HTMLInputElement>('#pp-bordersize').value = border[0];
    document.querySelector<HTMLInputElement>('#pp-bordercolor').value = border[2];
}

window.onload = () => {

    let inputList: SelectedInput[] = [
        new SelectedInput('pp-bgcolor', 'backgroundColor'),
        new SelectedInput('pp-margin', 'margin'),
        new SelectedInput('pp-padding', 'padding')
    ];

    document.querySelector<HTMLInputElement>('#pp-bordersize').addEventListener('change', function () {
        selectedElement.style.border = `${this.value} solid ${document.querySelector<HTMLInputElement>('#pp-bordercolor').value}`
    });

    document.querySelector<HTMLInputElement>('#pp-bordercolor').addEventListener('change', function () {
        selectedElement.style.border = `${document.querySelector<HTMLInputElement>('#pp-bordersize').value} solid ${this.value}`;
    });

    for (let input of inputList) {
        try {
            input.element.addEventListener('change', () => {
                selectedElement.style[input.property] = input.element.value;
            });
        } catch (e) { }
    }

}

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
class Core {

    cell(fatherId: string): HTMLElement {
        let divRow: HTMLElement = this.createElement('div', fatherId, 'row', 'diwrow');
        let divCell: HTMLElement = this.createElement('div', fatherId, 'col-sm-12', 'divcell');
        divCell.style.border = '1px solid black';
        divRow.appendChild(divCell);
        return divRow;
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




