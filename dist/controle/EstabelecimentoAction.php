<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Request-Headers: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');

require_once '../modelo/dao/Dao.php';
require_once '../modelo/entidade/Estabelecimento.php';
require_once '../modelo/dao/EstabelecimentoDao.php';

$method = $_SERVER["REQUEST_METHOD"];

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

switch ($method) {
  case 'GET':
    if (isset($_GET["idEstabelecimento"])) {
      echo json_encode(EstabelecimentoDao::consultar($_GET["idEstabelecimento"]));
    } else {
      echo json_encode(EstabelecimentoDao::consultar());
    }
    break;
  case 'POST':
    $estabelecimento = new Estabelecimento(
      '',
      $json_obj->razaoSocial,
      $json_obj->nomeFantasia,
      $json_obj->cnpj,
      $json_obj->status,
      '0',
      '',
      $json_obj->email,
      $json_obj->senha,
      $json_obj->telefone,
      $json_obj->cep,
      $json_obj->logradouro,
      $json_obj->numero,
      $json_obj->bairro,
      $json_obj->cidade,
      $json_obj->uf
    );
    EstabelecimentoDao::inserir($estabelecimento);
    echo json_encode("true");
    break;
  case 'PUT':
    EstabelecimentoDao::alterar($estabelecimento);
    echo json_encode("true");
    break;
  case 'DELETE':
    EstabelecimentoDao::excluir($estabelecimento->idEstabelecimento);
    echo json_encode("true");
    break;
  default:
    echo 'Não existe';
    break;
}


