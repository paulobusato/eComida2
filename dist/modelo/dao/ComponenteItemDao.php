<?php

class ComponenteItemDao {

  public static function consultar($idProduto, $idComponente, $idComponenteItem = '') {
    $componenteItems = array();
    
    if ($idComponenteItem != '') {
      $sql = "
        SELECT *
        FROM COMPONENTEITEM CI
        WHERE CI.IDPRODUTO = {$idProduto}
          AND CI.IDCOMPONENTE = {$idComponente}
          AND CI.IDCOMPONENTEITEM = {$idComponenteItem}
      ";
    } else {
      $sql = "
        SELECT *
        FROM COMPONENTEITEM CI
        WHERE CI.IDPRODUTO = {$idProduto}
          AND CI.IDCOMPONENTE = {$idComponente}
      ";
    }

    $db_componenteItems = Dao::consultar($sql);
    foreach ($db_componenteItems as $db_componenteItem) {
      $componenteItem = new ComponenteItem(
        $db_componenteItem->IDCOMPONENTEITEM,
        $db_componenteItem->DESCRICAO,
        $db_componenteItem->VALOR
      );

      if ($idComponenteItem != '') {
        return $componenteItem;
      }

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

  public static function alterar($idProduto, $idComponente, $ComponenteItem) {
    $sql = "
      UPDATE COMPONENTEITEM
      SET DESCRICAO = '{$ComponenteItem->descricao}',
          VALOR = '{$ComponenteItem->valor}'
      WHERE IDPRODUTO = {$idProduto}
      AND IDCOMPONENTE = {$idComponente}
      AND IDCOMPONENTEITEM = {$ComponenteItem->idComponenteItem}
    ";
    Dao::executar($sql);
  }

  public static function excluir($idProduto, $idComponente, $idComponenteItem = '') {
    if ($idComponenteItem != '') {
      $sql = "
      DELETE FROM COMPONENTEITEM
      WHERE IDPRODUTO = {$idProduto}
        AND IDCOMPONENTE = {$idComponente}
        AND IDCOMPONENTEITEM = {$idComponenteItem}
    ";
    } else {
      $sql = "
        DELETE FROM COMPONENTEITEM
        WHERE IDPRODUTO = {$idProduto}
          AND IDCOMPONENTE = {$idComponente}
      ";
    }
    Dao::executar($sql);
  }
}
