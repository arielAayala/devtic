<?php


include_once "Profesionales.php";
include_once "../conexion/Conexion.php";


    class Organizaciones{

        static public function listarOrganizaciones($token){
            if (Profesionales::validarToken($token)) {
                $con = new Conexion();
                $query = "SELECT idOrganizacion, nombreOrganizacion FROM organizaciones" ;
                $datos = [];
                $resultado = $con -> query($query);
                if ($resultado -> num_rows > 0) {
                    while ($row = $resultado->fetch_assoc()) {
                        $datos[] = $row;
                    }
                }
                $con -> close();
                return $datos;
            }
            return false;
        }


        public function crearOrganizacion(){

        }
        public function eliminarOrganizacion(){
            
        }public function actualizarOrganizacion(){
            
        }
    }