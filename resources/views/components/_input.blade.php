<div id="cont-{{ $id }}" class="col-sm-12">
    <label for="{{ $id }}" class="col-sm-2 col-form-label">{{ $text }}</label>
    <div class="col-sm-10">
        <input type="{{ isset($type) ? $type : 'text' }}" id="{{ $id }}" class="form-control" {{ isset($disabled) ? 'disabled' : '' }}>
    </div>
</div>
