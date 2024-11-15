<?php

$nomeSindico = $_POST['nomeSindico'];
$nomeCondominio = $_POST['nomeCondominio'];
$nomeRua = $_POST['nomeRua'];
$numeroCondominio = $_POST['numeroCondominio'];
$estadoCondominio = $_POST['estadoCondominio'];
$salas = json_decode($_POST['salasArmazenado'], true);

$connect = mysqli_connect('127.0.0.1:5500', 'root', 'Monteiro8877#', 'Condominium');