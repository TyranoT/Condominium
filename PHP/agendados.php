<?php
session_start(); //inicio da sessão
require './/conexaoBD.php'; // Conexão com o banco de dados

$email = $_SESSION['email']; //Pega o valor da sessão , ou seja o email do usuário.

$query_condominio = "SELECT * FROM usuarios WHERE email = ?"; // Comando SQL para pegar todos os dados do Banco de Dados agendados pelo email
$query_agendados = "SELECT * FROM agendamentos WHERE id_usuario = ? "; // Comando SQL para pegar todos os dados do Banco de dados agendados pelo id_usuario
$stmt_agendados = mysqli_prepare($connect, $query_agendados); //Prepara a conexão  e comanda o SQL para pegar os dados do agendamento
$stmt_condominio = mysqli_prepare($connect, $query_condominio); // Prepara a conexão e comanda o SQL pegar os dados dos Usuarios


$datas = []; // Array vazio que será preenchido
if ($stmt_condominio) {
    mysqli_stmt_bind_param($stmt_condominio, 's', $email); // Passando os parametros
    mysqli_stmt_execute($stmt_condominio); //ExecutaS
    $result = mysqli_stmt_get_result($stmt_condominio); // Resultado

    if ($row = mysqli_fetch_assoc($result)) { // Associado ao resultado
        $id_user = $row['id']; //Pegar todos os dados pela coluna id
        $nomeCondominio = $row['nomeCondominio']; // Pegar todos os dados pela coluna nomeCondominio
        $nomeSindico = $row['nomeSindico']; // Pegar todos os dados pela coluna nomeSindico

        if ($stmt_agendados) {
            mysqli_stmt_bind_param($stmt_agendados, 'i', $id_user); // Passando os parametros
            mysqli_stmt_execute($stmt_agendados); //Executa
            $valores = mysqli_stmt_get_result($stmt_agendados); // Resultado

            while ($linha = mysqli_fetch_assoc($valores)) { // Associado ao resultado aqui tem repetição, acaba quando não tiver mais nada.
                $datas[] = [
                    'data' => $linha['data'],
                    'sala' => $linha['sala'],
                    'nomeResponsavel' => $linha['nomeResponsavel'],
                    'horaInicio' => $linha['hora_inicio'],
                    'horaFim' => $linha['hora_fim'],
                ]; //Dados a serem colocados 'chave' => valor;
            }

            echo json_encode([ // condifica para json, jeito mais eficiente e tranquilo de transportar dados
                'agendamento' => $datas,
                'nomeCondominio' => $nomeCondominio,
                'nomeSindico' => $nomeSindico,
            ]);
        }
    } else {
        echo json_encode(['error' => 'Nenhuma Sala Encontrada']); //Retorna um possivel error
    }
}
