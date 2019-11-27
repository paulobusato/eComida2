<?php

require_once 'Dao.php';
require_once 'EstabelecimentoDao.php';
require_once 'ComponenteDao.php';
require_once '../modelo/entidade/Produto.php';

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
        FROM PRODUTO P
        WHERE P.IDESTABELECIMENTO = {$idEstabelecimento}
      ";
    }

    $db_produtos = Dao::consultar($sql);
    foreach ($db_produtos as $db_produto) {
      $produto = new Produto(
        $db_produto->IDPRODUTO,
        EstabelecimentoDao::consultar($db_produto->IDESTABELECIMENTO)[0],
        ComponenteDao::consultar($db_produto->IDPRODUTO),
        $db_produto->TITULO,
        $db_produto->DESCRICAO,
        $db_produto->VALOR,
        $db_produto->IMGURL
      );

      if ($idProduto != '') {
        return $produto;
      } else {
        array_push($produtos, $produto);
      }

    }

    return $produtos;
  }

  public static function obterUltimoProduto($idEstabelecimento) {
    $sql = "
      SELECT MAX(P.IDPRODUTO) AS IDPRODUTO
      FROM PRODUTO P
      WHERE P.IDESTABELECIMENTO = {$idEstabelecimento}
    ";
    $db_produto = Dao::consultar($sql)[0];
    return $db_produto->IDPRODUTO;
  }

  public static function inserir($idEstabelecimento, $produto) {
    $sql = "
      INSERT INTO PRODUTO (IDESTABELECIMENTO, TITULO, DESCRICAO, VALOR, IMGURL)
      VALUES (
        '{$idEstabelecimento}',
        '{$produto->titulo}',
        '{$produto->descricao}',
        '{$produto->valor}',
        '{$produto->imgUrl}'
      );
    ";
    Dao::executar($sql);
    return ProdutoDao::obterUltimoProduto($idEstabelecimento);
  }
}
