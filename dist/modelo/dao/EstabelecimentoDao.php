<?php

class EstabelecimentoDao {

  public static function consultar($idEstabelecimento = '') {
    $estabelecimentos = array();

    if ($idEstabelecimento != '') {
      $sql = "
        SELECT *
        FROM ESTABELECIMENTO E
        WHERE E.IDESTABELECIMENTO = {$idEstabelecimento}
      ";
    } else {
      $sql = "
        SELECT *
        FROM ESTABELECIMENTO
      ";
    }

    $db_estabelecimentos = Dao::consultar($sql);
    foreach ($db_estabelecimentos as $db_estabelecimento) {
      $estabelecimento = new Estabelecimento(
        $db_estabelecimento->IDESTABELECIMENTO,
        $db_estabelecimento->RAZAOSOCIAL,
        $db_estabelecimento->NOMEFANTASIA,
        $db_estabelecimento->CNPJ,
        $db_estabelecimento->STATUS,
        $db_estabelecimento->RATING,
        $db_estabelecimento->IMGURL,
        $db_estabelecimento->EMAIL,
        $db_estabelecimento->SENHA,
        $db_estabelecimento->TELEFONE,
        $db_estabelecimento->CEP,
        $db_estabelecimento->LOGRADOURO,
        $db_estabelecimento->NUMERO,
        $db_estabelecimento->BAIRRO,
        $db_estabelecimento->CIDADE,
        $db_estabelecimento->UF
      );
      array_push($estabelecimentos, $estabelecimento);
    }

    return $estabelecimentos;
  }

  public static function inserir($estabelecimento) {
    $sql = "
      INSERT INTO `estabelecimento` (`RAZAOSOCIAL`, `NOMEFANTASIA`, `CNPJ`, `STATUS`, `RATING`, `IMGURL`, `EMAIL`, `SENHA`, `TELEFONE`, `CEP`, `LOGRADOURO`, `NUMERO`, `BAIRRO`, `CIDADE`, `UF`)
      VALUES (
        '$estabelecimento->razaoSocial',
        '$estabelecimento->nomeFantasia',
        '$estabelecimento->cnpj',
        '$estabelecimento->status',
        '$estabelecimento->rating',
        '$estabelecimento->imgUrl',
        '$estabelecimento->email',
        '$estabelecimento->senha',
        '$estabelecimento->telefone',
        '$estabelecimento->cep',
        '$estabelecimento->logradouro',
        '$estabelecimento->numero',
        '$estabelecimento->bairro',
        '$estabelecimento->cidade',
        '$estabelecimento->uf'
      );
    ";

    return Dao::executar($sql);
  }

  public static function alterar($estabelecimento) {
    $sql = "
      UPDATE ESTABELECIMENTO
      SET RAZAOSOCIAL = {$estabelecimento->razaoSocial},
          NOMEFANTASIA = {$estabelecimento->nomeFantasia},
          CNPJ = {$estabelecimento->cnpj},
          STATUS = {$estabelecimento->status},
          TELEFONE = {$estabelecimento->telefone},
          CEP = {$estabelecimento->cep},
          LOGRADOURO = {$estabelecimento->logradouro},
          NUMERO = {$estabelecimento->numero},
          BAIRRO = {$estabelecimento->bairro},
          CIDADE = {$estabelecimento->cidade},
          UF = {$estabelecimento->uf}
      WHERE IDESTABELECIMENTO = {$estabelecimento->idEstabelecimento};
    ";

    return Dao::executar($sql);
  }

  public static function excluir($idEstabelecimento) {
    $sql = "
      DELETE FROM ESTABELECIMENTO
      WHERE IDESTABELECIMENTO = {$estabelecimento->idEstabelecimento};
    ";

    return Dao::executar($sql);
  }
}
