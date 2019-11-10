<?php

class Usuario
{
    public $email;
    public $senha;
    public $telefone;
    public $cep;
    public $logradouro;
    public $numero;
    public $bairro;
    public $cidade;
    public $uf;

    public function __construct($email = '', $senha = '', $telefone = '', $cep = '', $logradouro = '', $numero = '', $bairro = '', $cidade = '', $uf = '')
    {
        $this->email = $email;
        $this->senha = $senha;
        $this->telefone = $telefone;
        $this->cep = $cep;
        $this->logradouro = $logradouro;
        $this->numero = $numero;
        $this->bairro = $bairro;
        $this->cidade = $cidade;
        $this->uf = $uf;
    }
}

?>
