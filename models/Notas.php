<?php

include_once "Profesionales.php";
include_once "../conexion/Conexion.php";
include_once "Anexos.php";

class Notas {

    public function crearNotas($token, $idDemanda, $idTipoNota, $tituloNota, $descripcionNota, $anexos) {
        try {
            $datosProfesional = Profesionales::validarToken($token);
            if ($datosProfesional) {
                $con = new Conexion();
                $query = "SELECT COUNT(*) FROM profesionalesgrupos WHERE idDemanda = ? AND idProfesional = ?";
                $prepareValidar = $con->prepare($query);
                $prepareValidar->bind_param("ii", $idDemanda, $datosProfesional->idProfesional);
                $prepareValidar->execute();
                $prepareValidar->store_result();
                
                if ($prepareValidar->num_rows() == 1 || $datosProfesional->prioriodadProfesional == 1) {
                    $prepareDatosViejos = $con -> prepare ("SELECT idEstado FROM demandas WHERE idDemanda = ?");
                    $prepareDatosViejos->bind_param("i",$idDemanda);
                    if($prepareDatosViejos->execute()){
                        $resultado = $prepareDatosViejos->get_result();
                        $datosViejos = [];
                        while ($row = $resultado->fetch_assoc()) {
                            $datosViejos = $row;   
                        }
                        if ($datosViejos["idEstado"] != 3 && $datosViejos["idEstado"] != 4 ){
                            $queryCrear = "INSERT INTO notas(idDemanda, idProfesionalCreador, idTipoNota, tituloNota, fechaCreacionNota, descripcionNota) VALUES (?,?,?,?,CURDATE(),?)";
                            $prepareCrear = $con->prepare($queryCrear);
                            $prepareCrear->bind_param("iiiss", $idDemanda, $datosProfesional->idProfesional, $idTipoNota, $tituloNota, $descripcionNota);
                            
                            if ($prepareCrear->execute()) {
                                if (!empty($anexos) && $prepareCrear->insert_id) {
                                    $idNota = $prepareCrear->insert_id;
                                    $anexo = new Anexos();
                                    $anexo->agregarAnexosNotas($anexos, $idNota);
                                }
                                $queryAuditoria = "INSERT INTO auditoriademanda(idDemanda, idProfesional,  idOperacion, fechaAuditoria) VALUES (?, ?,4,CURDATE())";
                                $prepareAuditoria = $con->prepare($queryAuditoria);
                                $prepareAuditoria->bind_param("ii", $idDemanda ,$datosProfesional->idProfesional);
                                if($prepareAuditoria->execute()){
                                    $con ->close();
                                    return true;
                                }
                            } 
                            throw new Exception("Error al crear la nota", 400);
                        }
                        throw new Exception("No se puede agregar notas si el estado de la demanda es demorado o terminado", 400);
                    }
                    throw new Exception("Error al crear la nota", 400);    
                } 
                throw new Exception("Error al validar la existencia del profesional en el grupo", 401);   
            } 
            throw new Exception("Error al validar el token", 401);
        } catch (Exception $e) {
            // Manejo de excepciones, por ejemplo, registrar en un archivo de registro o enviar notificaciones.
            echo json_encode(["error" => $e->getMessage()]);
            http_response_code($e->getCode());
        }
    }
    

    public function obtenerNotas( $idDemanda){
        try {      
            $con = new Conexion();
            $query = "SELECT n.idNota, n.idProfesionalCreador, personas.nombrePersona, profesionales.fotoProfesional, n.tituloNota, n.descripcionNota, n.fechaCreacionNota, n.idTipoNota, tn.nombreTipoNota  FROM notas n INNER JOIN profesionales ON profesionales.idProfesional = n.idProfesionalCreador INNER JOIN personas ON personas.idPersona = profesionales.idPersona INNER JOIN tiponota tn ON tn.idTipoNota =  n.idTipoNota  WHERE n.idDemanda = ?";
            $prepareObtener = $con->prepare($query);
            $prepareObtener-> bind_param("i", $idDemanda);
            $datos = [];
            if ($prepareObtener->execute()) {
                $result = $prepareObtener->get_result();
                $anexo = new Anexos();
                while ($row = $result->fetch_assoc()) {
                    $notaId = $row['idNota'];
                    $anexos = $anexo->obtenerAnexosNotasByIdNota($notaId); // Debes implementar esta función
                    $row['anexosNota'] = $anexos;
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