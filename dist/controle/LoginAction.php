<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, DELETE');

require_once '../modelo/dao/EstabelecimentoDao.php';
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;

define('SECRET_KEY', 'Super-Secret-Key');
define('ALGORITHM', 'HS256');

$requisicao = json_decode(file_get_contents("php://input"));

$tipoUsuario = $requisicao->tipoUsuario;
$email = $requisicao->email;
$senha = $requisicao->senha;

if ($tipoUsuario == 'E') {
  $idEstabelecimento = EstabelecimentoDao::login($email, $senha);

  if ($idEstabelecimento) {
    $iat = time();
    $nbf = $iat + 10;
    $exp = $iat + 60;

    $token = array(
      "iss" => "http://example.org",
      "aud" => "http://example.com",
      "iat" => $iat,
      "nbf" => $nbf,
      "exp" => $exp,
      "data" => array(
        "idEstabelecimento" => $idEstabelecimento
        )
      );

    http_response_code(200);

    $jwt = JWT::encode($token, SECRET_KEY);

    $dados_inserido = array(
      "token" => $jwt,
      "idEstabelecimento" => $idEstabelecimento,
      "status" => "sucesso",
      "mensagem" => "Logado com sucesso"
    );
  } else {
    $dados_inserido = array(
      "status" => "invalido",
      "mensagem" => "Requisição Inválida"
    ); 
  }

}

echo json_encode($dados_inserido);