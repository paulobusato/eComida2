<?php
require_once('Usuario.php');

class Cliente extends Usuario
{
    public $idCliente;
    public $nome;
    public $cpf;

    public function __construct($idCliente = '', $nome = '', $cpf = '', $email  = '', $senha  = '', $telefone  = '', $cep  = '', $logradouro  = '', $numero  = '', $bairro  = '', $cidade  = '', $uf = '')
    {
        parent::__construct($email, $senha, $telefone, $cep, $logradouro, $numero, $bairro, $cidade, $uf);
        $this->idCliente = $idCliente;
        $this->nome = $nome;
        $this->cpf = $cpf;
    }
}

?>
