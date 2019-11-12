<?php

class ProdutoDao {

  public static function consultar($idProduto) {
    $produtos = array();

    if (isset($idProduto)) {
      $sql = "
        SELECT *
        FROM PRODUTO P
        WHERE P.IDPRODUTO = {$idProduto}
      ";
    } else {
      $sql = "
        SELECT *
        FROM PRODUTO
      ";
    }

    $db_produtos = Dao::consultar($sql);
    foreach ($db_produtos as $db_produto) {
      $produto = new Produto(
        $db_produto->IDPRODUTO,
        EstabelecimentoDao::consultar($db_produto->IDESTABELECIMENTO),
        $db_produto->DESCRICAO,
        $db_produto->VALOR
      );
      array_push($produtos, $produto);
    }

    return $produtos;
  }
}
