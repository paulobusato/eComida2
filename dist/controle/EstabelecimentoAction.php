<?php
require_once 'cors/cors.php';
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

  $json_str = file_get_contents('php://input');
  $json_obj = json_decode($json_str);
  $method = $_SERVER["REQUEST_METHOD"];

  switch ($method) {
    case 'GET':
      $response = EstabelecimentoDao::consultar($idEstabelecimento)[0];
      break;
    case 'PUT':
      EstabelecimentoDao::alterar($json_obj);
    default:
      echo 'Não existe';
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