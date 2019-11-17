<?php

require_once 'Conexao.php';

class Dao extends Conexao {

  public static function resetarDB() {

    parent::executar("
      DROP TABLE categoria;
      DROP TABLE cliente;
      DROP TABLE componente;
      DROP TABLE componenteitem;
      DROP TABLE estabelecimento;
      DROP TABLE pedido;
      DROP TABLE pedidoitem;
      DROP TABLE produto;
      DROP TABLE promocao;
      DROP TABLE pedidoitemcomponente;
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
        RATING INT NOT NULL,
        IMGURL VARCHAR(255) NOT NULL,
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
        IDESTABELECIMENTO INT NOT NULL,
        IDCLIENTE INT NOT NULL,
        DATA DATETIME NOT NULL,
        VALOR FLOAT NOT NULL,
        PRIMARY KEY(IDPEDIDO),
        FOREIGN KEY (IDCLIENTE)
          REFERENCES CLIENTE(IDCLIENTE),
        FOREIGN KEY (IDESTABELECIMENTO)
          REFERENCES ESTABELECIMENTO(IDESTABELECIMENTO)
      );
    ");

    parent::executar("
      CREATE TABLE PRODUTO (
        IDPRODUTO INT NOT NULL AUTO_INCREMENT,
        IDESTABELECIMENTO INT NOT NULL,
        TITULO VARCHAR(255) NOT NULL,
        DESCRICAO VARCHAR(255),
        VALOR FLOAT NOT NULL,
        QUANTIDADE INT NOT NULL,
        IMGURL VARCHAR(255) NOT NULL,
        PRIMARY KEY (IDPRODUTO),
        FOREIGN KEY (IDESTABELECIMENTO)
          REFERENCES ESTABELECIMENTO(IDESTABELECIMENTO)
      );
    ");

    parent::executar("
      CREATE TABLE COMPONENTE (
        IDPRODUTO INT NOT NULL,
        IDCOMPONENTE INT NOT NULL AUTO_INCREMENT,
        DESCRICAO VARCHAR(255) NOT NULL,
        QUANTIDADE FLOAT NOT NULL,
        OBRIGATORIO CHAR(1) NOT NULL,
        PRIMARY KEY(IDPRODUTO, IDCOMPONENTE),
        FOREIGN KEY (IDPRODUTO)
          REFERENCES PRODUTO(IDPRODUTO)
      );
    ");

    parent::executar("
      CREATE TABLE COMPONENTEITEM (
        IDPRODUTO INT NOT NULL,
        IDCOMPONENTE INT NOT NULL,
        IDCOMPONENTEITEM INT NOT NULL AUTO_INCREMENT,
        DESCRICAO VARCHAR(255) NOT NULL,
        VALOR FLOAT NOT NULL,
        PRIMARY KEY(IDPRODUTO, IDCOMPONENTE, IDCOMPONENTEITEM),
        FOREIGN KEY (IDPRODUTO)
          REFERENCES PRODUTO(IDPRODUTO),
        FOREIGN KEY (IDCOMPONENTE)
          REFERENCES COMPONENTE(IDCOMPONENTE)
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

    parent::executar("
      CREATE TABLE PEDIDOITEMCOMPONENTE (
        IDPEDIDO INT NOT NULL,
        IDPEDIDOITEM INT NOT NULL,
        IDCOMPONENTE INT NOT NULL,
        IDCOMPONENTEITEM INT NOT NULL,
        PRIMARY KEY (IDPEDIDO, IDPEDIDOITEM, IDCOMPONENTE, IDCOMPONENTEITEM),
        FOREIGN KEY (IDPEDIDO)
          REFERENCES PEDIDO(IDPEDIDO),
        FOREIGN KEY (IDPEDIDOITEM)
          REFERENCES PEDIDOITEM(IDPEDIDOITEM),
        FOREIGN KEY (IDCOMPONENTE)
          REFERENCES COMPONENTE(IDCOMPONENTE),
        FOREIGN KEY (IDCOMPONENTEITEM)
          REFERENCES COMPONENTEITEM(IDCOMPONENTEITEM)
      );
    ");

    parent::executar("ALTER TABLE `pedido` CHANGE `DATA` `DATA` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;");

    parent::executar("INSERT INTO `cliente` (`IDCLIENTE`, `NOME`, `CPF`, `EMAIL`, `SENHA`, `TELEFONE`, `CEP`, `LOGRADOURO`, `NUMERO`, `BAIRRO`, `CIDADE`, `UF`) VALUES (NULL, 'Paulo Henrique Busato', '32132412389', 'paulo@paulo.com', '123', '23432139988', '23854322', 'Logradouro', '10', 'Bairro', 'Cidade', 'UF')");

    parent::executar("INSERT INTO `estabelecimento` (`IDESTABELECIMENTO`, `RAZAOSOCIAL`, `NOMEFANTASIA`, `CNPJ`, `STATUS`, `RATING`, `IMGURL`, `EMAIL`, `SENHA`, `TELEFONE`, `CEP`, `LOGRADOURO`, `NUMERO`, `BAIRRO`, `CIDADE`, `UF`) VALUES (NULL, 'eComida', 'eComida', '99999999999999', 'P', '4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThlFOqWox5fl0i82VmIvxAAuFUoQ9NqcIoH4EfwFnMbG6B8BynnA&s', 'paulo@paulo.com', '123', '28999999999', '84520369', 'Av Francisco Mardegan', '02', 'Boa Vista', 'Cachoeiro de Itapemirim', 'ES')");

    parent::executar("INSERT INTO `categoria` (`IDCATEGORIA`, `DESCRICAO`, `IMAGEMURL`) VALUES (NULL, 'Acai', 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/04/21/salada.jpg')");
    parent::executar("INSERT INTO `categoria` (`IDCATEGORIA`, `DESCRICAO`, `IMAGEMURL`) VALUES (NULL, 'Lanches', 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/04/21/salada.jpg')");
    parent::executar("INSERT INTO `categoria` (`IDCATEGORIA`, `DESCRICAO`, `IMAGEMURL`) VALUES (NULL, 'Salada', 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/04/21/salada.jpg')");

    parent::executar("INSERT INTO `produto` (`IDPRODUTO`, `IDESTABELECIMENTO`, `TITULO`, `DESCRICAO`, `QUANTIDADE`, `VALOR`, `IMGURL`) VALUES (NULL, 1, 'Combo p - indicamos para 1 a 2 pessoas', 'Caixa p + 1 acompanhamento + 1 molho', '39.10', '3', 'https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/af7f7d95-85ad-4e08-a2bb-edbb3555fab1/201806062016_40603626.jpg')");
    parent::executar("INSERT INTO `componente` (`IDPRODUTO`, `IDCOMPONENTE`, `DESCRICAO`, `QUANTIDADE`, `OBRIGATORIO`) VALUES ('1', NULL, 'Escolha seu frango frito crocante', '1', 'S')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('1', '1', NULL, 'Tiras de filé de coxa e sobrecoxa', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('1', '1', NULL, 'Peito + drumet', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('1', '1', NULL, 'Drumet', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('1', '1', NULL, 'Peito', '0')");
    parent::executar("INSERT INTO `componente` (`IDPRODUTO`, `IDCOMPONENTE`, `DESCRICAO`, `QUANTIDADE`, `OBRIGATORIO`) VALUES ('1', NULL, 'Escolha o acompanhamento do combo', '1', 'S')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('1', '2', NULL, 'Batata cheddar e bacon p', '9.00')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('1', '2', NULL, 'Batata cheddar e bacon g', '16.00')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('1', '2', NULL, 'Onion rings p', '7.00')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('1', '2', NULL, 'Onion rings g', '15.00')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('1', '2', NULL, 'Arroz branco g', '5.00')");

    parent::executar("INSERT INTO `produto` (`IDPRODUTO`, `IDESTABELECIMENTO`, `TITULO`, `DESCRICAO`, `QUANTIDADE`, `VALOR`, `IMGURL`) VALUES (NULL, 1, '4Combo p - indicamos para 1 a 2 pessoas', 'Caixa p + 1 acompanhamento + 1 molho, coca cola 1', '39.10', '3', 'https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/af7f7d95-85ad-4e08-a2bb-edbb3555fab1/201806062016_40603626.jpg')");
    parent::executar("INSERT INTO `componente` (`IDPRODUTO`, `IDCOMPONENTE`, `DESCRICAO`, `QUANTIDADE`, `OBRIGATORIO`) VALUES ('2', NULL, 'Escolha seu frango frito crocante', '1', 'S')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('2', '1', NULL, 'Tiras de filé de coxa e sobrecoxa', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('2', '1', NULL, 'Peito + drumet', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('2', '1', NULL, 'Drumet', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('2', '1', NULL, 'Peito', '0')");
    parent::executar("INSERT INTO `componente` (`IDPRODUTO`, `IDCOMPONENTE`, `DESCRICAO`, `QUANTIDADE`, `OBRIGATORIO`) VALUES ('2', NULL, 'Escolha o acompanhamento do combo', '1', 'S')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('2', '2', NULL, 'Batata cheddar e bacon p', '9.00')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('2', '2', NULL, 'Batata cheddar e bacon g', '16.00')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('2', '2', NULL, 'Onion rings p', '7.00')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('2', '2', NULL, 'Onion rings g', '15.00')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('2', '2', NULL, 'Arroz branco g', '5.00')");

    parent::executar("INSERT INTO `produto` (`IDPRODUTO`, `IDESTABELECIMENTO`, `TITULO`, `DESCRICAO`, `QUANTIDADE`, `VALOR`, `IMGURL`) VALUES (NULL, 1, 'Super combo 2x burger', '2 burgers a sua escolha + 1 acompanhamento + refri', '39.10', '3', 'https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/af7f7d95-85ad-4e08-a2bb-edbb3555fab1/201806062016_40603626.jpg')");
    parent::executar("INSERT INTO `componente` (`IDPRODUTO`, `IDCOMPONENTE`, `DESCRICAO`, `QUANTIDADE`, `OBRIGATORIO`) VALUES ('3', NULL, 'Escolha os 2 burger\'s da promoção', '2', 'S')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '1', NULL, 'Raiz prime burger - com Catupiry', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '1', NULL, 'Onion chicken burger', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '1', NULL, 'Chicken burger', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '1', NULL, 'BBC - Com cheddar', '0')");
    parent::executar("INSERT INTO `componente` (`IDPRODUTO`, `IDCOMPONENTE`, `DESCRICAO`, `QUANTIDADE`, `OBRIGATORIO`) VALUES ('3', NULL, 'Acompanhamento da promoção', '1', 'S')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '2', NULL, 'Batata frita p', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '2', NULL, 'Aipim frito p', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '2', NULL, 'Polenta frita p', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '2', NULL, 'Purê de aipim p', '0')");
    parent::executar("INSERT INTO `componente` (`IDPRODUTO`, `IDCOMPONENTE`, `DESCRICAO`, `QUANTIDADE`, `OBRIGATORIO`) VALUES ('3', NULL, 'Bebida da promoção', '1', 'S')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '3', NULL, 'Guaraná Antarctica 600ml', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '3', NULL, 'Coca-Cola zero 600ml', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '3', NULL, 'Coca-Cola 600ml', '0')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '3', NULL, 'Água mineral s/gás 500ml', '0')");
    parent::executar("INSERT INTO `componente` (`IDPRODUTO`, `IDCOMPONENTE`, `DESCRICAO`, `QUANTIDADE`, `OBRIGATORIO`) VALUES ('3', NULL, 'Molhos?', '99', 'N')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '4', NULL, 'Mostarda', '3.99')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '4', NULL, 'Maionese verde', '3.99')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '4', NULL, 'Maionese de bacon', '3.99')");
    parent::executar("INSERT INTO `componenteitem` (`IDPRODUTO`, `IDCOMPONENTE`, `IDCOMPONENTEITEM`, `DESCRICAO`, `VALOR`) VALUES ('3', '4', NULL, 'Maionese de alho com queijo', '3.99')");

  }
}

// Dao::resetarDB();
