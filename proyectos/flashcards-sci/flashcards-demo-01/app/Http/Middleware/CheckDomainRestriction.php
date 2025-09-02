<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\DomainSetting;

class CheckDomainRestriction
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $activeDomain = DomainSetting::getActiveDomain();
            
            if ($activeDomain && !str_ends_with($user->email, $activeDomain->domain)) {
                Auth::logout();
                return redirect('/login')->with('error', 'Tu email no pertenece al dominio autorizado: ' . $activeDomain->domain);
            }
        }
        
        return $next($request);
    }
}
