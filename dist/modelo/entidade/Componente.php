<?php

class Componente
{
    public $idComponente;
    public $produto;
    public $descricao;
    public $quantidade;
    public $componenteItems;


    public function __construct($idComponente = '', $produto = '', $descricao = '', $quantidade = '', $componenteItems = '')
    {
        $this->idComponente = $idComponente;
        $this->produto = $produto;
        $this->descricao = $descricao;
        $this->quantidade = $quantidade;
        $this->componenteItems = $componenteItems;
    }
}

?>
