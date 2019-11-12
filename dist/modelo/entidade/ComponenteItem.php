<?php

class ComponenteItem {

  public $idComponenteItem;
  public $descricao;
  public $valor;

  public function __construct($idComponenteItem = '', $descricao = '', $valor = '') {
    $this->idComponenteItem = $idComponenteItem;
    $this->descricao = $descricao;
    $this->valor = $valor;
  }

}
