<?php
require_once 'Dao.php';
require_once 'ComponenteItemDao.php';
require_once '../modelo/entidade/Componente.php';
require_once '../modelo/entidade/ComponenteItem.php';

class ComponenteDao {

  public static function consultar($idProduto, $idComponente = '') {
    if ($idComponente != '') {
      $sql = "
        SELECT *
        FROM COMPONENTE C
        WHERE C.IDPRODUTO = {$idProduto}
          AND C.IDCOMPONENTE = {$idComponente}
      ";
      $componentes = false;
    } else {
      $sql = "
        SELECT *
        FROM COMPONENTE C
        WHERE C.IDPRODUTO = {$idProduto}
      ";
      $componentes = array();
    }

    $db_componentes = Dao::consultar($sql);
    foreach ($db_componentes as $db_componente) {
      $componente = new Componente(
        $db_componente->IDCOMPONENTE,
        $db_componente->IDPRODUTO,
        $db_componente->DESCRICAO,
        $db_componente->QUANTIDADE,
        $db_componente->OBRIGATORIO == 'S' ? true : false,
        ComponenteItemDao::consultar($db_componente->IDPRODUTO, $db_componente->IDCOMPONENTE)
      );
      
      if ($idComponente != '') {
        return $componente;
      }

      array_push($componentes, $componente);
    }

    return $componentes;
  }

  public static function obterUltimoComponente($idProduto) {
    $sql = "
      SELECT MAX(C.IDCOMPONENTE) AS IDCOMPONENTE
      FROM COMPONENTE C
      WHERE C.IDPRODUTO = {$idProduto}
    ";
    $db_componente = Dao::consultar($sql)[0];
    return $db_componente->IDCOMPONENTE;
  }

  public static function inserir($idProduto, $componente) {
    $obrigatorio = $componente->obrigatorio == true ? 'S' : 'N';
    $sql = "
      INSERT INTO COMPONENTE (IDPRODUTO, DESCRICAO, QUANTIDADE, OBRIGATORIO)
      VALUES (
        {$idProduto},
        '{$componente->descricao}',
        {$componente->quantidade},
        '$obrigatorio'
      );
    ";
    $db_componente = Dao::executar($sql);
    return ComponenteDao::obterUltimoComponente($idProduto);
  }

  public static function alterar($idProduto, $componente) {
    $obrigatorio = $componente->obrigatorio == true ? 'S' : 'N';
    $sql = "
      UPDATE COMPONENTE
      SET DESCRICAO = '{$componente->descricao}',
          QUANTIDADE = '{$componente->quantidade}',
          OBRIGATORIO = '{$componente->valor}'
      WHERE IDPRODUTO = {$idProduto}
        AND IDCOMPONENTE = {$componente->idComponente}
    ";
    Dao::executar($sql);
  }

  public static function excluir($idProduto, $idComponente) {
    $sql = "
      DELETE FROM COMPONENTE
      WHERE IDPRODUTO = {$idProduto}
        AND IDCOMPONENTE = {$idComponente}
    ";
    Dao::executar($sql);
  }
}
