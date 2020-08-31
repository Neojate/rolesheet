<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Sheet extends Model
{
    protected $table = 'sheet';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'body'
    ];
}
