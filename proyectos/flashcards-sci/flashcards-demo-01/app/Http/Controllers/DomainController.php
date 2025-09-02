<?php

namespace App\Http\Controllers;

use App\Models\DomainSetting;
use Illuminate\Http\Request;

class DomainController extends Controller
{
    /**
     * Show domain configuration page
     */
    public function index()
    {
        $domains = DomainSetting::all();
        $activeDomain = DomainSetting::getActiveDomain();
        
        return view('domain.config', compact('domains', 'activeDomain'));
    }

    /**
     * Store or update domain setting
     */
    public function store(Request $request)
    {
        $request->validate([
            'domain' => 'required|string|starts_with:@',
            'institution_name' => 'required|string|max:255',
        ]);

        $domain = DomainSetting::updateOrCreate(
            ['domain' => $request->domain],
            [
                'institution_name' => $request->institution_name,
                'is_active' => false, // Will be activated separately
            ]
        );

        return redirect()->back()->with('success', 'Dominio configurado exitosamente');
    }

    /**
     * Activate a domain setting
     */
    public function activate(DomainSetting $domain)
    {
        $domain->activate();
        
        return redirect()->back()->with('success', 'Dominio activado: ' . $domain->domain);
    }

    /**
     * Deactivate all domains (allow any Google account)
     */
    public function deactivateAll()
    {
        DomainSetting::query()->update(['is_active' => false]);
        
        return redirect()->back()->with('success', 'Restricción de dominio desactivada. Cualquier cuenta de Google puede acceder.');
    }
}
