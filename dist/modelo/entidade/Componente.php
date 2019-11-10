<?php

class Componente
{
    private $idComponente;
    private $descricao;
    private $valor;


    public function __construct($idComponente = '', $descricao = '', $valor = '')
    {
        $this->idComponente = $idComponente;
        $this->descricao = $descricao;
        $this->valor = $valor;
    }

    public function getIdComponente()
    {
        return $this->idComponente;
    }

    public function getDescricao()
    {
        return $this->descricao;
    }

    public function getValor()
    {
        return $this->valor;
    }
}

?>
