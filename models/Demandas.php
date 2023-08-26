<?php

include_once "Profesionales.php";
include_once "../conexion/Conexion.php";

class Demandas {

    public function crearDemanda($token, $idEstado, $idTipo, $idOrganizacion, $tituloDemanda, $motivoDemanda, $almacenDemanda){
        if($datos=Profesionales::validarToken($token)) {
            $con = new Conexion();
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

    public function actualizarDemanda($token, $idDemanda,$idEstado, $idTipo, $idOrganizacion, $tituloDemanda, $motivoDemanda, $almacenDemanda){
        if($datos=Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query="SELECT COUNT(*) as cantidad FROM grupos where $datos->idProfesional = idProfesional AND $idDemanda = idDemanda";
            $resultado = $con ->query($query);
            if ($resultado->num_rows == 1 || $datos->prioridadProfesional==1) {
                $queryActualizar = "UPDATE demandas SET
                idEstado = $idEstado,
                idTipo = $idTipo,
                idOrganizacion = $idOrganizacion,
                tituloDemanda = '$tituloDemanda',
                motivoDemanda = '$motivoDemanda',
                almacenDemanda = '$almacenDemanda' WHERE idDemanda = $idDemanda";
                if ($con ->query($queryActualizar)) {
                    return true;
                }
            }
        }
        return false;
    }

    public function eliminarDemanda($token, $idDemanda){
        if ($datos = Profesionales::validarToken($token)) {
            if($datos-> prioridadProfesional == 1){
                $con = new Conexion;
                $query = "DELETE FROM grupos WHERE idDemanda = $idDemanda" ;
                if ($con->query($query)) {
                    $queryDemanda = "DELETE FROM demandas where idDemanda = $idDemanda";
                    if ($con->query($queryDemanda)) {
                        return true;
                    }
                }
            }
        }
        echo $con ->error;
        return false;
    }

    public function obtenerTodasDemandas($token, $pagina){
        if ($datos = Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, d.tituloDemanda, d.fechaIngresoDemanda, d.motivoDemanda, e.nombreEstado,  (SELECT p.fotoProfesional from profesionales p WHERE p.idProfesional = (SELECT idProfesional from grupos g where d.idDemanda = g.idDemanda AND g.creadorGrupo = true)) as fotoProfesional FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado ORDER BY d.fechaIngresoDemanda LIMIT 10 OFFSET ". (($pagina - 1)*10) ;
            $datos =[];
            $resultado = $con ->query($query);
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $datos[]=$row;
                }
            }
            $queryTotal = "SELECT COUNT(idDemanda) AS demandasTotales FROM demandas";
            if ($resultadoTotal = $con -> query($queryTotal)) {
                while ($row = $resultadoTotal->fetch_assoc()) {
                    $total = $row["demandasTotales"];
                }
            }
            return ["data"=>$datos, "demandasTotales"=>intval($total), "paginaNumero"=> $pagina];
        }
        return false;
    }

    public function obtenerDemanda(){

    }
}
