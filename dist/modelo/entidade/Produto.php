<?php

class Produto
{
    public $idProduto;
    public $estabelecimento;
    public $descricao;
    public $valor;

    public function __construct($idProduto = '', $estabelecimento, $descricao = '', $valor = '')
    {
        $this->idProduto = $idProduto;
        $this->estabelecimento = $estabelecimento;
        $this->descricao = $descricao;
        $this->valor = $valor;
    }
}

?>
