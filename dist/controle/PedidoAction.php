<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Request-Headers: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');

require_once '../modelo/dao/Dao.php';
// require_once '../modelo/entidade/Produto.php';
// require_once '../modelo/entidade/Componente.php';
// require_once '../modelo/entidade/ComponenteItem.php';
// require_once '../modelo/entidade/Estabelecimento.php';
require_once '../modelo/dao/ProdutoDao.php';
require_once '../modelo/dao/ComponenteDao.php';
require_once '../modelo/dao/ComponenteItemDao.php';
require_once '../modelo/dao/EstabelecimentoDao.php';
require_once '../modelo/dao/PedidoDao.php';

$method = $_SERVER["REQUEST_METHOD"];

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

// $form = [
//   "idEstabelecimento" => $json_obj->produtos[0]->estabelecimento->idEstabelecimento,
//   "idCliente" => 1,
//   "pedidoItens" => $json_obj->produtos,
// ];

switch ($method) {
  case 'GET':
    if (isset($_GET["idEstabelecimento"])) {
      echo json_encode(PedidoDao::consultar($_GET["idEstabelecimento"]));
    } else {
      echo json_encode(PedidoDao::consultar());
    }
    break;
  case 'POST':
    PedidoDao::inserir(
      $json_obj->produtos[0]->estabelecimento->idEstabelecimento,
      1,
      $json_obj->produtos
    );
    break;
  default:
    echo 'Não existe';
    break;
}
