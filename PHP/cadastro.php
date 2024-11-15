<?php

$nomeSindico = $_POST['nomeSindico'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$nomeCondominio = $_POST['nomeCondominio'];
$nomeRua = $_POST['nomeRua'];
$numeroCondominio = $_POST['numeroCondominio'];
$estadoCondominio = $_POST['estadoCondominio'];
$salas = json_decode($_POST['salasArmazenado'], true); // Decodifica para array

// Conexão com o Railway que o local onde está hospedado o banco de dados!
$connect = mysqli_connect('junction.proxy.rlwy.net', 'root', 'VzXXsFUcaDRjnHrRbgFycSQzayDyKASl', 'railway', 10676);

if ($connect) {
    $query = "INSERT INTO usuarios (nomeSindico, email, senha, nomeCondominio, nomeRua, numeroCondominio, estadoCondominio, salas) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; // ? Representa paramentros que serão seguidos
    
    $stmt = mysqli_prepare($connect, $query); // Prepara para passar os paramentros
    

    if ($stmt) { // Se tem paramentros
        $salasJson = json_encode($salas); // Codifica para json
        
        // Paramentros que serão colocados (prepare($stmt), tipo(s significa string para cada dado), e o restante dos dados seguindo a ordem)
        mysqli_stmt_bind_param($stmt, 'ssssssss', $nomeSindico, $email, $senha, $nomeCondominio, $nomeRua, $numeroCondominio, $estadoCondominio, $salasJson);
        
        // Aqui ele execute e se tudo der certo ele retorna true para acionar o if
        if (mysqli_stmt_execute($stmt)) {
            echo "Dados inseridos com sucesso!";
        } else {
            echo "Erro ao executar a query: " . mysqli_stmt_error($stmt);
        }
        
        // Fecha e finalizar o prepare!
        mysqli_stmt_close($stmt);
    } else {
        echo "Erro ao preparar a query: " . mysqli_error($connect);
    }
} else {
    echo "Erro ao conectar com o banco de dados: " . mysqli_connect_error();
}

// Fecha a conexão com o Banco de Dados!
mysqli_close($connect);

?>
