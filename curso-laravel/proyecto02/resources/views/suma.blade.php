@extends('layouts.app') 
@section('content')

    <h2>sumar dos numeros</h2>
    <form action="/suma" method="POST">
        @csrf
        <input type="number" name="num1" placeholder="numero 1" required>
        <input type="number" name="num2" placeholder="numero 2" required>
        <button type="submit">Sumar</button>
    </form>
    <br>
   
    @if (isset($suma))
        <p>El resultado de la suma es: {{ $suma }}</p>
    @endif
    

@endsection