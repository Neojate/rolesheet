<html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

        <script src="{{ asset('js/rolesheet.js') }}"></script>
        <link rel="stylesheet" href="{{ asset('css/template.css') }}">
    </head>
    <body>
        @include('pages.elements')
        @include('pages.propertypane')
        <div class="container">
            <div class="row">
                <div id="canvas" class="col-sm-12" ondrop="drop(event)" ondragover="allowDrop(event)" onclick="select(event)">

                </div>
            </div>
        </div>
        <br><br><br><br><br><br><br>
        @include('pages.modals')


        {{-- <div>
            <div class="property-pane row">
                <div class="col-sm-6">
                    Elemento:
                    Border Size:
                </div>
                <div class="col-sm-6">
                    <span id="pp-id"></span>
                    <input type="text" id="pp-bordersize">
                </div>
            </div>
            <div>
                <button type="button" id="pp-save">Aceptar</button>
            </div>
        </div> --}}
    </body>
    <script>
        //console.log(document.getElementById('col').dataset.type);
        /*function save() {
            alert(document.getElementById('canvas').outerHTML);
        }

        function allowDrop(event) {
            console.log('allow');
            event.preventDefault();
        }

        function drag(event) {
            console.log('hola');
            event.dataTransfer.setData("text", event.target.id);
        }

        function drop(event) {

            event.preventDefault();
            droped = event.dataTransfer.getData("text");
            switch (droped) {
                case "col":
                    var div = document.createElement("div");
                    div.classList.add('row');
                    var divC = document.createElement("div");
                    divC.ondrop="drop(event)";
                    ondragover="allowDrop(event)";
                    divC.classList.add('col-sm-6');
                    div.innerHTML += divC.outerHTML + divC.outerHTML;
                    event.target.appendChild(div);
                    break;

                case "text":
                    var span = document.createElement("span");
                    span.textContent = "Buenas";
                    event.target.appendChild(span);
                    break;
            }
        }*/
    </script>
</html>
