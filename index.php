<?php

$name = "van";
$age = 20;
$isDeveloper = true;

?>

<h1>
    <?php echo "Indice"; ?> <br>
</h1>

<h2> <?php echo "Curso PHP"; ?></h2>
<ul>
    <li><a href="./curso-php/primeros pasos/index.php">primeros pasos php</a></li>
    <li><a href="./curso-php/next-marvel-movie/index.php">next marvel movie</a></li>
    <li><a href="./curso-php/next-marvel-movie/index-v2.php">next marvel movie - only get query version</a></li>
    <li><a href="./curso-php/next-marvel-movie/index-v3.php">next marvel movie - clean code</a></li>
</ul>

<h2><?php echo "Curso Laravel"; ?></h2>
<ul>
    <li><a href="./laravel/testapp/public/index.php">test app - blank</a></li>
    <li><a href="./laravel/proyecto02/public/index.php">first app - curso laravel</a></li>
    <li></li>
</ul>

<h2><?php echo "Curso Angular"; ?></h2>

<ul>
    <li><a href="#">#</a></li>
    <li><a href="#">#</a></li>
    <li></li>
</ul>

<h2><?php echo "Proyectos"; ?></h2>

<ul>
    <li>
        <a href="./proyectos/index.php">Indice de Proyectos</a>
    </li>
</ul>

<style>

    :root {
        color-scheme: light dark;
    }
    body {
        display: grid;
        place-content: center;
        margin-left: -200px;
        margin-top: -250px;        
    }
    h1 {
        color: #fff44f;
    }

    ul {
        list-style: none;
        padding: 0;
        margin-left: -200px;
    }
    ul li a {
        margin: 10px 0;
        text-decoration: none;
        color: coral;
        line-height: 1.2em;
        font-family: popins, sans-serif;
        font-size: medium;
    }
    .deploy a {
        color: #fff44f;
    }
</style>