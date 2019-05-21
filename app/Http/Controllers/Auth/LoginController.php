<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Validator;
use Auth;
use Exception;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){
        $this->middleware('guest')->except('logout');
    }
    public function login(Request $request){
        try{
            $validator = Validator::make($request->all(),[
                'email' => 'required|string',
                'password' => 'required|string',
            ]);
            if($validator->fails()){
                $errors = $validator->messages();
                return response()->json([
                    'status'=>'error',
                    'msg'=>'Validation failed',
                    'errors'=>$errors
                ], 422);
            }
            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                return response()->json(Auth::user()->only(['id','name','email']));
            }else{
                return response()->json([
                    'status'=> 'error',
                    'msg'   => 'Email or password not matched'
                ], 400);
            }
        }catch (Exception $exception){
            return response()->json([
                'status'=> 'error',
                'msg'   => 'Login failed'
            ], 400);
        }
    }
    public function logout(Request $request){
        Auth::logout();
        return response()->json([
            'status'=> 'succcess',
            'msg'   => 'Logout succeed'
        ], 200);
    }
}
