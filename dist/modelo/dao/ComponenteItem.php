<?php

class ComponenteItemDao {

  public static function consultar($idComponente, $idProduto) {
    $componenteItems = array();
    $sql = "
      SELECT *
      FROM COMPONENTEITEM CI
      WHERE CI.IDCOMPONENTE = {$idComponente}
    ";

    $db_componente = ComponenteDao::consultar($idProduto, $idComponente);

    $db_componenteItems = Dao::consultar($sql);
    foreach ($db_componenteItems as $db_componenteItem) {
      $componenteItem = new ComponenteItem(
        $db_componenteItem->IDCOMPONENTEITEM,
        $db_componente,
        $db_componenteItem->DESCRICAO,
        $db_componenteItem->VALOR
      );
      array_push($componenteItems, $componenteItem);
    }

    return $componenteItems;
  }
}