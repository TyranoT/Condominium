<?php
session_start();
require './connectBD.php';

$email = $_SESSION['email'];

$query_salas = "SELECT salas FROM usuarios WHERE email = ?";
$stmt = mysqli_prepare($connect, $query_salas);

if($stmt) {
    mysqli_stmt_bind_param($stmt, 's', $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($result)) {
        $salasJson = $row['salas'];

        header('Content-Type: application/json');
        echo $salasJson;
    } else {
        echo json_encode(['error' => 'Nenhuma Sala Encontrada']);
    }
}