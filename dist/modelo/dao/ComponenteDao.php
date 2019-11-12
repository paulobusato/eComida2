<?php

class ComponenteDao {

  public static function consultar($idProduto, $idComponente) {
    $componentes = array();

    if (isset($idComponente)) {
      $sql = "
        SELECT *
        FROM COMPONENTE C
        WHERE C.IDPRODUTO = {$idProduto}
          AND C.IDCOMPONENTE = {$idComponente}
      ";
    } else {
      $sql = "
        SELECT *
        FROM COMPONENTE C
        WHERE C.IDPRODUTO = {$idProduto}
      ";
    }

    $db_componentes = Dao::consultar($sql);
    foreach ($db_componentes as $db_componente) {
      $componente = new Componente(
        $db_componente->IDCOMPONENTE,
        $db_componente->IDPRODUTO,
        $db_componente->DESCRICAO,
        $db_componente->VALOR
      );
      array_push($componentes, $componente);
    }

    return $componentes;
  }
}