<?php 
session_start(); // Inicia a sessão
require "./conexaoBD.php"; // Conexão com o banco de dados

$email = $_POST['email']; // Email
$senha = $_POST['password']; // Senha

$query_dados = "SELECT email , senha From usuarios Where email = ?"; // Comando SQL

$stmt = mysqli_prepare( $connect , $query_dados); // Cria a conexeção e prepara o aplicamento dos dados

if($stmt){
    mysqli_stmt_bind_param($stmt, 's', $email); // Passa os parametros
    mysqli_stmt_execute($stmt); // executa o comando sql

    $result = mysqli_stmt_get_result($stmt); // mostra o resultado
    if($row = mysqli_fetch_assoc($result)){ // Pega o resultado por colunas
        $emailBD = $row['email']; // Coluna de Email
        $senhaBD = $row['senha']; // Coluna de Senha
        if($emailBD == $email && $senhaBD == $senha) {
            $_SESSION['email'] = $email; // Adicionando valor a sessão
            echo "<script>
                window.location.href = '../HTML/calendar.html';
            </script>"; //alert do js
        } else {
            echo "<script>
                window.alert('Email ou Senha Incorreto!');
                window.location.href = '../HTML/login.html';
            </script>"; //alert do js
        }
    }
}