<?php

namespace App\Http\Controllers;

use App\Models\ProfileActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileActionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($profileData)
    {
        $data = isset($profileData['profile_id']) ? $profileData : [];

        $profileActions = ProfileActions::create($data);

        if($profileActions) return response()->json('destroyed');

        return response()->json([
            'errors' => [
                'auth' => 'Auth failed.',
                ]
        ], 422);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProfileActions $profileActions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProfileActions $profileActions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($profile, string $id)
    {
        $updated = ProfileActions::where('profile_id', $id)
            ->update($profile);


        return response()->json([
            "updated"  => $updated
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProfileActions $profileActions)
    {
        //
    }
}
