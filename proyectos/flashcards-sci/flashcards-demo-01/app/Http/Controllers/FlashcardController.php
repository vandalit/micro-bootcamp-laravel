<?php

namespace App\Http\Controllers;

use App\Models\Flashcard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FlashcardController extends Controller
{
    /**
     * Display dashboard with flashcards
     */
    public function dashboard()
    {
        $flashcards = Flashcard::latest()->get();
        return view('dashboard', compact('flashcards'));
    }

    /**
     * Store a new flashcard
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'link' => 'nullable|url',
        ]);

        Flashcard::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'link' => $request->link,
            'created_by' => Auth::user()->email,
        ]);

        return redirect()->back()->with('success', 'Flashcard creada exitosamente');
    }

    /**
     * Delete a flashcard
     */
    public function destroy(Flashcard $flashcard)
    {
        // Only allow creator to delete
        if ($flashcard->created_by !== Auth::user()->email) {
            return redirect()->back()->with('error', 'No tienes permisos para eliminar esta flashcard');
        }

        $flashcard->delete();
        return redirect()->back()->with('success', 'Flashcard eliminada exitosamente');
    }
}
