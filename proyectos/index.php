<?php 
    $name = "van";
    $age = 36;
    $isDeveloper = true;
?>


    <h1>proyectos</h1>
    <ul>
        <li><a href="https://github.com/vandalit/micro-bootcamp-laravel/tree/main/proyectos/flashcards-sci/flashcards-demo-01">flashcards demo 001</a></li>
        <li class="deploy"><a href="#">Despliegue flashcards</a></li>
        <li><a href="#">#</a></li>
    </ul>
</body>


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