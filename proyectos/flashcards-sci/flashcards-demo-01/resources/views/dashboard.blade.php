@extends('layouts.app')

@section('content')
<div class="container-fluid py-4" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh;">
    <!-- Header -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h1 class="h3 fw-bold text-dark mb-1">🧪 Dashboard Científico</h1>
                    <p class="text-muted mb-0">Bienvenido, {{ Auth::user()->name }}</p>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('domain.config') }}" class="btn btn-outline-primary btn-sm">
                        ⚙️ Configurar Dominio
                    </a>
                    <form action="{{ route('logout') }}" method="POST" class="d-inline">
                        @csrf
                        <button type="submit" class="btn btn-outline-danger btn-sm">Cerrar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    <!-- Bento Grid Layout -->
    <div class="row g-4">
        <!-- Form Card - Larger -->
        <div class="col-lg-5">
            <div class="card h-100 shadow-sm border-0 card-hover" style="border-radius: 20px; transition: transform 0.3s ease;">
                <div class="card-body p-4">
                    <h5 class="card-title fw-bold text-primary mb-4">
                        ➕ Nueva Flashcard Científica
                    </h5>
                    
                    <form action="{{ route('flashcards.store') }}" method="POST">
                        @csrf
                        <div class="mb-3">
                            <label for="title" class="form-label fw-semibold">Título</label>
                            <input type="text" class="form-control form-control-lg" id="title" name="title" required 
                                   style="border-radius: 12px;" placeholder="Ej: Fotosíntesis en plantas">
                        </div>
                        
                        <div class="mb-3">
                            <label for="category" class="form-label fw-semibold">Categoría</label>
                            <select class="form-select form-select-lg" id="category" name="category" required style="border-radius: 12px;">
                                <option value="">Seleccionar categoría</option>
                                <option value="Biología">🧬 Biología</option>
                                <option value="Química">⚗️ Química</option>
                                <option value="Física">⚛️ Física</option>
                                <option value="Matemáticas">📐 Matemáticas</option>
                                <option value="Medicina">🏥 Medicina</option>
                                <option value="Ingeniería">🔧 Ingeniería</option>
                                <option value="Astronomía">🌌 Astronomía</option>
                                <option value="Geología">🌍 Geología</option>
                            </select>
                        </div>
                        
                        <div class="mb-3">
                            <label for="description" class="form-label fw-semibold">Descripción</label>
                            <textarea class="form-control" id="description" name="description" rows="4" required 
                                      style="border-radius: 12px;" placeholder="Describe el concepto científico..."></textarea>
                        </div>
                        
                        <div class="mb-4">
                            <label for="link" class="form-label fw-semibold">Enlace de referencia (opcional)</label>
                            <input type="url" class="form-control" id="link" name="link" 
                                   style="border-radius: 12px;" placeholder="https://ejemplo.com/articulo">
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-lg w-100" style="border-radius: 12px;">
                            🚀 Crear Flashcard
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Stats Card -->
        <div class="col-lg-3 col-md-6">
            <div class="card shadow-sm border-0 card-hover h-100" style="border-radius: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); transition: transform 0.3s ease;">
                <div class="card-body text-center text-white p-4">
                    <div class="mb-3">
                        <i class="display-4">📊</i>
                    </div>
                    <h3 class="fw-bold">{{ $flashcards->count() }}</h3>
                    <p class="mb-0">Flashcards Totales</p>
                </div>
            </div>
        </div>

        <!-- User Info Card -->
        <div class="col-lg-4 col-md-6">
            <div class="card shadow-sm border-0 card-hover h-100" style="border-radius: 20px; transition: transform 0.3s ease;">
                <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                        <img src="{{ Auth::user()->avatar ?? 'https://ui-avatars.com/api/?name=' . urlencode(Auth::user()->name) }}" 
                             class="rounded-circle me-3" width="50" height="50" alt="Avatar">
                        <div>
                            <h6 class="fw-bold mb-1">{{ Auth::user()->name }}</h6>
                            <small class="text-muted">{{ Auth::user()->email }}</small>
                        </div>
                    </div>
                    <div class="small">
                        <strong>Mis contribuciones:</strong> {{ Auth::user()->flashcards()->count() }} flashcards
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Flashcards Grid -->
    <div class="row mt-5">
        <div class="col-12">
            <h4 class="fw-bold mb-4">📚 Biblioteca de Flashcards</h4>
        </div>
    </div>

    <div class="row g-4">
        @forelse($flashcards as $flashcard)
            <div class="col-lg-4 col-md-6">
                <div class="card shadow-sm border-0 card-hover h-100" style="border-radius: 15px; transition: all 0.3s ease;">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2" style="border-radius: 20px;">
                                {{ $flashcard->category }}
                            </span>
                            @if($flashcard->created_by === Auth::user()->email)
                                <form action="{{ route('flashcards.destroy', $flashcard) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger" 
                                            onclick="return confirm('¿Eliminar esta flashcard?')" style="border-radius: 8px;">
                                        🗑️
                                    </button>
                                </form>
                            @endif
                        </div>
                        
                        <h5 class="card-title fw-bold mb-3">{{ $flashcard->title }}</h5>
                        <p class="card-text text-muted mb-3">{{ Str::limit($flashcard->description, 120) }}</p>
                        
                        @if($flashcard->link)
                            <a href="{{ $flashcard->link }}" target="_blank" class="btn btn-sm btn-outline-primary mb-3" style="border-radius: 8px;">
                                🔗 Ver referencia
                            </a>
                        @endif
                        
                        <div class="d-flex align-items-center text-muted small">
                            <span class="me-2">👤</span>
                            <span>{{ $flashcard->created_by }}</span>
                            <span class="ms-auto">{{ $flashcard->created_at->diffForHumans() }}</span>
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-12">
                <div class="text-center py-5">
                    <div class="mb-3">
                        <i class="display-1 text-muted">📝</i>
                    </div>
                    <h5 class="text-muted">No hay flashcards aún</h5>
                    <p class="text-muted">¡Crea la primera flashcard científica!</p>
                </div>
            </div>
        @endforelse
    </div>
</div>

<style>
.card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
}

.form-control:focus, .form-select:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
</style>
@endsection
