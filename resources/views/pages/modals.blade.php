<button type="button" id="btn_modal_col" class="d-none" data-toggle="modal" data-target="#modalcol">Dale</button>
<div id="modalcol" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="colModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Create columns</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="mb-4">
                    <select id="modal_number_columns" class="form-control">
                        <option value="6" selected>2</option>
                        <option value="4">3</option>
                        <option value="3">4</option>
                        <option value="2">6</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn_modal_cols" class="btn btn-primary">Save changes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<button type="button" id="btn_modal_divide" class="d-none" data-toggle="modal" data-target="#modaldivide">Dale</button>
<div id="modaldivide" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="divideModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Divide columns</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="mb-4">
                    <select id="modal_divide_percent" class="form-control">
                        <option value="2">16%</option>
                        <option value="3" selected>25%</option>
                        <option value="4">33%</option>
                        <option value="5">40%</option>
                        <option value="6">50%</option>
                    </select>
                </div>
                <div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="modal_divide_left" name="modal_divide_position" value="0">
                        <label for="modal_divide_left" class="form-check-label">Left</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="modal_divide_right" name="modal_divide_position" value="1" checked>
                        <label for="modal_divide_right" class="form-check-label">Right</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn_modal_divide" class="btn btn-primary">Save changes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
