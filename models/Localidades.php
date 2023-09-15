<?php

include_once "../conexion/Conexion.php";
include_once "Profesionales.php";

class Localidades{

    public static function listarLocalidades($token){
        if (Profesionales::validarToken($token)) {
            $con = new Conexion();
            $resultado = $con ->query("SELECT idLocalidad, nombreLocalidad FROM localidades");
            $datos=[];
            while ($row = $resultado->fetch_assoc()) {
                $datos[]=$row;
            }
            $con -> close();
            return $datos;
        } 
        return false;
    }

}