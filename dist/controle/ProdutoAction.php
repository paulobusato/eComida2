<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

require_once '../modelo/dao/Dao.php';
require_once '../modelo/entidade/Produto.php';
require_once '../modelo/entidade/Componente.php';
require_once '../modelo/entidade/ComponenteItem.php';
require_once '../modelo/entidade/Estabelecimento.php';
require_once '../modelo/dao/ProdutoDao.php';
require_once '../modelo/dao/ComponenteDao.php';
require_once '../modelo/dao/ComponenteItemDao.php';
require_once '../modelo/dao/EstabelecimentoDao.php';

$method = $_SERVER["REQUEST_METHOD"];

function onMethodGet() {
  if (isset($_GET["idEstabelecimento"])) {
    return ProdutoDao::consultar((int) $_GET["idEstabelecimento"]);
  } else {
    return new Produto();
  }
}

switch ($method) {
  case 'GET':
    $produtos = onMethodGet();
    echo json_encode($produtos);
    break;
  default:
    echo 'Não existe';
    break;
}
