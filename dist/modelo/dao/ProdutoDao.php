<?php

class ProdutoDao {

  public static function consultar($idEstabelecimento, $idProduto = '') {
    $produtos = array();

    if ($idProduto != '') {
      $sql = "
        SELECT *
        FROM PRODUTO P
        WHERE P.IDESTABELECIMENTO = {$idEstabelecimento}
          AND P.IDPRODUTO = {$idProduto}
      ";
    } else {
      $sql = "
        SELECT *
        FROM PRODUTO
        WHERE P.IDESTABELECIMENTO = {$idEstabelecimento}
      ";
    }

    $db_produtos = Dao::consultar($sql);
    foreach ($db_produtos as $db_produto) {
      $produto = new Produto(
        $db_produto->IDPRODUTO,
        EstabelecimentoDao::consultar($db_produto->IDESTABELECIMENTO),
        ComponenteDao::consultar($db_produto->IDPRODUTO),
        $db_produto->DESCRICAO,
        $db_produto->VALOR
      );
      array_push($produtos, $produto);
    }

    return $produtos;
  }
}
