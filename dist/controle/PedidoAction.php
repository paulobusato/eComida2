<?php

require_once '../modelo/dao/Dao.php';
require_once '../modelo/entidade/Produto.php';
require_once '../modelo/entidade/Componente.php';
require_once '../modelo/entidade/ComponenteItem.php';
require_once '../modelo/entidade/Estabelecimento.php';
require_once '../modelo/dao/ProdutoDao.php';
require_once '../modelo/dao/ComponenteDao.php';
require_once '../modelo/dao/ComponenteItemDao.php';
require_once '../modelo/dao/EstabelecimentoDao.php';
require_once '../modelo/dao/PedidoDao.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Request-Headers: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');

$method = $_SERVER["REQUEST_METHOD"];

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

$form = [
  "idEstabelecimento" => $json_obj->idEstabelecimento,
  "idCliente" => $json_obj->idCliente,
  "valor" => $json_obj->valor,
  "pedidoItems" => $json_obj->pedidoItems,
];

switch ($method) {
  case 'GET':
    break;
  case 'POST':
    PedidoDao::inserir(
      $form["idEstabelecimento"],
      $form["idCliente"],
      $form["valor"],
      $form["pedidoItems"]
    );
    break;
  default:
    echo 'Não existe';
    break;
}
