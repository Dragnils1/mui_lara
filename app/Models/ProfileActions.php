<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class ProfileActions extends Model
{
    use HasFactory, Filterable;

     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'profile_actions';


    public function scopeJoinDataWithProfiles (Builder $query): void
    {
        $query
            ->join('profiles', 'profiles.id', '=', 'profile_actions.profile_id');
    }


    public function scopeGetDataFromProfilesAndJoinToArray (Builder $query): array
    {
        return $query
            ->join('profiles', 'profiles.id', '=', 'profile_actions.profile_id')
            ->get()->toArray();
    }

    public function scopeDataToArray (Builder $query): array
    {
        return $query->get()->toArray();
    }

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    /**
         * Scope a query to only include users of a given type.
     */


    protected $fillable = [
        'profile_id',
        'defer',
        'color',
        'last_modify',
        'next_contact_date',
        'visible_pass',
        'status',
        'dragableColor',
        'created_at',
    ];


}
