<?php

class ComponenteItem {

  public $idComponenteItem;
  public $componente;
  public $descricao;
  public $valor;

  public function __construct($idComponenteItem = '', $componente = '', $descricao = '', $valor = '') {
    $this->idComponenteItem = $idComponenteItem;
    $this->componente = $componente;
    $this->descricao = $descricao;
    $this->valor = $valor;
  }

}
