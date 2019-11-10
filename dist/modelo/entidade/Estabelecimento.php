<?php
require_once('Usuario.php');

class Estabelecimento extends Usuario
{
  public $idEstabelecimento;
  public $razaoSocial;
  public $nomeFantasia;
  public $cnpj;
  public $status;

  public function __construct($idEstabelecimento = '', $razaoSocial = '', $nomeFantasia = '', $cnpj = '', $status = '', $email = '', $senha = '', $telefone = '', $cep = '', $logradouro = '', $numero = '', $bairro = '', $cidade = '', $uf = '')
  {
    parent::__construct($email, $senha, $telefone, $cep, $logradouro, $numero, $bairro, $cidade, $uf);
    $this->idEstabelecimento = $idEstabelecimento;
    $this->razaoSocial = $razaoSocial;
    $this->nomeFantasia = $nomeFantasia;
    $this->cnpj = $cnpj;
    $this->status = $status;
  }
}
?>
