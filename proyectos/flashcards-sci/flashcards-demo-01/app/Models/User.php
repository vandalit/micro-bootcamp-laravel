<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get flashcards created by this user
     */
    public function flashcards()
    {
        return $this->hasMany(Flashcard::class, 'created_by', 'email');
    }

    /**
     * Check if user's email matches the active domain restriction
     */
    public function isAllowedByDomain()
    {
        $activeDomain = DomainSetting::getActiveDomain();
        
        if (!$activeDomain) {
            return true; // No domain restriction active
        }
        
        return str_ends_with($this->email, $activeDomain->domain);
    }
}
