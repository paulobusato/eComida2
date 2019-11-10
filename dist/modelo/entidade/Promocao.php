<?php

class Promocao
{
    public $idPromocao;
    public $categoria;
    public $descricao;
    public $dataInicio;
    public $dataFim;
    public $percentual;

    public function __construct($idPromocao = '', $categoria = '', $descricao = '', $dataInicio = '', $dataFim = '', $percentual = '')
    {
        $this->idPromocao = $idPromocao;
        $this->categoria = $categoria;
        $this->descricao = $descricao;
        $this->dataInicio = $dataInicio;
        $this->dataFim = $dataFim;
        $this->percentual = $percentual;
    }
}

?>
