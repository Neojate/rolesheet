var undoPile = [];
var savedProperties;
var selectedElement = null;

var numberColumns = 2;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('drag', event.target.dataset.type)
}

function drop(event) {
    event.preventDefault();
    let type = event.dataTransfer.getData('drag');

    let bossElement = null;
    switch (type) {
        case 'cell':
            bossElement = cell(event.target.id);
            break;
        case 'divide':
            bossElement = divide(event.target.id);
            break;
        case 'jump':
            bossElement = jump(event.target.id);
            break;
        case 'span':
            bossElement = span(event.target.id);
            break;
        case 'input':
            bossElement = field(event.target.id);
            break;
    }
    undoPile.push(bossElement.id);
    selectedElement = bossElement;

}


function select(event) {
    selectedElement = document.getElementById(event.target.id);

    $('#pp-id').val(selectedElement.id);

    //guardado
    let border = selectedElement.style.border.split(' ');
    savedProperties = {
        'bsize': border[0],
        'bstyle': border[1],
        'bcolor': border[2],
        'bgcolor': selectedElement.style.backgroundColor !== '' ? selectedElement.style.backgroundColor : 'none',
        'fsize': selectedElement.style.fontSize,
        'margin': selectedElement.style.margin,
        'padding': selectedElement.style.padding
    }

    document.querySelector('#pp-ada').value = "adsasda";
    $('#pp-bordersize').val(savedProperties.bsize);
    $('#pp-bordercolor').val(savedProperties.bcolor);
    $('#pp-bgcolor').val(savedProperties.bgcolor);
    $('#pp-margin').val(savedProperties.margin);

    if (selectedElement.id.includes('span')) {
        $('#cont-pp-fontsize').show();
    } else {
        $('#cont-pp-fontsize').hide();
    }

}

function setNumberColumns() {
    numberColumns = prompt('Cuantas columnas deseas crear?');
}

function chooseColSm(number) {
    if (number == 2) return 6;
    if (number == 3) return 4;
    if (number == 4) return 3;
    if (number == 6) return 2;
    return 6;
}

$(document).ready(() => {

    $('#pp-bordersize').change(function () {
        selectedElement.style.border = this.value + 'px solid ' + $('#pp-bordercolor').val();
    });

    $('#pp-bordercolor').change(function () {
        selectedElement.style.border = $('#pp-bordersize').val() + 'px solid ' + this.value;
    });

    $('#pp-bgcolor').change(function () {
        selectedElement.style.backgroundColor = this.value;
    });

    $('#pp-margin').change(function () {
        selectedElement.style.margin = this.value;
    })

    $('#pp-padding').change(function () {
        selectedElement.style.padding = this.value;
    });

    $('#pp-fontsize').change(function () {
        selectedElement.style.fontSize = this.value;
    })

    document.querySelector('#btn_undo').addEventListener('click', function() {
        let toDeleteId = undoPile.pop();
        document.getElementById(toDeleteId).remove();
    });

});
