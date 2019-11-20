<?php

class Produto
{
    public $idProduto;
    public $estabelecimento;
    public $componentes;
    public $titulo;
    public $descricao;
    public $valor;
    public $imgUrl;

    public function __construct($idProduto = '', $estabelecimento = '', $componentes = array(), $titulo = '', $descricao = '', $valor = '', $imgUrl = '')
    {
        $this->idProduto = $idProduto;
        $this->estabelecimento = $estabelecimento;
        $this->componentes = $componentes;
        $this->titulo = $titulo;
        $this->descricao = $descricao;
        $this->valor = $valor;
        $this->imgUrl = $imgUrl;
    }
}

?>
