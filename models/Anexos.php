<?php
include_once "../conexion/Conexion.php";


class Anexos{

    public function agregarAnexosNotas(array $anexosNotas, int $idNota) {
    
        foreach ($anexosNotas['name'] as $key => $name) {
            $tmpName = $anexosNotas['tmp_name'][$key];
            $nameFile = "idNota=".$idNota . "&nombreAnexoNota=" . $name;
            $urlMove = __DIR__. "\\..\\anexos\\" . $nameFile;
            $urlFile = "http://localhost/devtic/anexos/".$nameFile;
    
            if(move_uploaded_file($tmpName, $urlMove)){
                $con = new Conexion();
                $prepareAnexoNota = $con -> prepare("INSERT INTO anexosnotas (idNota, urlAnexoNota, nombreAnexoNota)VALUES (?,?,?)");
                $prepareAnexoNota->bind_param("iss",$idNota,$urlFile, $name);
                $prepareAnexoNota->execute();
            }
                
        }
    }

    public function agregarAnexosDemanda(array $anexosDemanda, int $idDemanda) {
        foreach ($anexosDemanda['name'] as $key => $name) {
            $tmpName = $anexosDemanda['tmp_name'][$key];
            $nameFile = "idDemanda=".$idDemanda . "&nombreAnexoDemanda=" . $name;
            $urlMove = __DIR__. "\\..\\anexos\\" . $nameFile;
            $urlFile = "http://localhost/devtic/anexos/".$nameFile;
    
            if(move_uploaded_file($tmpName, $urlMove)){
                $con = new Conexion();
                $prepareAnexoNota = $con -> prepare("INSERT INTO anexosdemandas (idDemanda, urlAnexoDemanda, nombreAnexoDemanda)VALUES (?,?,?)");
                $prepareAnexoNota->bind_param("iss",$idDemanda,$urlFile, $name);
                $prepareAnexoNota->execute();
            }
                
        }
    }

    public function obtenerAnexosNotasByIdNota($idNota){
        try {
            $con = new Conexion();
            $query = "SELECT * FROM anexosnotas WHERE idNota = ?";
            $prepareObtenerAnexosNota = $con->prepare($query);
            
            if ($prepareObtenerAnexosNota) {
                $prepareObtenerAnexosNota->bind_param("i", $idNota);
                $datos = [];
    
                if ($prepareObtenerAnexosNota->execute()) {
                    $result = $prepareObtenerAnexosNota->get_result();
    
                    while ($row = $result->fetch_assoc()) {
                        $datos[] = $row;
                    }
    
                    $con->close();
                } 
                return $datos;
            } else {
                throw new Exception("Error al preparar la consulta para obtener los anexos de la nota");
            }
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
            http_response_code($e->getCode());
            $con->close();
        }
    }

    public function obtenerAnexosDemandasByIdDemanda($idDemanda){
        try {
            $con = new Conexion();
            $query = "SELECT * FROM anexosdemandas WHERE idDemanda = ?";
            $prepareObtenerAnexosDemanda = $con->prepare($query);
            
            if ($prepareObtenerAnexosDemanda) {
                $prepareObtenerAnexosDemanda->bind_param("i", $idDemanda);
                $datos = [];
    
                if ($prepareObtenerAnexosDemanda->execute()) {
                    $result = $prepareObtenerAnexosDemanda->get_result();
    
                    while ($row = $result->fetch_assoc()) {
                        $datos[] = $row;
                    }
    
                    $con->close();
                } 
                return $datos;
            } 
            throw new Exception("Error al preparar la consulta para obtener los anexos de la demanda");
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
            http_response_code($e->getCode());
            $con->close();
        }
    }
    

}