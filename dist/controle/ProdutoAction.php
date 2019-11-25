<?php
require_once 'cors/cors.php';
require_once '../modelo/dao/ProdutoDao.php';
require_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;

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

  $json_str = file_get_contents('php://input');
  $json_obj = json_decode($json_str);
  $method = $_SERVER["REQUEST_METHOD"];
  
  if (isset($idEstabelecimento)) {
    switch ($method) {
      case 'GET':
        if (isset($_GET["idProduto"])) {
          $response = ProdutoDao::consultar($idEstabelecimento, $_GET["idProduto"]);
        } else {
          $response = ProdutoDao::consultar($idEstabelecimento);
        }
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
