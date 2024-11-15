<?php
session_start();
require './connectBD.php';

$email = $_SESSION['email'];
$nomeResponsavel = $_POST['nomeResponsavel'];
$salaSelect = $_POST['salaSelect'];
$horaInicio = $_POST['horaInicio'];
$horaFim = $_POST['horaFim'];
$data = $_POST['data'];

$query_id = "SELECT id FROM usuarios WHERE email = ?";
$query_agendar = "INSERT INTO agendamentos (id_usuario, nomeResponsavel, data, sala, hora_inicio, hora_fim)
    VALUES (?, ?, ?, ?, ?, ?)";
$stmt_idUser = mysqli_prepare($connect, $query_id);
$stmt_agendar = mysqli_prepare($connect, $query_agendar);

if($stmt_idUser){
    mysqli_stmt_bind_param($stmt_idUser, 's', $email);
    mysqli_stmt_execute($stmt_idUser);
    $result = mysqli_stmt_get_result($stmt_idUser);
    if($row = mysqli_fetch_assoc($result)){
        $id_user = $row['id'];
        if($stmt_agendar){
            mysqli_stmt_bind_param(
                $stmt_agendar, 
                'isssss', 
                $id_user, 
                $nomeResponsavel ,
                $data,
                $salaSelect,
                $horaInicio,
                $horaFim
            );
            mysqli_stmt_execute($stmt_agendar);
            mysqli_stmt_close($stmt_agendar);
        }
    }
}