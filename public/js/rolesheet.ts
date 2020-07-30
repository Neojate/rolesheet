var undoList:string[] = [];
var selectedElement:HTMLElement = null;

function allowDrop(event:Event) : void {
    event.preventDefault();
}

function drag(event) : void {
    event.dataTransfer.setData('drag', event.target.dataset.type);
}

function drop(event) : void {
    event.preventDefault();
    let type:string = event.dataTransfer.getData('drag');

    let core:Core = new Core();
    let bossElement:HTMLElement = null;

    let fatherId:string = event.target.id;

    switch(type) {
        case 'cell':
            bossElement = core.cell(fatherId);
            break;
    }
    bossElement.addEventListener('click', select);
}

function select(event) {
    selectedElement = event.target;

    let border:string[] = selectedElement.style.border.split(' ');

    document.querySelector<HTMLInputElement>('#pp-bordersize').value = border[0];
    document.querySelector<HTMLInputElement>('#pp-bordercolor').value = border[2];
    document.querySelector<HTMLInputElement>('#pp-bgcolor').value = selectedElement.style.backgroundColor;
    document.querySelector<HTMLInputElement>('#pp-margin').value = selectedElement.style.margin;
    document.querySelector<HTMLInputElement>('#pp-padding').value = selectedElement.style.padding;

    try {
        document.querySelector<HTMLInputElement>('#asdasda').value = 'adasdsa';
    } catch (error) { }


}

window.onload = () => {

    //bordes
    document.querySelector<HTMLInputElement>('#pp-bordersize').addEventListener('change', function() {
        selectedElement.style.border = this.value + ' solid ' + document.querySelector<HTMLInputElement>('#pp-bordercolor').value;
    });

    document.querySelector<HTMLInputElement>('#pp-bordercolor').addEventListener('change', function() {
        selectedElement.style.border = document.querySelector<HTMLInputElement>('#pp-bordersize').value + ' solid ' + this.value;
    });

    //color
    document.querySelector<HTMLInputElement>('#pp-bgcolor').addEventListener('change', function() {
        selectedElement.style.backgroundColor = this.value;
    });

    //margenes
    document.querySelector<HTMLInputElement>('#pp-margin').addEventListener('change', function() {
        selectedElement.style.margin = this.value;
    });

    //padding
    document.querySelector<HTMLInputElement>('#pp-padding').addEventListener('change', function() {
        selectedElement.style.padding = this.value;
    });

    console.log('compila');



};*/

function allowDrop(event:any) {
    event.preventDefault();
}

function setNumberColumns() {
    console.log('buenas tardes');
}



