<?php

class PedidoDao {

  public static function consultar($idPedido) {
    $sql = "
      SELECT *
      FROM PEDIDO P
      WHERE P.IDPEDIDO = {$idPedido}
    ";

    $db_pedidos = Dao::consultar($sql);
    foreach ($db_pedidos as $db_pedido) {
      return new Pedido(
        $db_pedido->IDPEDIDO,
        EstabelecimentoDao::consultar($db_pedido->estabelecimento->idEstabelecimento),
        ClienteDao::consultar($db_pedido->cliente->idCliente),
        '',
        $db_pedido->DATA,
        $db_pedido->VALOR
      );
    }
  }

  public static function inserir($pedido) {

    $sql = "
      INSERT INTO `pedido` (`IDPEDIDO`, `IDESTABELECIMENTO`, `IDCLIENTE`, `DATA`, `VALOR`)
      VALUES (
        NULL,
        {$pedido->estabelecimento->idEstabelecimento},
        {$pedido->cliente->idCliente},
        '',
        {$pedido->valorTotal}
      )
    ";

    Dao::executar($sql);
  }
}
