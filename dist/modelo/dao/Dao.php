<?php

require_once 'Conexao.php';

class Dao extends Conexao {

  public static function resetarDB() {

    parent::executar("
      DROP TABLE categoria;
      DROP TABLE cliente;
      DROP TABLE componente;
      DROP TABLE estabelecimento;
      DROP TABLE pedido;
      DROP TABLE pedidoitem;
      DROP TABLE produto;
      DROP TABLE promocao;
    ");

    parent::executar("
      CREATE TABLE COMPONENTE (
        IDCOMPONENTE INT NOT NULL AUTO_INCREMENT,
        DESCRICAO VARCHAR(255) NOT NULL,
        VALOR FLOAT NOT NULL,
        PRIMARY KEY(IDCOMPONENTE)
      );
    ");

    parent::executar("
      CREATE TABLE CATEGORIA (
        IDCATEGORIA INT NOT NULL AUTO_INCREMENT,
        DESCRICAO VARCHAR(255) NOT NULL,
        IMAGEMURL VARCHAR(255) NOT NULL,
        PRIMARY KEY(IDCATEGORIA)
      );
    ");

    parent::executar("
      CREATE TABLE PROMOCAO (
        IDPROMOCAO INT NOT NULL AUTO_INCREMENT,
        IDCATEGORIA INT NOT NULL,
        DESCRICAO VARCHAR(255) NOT NULL,
        DATAINICIO DATETIME NOT NULL,
        DATAFIM DATETIME NOT NULL,
        PERCENTUAL FLOAT NOT NULL,
        PRIMARY KEY(IDPROMOCAO),
        FOREIGN KEY (IDCATEGORIA)
          REFERENCES CATEGORIA(IDCATEGORIA)
      );
    ");

    parent::executar("
      CREATE TABLE ESTABELECIMENTO (
        IDESTABELECIMENTO INT NOT NULL AUTO_INCREMENT,
        RAZAOSOCIAL VARCHAR(255) NOT NULL,
        NOMEFANTASIA VARCHAR(255) NOT NULL,
        CNPJ VARCHAR(255) NOT NULL,
        STATUS VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) NOT NULL,
        SENHA VARCHAR(255) NOT NULL,
        TELEFONE VARCHAR(255) NOT NULL,
        CEP VARCHAR(255) NOT NULL,
        LOGRADOURO VARCHAR(255) NOT NULL,
        NUMERO VARCHAR(255) NOT NULL,
        BAIRRO VARCHAR(255) NOT NULL,
        CIDADE VARCHAR(255) NOT NULL,
        UF VARCHAR(255) NOT NULL,
        PRIMARY KEY(IDESTABELECIMENTO)
      );
    ");
    parent::executar("
      CREATE TABLE CLIENTE (
        IDCLIENTE INT NOT NULL AUTO_INCREMENT,
        NOME VARCHAR(255) NOT NULL,
        CPF VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) NOT NULL,
        SENHA VARCHAR(255) NOT NULL,
        TELEFONE VARCHAR(255) NOT NULL,
        CEP VARCHAR(255) NOT NULL,
        LOGRADOURO VARCHAR(255) NOT NULL,
        NUMERO VARCHAR(255) NOT NULL,
        BAIRRO VARCHAR(255) NOT NULL,
        CIDADE VARCHAR(255) NOT NULL,
        UF VARCHAR(255) NOT NULL,
        PRIMARY KEY(IDCLIENTE)
      );
    ");

    parent::executar("
      CREATE TABLE PEDIDO (
        IDPEDIDO INT NOT NULL AUTO_INCREMENT,
        IDCLIENTE INT NOT NULL,
        DATA DATETIME NOT NULL,
        VALOR FLOAT NOT NULL,
        PRIMARY KEY(IDPEDIDO),
        FOREIGN KEY (IDCLIENTE)
          REFERENCES CLIENTE(IDCLIENTE)
      );
    ");

    parent::executar("
      CREATE TABLE PRODUTO (
        IDPRODUTO INT NOT NULL AUTO_INCREMENT,
        DESCRICAO VARCHAR(255) NOT NULL,
        VALOR FLOAT NOT NULL,
        PRIMARY KEY (IDPRODUTO)
      );
    ");

    parent::executar("
      CREATE TABLE PEDIDOITEM (
        IDPEDIDO INT NOT NULL,
        IDPEDIDOITEM INT NOT NULL AUTO_INCREMENT,
        IDPRODUTO INT NOT NULL,
        QUANTIDADE FLOAT NOT NULL,
        VALOR FLOAT NOT NULL,
        PRIMARY KEY (IDPEDIDO, IDPEDIDOITEM),
        FOREIGN KEY (IDPEDIDO)
          REFERENCES PEDIDO(IDPEDIDO),
        FOREIGN KEY (IDPRODUTO)
          REFERENCES PRODUTO(IDPRODUTO)
      );
    ");

    parent::executar("INSERT INTO `estabelecimento` (`IDESTABELECIMENTO`, `RAZAOSOCIAL`, `NOMEFANTASIA`, `CNPJ`, `STATUS`, `EMAIL`, `SENHA`, `TELEFONE`, `CEP`, `LOGRADOURO`, `NUMERO`, `BAIRRO`, `CIDADE`, `UF`) VALUES (NULL, \'eComida\', \'eComida\', \'99999999999999\', \'P\', \'paulo@paulo.com\', \'123\', \'28999999999\', \'84520369\', \'Av Francisco Mardegan\', \'02\', \'Boa Vista\', \'Cachoeiro de Itapemirim\', \'ES\')");
    parent::executar("INSERT INTO `categoria` (`IDCATEGORIA`, `DESCRICAO`, `IMAGEMURL`) VALUES (NULL, 'Acai', 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/04/21/salada.jpg')");
    parent::executar("INSERT INTO `categoria` (`IDCATEGORIA`, `DESCRICAO`, `IMAGEMURL`) VALUES (NULL, 'Lanches', 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/04/21/salada.jpg')");
    parent::executar("INSERT INTO `categoria` (`IDCATEGORIA`, `DESCRICAO`, `IMAGEMURL`) VALUES (NULL, 'Salada', 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/04/21/salada.jpg')");
  }
}

Dao::resetarDB();
