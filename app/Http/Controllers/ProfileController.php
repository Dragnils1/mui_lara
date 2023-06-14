<?php

namespace App\Http\Controllers;


use App\Models\Profile;
use App\Models\ProfileActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


use Illuminate\Support\Str;

class ProfileController extends Controller
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $profile = json_decode($input['profile'], true);


        // dd($profile);

        $maybeUndefinedFilds = ['comment', 'user_InNum', 'user_OutNum'];
        $filesForUpload = [
            'o_img1',
            'o_img2',
            'o_img3',
            'o_img4',
        ];
        $elementsForDelete = array_merge([
            'politic',
            'passwordConfirm',
        ], $filesForUpload);
        $profileActions = [];
        $profileActionsColumns = [
            'defer',
            'color',
            'last_modify',
            'next_contact_date',
            'visible_pass',
            'status',
            'dragableColor',
            'created_at'
        ];

        //Сохраняем картинки и добавляем пути в images Array который
        // хранится в БД
        foreach ($filesForUpload as $key => $file) {

            $file_if_exist = $request->file($file);
            $images_arr_from_request =  explode(",", $profile['images']);

            if ($file_if_exist)
                $images_arr_from_request[$key] = Storage::disk('public')->putFile('photos', $file_if_exist) ?? '';


            // dd(implode(",", $images_arr_from_request));
            $profile['images'] = implode(",", $images_arr_from_request);

        }

        //некоторые поля могут не передаваться в запросе
        foreach ($maybeUndefinedFilds as $value) {
            if (!isset($profile[$value])) $profile[$value] = '';
        }

        foreach ($profile as $k => $v) {
            if(in_array($k, $profileActionsColumns)) {
                $profileActions[$k] = $v;
                unset($profile[$k]);
            };
        }


        // Удаляем лишние элементы
        foreach ($elementsForDelete as $el) {
            if (isset($profile[$el])) unset($profile[$el]);
        }

        // Hash the password
        $profile['password'] = Hash::make($profile['password']);

        $user = Profile::create($profile);
        $profile_actions = ProfileActions::create(array_merge(["profile_id" => $user->id], $profileActions));




        //создаем запись в таблице действий (нужны для сотрудников и работы приложения)
        if($user->source_type == 'Квиз') {

            auth()->login($user);

            auth()->user()->tokens()->delete();

            # And make sure to use the plainTextToken property
            # Since this will return us the plain text token and then store the hashed value in the database
            $token = auth()->user()->createToken('auth_token')->plainTextToken;

            return response()->json([
                "user"  => $user,
                "token"  => $token
             ]);
        }

        return response()->json([
            "user"  => $user
         ]);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $profile = Profile::where('id', $id)->get()->toArray();

        return response()->json($profile);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $input = $request->all();
        $profile_from_request = json_decode($input['profile'], true);


        $filesForUpload = [
            'o_img1',
            'o_img2',
            'o_img3',
            'o_img4',
        ];
        $elementsForDelete = array_merge([
            'politic',
            'passwordConfirm',
            'phone'
        ], $filesForUpload);
        $profileActions = [];
        $profileActionsColumns = [
            'defer',
            'color',
            'last_modify',
            'next_contact_date',
            'visible_pass',
            'status',
            'dragableColor',
            'created_at'
        ];

        // Hash the password
        if(isset($profile_from_request['password'])) $profile_from_request['password'] = Hash::make($profile_from_request['password']);


        //Сохраняем картинки и добавляем пути в images Array который
        // хранится в БД
        foreach ($filesForUpload as $key => $file) {

            $file_if_exist = $request->file($file);
            $images_arr_from_request =  explode(",", $profile_from_request['images']);

            if ($file_if_exist)
                $images_arr_from_request[$key] = Storage::disk('public')->putFile('photos', $file_if_exist) ?? '';


            // dd(implode(",", $images_arr_from_request));
            $profile_from_request['images'] = implode(",", $images_arr_from_request);

        }

        //Извлекаем колонки для действий и ложим в отдельный массив
        foreach ($profile_from_request as $k => $v) {
            if(in_array($k, $profileActionsColumns)) {
                $profileActions[$k] = $v;
                unset($profile_from_request[$k]);
            };
        }

        // Удаляем лишние элементы
        foreach ($elementsForDelete as $el) {
            if (isset($profile_from_request[$el])) unset($profile_from_request[$el]);
        }



        $profile = Profile::where('id', $id)->first();
        $profile->update($profile_from_request);
        $profile_actions = $profile->profile_actions;
        $profile_actions->update($profileActions);

        return response()->json([
                "updated"  => $profile && $profile_actions
            ]);

            //доделать на клиенте
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json('destroyed');
    }
}
