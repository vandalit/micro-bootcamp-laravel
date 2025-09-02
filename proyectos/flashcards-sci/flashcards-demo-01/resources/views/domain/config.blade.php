@extends('layouts.app')

@section('content')
<div class="container py-5" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); min-height: 100vh;">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="fw-bold text-dark">⚙️ Configuración de Dominio</h2>
                    <p class="text-muted mb-0">Gestiona la autenticación institucional</p>
                </div>
                <a href="{{ route('dashboard') }}" class="btn btn-outline-secondary">
                    ← Volver al Dashboard
                </a>
            </div>

            @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            @endif

            <!-- Current Status -->
            <div class="card shadow-sm border-0 mb-4" style="border-radius: 15px;">
                <div class="card-body p-4">
                    <h5 class="card-title fw-bold mb-3">📊 Estado Actual</h5>
                    @if($activeDomain)
                        <div class="alert alert-info d-flex align-items-center" role="alert">
                            <div class="me-3">🏛️</div>
                            <div>
                                <strong>Dominio Activo:</strong> {{ $activeDomain->institution_name }}<br>
                                <small class="text-muted">Solo usuarios con email {{ $activeDomain->domain }} pueden acceder</small>
                            </div>
                        </div>
                        <form action="{{ route('domain.deactivate') }}" method="POST" class="d-inline">
                            @csrf
                            <button type="submit" class="btn btn-warning btn-sm">
                                🔓 Permitir cualquier cuenta Google
                            </button>
                        </form>
                    @else
                        <div class="alert alert-success d-flex align-items-center" role="alert">
                            <div class="me-3">🌐</div>
                            <div>
                                <strong>Acceso Libre:</strong> Cualquier cuenta de Google puede acceder<br>
                                <small class="text-muted">No hay restricciones de dominio activas</small>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            <!-- Add New Domain -->
            <div class="card shadow-sm border-0 mb-4" style="border-radius: 15px;">
                <div class="card-body p-4">
                    <h5 class="card-title fw-bold mb-4">➕ Agregar Nuevo Dominio</h5>
                    
                    <form action="{{ route('domain.store') }}" method="POST">
                        @csrf
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="institution_name" class="form-label fw-semibold">Nombre de la Institución</label>
                                <input type="text" class="form-control form-control-lg" id="institution_name" 
                                       name="institution_name" required style="border-radius: 12px;"
                                       placeholder="Ej: Universidad Bernardo O'Higgins">
                            </div>
                            <div class="col-md-6">
                                <label for="domain" class="form-label fw-semibold">Dominio de Email</label>
                                <input type="text" class="form-control form-control-lg" id="domain" 
                                       name="domain" required style="border-radius: 12px;"
                                       placeholder="Ej: @ubo.cl">
                            </div>
                        </div>
                        <div class="mt-3">
                            <button type="submit" class="btn btn-primary btn-lg" style="border-radius: 12px;">
                                💾 Guardar Dominio
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Existing Domains -->
            @if($domains->count() > 0)
                <div class="card shadow-sm border-0" style="border-radius: 15px;">
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold mb-4">🏢 Dominios Configurados</h5>
                        
                        <div class="row g-3">
                            @foreach($domains as $domain)
                                <div class="col-md-6">
                                    <div class="card border {{ $domain->is_active ? 'border-primary bg-primary bg-opacity-10' : 'border-light' }}" 
                                         style="border-radius: 12px;">
                                        <div class="card-body p-3">
                                            <div class="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <h6 class="fw-bold mb-1">{{ $domain->institution_name }}</h6>
                                                    <small class="text-muted">{{ $domain->domain }}</small>
                                                </div>
                                                @if($domain->is_active)
                                                    <span class="badge bg-primary">Activo</span>
                                                @endif
                                            </div>
                                            
                                            @if(!$domain->is_active)
                                                <form action="{{ route('domain.activate', $domain) }}" method="POST" class="mt-2">
                                                    @csrf
                                                    <button type="submit" class="btn btn-sm btn-outline-primary w-100" 
                                                            style="border-radius: 8px;">
                                                        🔒 Activar Restricción
                                                    </button>
                                                </form>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            @endif

            <!-- Help Section -->
            <div class="card shadow-sm border-0 mt-4" style="border-radius: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <div class="card-body p-4 text-white">
                    <h5 class="card-title fw-bold mb-3">💡 ¿Cómo funciona?</h5>
                    <ul class="mb-0">
                        <li class="mb-2"><strong>Modo Libre:</strong> Cualquier cuenta de Google puede acceder al sistema</li>
                        <li class="mb-2"><strong>Modo Institucional:</strong> Solo usuarios con email del dominio configurado pueden acceder</li>
                        <li class="mb-0"><strong>Ejemplo:</strong> Si activas @ubo.cl, solo emails como usuario@ubo.cl podrán ingresar</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
