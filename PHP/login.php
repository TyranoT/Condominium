<?php
session_start();
require "./connectBD.php";

$email = $_POST['email'];
$senha = $_POST['password'];

$query_dados = "SELECT email, senha FROM usuarios WHERE email = ?";

$stmt = mysqli_prepare($connect, $query_dados);

if($stmt){
    mysqli_stmt_bind_param($stmt, 's', $email);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);
    if($row = mysqli_fetch_assoc($result)){
        $emailBD = $row['email'];
        $senhaBD = $row['senha'];
        if($emailBD == $email && $senhaBD == $senha) {
            $_SESSION['email'] = $email;
            echo "<script>
                window.alert('Login Realizado Com Sucesso!');
                window.location.href = '../Paginas/calendar.html';
            </script>";
        } else {
            echo "<script>
                window.alert('Email ou Senha Incorreto!');
                window.location.href = '../Paginas/signin.html';
            </script>";
        }
    }
}