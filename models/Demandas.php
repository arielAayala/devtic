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
            }
        }
        return false;
    }

    public function actualizarDemanda(){

    }

    public function eliminarDemanda(){

    }

    public function obtenerTodasDemandas($token, $pagina){
        if ($datos = Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, d.tituloDemanda, d.motivoDemanda, e.nombreEstado,  (SELECT p.fotoProfesional from profesionales p WHERE p.idProfesional = (SELECT idProfesional from grupos g where d.idDemanda = g.idDemanda AND g.creadorGrupo = true)) as fotoProfesional FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado ORDER BY d.fechaIngresoDemanda LIMIT 8 OFFSET ". (($pagina - 1)*10) ;
            $datos =[];
            $resultado = $con ->query($query);
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $datos[]=$row;
                }
            }
            return $datos;
        }
        return false;
    }

    public function obtenerDemanda(){

    }
}