<?php
require_once('Usuario.php');

class Cliente extends Usuario
{
    public $nome;
    public $cpf;

    public function __construct($nome = '', $cpf = '', $email  = '', $senha  = '', $telefone  = '', $cep  = '', $logradouro  = '', $numero  = '', $bairro  = '', $cidade  = '', $uf = '')
    {
        parent::__construct($email, $senha, $telefone, $cep, $logradouro, $numero, $bairro, $cidade, $uf);
        $this->nome = $nome;
        $this->cpf = $cpf;
    }
}

?>
