<?php

require_once 'Dao.php';

class PedidoItemComponenteDao {

  public static function inserir($idPedido, $idPedidoItem, $idComponente, $idComponenteItem) {
    $sql = "
      INSERT INTO `pedidoitemcomponente` (`IDPEDIDO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`)
      VALUES ('{$idPedido}', '{$idComponente}' , '{$idComponenteItem}');
    ";

    Dao::executar($sql);
  }
}
