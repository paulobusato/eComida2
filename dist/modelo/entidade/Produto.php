<?php

class Produto
{
    public $idProduto;
    public $descricao;
    public $valor;

    public function __construct($idProduto = '', $descricao = '', $valor = '')
    {
        $this->idProduto = $idProduto;
        $this->descricao = $descricao;
        $this->valor = $valor;
    }
}

?>
