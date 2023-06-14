<?php

namespace App\Exports;

use App\Models\ProfileActions;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;

class ProfileActionsExport implements FromQuery
{

    use Exportable;

    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    private $filter ;

    public function forFilter($filter)
    {
        $this->filter = $filter;

        return $this;
    }

    public function query()
    {
        return ProfileActions::query()->filter($this->filter)->joinDataWithProfiles();
    }
}
