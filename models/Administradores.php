<?php 

include_once "./Profesionales.php";
include_once "../conexion/Conexion.php";


class Administradores extends Profesionales{

    public function crearProfesional($token, $nombre, $dni, $correo, $especialidad, $prioridad ){
        if ($datos = Profesionales::validarToken($token)) {
            if ($datos->prioridadProfesional) {
                $con = new Conexion();
                $query = "INSERT INTO personas (dniPersona, nombrePersona) VALUES (".$dni.", ".$nombre.")";
            }
        } 
    }

}