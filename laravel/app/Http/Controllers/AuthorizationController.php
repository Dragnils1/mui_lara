<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\ProfileActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthorizationController extends Controller
{
    public function authenticate(Request $request)
    {

        function generateTokenAndResponse($user) {

            auth()->user()->tokens()->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            //сделать функцию проверки роили и возвращать текст (admin,.,user)

            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        }

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => ['required'],
        ]);

        $userWithMd5Pass = Profile::where('email', $request->email)
                  ->where('password',md5($request->password))
                  ->with('profile_actions')
                  ->first();

        $userWithBcryptPass = Auth::attempt($credentials);

        $user = $userWithBcryptPass ? Auth::user() : $userWithMd5Pass;

        $profile_actions = ProfileActions::firstOrCreate([
            'profile_id' => $user->id
        ]);

        //Проверка, если пользователь не прошел модерацию главного админа
        // то не сможет пройти авторизацию
        if($profile_actions->status == 'main_moder') return response()->json([
            "fail"  => "Вы еще не прошли модерфцию. Пожалуста ожидайте."
         ]);

        if($userWithMd5Pass){
            Auth::login($userWithMd5Pass);
            return generateTokenAndResponse($userWithMd5Pass);
        }

        if($userWithBcryptPass) return generateTokenAndResponse(Auth::user());

        return response()->json([
            'errors' => [
                'email' => 'The provided credentials do not match our records.',
                ]
        ], 422);


    }

    public function checkAuth()
    {
        if (Auth::check()) return response()->json([
            "user"  => Auth::user()->profile_actions()
            // ->with('profile_actions')
         ]);

        return response()->json([
            'errors' => [
                'auth' => 'Auth failed.',
                ]
        ], 422);
    }

    public function logout()
    {

        Auth::logout();
        Session::flush();

        return redirect('login');
    }

    public function register(Request $request) {
        // $username = $request['username'];
        // $email = $request['email'];
        // $password = bcrypt($request['password']);

        // $input = $request->all();

        // $user = new User();
        // $user->email = $email;
        // $user->username = $username;
        // $user->password = $password;

        // $user->save();

        // return response()->json($user);
        // return redirect()->route('login');

        // Retrieve all request data including username, email & password.
         // I assume that the data IS validated.

    }
}
