<?php

class Componente
{
    public $idComponente;
    public $produto;
    public $descricao;
    public $valor;


    public function __construct($idComponente = '', $produto = '', $descricao = '', $valor = '')
    {
        $this->idComponente = $idComponente;
        $this->produto = $produto;
        $this->descricao = $descricao;
        $this->valor = $valor;
    }
}

?>
