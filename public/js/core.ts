export class Core {

    cell(fatherId : string) : HTMLElement {
        let divRow:HTMLElement = this.createElement('div', fatherId, 'row', 'diwrow');
        let divCell:HTMLElement = this.createElement('div', fatherId, 'col-sm-12', 'divcell');
        divCell.style.border = '1px solid black';
        divRow.appendChild(divCell);
        return divRow;
    }

    createElement(elementName:string, fatherId:string, className:string, prefix:string) : HTMLElement {
        let element:HTMLElement = document.createElement(elementName);

        if (className !== null)
            element.classList.add(className);

        element.id = this.assignRandomId(prefix);
        document.getElementById(fatherId).appendChild(element);

        return element;
    }

    assignRandomId(prefix:string) : string {
        let result:string = '';
        let characters:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i:number = 0; i < 10; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));

        return result;
    }

}


