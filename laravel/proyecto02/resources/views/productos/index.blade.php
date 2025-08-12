@extends('layouts.app') 
@section('content')

    <h1>Lista de productos en la base de datos
</h1>

<table class="table table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
        </tr>
    </thead>

    <tbody>
        @foreach ($productos as $producto)
            <tr>
                <td>{{ $producto->id }}</td>
                <td>{{ $producto->nombre }}</td>
                <td>{{ $producto->precio }}</td>
                <td>{{ $producto->descripcion }}</td>
            </tr> <br>
        @endforeach
    </tbody>
</table>    
@endsection


