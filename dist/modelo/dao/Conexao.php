<?php

class Conexao {

  private static $stringConexao = "mysql:host=localhost;dbname=ecomida";
  private static $usuario = 'root';
  private static $senha = '';

  private static $db = null;

  protected static function conectar() {
      self::$db = new PDO(self::$stringConexao, self::$usuario, self::$senha);
  }

  public static function executar($sql, $valores = array()) {
      if (self::$db === null) {
          self::conectar();
      }

      $declaracao = self::$db->prepare($sql);
      $declaracao->execute($valores);
      return $declaracao;
  }

  public static function consultar($sql, $valores = array()) {
      $declaracao = self::executar($sql, $valores);
      return $declaracao->fetchAll(PDO::FETCH_CLASS);
  }

}
