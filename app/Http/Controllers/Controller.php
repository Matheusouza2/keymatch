<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public static function jsonResponse($message, $code, $filed = 'message')
    {
        if ($code < 300) {
            return response()->json([
                'data' => ''
            ], $code);
        } else {
            return response()->json([
                'errors' => [
                    $filed => [$message],
                ]
            ], $code);
        }
    }
}
