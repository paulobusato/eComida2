<?php

require_once 'Dao.php';
require_once '../modelo/entidade/Pedido.php';
require_once 'PedidoItemDao.php';
require_once 'ClienteDao.php';
require_once 'EstabelecimentoDao.php';
require_once 'PedidoItemComponenteDao.php';


class PedidoDao {

  public static function consultar($idEstabelecimento = '', $idPedido = '', $idCliente = '') {
    $pedidos = array();

    if ($idEstabelecimento != '' && $idPedido != '') {
      $sql = "
        SELECT *
        FROM PEDIDO P
        WHERE P.IDPEDIDO = {$idPedido}
          AND P.IDESTABELECIMENTO = {$idEstabelecimento}
      ";
    } else if ($idEstabelecimento != '') {
      $sql = "
        SELECT *
        FROM PEDIDO P
        WHERE P.IDESTABELECIMENTO = {$idEstabelecimento}
      ";
    } else if ($idCliente != '') {
      $sql = "
        SELECT *
        FROM PEDIDO P
        WHERE P.IDCLIENTE = {$idCliente}
      ";
    }  else {
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
          PedidoItemDao::consultar($db_pedido->IDPEDIDO, $db_pedido->IDESTABELECIMENTO),
          $db_pedido->VALOR,
          $db_pedido->STATUS
        );
      } else {
        array_push($pedidos, new Pedido(
          $db_pedido->IDPEDIDO,
          EstabelecimentoDao::consultar($db_pedido->IDESTABELECIMENTO),
          ClienteDao::consultar($db_pedido->IDCLIENTE),
          $db_pedido->DATA,
          PedidoItemDao::consultar($db_pedido->IDPEDIDO),
          $db_pedido->VALOR,
          $db_pedido->STATUS
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

  public static function inserir($idEstabelecimento, $idCliente, $valor, $pedidoItens) {
    $sql = "
      INSERT INTO `pedido` (`IDPEDIDO`, `IDESTABELECIMENTO`, `IDCLIENTE`, `VALOR`, `STATUS`)
      VALUES (
        NULL,
        {$idEstabelecimento},
        {$idCliente},
        {$valor},
        'Pendente'
      );
    ";

    Dao::executar($sql);

    $idPedido = PedidoDao::obterUltimoIDPedido($idEstabelecimento, $idCliente, $valor);

    foreach ($pedidoItens as $pedidoItem) {
      PedidoItemDao::inserir(
        $idPedido,
        $pedidoItem->produto->idProduto,
        $pedidoItem->quantidade,
        $pedidoItem->produto->valor,
        $pedidoItem->produto->componentes
      );
    }
  }

  public static function alterarStatusPedido($idPedido, $novoStatus) {
    $sql = "
      UPDATE PEDIDO
      SET STATUS = '{$novoStatus}'
      WHERE IDPEDIDO = {$idPedido}
    ";
    Dao::executar($sql);
  }
}
