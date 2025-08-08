<?php

$name = "van";
$age = 20;
$isDeveloper = true;

?>

<h1>
    <?php echo "Indice"; ?> <br>
</h1>


<ul>
    <li><a href="./curso-php/primeros pasos/index.php">primeros pasos php</a></li>
    <li><a href="./curso-php/next-marvel-movie/index.php">next marvel movie</a></li>
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
</style>