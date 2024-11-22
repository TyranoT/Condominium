<?php 
session_start(); //Inicia a Sessão
require './conexaoBD.php'; // Conexão com o banco de dados

$email = $_SESSION['email']; // Pega o email da sessão
$nomeResponsavel = $_POST['nomeResponsavel']; // Pega nomeResponsavel por form
$salaSelect = $_POST['salaSelect']; // Pega salaSelect por form
$horaInicio = $_POST['horaInicio']; // Pega horaInicio por form
$horaFim = $_POST['horaFim']; // Pega horaFim por form
$data = $_POST['data']; // Pega a data por form

$query_id = "SELECT id FROM usuarios WHERE email = ?";//Comando SQL para pegar os id dos usuarios pelo email
$query_agendar = "INSERT INTO agendamentos(id_usuario,nomeResponsavel,data,sala,hora_inicio,hora_fim)
    VALUES(?, ?, ?, ?, ?, ?)"; //Comando SQL para colocar os dados no banco de agendamentos

$stmt_idUser = mysqli_prepare($connect,$query_id); // Prepara a conexão e o comando SQL para pegar  o ID do usuario
$stmt_agendar = mysqli_prepare($connect,$query_agendar); // Prepara a conexão e o comando SQL para colocar os dados do agendamento 

if ($stmt_idUser){
    mysqli_stmt_bind_param($stmt_idUser,'s',$email); // Passa os parâmetros
    mysqli_stmt_execute($stmt_idUser); // Executa
    $result = mysqli_stmt_get_result($stmt_idUser); // Retorna os resultados
    if($row = mysqli_fetch_assoc($result)){ // Pega um array de dados associados ao resultado.
        $id_user = $row['id']; // Pega os valores pela coluna passada dentro do $row[];
        if($stmt_agendar){
            mysqli_stmt_bind_param(
                $stmt_agendar,
                'isssss',
                $id_user,
                $nomeResponsavel,
                $data,
                $salaSelect,
                $horaInicio,
                $horaFim
            ); // Passa os parâmetros (obs:Deve seguir a mesma ordem do comando SQL  lá em cima)
            mysqli_stmt_execute($stmt_agendar); //Executa
            mysqli_stmt_close($stmt_agendar); //  Fecha a execução (Esse comando é opcional)
        }

    }
}







