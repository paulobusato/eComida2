<?php

class PedidoItem
{
    public $idPedido;
    public $idPedidoItem;
    public $idProduto;
    public $quantidade;
    public $valor;

    public function __construct($idPedido = '', $idPedidoItem = '', $idProduto = '', $quantidade = '', $valor = '')
    {
        $this->idPedido = $idPedido;
        $this->idPedidoItem = $idPedidoItem;
        $this->idProduto = $idProduto;
        $this->quantidade = $quantidade;
        $this->valor = $valor;
    }
}

?>
