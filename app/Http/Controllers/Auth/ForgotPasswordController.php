<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Exception;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

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
        return Validator::make($data, ['email' => 'required|email|exists:users'],[
            'email.exists' => 'The email not exists'
        ]);
    }
    public function sendResetLinkEmail(Request $request){

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
            $response = $this->broker()->sendResetLink(
                $request->only('email')
            );
            if($response == Password::RESET_LINK_SENT){
                return response()->json([
                    'status'=> 'success',
                    'msg'   => 'We have e-mailed your password reset link!'
                ],200);
            }else{
                throw new Exception('');
            }
        }catch (Exception $exception){
            return response()->json([
                'status'=> 'error',
                'msg'   => 'Password reset failed'
            ], 400);
        }
    }

}
