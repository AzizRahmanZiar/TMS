<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Session\TokenMismatchException;
use Symfony\Component\HttpFoundation\Response;

class HandleCsrfErrors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            return $next($request);
        } catch (TokenMismatchException $e) {
            // If it's an AJAX request (like Inertia), return JSON error
            if ($request->expectsJson() || $request->header('X-Inertia')) {
                return response()->json([
                    'message' => 'Page expired. Please refresh and try again.',
                    'csrf_error' => true
                ], 419);
            }
            
            // For regular requests, redirect to login with message
            return redirect()->route('login')->with('error', 'Your session has expired. Please login again.');
        }
    }
}
