<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Exception;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);
    }
    public function reset(Request $request)
    {
        try{
            $validator = $this->validator($request->all());
            if($validator->fails()){
                $errors = $validator->messages();
                return response()->json([
                    'status' => 'error',
                    'msg' => 'Validation failed',
                    'error_type' => 'validation_error',
                    'errors' => $errors
                ], 422);
            }
            $response = $this->broker()->reset(
                $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
            }
            );
            if($response == Password::PASSWORD_RESET){
                return response()->json([
                    'status'=> 'success',
                    'msg'   => 'Your password has been reset!'
                ],200);
            }else{
                return response()->json([
                    'status'=> 'success',
                    'msg'   => trans($response)
                ],422);
            }
        }catch (Exception $exception){
            return response()->json([
                'status'=> 'error',
                'msg'   => 'Password reset failed'
            ], 400);
        }
        
        $request->validate($this->rules(), $this->validationErrorMessages());

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        return $response == Password::PASSWORD_RESET
            ? $this->sendResetResponse($request, $response)
            : $this->sendResetFailedResponse($request, $response);
    }
}
