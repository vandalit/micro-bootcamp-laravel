<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>suma de 2 numeros</title>
</head>
<body>
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
</body>
</html>