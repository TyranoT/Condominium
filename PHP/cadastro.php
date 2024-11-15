<?php

$nomeSindico = $_POST['nomeSindico'];
$nomeCondominio = $_POST['nomeCondominio'];
$nomeRua = $_POST['nomeRua'];
$numeroCondominio = $_POST['numeroCondominio'];
$estadoCondominio = $_POST['estadoCondominio'];
$salas = json_decode($_POST['salasArmazenado'], true);

$connect = mysqli_connect('jdbc:mysql://junction.proxy.rlwy.net:10676/railway', 'root', 'VzXXsFUcaDRjnHrRbgFycSQzayDyKASl', 'railway');

if($connect) {
    echo "Banco de Dados Criado";
} else {
    echo "Erro";
}
?>