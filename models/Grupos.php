<?php
include_once "../conexion/Conexion.php";
include_once "Profesionales.php";

class Grupos{

    public function obtenerGrupo( $idDemanda){
        $con = new Conexion();
        $query = "SELECT p.idProfesional, personas.nombrePersona, e.nombreEspecialidad, p.fotoProfesional, g.creadorGrupo  FROM profesionalesgrupos g INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN especialidades e ON e.idEspecialidad = p.idEspecialidad INNER JOIN personas ON personas.idPersona = p.idPersona WHERE g.idDemanda = $idDemanda";
        $resultado = $con ->query($query);
        $datos = [];
        if ($resultado ->num_rows>0) {
            while ($row = $resultado->fetch_assoc()) {
                $datos[] = $row;
            }
        }
        $con -> close();
        return $datos;
    }

    public function agregarProfesionalAlGrupo($token, $idDemanda, $idProfesional){
        try { 
            if ($datos=Profesionales::validarToken($token)) {
                $con = new Conexion();
                $prepareRepetido=$con -> prepare("SELECT COUNT(*) AS profesional  FROM profesionalesgrupos WHERE idDemanda = ? AND idProfesional = ?");
                $prepareRepetido ->bind_param("ii", $idDemanda, $idProfesional);
                $prepareRepetido->execute();
                $result = $prepareRepetido->get_result();
                $value= $result-> fetch_object();
                if ($value->profesional == 0){
                    $prepareGrupo=$con -> prepare("SELECT COUNT(*) AS profesional  FROM profesionalesgrupos WHERE idDemanda = ? AND idProfesional = ?");
                    $prepareGrupo ->bind_param("ii", $idDemanda, $datos->idProfesional);
                    $prepareGrupo->execute();
                    $result =$prepareGrupo->get_result();
                    $value= $result-> fetch_object();
                    if ($value->profesional == 1 || $datos-> prioridadProfesional == 1) {
                        $prepareAddProfesional = $con ->prepare("INSERT INTO profesionalesgrupos (idDemanda, idProfesional, creadorGrupo) VALUES (?,?, false)");
                        $prepareAddProfesional ->bind_param("ii", $idDemanda, $idProfesional);
                        if ($prepareAddProfesional ->execute()) {
                            return true;
                        }
                        throw new Exception("Error al agregar al profesional");
                    }
                    throw new Exception("Error No autorizado a agregar profesionales al grupo");
                }
                throw new Exception("Error Profesional ya agregada al grupo");
            }
            throw new Exception("Error validando identidad");
        } catch (Exception $e) {
            echo json_encode(["error"=> $e->getMessage() ]);
            return false;
        }
    }
}