<?php

class Pedido
{
  public $idPedido;
  public $estabelecimento;
  public $cliente;
  public $data;
  public $pedidoItens;
  public $valor;
  public $status;

  public function __construct($idPedido = '', $estabelecimento = '', $cliente = '', $data = '', $pedidoItens = '', $valor = '', $status = '')
  {
    $this->idPedido = $idPedido;
    $this->estabelecimento = $estabelecimento;
    $this->cliente = $cliente;
    $this->data = $data;
    $this->pedidoItens = $pedidoItens;
    $this->valor = $valor;
    $this->status = $status;
  }
}

?>
