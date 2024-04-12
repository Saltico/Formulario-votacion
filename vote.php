<?php

if(empty($_POST['name'])) {
    die('Nombre y apellido es requerido');
}

if(empty($_POST['alias'])){
    die('Alias es requerido');
}

if(empty($_POST['rut'])){
    die('Rut es requerido');
}

if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    die('Email no es valido');
}

if(empty($_POST['region'])){
    die('Región es requerido');
}

if(empty($_POST['comuna'])){
    die('Comuna es requerido');
}

if(empty($_POST['candidato'])){
    die('Candidato es requerido');
}

if(isset($_POST['medio']) && !empty($_POST['medio'])) {
    $medio_values = implode(', ', $_POST['medio']);
} else {
    $medio_values = 'Otro'; //De no seleccionar ningun medio, se guarda como "Otro"
}

$mysqli = require __DIR__ . '/database.php';

$sql = 'INSERT INTO vote (name, alias, rut, email, region, comuna, candidato, medio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

$stmt = $mysqli->stmt_init();

if(!$stmt->prepare($sql)) {
    die('SQL error: '. $mysqli->error);
}

$stmt->bind_param('ssssssss',
                    $_POST['name'], 
                    $_POST['alias'], 
                    $_POST['rut'], 
                    $_POST['email'], 
                    $_POST['region'], 
                    $_POST['comuna'], 
                    $_POST['candidato'],
                    $medio_values);

if($stmt->execute()) {
    header('Location: success.html');
    exit;
}else{
    die($mysqli->error . "" . $mysqli->errno); 
}

