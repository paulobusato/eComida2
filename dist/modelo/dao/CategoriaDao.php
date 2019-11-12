<?php

class CategoriaDao {

  public static function consultar() {
    $categorias = array();
    $sql = "SELECT * FROM CATEGORIA";

    $db_categorias = Dao::consultar($sql);
    foreach ($db_categorias as $db_categoria) {
      $categoria = new Categoria(
        $db_categoria->IDCATEGORIA,
        $db_categoria->DESCRICAO,
        $db_categoria->IMAGEMURL
      );
      array_push($categorias, $categoria);
    }

    return $categorias;
  }
}
