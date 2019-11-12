<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-type: application/json');

$method = $_SERVER["REQUEST_METHOD"];

var_dump($_SERVER);

switch ($method) {
  case 'GET':
    if ($_GET["cliente"]) {
      echo json_encode("true");
    } else if ($_GET["estabelecimento"]) {
      echo json_encode("false");
    }
    break;
  default:
    echo 'Não existe';
    break;
}
