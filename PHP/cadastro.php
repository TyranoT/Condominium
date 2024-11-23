<?php
require './conexaoBD.php'; // Conexão com o banco de dados
// informações essenciais para a reserva e onde será feito a reserva
$nomeSindico = $_POST['nomeSindico'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$nomeCondominio = $_POST['nomeCondominio'];
$nomeRua = $_POST['nomeRua'];
$numeroCondominio = $_POST['numeroCondominio'];
$estadoConominio = $_POST['estadoCondominio'];
$sala = json_decode($_POST['salasArmazenado'], true); // Decodifica parra a array

if ($connect) {
    $queryUser = "INSERT INTO usuarios (nomeSindico,email,senha,nomeCondominio,nomeRua,numeroCondominio,estadoCondominio,salas)
        VALUES (?,?,?,?,?,?,?,?)"; // O '?' Representa paramentros que serão seguidos


    $stmt = mysqli_prepare($connect, $queryUser); // Prepara para passar os paramentros 


    if ($stmt) { // Se tem paramentros
        $salasJson = json_encode($salas); //Codifica para json

        // Paramentros que serão colocados (prepare($stmt), tipo(significa string para cada dado) e o restante dos dados seguindo a ordem )
        mysqli_stmt_bind_param($stmt, 'ssssssss', $nomeSindico, $email, $senha, $nomeCondominio, $nomeRua, $numeroCondominio, $estadoConominio, $salasJson);

        // Aqui ele executa e se tudo der certo ele retorna true para acionar o if
        if (mysqli_stmt_execute($stmt)) {
            echo "<script>
            window.alert('Dados Inseridos com Sucesso');
            window.location.href = '../
            </script>";
        } else {
            echo "Erro ao executar a query:" . mysqli_stmt_error($stmt);
        }

        // Fecha e finalizar o prepare!
        mysqli_stmt_close($stmt);
    } else {
        echo "Erro ao preparar a query:" . mysqli_error($connect);
    }
} else {
    echo "Erro ao conectar com o banco de dados:" . mysqli_error($connect);
}
// Fecha a conexão com o banco de Dados!
mysqli_close($connect);
