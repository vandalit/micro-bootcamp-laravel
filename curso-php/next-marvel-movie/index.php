<?php 

const API_URL = 'https://whenisthenextmcufilm.com/api';
# inicializar una nueva sesion cURL; ch = cURL handle
$ch = curl_init(API_URL);
//indicar que queremos el resultado de la peticion y no mostrala en pantalla
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//ejecutar la peticion y guardamos el resultado
$result = curl_exec($ch);
// una alternativa seria utlizar file_get_contents
// $result = file_get_contents(API_URL);
$data = json_decode($result, true);
curl_close($ch);
?>

<head>
    <meta charset="UTF-8">
    <title>Next Marvel Movie</title>
    <meta name="description" content="la proxima pelicual de marvel">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Centered viewport -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css"
>
</head>



<main>

    <hr><br>
    <hr><br>    <hr><br>


    <section>
    

        <img src="<?= $data["poster_url"]; ?>"  alt="poster peli" 
        ;>
        
    </section>

    <hgroup>
        <h3><?= $data["title"]; ?> se estrena en <?= $data["days_until"]; ?> días</h3>
        <p>Fecha de estreno: <?= $data["release_date"]; ?></p>
        <p>La siguiente es: <?= $data["following_production"]["title"]; ?></p>
    </hgroup>





<br><br><br>
    <pre style="font-size: small; overflow: scroll; height: 200px;">
        <?php var_dump($data); ?>
    </pre>

</main>




<style>
    :root {
        color-scheme: light dark;
    }
    body {
        display: grid;
        place-content: center;
      
    }
    h1,h2,h3 {
        color: #fff44f;
    }

    section {
        display: flex;
        justify-content: center;
        text-align: center;
    }

    hgroup {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    img {
        margin: 0 auto;
        border-radius: 26px;
        width: 300px;

    }


</style>