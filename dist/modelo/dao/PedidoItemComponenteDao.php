<?php

require_once 'Dao.php';
require_once 'ComponenteDao.php';
require_once 'ComponenteItemDao.php';
require_once '../modelo/entidade/Componente.php';
require_once '../modelo/entidade/ComponenteItem.php';

class PedidoItemComponenteDao {

  public static function consultar($idPedido, $idPedidoItem, $idProduto) {
    $sql = "
      SELECT *
      FROM PEDIDOITEMCOMPONENTE
      WHERE IDPEDIDO = {$idPedido}
        AND IDPEDIDOITEM = {$idPedidoItem}
    ";
    $componentes = array();

    $db_pedidoItemComponentes = Dao::consultar($sql);

    foreach ($db_pedidoItemComponentes as $db_pedidoItemComponente) {
      $componente = ComponenteDao::consultar($idProduto, $db_pedidoItemComponente->IDCOMPONENTE);
      $componenteItem = ComponenteItemDao::consultar($idProduto, $db_pedidoItemComponente->IDCOMPONENTE, $db_pedidoItemComponente->IDCOMPONENTEITEM);
      
      array_push($componentes, new Componente(
          $db_pedidoItemComponente->IDCOMPONENTE,
          '',
          $componente->descricao,
          $componente->quantidade,
          $componente->quantidade,
          new ComponenteItem(
            $componenteItem->idComponenteItem,
            $componenteItem->descricao,
            $componenteItem->valor
          )
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
