<?php

namespace App\Http\Middleware;

use App\Models\InfoSession;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InfoSessionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {

        // dd($request->type);
        $exist = InfoSession::where("formation", ucfirst($request->type))->where("isAvailable", 1)->first();

        if ($exist) {
            return $next($request);
        }


        return redirect("/error");
    }
}
