<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flashcard extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'description',
        'link',
        'created_by'
    ];

    /**
     * Get the user who created this flashcard
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', 'email');
    }
}
