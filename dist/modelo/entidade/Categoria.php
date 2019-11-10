<?php

class Categoria
{
    public $idCategoria;
    public $descricao;

    public function __construct($idCategoria = '', $descricao = '')
    {
        $this->idCategoria = $idCategoria;
        $this->descricao = $descricao;
    }
}

?>
