<?php

class ComponenteItemDao {

  public static function consultar($idProduto, $idComponente) {
    $componenteItems = array();
    $sql = "
      SELECT *
      FROM COMPONENTEITEM CI
      WHERE CI.IDPRODUTO = {$idProduto}
        AND CI.IDCOMPONENTE = {$idComponente}
    ";

    $db_componenteItems = Dao::consultar($sql);
    foreach ($db_componenteItems as $db_componenteItem) {
      $componenteItem = new ComponenteItem(
        $db_componenteItem->IDCOMPONENTEITEM,
        $db_componenteItem->DESCRICAO,
        $db_componenteItem->VALOR
      );
      array_push($componenteItems, $componenteItem);
    }

    return $componenteItems;
  }

  public static function inserir($idProduto, $idComponente, $componenteItem) {
    $sql = "
      INSERT INTO COMPONENTEITEM (IDPRODUTO, IDCOMPONENTE, DESCRICAO, VALOR)
      VALUES (
        {$idProduto},
        {$idComponente},
        '{$componenteItem->descricao}',
        {$componenteItem->valor}
      );
    ";
    Dao::executar($sql);
  }
}
