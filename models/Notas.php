<?php

include_once "Profesionales.php";
include_once "Anexos.php";
include_once "../conexion/Conexion.php";

class Notas {

    public function crearNotas($token, $idDemanda, $idTipoNota, $tituloNota, $descripcionNota, $anexos){
        try {
            if ($datosProfesional =Profesionales::validarToken($token)){
                $con = new Conexion();
                $query = "SELECT COUNT(*) FROM profesionalesgrupos WHERE idDemanda = ? AND idProfesional = ?";
                $prepareValidar = $con->prepare($query);
                $prepareValidar->bind_param("ii", $idDemanda,$datosProfesional->idProfesional);
                $prepareValidar->execute();
                $prepareValidar->store_result();
                if ($prepareValidar->num_rows() == 1 || $datosProfesional->prioriodadProfesional == 1) {
                    $queryCrear = "INSERT INTO notas(idDemanda,idProfesionalCreador, idTipoNota, tituloNota, fechaCreacionNota,descripcionNota) VALUES (?,?,?,?,CURDATE(),?)";
                    $prepareCrear=$con->prepare($queryCrear);
                    $prepareCrear->bind_param("iiiss", $idDemanda, $datosProfesional->idProfesional,$idTipoNota,$tituloNota,$descripcionNota ); 
                    if ($prepareCrear->execute()) {
                        if (isset($anexos)) {
                            $idNota = $con -> insert_id;
                            
                            $anexos = new Anexos();
                            $anexos->agregarAnexosNotas( $anexos, $idNota);
                        }

                        return true;
                    }
                    throw new Exception("Error al crear la nota",400);
                }
                throw new Exception("Error al validar la existencia del profesional en el grupo",401);
            }
            throw new Exception("Error al validar el token",401);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
            http_response_code($e->getCode());
        }
    }

    public function obtenerNotas( $idDemanda){
        try {      
            $con = new Conexion();
            $query = "SELECT n.idNota, n.idProfesionalCreador, personas.nombrePersona, profesionales.fotoProfesional, n.tituloNota, n.descripcionNota, n.fechaCreacionNota, n.idTipoNota, tn.nombreTipoNota FROM notas n INNER JOIN profesionales ON profesionales.idProfesional = n.idProfesionalCreador INNER JOIN personas ON personas.idPersona = profesionales.idPersona INNER JOIN tiponota tn ON tn.idTipoNota =  n.idTipoNota   WHERE n.idDemanda = ?";
            $prepareObtener = $con->prepare($query);
            $prepareObtener-> bind_param("i", $idDemanda);
            $datos = [];
            if ($prepareObtener->execute()) {
                $result = $prepareObtener->get_result();
                while ($row = $result->fetch_assoc()) {
                    $datos[] = $row;
                }
                $con -> close();
                return $datos;
            }
            throw new Exception("Error al obtener las notas de la demanda", 404);   
        } catch (Exception $e) {
            echo json_encode(["error"=> $e->getMessage()]);
            http_response_code($e->getCode());
            $con -> close();

        }
    }
}