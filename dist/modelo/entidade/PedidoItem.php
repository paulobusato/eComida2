<?php

class PedidoItem
{
    public $idPedidoItem;
    public $produto;
    public $quantidade;
    public $valor;
    public $componentes;

    public function __construct($idPedido = '', $idPedidoItem = '', $produto = '', $quantidade = '', $valor = '', $componentes = '')
    {
        $this->idPedido = $idPedido;
        $this->idPedidoItem = $idPedidoItem;
        $this->produto = $produto;
        $this->quantidade = $quantidade;
        $this->valor = $valor;
        $this->componentes = $componentes;
    }
}

?>
