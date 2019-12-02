<?php

require_once 'PedidoItemComponenteDao.php';
require_once 'ProdutoDao.php';
require_once '../modelo/entidade/PedidoItem.php';

class PedidoItemDao {

  public static function consultar($idPedido, $idEstabelecimento = '') {
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
        ProdutoDao::consultar($idEstabelecimento, $db_pedidoItem->IDPRODUTO),
        $db_pedidoItem->QUANTIDADE,
        $db_pedidoItem->VALOR
      );
      array_push($pedidoItems, $pedidoItem);
    }

    return $pedidoItems;
  }

  public static function obterUltimoIdItemPedido($idPedido, $idProduto, $quantidade, $valor) {
    $sql = "
      SELECT MAX(PI.IDPEDIDOITEM) AS IDPEDIDOITEM
      FROM PEDIDOITEM PI
      WHERE PI.IDPEDIDO = '{$idPedido}'
        AND PI.IDPRODUTO = '{$idProduto}'
        AND PI.QUANTIDADE = '{$quantidade}'
        AND PI.VALOR = '{$valor}'
    ";
    $db_idPedidoItem = Dao::consultar($sql);
    return $db_idPedidoItem[0]->IDPEDIDOITEM;
  }

  public static function inserir($idPedido, $idProduto, $quantidade, $valor, $componentes) {
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

    $ultimoIdItemPedido = PedidoItemDao::obterUltimoIdItemPedido($idPedido, $idProduto, $quantidade, $valor);

    foreach ($componentes as $componente) {
      foreach ($componente->componenteItems as $componenteItem) {
        if ($componenteItem->selecionado == true) {
          PedidoItemComponenteDao::inserir($idPedido, $ultimoIdItemPedido, $componente->idComponente, $componenteItem->idComponenteItem);
        }
      }
    }

  }
}
