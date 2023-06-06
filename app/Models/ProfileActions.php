<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileActions extends Model
{
    use HasFactory;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'profile_actions';

    protected $fillable = [
        'profile_id',
        'defer',
        'color',
        'last_modify',
        'next_contact_date',
        'visible_pass',
        'status',
        'dragableColor',
        'reg_date',
    ];


}
