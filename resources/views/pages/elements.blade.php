<div class="elements">
    <img id="cell" src="{{ asset('img/icons/cellicon.png') }}" class="button" data-type="cell" ondragstart="drag(event)">
    <div class="div-element">
        <img id="col" src="{{ asset('img/icons/divideicon.png') }}" class="button" data-type="col" ondragstart="drag(event)" ondblclick="setNumberColumns()">
        <button id="col-plus" class="btn-plus" onclick="setNumberColumns()"></button>
    </div>
    <img id="divide" src="" class="button" data-type="divide" ondragstart="drag(event)" ondblclick="setDividePerCent(event)">
    <img id="jump" src="{{ asset('img/icons/jumpicon.png') }}" class="button" data-type="jump" ondragstart="drag(event)">
    <img id="span" src="{{ asset('img/icons/spanicon.png') }}" class="button" data-type="span" ondragstart="drag(event)">
    <img id="input" src="{{ asset('img/icons/inputicon.jpg') }}" class="button" data-type="input" ondragstart="drag(event)">
    <button id="btn_undo" type="button">Undo</button>
    <button id="btn_save" type="button" onclick="save()">Save</button>
</div>
