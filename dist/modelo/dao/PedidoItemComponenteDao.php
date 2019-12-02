<?php

require_once 'Dao.php';
require_once 'ComponenteDao.php';
require_once 'ComponenteItemDao.php';
require_once '../modelo/entidade/Componente.php';
require_once '../modelo/entidade/ComponenteItem.php';

class PedidoItemComponenteDao {

  public static function consultar($idPedido, $idPedidoItem, $idProduto) {
    $sql = "
      SELECT DISTINCT IDCOMPONENTE
      FROM PEDIDOITEMCOMPONENTE
      WHERE IDPEDIDO = {$idPedido}
        AND IDPEDIDOITEM = {$idPedidoItem}
    ";
    $componentes = array();

    $db_pedidoComponentes = Dao::consultar($sql);

    foreach ($db_pedidoComponentes as $db_pedidoComponente) {
      $componente = ComponenteDao::consultar($idProduto, $db_pedidoComponente->IDCOMPONENTE);

      $componenteItens = array();

      $sql = "
        SELECT *
        FROM PEDIDOITEMCOMPONENTE
        WHERE IDPEDIDO = {$idPedido}
          AND IDPEDIDOITEM = {$idPedidoItem}
            AND IDCOMPONENTE = {$db_pedidoComponente->IDCOMPONENTE}
      ";

      $db_componenteItens = Dao::consultar($sql);

      foreach ($db_componenteItens as $db_componenteItem) {
        array_push(
          $componenteItens,
          ComponenteItemDao::consultar($idProduto, $db_pedidoComponente->IDCOMPONENTE, $db_componenteItem->IDCOMPONENTEITEM)
        );
      }
    
      array_push($componentes, new Componente(
          $db_pedidoComponente->IDCOMPONENTE,
          '',
          $componente->descricao,
          $componente->quantidade,
          $componente->quantidade,
          $componenteItens
        )
      );
    }
    return $componentes;
  }

  public static function inserir($idPedido, $idPedidoItem, $idComponente, $idComponenteItem) {
    $sql = "
      INSERT INTO `pedidoitemcomponente` (`IDPEDIDO`, `IDPEDIDOITEM`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`)
      VALUES ('{$idPedido}', '{$idPedidoItem}', '{$idComponente}' , '{$idComponenteItem}');
    ";

    Dao::executar($sql);
  }
}
