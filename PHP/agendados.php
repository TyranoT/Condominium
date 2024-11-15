<?php
session_start();
require './connectBD.php';

$email = $_SESSION['email'];

$query_condominio = "SELECT * FROM usuarios WHERE email = ?";
$query_agendados = "SELECT * FROM agendamentos WHERE id_usuario = ?";
$stmt_agendados = mysqli_prepare($connect, $query_agendados);
$stmt_condominio = mysqli_prepare($connect, $query_condominio);

if($stmt_condominio) {
    mysqli_stmt_bind_param($stmt_condominio, 's', $email);
    mysqli_stmt_execute($stmt_condominio);
    $result = mysqli_stmt_get_result($stmt_condominio);

    if($row = mysqli_fetch_assoc($result)) {
        $id_user = $row['id'];
        $nomeCondominio = $row['nomeCondominio'];
        $nomeSindico = $row['nomeSindico'];
        if($stmt_agendados){
            mysqli_stmt_bind_param($stmt_agendados, 'i', $id_user);
            mysqli_stmt_execute($stmt_agendados);
            $valores = mysqli_stmt_get_result($stmt_agendados);

            if($linha = mysqli_fetch_assoc($valores)){
                $data = $linha['data'];
                $sala = $linha['sala'];
                $nomeResponsavel = $linha['nomeResponsavel'];
                echo json_encode([
                    'data' => $data,
                    'sala' => $sala,
                    'nomeResponsavel' => $nomeResponsavel,
                    'nomeCondominio' => $nomeCondominio,
                    'nomeSindico' => $nomeSindico,
                ]);
            }
        }
    } else {
        echo json_encode(['error' => 'Nenhuma Sala Encontrada']);
    }
}