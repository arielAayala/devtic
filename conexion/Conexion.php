<?php
require_once "../vendor/autoload.php";


$dotenv = Dotenv\Dotenv::createImmutable("../");
$dotenv->safeLoad();


class Conexion extends mysqli {
    public function __construct() {
        parent::__construct(
            $_ENV["HOST"],
            $_ENV["USER"],
            $_ENV["PASS"],
            $_ENV["DBNAME"]
        );
    
        if ($this-> connect_error) {
            die("Error al conectarse a la base de datos");
        } 
        $this->set_charset("utf8");
        
    }
}

