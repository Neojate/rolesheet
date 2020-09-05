<html>

<head>
    {{-- Boostrap --}}
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous">
    </script>

    <script src="https://kit.fontawesome.com/8791fd82a1.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="{{ asset('css/sheet.css') }}">
    <script src="{{ asset('js/sheet.js') }}"></script>
</head>

<body>
    @include('pages.rolesheet.components.menu')
    <div class="rolesheet">
        <div id="canvas_sheet" ondragover="allowDrop(event)" onclick="canvasClick()">
            <img src="{{ asset('img/taintedgrail02.png') }}" id="img_sheet">

            {{-- <input type="text" id="in_title" class="valid">
            <input type="text" id="in_class" class="valid">
            <input type="text" id="in_player" class="valid">
            <input type="checkbox" id="in_abandonado01" class="valid"> --}}
        </div>
        <div class="panels">
            @include('pages.rolesheet.components.itempane')
            @include('pages.rolesheet.components.panelhistorical')
            @include('pages.rolesheet.components.panelprops')
        </div>
    </div>

</body>

</html>
