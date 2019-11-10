<?php

class Pedido
{
  public $idPedido;
  public $cliente;
  public $data;
  public $valorTotal;

  public function __construct($idPedido = '', $cliente = '', $data = '', $valorTotal = '')
  {
    $this->idPedido = $idPedido;
    $this->cliente = $cliente;
    $this->data = $data;
    $this->valorTotal = $valorTotal;
  }
}

?>
