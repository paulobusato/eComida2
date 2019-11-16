<?php

class Componente
{
    public $idComponente;
    public $produto;
    public $descricao;
    public $quantidade;
    public $obrigatorio;
    public $componenteItems;


    public function __construct($idComponente = '', $produto = '', $descricao = '', $quantidade = '', $obrigatorio= '', $componenteItems = '')
    {
        $this->idComponente = $idComponente;
        $this->produto = $produto;
        $this->descricao = $descricao;
        $this->quantidade = $quantidade;
        $this->obrigatorio = $obrigatorio;
        $this->componenteItems = $componenteItems;
    }
}

?>
