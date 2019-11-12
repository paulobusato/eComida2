<?php

class Componente
{
    public $idComponente;
    public $produto;
    public $descricao;
    public $quantidade;


    public function __construct($idComponente = '', $produto = '', $descricao = '', $quantidade = '')
    {
        $this->idComponente = $idComponente;
        $this->produto = $produto;
        $this->descricao = $descricao;
        $this->quantidade = $quantidade;
    }
}

?>
