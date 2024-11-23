<?php 
//inicia a sessão para acessar váriáveis de sessão
session_start();

//inclui o arquivo que conecta o banco de dados
require './conexaoBD.php';

//obtém o e-mail do usuário armazenado na sessão 
$email = $_SESSION['email'];

//Declara a consulta a SQL para buscar as salas associadas  ao usuário com base no email 
$query_salas = "SELECT salas  FROM  usuarios WHERE email = ?";

//Prepara a consulta  para a execução no banco de dados 
$stmt = mysqli_prepare($connect,$query_salas);

if ($stmt) { // Verifica se a preparação da consulta foi bem sucedida 
    // Associa o parâmetro recebido ('$email') à consulta preparada 
    mysqli_stmt_bind_param($stmt,'s',$email);

    //Executa a consulta preparada no banco de dados 
    mysqli_stmt_execute($stmt);

    //obtém o resultado da consulta em formato de objeto resultante 
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        //Verifica se foi encontrada uma linha correspondente no resultado 
        //obtém o cargo 'salas ' da linha retornada 
        $salasJson = $row['salas'];

        //Envia o JSON das salas como resposta 
        echo $salasJson;
    }else {
            //Caso nenhum resultado seja encontrado , retorna um erro em formato JSON
            echo json_encode(['error'=>'Nenhuma Sala Encontrada']);
        }
    }
