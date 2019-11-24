<?php

require_once 'Dao.php';
require_once '../modelo/entidade/Cliente.php';

class ClienteDao {

  public static function consultar($idCliente = '') {
    $clientes = array();

    if ($idCliente != '') {
      $sql = "
        SELECT *
        FROM CLIENTE C
        WHERE C.IDCLIENTE = {$idCliente}
      ";
    } else {
      $sql = "
        SELECT *
        FROM CLIENTE C
      ";
    }

    $db_clientes = Dao::consultar($sql);

    foreach ($db_clientes as $db_cliente) {
      if ($idCliente != '') {
        return new Cliente(
          $db_cliente->IDCLIENTE,
          $db_cliente->NOME,
          $db_cliente->CPF,
          $db_cliente->EMAIL,
          '',
          $db_cliente->TELEFONE,
          $db_cliente->CEP,
          $db_cliente->LOGRADOURO,
          $db_cliente->NUMERO,
          $db_cliente->BAIRRO,
          $db_cliente->CIDADE,
          $db_cliente->UF
        );
      } else {
        array_push($clientes, new Cliente(
          $db_cliente->IDCLIENTE,
          $db_cliente->NOME,
          $db_cliente->CPF,
          $db_cliente->EMAIL,
          '',
          $db_cliente->TELEFONE,
          $db_cliente->CEP,
          $db_cliente->LOGRADOURO,
          $db_cliente->NUMERO,
          $db_cliente->BAIRRO,
          $db_cliente->CIDADE,
          $db_cliente->UF
        ));
      }
    }

    return $clientes;
  }

  public static function login($email, $senha) {
    $sql = "
      SELECT C.IDCLIENTE
      FROM CLIENTE C
      WHERE C.EMAIL = '{$email}'
        AND C.SENHA = '{$senha}'
    ";

    $db_login = Dao::consultar($sql);

    if ($db_login) {
      return Dao::consultar($sql)[0]->IDCLIENTE;
    } else {
      return false;
    }
  }
}

?>
