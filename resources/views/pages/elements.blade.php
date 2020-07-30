<div class="elements">
    <img id="cell" src="{{ asset('img/icons/cellicon.png') }}" class="button" data-type="cell" ondragstart="drag(event)">
    <span class="tooltip">Divide</span>
    <img id="divide" src="{{ asset('img/icons/divideicon.png') }}" class="button" data-type="divide" ondragstart="drag(event)" ondblclick="setNumberColumns(event)">
    <img id="jump" src="{{ asset('img/icons/jumpicon.png') }}" class="button" data-type="jump" ondragstart="drag(event)">
    <img id="span" src="{{ asset('img/icons/spanicon.png') }}" class="button" data-type="span" ondragstart="drag(event)">
    <img id="input" src="{{ asset('img/icons/inputicon.jpg') }}" class="button" data-type="input" ondragstart="drag(event)">
    <button id="btn_undo" type="button">Undo</button>
</div>
