<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Profile extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Filterable;



    protected $connection = 'mysql';
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'profiles';

    public function profile_actions(): HasOne
    {
        return $this->hasOne(ProfileActions::class);
    }

    public function roles(): HasOne
    {
        return $this->hasOne(Role::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'vip',
        'height',
        'weight',
        'birthday',
        'birthyear',
        'city',
        'familystatus',
        'firstname',
        'gender',
        'langlove',
        'langlove2',
        'phone',
        'zodiak',
        'about',
        'birthdaychild1',
        'birthdaychild2',
        'birthdaychild3',
        'birthdaychild4',
        'children',
        'comment',
        'comp',
        'dateofend',
        'role',
        'fav',
        'fav_date',
        'fav_modify',
        'fb',
        'helptext',
        'images',
        'inst',
        'lastlove',
        'lastzodiak',
        'ok',
        'registermonth',
        'report',
        'smoke',
        'source',
        'source_type',
        'targetsearch',
        'targetsearchtext',
        'user_InNum',
        'user_OutNum',
        'vk',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        // 'password' => 'hashed',
    ];
}
