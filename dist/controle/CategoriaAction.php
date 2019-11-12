<?php

require_once '../modelo/dao/Dao.php';
require_once '../modelo/entidade/Categoria.php';
require_once '../modelo/dao/CategoriaDao.php';

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-type: application/json');

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
  case 'GET':
    $categorias = CategoriaDao::consultar();
    echo json_encode($categorias);
    break;
  case 'POST':
    // $estabelecimento = new Estabelecimento(
    //   '',
    //   $_POST["razaoSocial"],
    //   $_POST["nomeFantasia"],
    //   $_POST["cnpj"],
    //   $_POST["status"],
    //   $_POST["email"],
    //   $_POST["senha"],
    //   $_POST["telefone"],
    //   $_POST["cep"],
    //   $_POST["logradouro"],
    //   $_POST["numero"],
    //   $_POST["bairro"],
    //   $_POST["cidade"],
    //   $_POST["uf"]
    // );
    // EstabelecimentoDao::inserir($estabelecimento);
    echo json_encode("true");
    break;
  case 'PUT':
    // EstabelecimentoDao::alterar($estabelecimento);
    echo json_encode("true");
    break;
  case 'DELETE':
    // EstabelecimentoDao::excluir($estabelecimento->idEstabelecimento);
    echo json_encode("true");
    break;
  default:
    echo 'Não existe';
    break;
}


