<?php
require_once 'cors/cors.php';
require_once '../modelo/dao/EstabelecimentoDao.php';
require_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);
$method = $_SERVER["REQUEST_METHOD"];

if ($method == 'POST') {
  EstabelecimentoDao::inserir($json_obj);
  http_response_code(200);
  echo json_encode(true);
  exit;
}

$jwt = substr(apache_request_headers()["Authorization"], 7);

define('SECRET_KEY', 'Super-Secret-Key');
define('ALGORITHM', 'HS256');

try {
  JWT::$leeway = 10;
  $decoded = JWT::decode($jwt, SECRET_KEY, array(ALGORITHM));
  if (isset($decoded->data->idEstabelecimento)) {
    $idEstabelecimento = $decoded->data->idEstabelecimento;
  }
  if (isset($decoded->data->idCliente)) {
    $idCliente = $decoded->data->idCliente;
  }

  http_response_code(200);

  if (isset($idCliente) && $method == 'GET') {
    if (isset($_GET["idEstabelecimento"])) {
      $response = EstabelecimentoDao::consultar($_GET["idEstabelecimento"])[0];
    } else {
      $response = EstabelecimentoDao::consultar();
    }
  } else if (isset($idEstabelecimento)) {
    switch ($method) {
      case 'GET':
        $response = EstabelecimentoDao::consultar($idEstabelecimento)[0];
        break;
      case 'PUT':
        EstabelecimentoDao::alterar($idEstabelecimento, $json_obj);
        $response = true;
        break;
      default:
        $response = 'Não existe';
      break;
    }
  }

} catch (Exception $e) {
  
  http_response_code(401);

  $response = array(
    "jwt" => $jwt,
    "status" => "error",
    "mensagem" => $e->getMessage()
  );
}

echo json_encode($response);