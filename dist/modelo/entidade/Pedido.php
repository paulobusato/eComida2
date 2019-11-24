<?php

class Pedido
{
  public $idPedido;
  public $estabelecimento;
  public $cliente;
  public $data;
  public $pedidoItems;
  public $valor;
  public $status;

  public function __construct($idPedido = '', $estabelecimento = '', $cliente = '', $data = '', $pedidoItems = '', $valor = '', $status = '')
  {
    $this->idPedido = $idPedido;
    $this->estabelecimento = $estabelecimento;
    $this->cliente = $cliente;
    $this->data = $data;
    $this->pedidoItems = $pedidoItems;
    $this->valor = $valor;
    $this->status = $status;
  }
}

?>
