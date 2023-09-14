<?php
include_once "../conexion/Conexion.php";

class Grupos{

    public function obtenerGrupo( $idDemanda){
        
            $con = new Conexion();
            $query = "SELECT p.idProfesional, personas.nombrePersona, e.nombreEspecialidad  FROM grupos g INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN especialidades e ON e.idEspecialidad = p.idEspecialidad INNER JOIN personas ON personas.idPersona = p.idPersona WHERE g.idDemanda = $idDemanda";
            $resultado = $con ->query($query);
            $datos = [];
            if ($resultado ->num_rows>0) {
                while ($row = $resultado->fetch_assoc()) {
                    $datos[] = $row;
                }
            }
            return $datos;
        
    }

    public function agregarProfesionalAlGrupo(){
        
    }
}