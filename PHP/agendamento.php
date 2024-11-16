<?php
session_start(); //Inicia a Sessão
require './connectBD.php'; //Conexão

$email = $_SESSION['email']; //Pega Email pela Sessão
$nomeResponsavel = $_POST['nomeResponsavel']; // Pega nomeResponsavel por form
$salaSelect = $_POST['salaSelect']; // Pega salaSelect por form
$horaInicio = $_POST['horaInicio']; // Pega horaInicio por form
$horaFim = $_POST['horaFim']; // Pega horaFim por form
$data = $_POST['data']; // Pega data por form

$query_id = "SELECT id FROM usuarios WHERE email = ?"; // Comando SQL para pegar os id dos usuarios pelo email!
$query_agendar = "INSERT INTO agendamentos (id_usuario, nomeResponsavel, data, sala, hora_inicio, hora_fim)
    VALUES (?, ?, ?, ?, ?, ?)"; //Comando SQL para colocar os dados no bando de agendamentos
$stmt_idUser = mysqli_prepare($connect, $query_id); //Prepara a conexão e comando sql para pegar o id do usuario
$stmt_agendar = mysqli_prepare($connect, $query_agendar); //Prepara a conexão e comando sql para colocar os dados do agendamento

if($stmt_idUser){
    mysqli_stmt_bind_param($stmt_idUser, 's', $email); // Passa os parametros
    mysqli_stmt_execute($stmt_idUser); // Executa
    $result = mysqli_stmt_get_result($stmt_idUser); // Retorna os resultados
    if($row = mysqli_fetch_assoc($result)){ // Pega um array de dados associados ao resultado.
        $id_user = $row['id']; //Pega os valores pela coluna passada dentro do $row[];
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
            ); // Passa os parametros obs: deve seguir a mesma ordem do comando sql lá cima;
            mysqli_stmt_execute($stmt_agendar); // Executa
            mysqli_stmt_close($stmt_agendar); // Fecha Executação (opcional)
        }
    }
}