<?php

namespace App\Http\Controllers;

// use App\Http\Filters\profile\ProfileFilter;
use App\Http\Filters\ProfileFilter;
use App\Models\Profile;
use App\Models\ProfileActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function findPersons(Request $request)
    {
        // dd($request->all());
        $filter = app()->make(ProfileFilter::class, ['queryParams' => array_filter($request->all())]);
        $profiles = ProfileActions::filter($filter)->getDataFromProfilesAndJoinToArray();
        // $profiles = ProfileActions::joinDataWithProfiles()->filter($filter)->dataToArray();


        return response()->json($profiles);
    }

    public function moderation()
    {
        $person = auth()->user();

        $status = $person->role;

        $filter = app()->make(ProfileFilter::class, ['queryParams' => array_filter(["status" => $status])]);
        $profiles = ProfileActions::filter($filter)->getDataFromProfilesAndJoinToArray();

        return response()->json($profiles);
    }


    public function lines(Request $request)
    {
        $status = explode( ',', $request->get('status'));

        $actions_with_profile_arr = DB::table('profile_actions')
            ->whereIn('status', $status)
            ->join('profiles', 'profiles.id', '=', 'profile_actions.profile_id')
            ->get()->toArray();

        return response()->json($actions_with_profile_arr);
    }



    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
