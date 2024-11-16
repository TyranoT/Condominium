<?php
// Inicia a sessão para acessar variáveis de sessão
session_start();

// Inclui o arquivo que conecta ao banco de dados
require './connectBD.php';

// Obtém o e-mail do usuário armazenado na sessão
$email = $_SESSION['email'];

// Declara a consulta SQL para buscar as salas associadas ao usuário com base no e-mail
$query_salas = "SELECT salas FROM usuarios WHERE email = ?";

// Prepara a consulta para execução no banco de dados
$stmt = mysqli_prepare($connect, $query_salas);

if ($stmt) { // Verifica se a preparação da consulta foi bem-sucedida
    // Associa o parâmetro recebido ('$email') à consulta preparada
    mysqli_stmt_bind_param($stmt, 's', $email);

    // Executa a consulta preparada no banco de dados
    mysqli_stmt_execute($stmt);

    // Obtém o resultado da consulta em formato de objeto resultante
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) { 
        // Verifica se foi encontrada uma linha correspondente no resultado
        // Obtém o campo 'salas' da linha retornada
        $salasJson = $row['salas'];

        // Envia o JSON das salas como resposta
        echo $salasJson;
    } else {
        // Caso nenhum resultado seja encontrado, retorna um erro em formato JSON
        echo json_encode(['error' => 'Nenhuma Sala Encontrada']);
    }
}
