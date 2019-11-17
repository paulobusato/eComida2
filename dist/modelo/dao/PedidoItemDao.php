<?php

class PedidoItemDao {

  public static function consultar($idPedido) {
    $pedidoItems = array();
    $sql = "
      SELECT *
      FROM PEDIDOITEM PI
      WHERE PI.IDPEDIDO = {$idPedido}
    ";

    $db_pedidoItems = Dao::consultar($sql);
    foreach ($db_pedidoItems as $db_pedidoItem) {
      $pedidoItem = new PedidoItem(
        $db_pedidoItem->IDPEDIDO,
        $db_pedidoItem->IDPEDIDOITEM,
        $db_pedidoItem->IDPRODUTO,
        $db_pedidoItem->QUANTIDADE,
        $db_pedidoItem->VALOR
      );
      array_push($pedidoItems, $pedidoItem);
    }

    return $pedidoItems;
  }

  public static function inserir($idPedido, $idProduto, $quantidade, $valor, $componenteItens) {
    $sql = "
      INSERT INTO `pedidoitem` (`IDPEDIDO`, `IDPEDIDOITEM`, `IDPRODUTO`, `QUANTIDADE`, `VALOR`)
      VALUES (
        '{$idPedido}',
        NULL,
        '{$idProduto}',
        '{$quantidade}',
        '{$valor}'
      );
    ";
    Dao::executar($sql);
  }
}
