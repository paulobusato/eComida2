<?php

require_once 'Dao.php';

class PedidoItemComponenteDao {

  public static function inserir($idPedido, $idPedidoItem, $idComponente, $idComponenteItem) {
    $sql = "
      INSERT INTO `pedidoitemcomponente` (`IDPEDIDO`, `IDPEDIDOITEM`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`)
      VALUES ('{$idPedido}', '{$idPedidoItem}', '{$idComponente}' , '{$idComponenteItem}');
    ";

    Dao::executar($sql);
  }
}
