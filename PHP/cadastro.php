<?php

// Recebendo os dados do formulário
$nomeSindico = $_POST['nomeSindico'];
$email = $_POST['email'];
$nomeCondominio = $_POST['nomeCondominio'];
$nomeRua = $_POST['nomeRua'];
$numeroCondominio = $_POST['numeroCondominio'];
$estadoCondominio = $_POST['estadoCondominio'];
$salas = json_decode($_POST['salasArmazenado'], true); 

$connect = mysqli_connect('junction.proxy.rlwy.net', 'root', 'VzXXsFUcaDRjnHrRbgFycSQzayDyKASl', 'railway', 10676);

if ($connect) {
    $query = "INSERT INTO usuarios (nomeSindico, email, nomeCondominio, nomeRua, numeroCondominio, estadoCondominio, salas) 
              VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = mysqli_prepare($connect, $query);
    

    if ($stmt) {
        $salasJson = json_encode($salas);
        
        mysqli_stmt_bind_param($stmt, 'ssssss', $nomeSindico, $email, $nomeCondominio, $nomeRua, $numeroCondominio, $estadoCondominio, $salasJson);
        
        if (mysqli_stmt_execute($stmt)) {
            echo "Dados inseridos com sucesso!";
        } else {
            echo "Erro ao executar a query: " . mysqli_stmt_error($stmt);
        }
        
        mysqli_stmt_close($stmt);
    } else {
        echo "Erro ao preparar a query: " . mysqli_error($connect);
    }
} else {
    echo "Erro ao conectar com o banco de dados: " . mysqli_connect_error();
}

// Fechando a conexão
mysqli_close($connect);

?>
