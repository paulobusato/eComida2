<?php
require_once 'cors/cors.php';
require_once '../modelo/dao/ClienteDao.php';
require_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);
$method = $_SERVER["REQUEST_METHOD"];

if ($method == 'POST') {
  ClienteDao::inserir($json_obj);
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
  $idCliente = $decoded->data->idCliente;

  http_response_code(200);

  switch ($method) {
    case 'GET':
      $response = ClienteDao::consultar($idCliente);
    break;
    default:
      $response = 'Não existe';
    break;
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