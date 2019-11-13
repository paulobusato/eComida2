<?php

require_once('Dao.php');
require_once('PedidoItemDao.php');


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

  public static function obterUltimoIDPedido($idEstabelecimento, $idCliente, $valor) {
    $sql = "
    SELECT MAX(P.IDPEDIDO) AS IDPEDIDO
    FROM PEDIDO P
    WHERE P.IDESTABELECIMENTO = {$idEstabelecimento}
      AND P.IDCLIENTE = {$idCliente}
        AND P.VALOR = {$valor}
    ";

    $db_idpedidos = Dao::consultar($sql);
    foreach ($db_idpedidos as $db_idpedido) {
      return $db_idpedido->IDPEDIDO;
    }
  }

  public static function inserir($idEstabelecimento, $idCliente, $valor, $pedidoItems) {
    $sql = "
      INSERT INTO `pedido` (`IDPEDIDO`, `IDESTABELECIMENTO`, `IDCLIENTE`, `VALOR`)
      VALUES (
        NULL,
        {$idEstabelecimento},
        {$idCliente},
        {$valor}
      );
    ";

    Dao::executar($sql);

    $idPedido = PedidoDao::obterUltimoIDPedido($idEstabelecimento, $idCliente, $valor);

    foreach ($pedidoItems as $pedidoItem) {
      PedidoItemDao::inserir(
        $idPedido,
        $pedidoItem->idProduto,
        $pedidoItem->quantidade,
        $pedidoItem->valor
      );
    }
  }
}
