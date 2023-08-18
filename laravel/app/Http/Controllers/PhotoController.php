<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{

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

        $filesForUpload = [
            'o_img1',
            'o_img2',
            'o_img3',
            'o_img4',
        ];

        $images_from_req = $request->get('images');
        $path_to_image = '';

        foreach ($filesForUpload as $key => $file) {

            $file_if_exist = $request->file($file);
            $images_arr_from_request =  explode(",", $images_from_req);

            if ($file_if_exist) {
                if($images_arr_from_request[$key]) Storage::disk('public')->delete($images_arr_from_request[$key]);
                $images_arr_from_request[$key] = Storage::disk('public')->putFile('photos', $file_if_exist) ?? '';
                $path_to_image = $images_arr_from_request[$key];
            }

            // dd(implode(",", $images_arr_from_request));
            $images_from_req = implode(",", $images_arr_from_request);

        }

        $updated = Profile::where('id', $request->get('user_id'))->first()
            ->update(["images" => $images_from_req]);

        return response()->json([
                $updated ? $path_to_image : $updated
            ]);
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
    public function destroy(Request $request, string $id)
    {


        $file_delete = Storage::disk('public')->delete($request->get('imgName'));


        $profile_update = Profile::where('id', $request->get('user_id'))->first()
            ->update(["images" => $request->get('images')]);

        return response()->json([
            $file_delete && $profile_update
            ]);
    }
}
