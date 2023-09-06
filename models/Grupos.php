<?php

include_once "Profesionales.php";
include_once "../conexion/Conexion.php";

class Grupos{

    public function obtenerGrupos($token, $idDemanda){
        if (Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT p.idProfesional, persona.personaNombre, e.nombreEspecialidad  FROM grupos g INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN especialidades e ON e.idEspecialidad = p.idEspecialidad INNER JOIN personas ON personas.idPersona = p.idPersona WHERE g.idDemanda = $idDemanda";
            
        }
    }

}