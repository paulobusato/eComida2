<?php

class Categoria
{
    public $idCategoria;
    public $descricao;
    public $imagemUrl;

    public function __construct($idCategoria = '', $descricao = '', $imagemUrl = '')
    {
        $this->idCategoria = $idCategoria;
        $this->descricao = $descricao;
        $this->imagemUrl = $imagemUrl;
    }
}

?>
