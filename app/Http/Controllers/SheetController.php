<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Sheet;

use function GuzzleHttp\json_decode;

class SheetController extends Controller
{
    public function saveSheet() {
        dd(request()->all());
        Sheet::updateOrCreate(
            [ 'id' => 1],
            [
                'body' => json_encode(request()->all())
            ]
        );
    }
}
