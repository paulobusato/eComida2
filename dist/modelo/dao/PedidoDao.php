<?php

require_once 'Dao.php';
require_once '../modelo/entidade/Pedido.php';
require_once 'PedidoItemDao.php';
require_once 'ClienteDao.php';
require_once 'EstabelecimentoDao.php';


class PedidoDao {

  public static function consultar($idEstabelecimento = '', $idPedido = '') {
    $pedidos = array();

    if ($idEstabelecimento != '') {
      $sql = "
        SELECT *
        FROM PEDIDO P
        WHERE P.IDESTABELECIMENTO = {$idEstabelecimento}
      ";
    } else if ($idPedido != '') {
      $sql = "
        SELECT *
        FROM PEDIDO P
        WHERE P.IDPEDIDO = {$idPedido}
      ";
    } else {
      $sql = "
        SELECT *
        FROM PEDIDO P
      ";
    }

    $db_pedidos = Dao::consultar($sql);
    foreach ($db_pedidos as $db_pedido) {
      if ($idPedido != '') {
        return new Pedido(
          $db_pedido->IDPEDIDO,
          EstabelecimentoDao::consultar($db_pedido->IDESTABELECIMENTO),
          ClienteDao::consultar($db_pedido->IDCLIENTE),
          $db_pedido->DATA,
          PedidoItemDao::consultar($db_pedido->IDPEDIDO),
          $db_pedido->VALOR
        );
      } else {
        array_push($pedidos, new Pedido(
          $db_pedido->IDPEDIDO,
          EstabelecimentoDao::consultar($db_pedido->IDESTABELECIMENTO),
          ClienteDao::consultar($db_pedido->IDCLIENTE),
          $db_pedido->DATA,
          PedidoItemDao::consultar($db_pedido->IDPEDIDO),
          $db_pedido->VALOR
        ));
      }
    }

    return $pedidos;
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

  public static function inserir($idEstabelecimento, $idCliente, $pedidoItens) {
    $valor = 0;
    foreach ($pedidoItens as $pedidoItem) {
      $valor += $pedidoItem->valor;

      foreach ($pedidoItem->componentes as $componente) {
        foreach ($componente->componenteItems as $componenteItem) {
          $valor += $componenteItem->valor;
        }
      }
    }

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

    foreach ($pedidoItens as $pedidoItem) {
      PedidoItemDao::inserir(
        $idPedido,
        $pedidoItem->idProduto,
        $pedidoItem->quantidade,
        $pedidoItem->valor,
        $pedidoItem->componentes
      );
    }
  }
}
