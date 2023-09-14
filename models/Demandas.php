<?php

include_once "Profesionales.php";
include_once "../conexion/Conexion.php";
include_once "PersonasInvolucradas.php";
include_once "Grupos.php";
include_once "PersonasInvolucradas.php";

class Demandas {

    public function crearDemanda($token,  $idTipo, $idOrganizacion, $motivoDemanda, $relatoDemanda, $almacenDemanda, $personasInvolucradas){
        if($datosProfesional=Profesionales::validarToken($token)) {
            $con = new Conexion();
            $prepareDemanda=$con->prepare("INSERT INTO demandas(idEstado, idTipo, idOrganizacion, motivoDemanda, relatoDemanda, almacenDemanda, fechaIngresoDemanda) 
            VALUES(1,?,?,?,?,?,CURDATE())");
            $prepareDemanda->bind_param("iisss",$idTipo,$idOrganizacion,$motivoDemanda,$relatoDemanda,$almacenDemanda);
            if ($prepareDemanda->execute()) {
                $idDemanda = $con -> insert_id;
                $queryGrupos = "INSERT INTO profesionalesgrupos(idDemanda, idProfesional, creadorGrupo) VALUES ($idDemanda, $datosProfesional->idProfesional, 1)";

                if ($con-> query($queryGrupos)) {
                    foreach ($personasInvolucradas as  $i) {
                        echo("grupos");
                        $personas = new PersonasInvolucradas();
                        $personas->crearPersonaInvolucrada($idDemanda,$i->nombrePersona,$i->dniPersona,$i->demandante, $i->alumno,$i->idParentesco , $i->telefono, $i->domicilio, $i->idLocalidad, $i->grado, $i->turno, $i->docente);
                    }
                    echo($con->error);
                    $con -> close();
                    return true;
                }
            }
        }
        echo($con-> error);
        $con -> close();
        return false;
    }

    public function actualizarDemanda($token, $idDemanda,$idTipo, $idOrganizacion, $motivoDemanda, $relatoDemanda, $almacenDemanda){
        if($datos=Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query="SELECT COUNT(*) as cantidad FROM grupos where ? = idProfesional AND ? = idDemanda";
            $prepareGrupos = $con ->prepare($query);
            $prepareGrupos->bind_param("ii", $datos->idProfesional, $idDemanda);
            $prepareGrupos->execute();
            if ($prepareGrupos->num_rows == 1 || $datos->prioridadProfesional==1) {
                $queryActualizar = "UPDATE demandas SET
                idTipo = ?,
                idOrganizacion = ?,
                motivoDemanda = ?,
                relatoDemanda = ?,
                almacenDemanda = ? WHERE idDemanda = ?";
                $prepareActualizar = $con -> prepare($queryActualizar);
                $prepareActualizar->bind_param("iisssi",$idTipo,$idOrganizacion,$motivoDemanda,$relatoDemanda,$almacenDemanda,$idDemanda);
                if ($prepareActualizar->execute()) {
                    $con-> close();
                    return true;
                }
            }
        }
        $con->close();
        return false;
    }

    public function eliminarDemanda($token, $idDemanda){
        if ($datos = Profesionales::validarToken($token)) {
            if($datos-> prioridadProfesional == 1){
                $con = new Conexion;
                $queryGrupo = "DELETE FROM grupos WHERE idDemanda = ?" ;
                $prepareGrupo = $con->prepare($queryGrupos);
                $prepareGrupo->bind_param("i", $idDemanda);
                $prepareGrupo->execute();
                $preparePersonasInvolucradas ->prepare();
                    $queryDemanda = "DELETE FROM demandas where idDemanda = $idDemanda";
                    if ($con->query($queryDemanda)) {
                        return true;
                    }
                
            }
        }
        echo $con ->error;
        return false;
    }

    public function obtenerTodasDemandas($token, $pagina){
        if ($datos = Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, p.fotoProfesional, especialidades.nombreEspecialidad , personas.nombrePersona ,d.motivoDemanda, d.fechaIngresoDemanda, d.relatoDemanda, e.nombreEstado, t.nombreTipo, o.nombreOrganizacion   FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado INNER JOIN tipos t ON d.idTipo = t.idTipo INNER JOIN organizaciones o ON o.idOrganizacion = d.idOrganizacion INNER JOIN grupos g ON g.idDemanda = d.idDemanda and g.creadorDemanda = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad ORDER BY d.fechaIngresoDemanda DESC LIMIT 10 OFFSET ". (($pagina - 1)*10) ;
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

    public function obtenerDemanda($token, $id){
        if ($datos = Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, d.almacenDemanda,p.fotoProfesional, especialidades.nombreEspecialidad , personas.nombrePersona ,d.motivoDemanda, d.fechaIngresoDemanda, d.relatoDemanda, e.nombreEstado,e.idEstado, t.nombreTipo, t.idTipo, o.nombreOrganizacion, o.idOrganizacion   FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado INNER JOIN tipos t ON d.idTipo = t.idTipo INNER JOIN organizaciones o ON o.idOrganizacion = d.idOrganizacion INNER JOIN grupos g ON g.idDemanda = d.idDemanda and g.creadorDemanda = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad WHERE d.idDemanda = $id";
            $datos =[];
            $resultado = $con ->query($query);
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $datos=$row;
                }
            }
            $grupo = new Grupos();
            $personasInvolucradas = new PersonasInvolucradas();
            return ["data"=>$datos , "grupo"=> $grupo->obtenerGrupo($id), "personasInvolucradas"=> $personasInvolucradas->obtenerPersonasInvolucradas($id)];
        }
        return false;
    }
    

    public function obtenerDemandaPorMotivo($token, $motivo, $pagina) {
        if ($datosProfesional = Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, p.fotoProfesional, especialidades.nombreEspecialidad , personas.nombrePersona ,d.motivoDemanda, d.fechaIngresoDemanda, d.relatoDemanda, e.nombreEstado, t.nombreTipo, o.nombreOrganizacion   FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado INNER JOIN tipos t ON d.idTipo = t.idTipo INNER JOIN organizaciones o ON o.idOrganizacion = d.idOrganizacion INNER JOIN grupos g ON g.idDemanda = d.idDemanda and g.creadorDemanda = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad WHERE d.relatoDemanda LIKE '%$motivo%' ORDER BY d.fechaIngresoDemanda LIMIT 10 OFFSET ". (($pagina - 1)*10) ;
            $datos =[];
            $resultado = $con ->query($query);
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                        $datos[]=$row;                
                }
            }
            $queryTotal = "SELECT COUNT(idDemanda) AS demandasTotales FROM demandas WHERE motivoDemanda LIKE '%$motivo%'";
            if ($resultadoTotal = $con -> query($queryTotal)) {
                while ($row = $resultadoTotal->fetch_assoc()) {
                    $total = $row["demandasTotales"];
                }
            }
            return ["data"=>$datos, "demandasTotales"=>intval($total), "paginaNumero"=> $pagina];
        }

        
        return false;
    }

    public function obtenerDemandaPorFiltro($token, $pagina, $idTipo = "NULL", $idEstado= "NULL", $idCreador= "NULL", $fechaIngreso = "NULL", $fechaCierre = "NULL"){
        if ($datosProfesional = Profesionales::validarToken($token)) {
            $con = new Conexion();

            $idTipo = $idTipo  ? $idTipo : "NULL";
            $idEstado = $idEstado  ? $idEstado : "NULL";
            $idCreador = $idCreador  ? $idCreador : "NULL";
            $fechaIngreso = $fechaIngreso  ? "'$fechaIngreso'" : "NULL";
            $fechaCierre = $fechaCierre  ? "'$fechaCierre'" : "NULL";
           
            $query = "SELECT d.idDemanda, p.fotoProfesional, especialidades.nombreEspecialidad , personas.nombrePersona ,d.motivoDemanda, d.fechaIngresoDemanda, d.relatoDemanda, e.nombreEstado, t.nombreTipo, o.nombreOrganizacion   FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado INNER JOIN tipos t ON d.idTipo = t.idTipo INNER JOIN organizaciones o ON o.idOrganizacion = d.idOrganizacion INNER JOIN grupos g ON g.idDemanda = d.idDemanda and g.creadorDemanda = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad WHERE d.idTipo = $idTipo OR d.idEstado = $idEstado OR d.fechaIngresoDemanda > '$fechaIngreso' OR d.fechaCierreDemanda < '$fechaCierre' OR  d.idDemanda = (SELECT grupos.idDemanda FROM grupos WHERE grupos.idProfesional = $idCreador)   ORDER BY d.fechaIngresoDemanda LIMIT 10 OFFSET ". (($pagina - 1)*10) ;

            $datos =[];
            $resultado = $con ->query($query);
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                        $datos[]=$row;
                }
            }
            
            $queryTotal = "SELECT COUNT(idDemanda) AS demandasTotales FROM demandas WHERE d.idTipo = $idTipo OR d.idEstado = $idEstado OR d.fechaIngresoDemanda > '$fechaIngreso' OR d.fechaCierreDemanda < '$fechaCierre' OR  d.idDemanda = (SELECT grupos.idDemanda FROM grupos WHERE grupos.idProfesional = $idCreador) ";
            if ($resultadoTotal = $con -> query($queryTotal)) {
                while ($row = $resultadoTotal->fetch_assoc()) {
                    $total = $row["demandasTotales"];
                }
            }

            return ["data"=>$datos, "demandasTotales"=>intval($total), "paginaNumero"=> $pagina];

        }
        return false;
    }

}
