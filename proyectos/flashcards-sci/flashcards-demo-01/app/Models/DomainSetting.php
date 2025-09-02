<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DomainSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'domain',
        'institution_name',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the active domain setting
     */
    public static function getActiveDomain()
    {
        return self::where('is_active', true)->first();
    }

    /**
     * Set this domain as active and deactivate others
     */
    public function activate()
    {
        // Deactivate all other domains
        self::where('id', '!=', $this->id)->update(['is_active' => false]);
        
        // Activate this domain
        $this->update(['is_active' => true]);
    }
}
