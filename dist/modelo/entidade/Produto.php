<?php

class Produto
{
    public $idProduto;
    public $estabelecimento;
    public $componentes;
    public $descricao;
    public $valor;

    public function __construct($idProduto = '', $estabelecimento, $componentes, $descricao = '', $valor = '')
    {
        $this->idProduto = $idProduto;
        $this->estabelecimento = $estabelecimento;
        $this->componentes = $componentes;
        $this->descricao = $descricao;
        $this->valor = $valor;
    }
}

?>
