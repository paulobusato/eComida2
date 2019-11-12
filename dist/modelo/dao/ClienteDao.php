<?php

class ClienteDao {

  public static function consultar() {
  }



  public static function login($email, $senha) {
    $sql = "
      SELECT 1 RESULTADO
      FROM CLIENTE C
      WHERE C.EMAIL = '{$email}'
        AND C.SENHA = '{$senha}'
    ";

    $db_cliente = Dao::consultar($sql);

    if ($db_cliente->RESULTADO === '1') {
      return true;
    } else {
      return false;
    }
  }
}

?>
