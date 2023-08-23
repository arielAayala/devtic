<?php

include_once "Profesionales.php";
include_once "../conexion/Conexion.php";

class Demandas {

    public function crearDemanda($token, $idEstado, $idTipo, $idOrganizacion, $tituloDemanda, $motivoDemanda, $almacenDemanda){
        if($datos=Profesionales::validarToken($token)) {
            $con = new Conexion;
            $query="INSERT INTO demandas(idEstado, idTipo, idOrganizacion, tituloDemanda, motivoDemanda, almacenDemanda, fechaIngresoDemanda) 
            VALUES($idEstado,$idTipo, $idOrganizacion, '$tituloDemanda', '$motivoDemanda', '$almacenDemanda', CURDATE() )";
            if ($con ->query($query)) {
                $idDemanda = $con -> insert_id;
                $queryGrupos = "INSERT INTO grupos(idDemanda, idProfesional, creadorGrupo) VALUES ($idDemanda, $datos->idProfesional, 1)";
                if ($con-> query($queryGrupos)) {
                    return true;
                }else{
                    $queryDemandas = "DELETE  FROM demandas WHERE idDemanda = $idDemanda";
                    $con ->query($queryDemandas);
                }
            }else{
                echo $con ->error;
            }
            return false;
        }
    }

    public function actualizarDemanda(){

    }

    public function eliminarDemanda(){

    }

    public function obtenerDemanda(){

    }
}
