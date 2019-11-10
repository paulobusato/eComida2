<?php

require_once '../modelo/dao/Dao.php';
require_once '../modelo/entidade/Estabelecimento.php';
require_once '../modelo/dao/EstabelecimentoDao.php';

header('Content-type: application/json');

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
  case 'GET':
    $estabelecimentos = EstabelecimentoDao::consultar();
    echo json_encode($estabelecimentos);
    break;
  case 'POST':
    $estabelecimento = new Estabelecimento(
      $_POST["razaoSocial"],
      $_POST["nomeFantasia"],
      $_POST["cnpj"],
      $_POST["status"],
      $_POST["email"],
      $_POST["senha"],
      $_POST["telefone"],
      $_POST["cep"],
      $_POST["logradouro"],
      $_POST["numero"],
      $_POST["bairro"],
      $_POST["cidade"],
      $_POST["uf"]
    );
    EstabelecimentoDao::inserir($estabelecimento);
    echo json_encode("true");
    break;
  case 'PUT':
    echo 'PUT';
    break;
  case 'DELETE':
    echo 'DELETE';
    break;
  default:
    echo 'Não existe';
    break;
}


