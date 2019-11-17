<?php

class PedidoItemComponente {

  public $idPedido;
  public $idPedidoItem;
  public $idComponente;
  public $idComponenteItem;

  public function __construct($idPedido = '', $idPedidoItem = '', $idComponente = '', $idComponenteItem = '') {
    $this->idPedido = $idPedido;
    $this->idPedidoItem = $idPedidoItem;
    $this->idComponente;
    $this->idComponenteItem = $idComponenteItem;

  }

}
