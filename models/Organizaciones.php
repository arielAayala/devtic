<?php


include_once "Profesionales.php";
include_once "../conexion/Conexion.php";


    class Organizaciones{

        static public function listarOrganizaciones($token){
            if (Profesionales::validarToken($token)) {
                $con = new Conexion();
                $query = "SELECT idOrganizacion, nombreOrganizacion, cueAnexo FROM organizaciones" ;
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


        public function crearOrganizacion($token,$nombreOrganizacion, $dirreccionOrganizacion, $idLocalidad, $cueAnexo){
            try {
                if (Profesionales::validarToken($token)) {
                    $con = new Conexion();
                    $query = "INSERT INTO organizaciones(nombreOrganizacion, direccionOrganizacion, idLocalidad, cueAnexo) VALUES(?,?,?,?)";
                    $prepareCrearOrganizacion = $con -> prepare($query);
                    $prepareCrearOrganizacion->bind_param("ssi", $nombreOrganizacion, $dirreccionOrganizacion, $idLocalidad);
                    if ($prepareCrearOrganizacion->execute()) {
                        $con->close();
                    }
                }
                throw new Exception("Error al validar identidad", 401);
            } catch (Exception $e) {
                $con -> close();
                echo json_encode(array("error"=> $e->getMessage()));
                http_response_code($e->getCode());
            }
        }

        public function eliminarOrganizacion(){
            
        }
        
        public function actualizarOrganizacion(){
            
        }
    }