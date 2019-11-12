<?php

require_once '../modelo/dao/Dao.php';
require_once '../modelo/entidade/Cliente.php';
require_once '../modelo/dao/ClienteDao.php';

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-type: application/json');

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
  case 'GET':
    $estabelecimentos = ClienteDao::consultar();
    echo json_encode($estabelecimentos);
    break;
  case 'POST':
    $estabelecimento = new Estabelecimento(
      '',
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
    ClienteDao::inserir($estabelecimento);
    echo json_encode("true");
    break;
  case 'PUT':
    ClienteDao::alterar($estabelecimento);
    echo json_encode("true");
    break;
  case 'DELETE':
    ClienteDao::excluir($estabelecimento->idEstabelecimento);
    echo json_encode("true");
    break;
  default:
    echo 'Não existe';
    break;
}


