<?php
session_start(); //inicia sessão
require "./connectBD.php"; //conexão com banco de dados

$email = $_POST['email']; // email
$senha = $_POST['password']; // senha

$query_dados = "SELECT email, senha FROM usuarios WHERE email = ?"; //Comando SQL

$stmt = mysqli_prepare($connect, $query_dados); //criar conexão e prepara para aplicar os dados

if($stmt){
    mysqli_stmt_bind_param($stmt, 's', $email); // Passa os parametros
    mysqli_stmt_execute($stmt); // executa o comando sql

    $result = mysqli_stmt_get_result($stmt); //mostra o resultado
    if($row = mysqli_fetch_assoc($result)){ //Pega o resultado por colunas
        $emailBD = $row['email']; // Coluna de Email
        $senhaBD = $row['senha']; // Coluna de Senha
        if($emailBD == $email && $senhaBD == $senha) {
            $_SESSION['email'] = $email; // Adicionando valor a sessão
            header("location", "../Paginas/calendar.html")
            echo "<script>
                window.location.href = '../Paginas/calendar.html';
            </script>"; //alert do js
        } else {
            echo "<script>
                window.alert('Email ou Senha Incorreto!');
                window.location.href = '../Paginas/signin.html';
            </script>"; //alert do js
        }
    }
}