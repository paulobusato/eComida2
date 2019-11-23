<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
      header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

  exit(0);
}

require_once '../modelo/dao/Dao.php';
require_once '../modelo/entidade/Estabelecimento.php';
require_once '../modelo/dao/EstabelecimentoDao.php';
require_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;

$jwt = substr(apache_request_headers()["Authorization"], 7);

define('SECRET_KEY', 'Super-Secret-Key');
define('ALGORITHM', 'HS256');

try {
  JWT::$leeway = 10;
  $decoded = JWT::decode($jwt, SECRET_KEY, array(ALGORITHM));
  $idEstabelecimento = $decoded->data->idEstabelecimento;

  http_response_code(200);
  
  $response = EstabelecimentoDao::consultar($idEstabelecimento)[0];

} catch (Exception $e) {
  
  http_response_code(401);

  $response = array(
    "jwt" => $jwt,
    "status" => "error",
    "mensagem" => $e->getMessage()
  );
}

echo json_encode($response);
exit;

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