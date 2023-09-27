<?php

include_once "Profesionales.php";
include_once "../conexion/Conexion.php";
include_once "PersonasInvolucradas.php";
include_once "Grupos.php";
include_once "PersonasInvolucradas.php";

class Demandas {

    public function crearDemanda($token,  $idTipo, $idOrganizacion, $motivoDemanda, $relatoDemanda, $almacenDemanda, $personasInvolucradas){
        try {
            if($datosProfesional=Profesionales::validarToken($token)) {
                $con = new Conexion();
                if (!$personasInvolucradas) {
                    throw new Exception("Error al cargar las personas Involucradas");
                }

                $prepareDemanda=$con->prepare("INSERT INTO demandas(idEstado, idTipo, idOrganizacion, motivoDemanda, relatoDemanda, almacenDemanda, fechaIngresoDemanda) 
                VALUES(1,?,?,?,?,?,CURDATE())");
                $prepareDemanda->bind_param("iisss",$idTipo,$idOrganizacion,$motivoDemanda,$relatoDemanda,$almacenDemanda);
                if ($prepareDemanda->execute()) {
                    $idDemanda = $con -> insert_id;
                    $queryGrupos = "INSERT INTO profesionalesgrupos(idDemanda, idProfesional, creadorGrupo) VALUES ($idDemanda, $datosProfesional->idProfesional, 1)";
    
                    if ($con-> query($queryGrupos)) {
                        foreach ($personasInvolucradas as  $i) {
                            $personas = new PersonasInvolucradas();
                            if(!($personas->crearPersonaInvolucrada($idDemanda,$i->nombrePersona,$i->dniPersona,$i->demandante, $i->alumno,$i->idParentesco , $i->telefono, $i->domicilio, $i->idLocalidad, $i->grado, $i->turno, $i->docente))){
                                throw new Exception("Ocurrio un error al vincular las personas involucradas con la demanda");
                            };
                        }
                        $con -> close();
                        return true;
                    }
                    throw new Exception("Ocurrio un error al vincular al profesional con la demanda");
                }
                throw new Exception("Ocurrio un error al crear la demanda");
            }
            throw new Exception("Token no autorizado");
        } catch (Exception $e) {
            echo json_encode(["error"=>$e->getMessage()]);
            return false;
        }

    }

    public function actualizarDemanda($token, $idDemanda,$idTipo, $idOrganizacion, $motivoDemanda, $relatoDemanda, $almacenDemanda){
        if($datos=Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query="SELECT COUNT(*) as cantidad FROM profesionalesgrupos where ? = idProfesional AND ? = idDemanda";
            $prepareGrupos = $con ->prepare($query);
            $prepareGrupos->bind_param("ii", $datos->idProfesional, $idDemanda);
            $prepareGrupos->execute();
            $prepareGrupos ->store_result();
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

    public function eliminarDemanda($token, $idDemanda) {
        try {
            if ($datos = Profesionales::validarToken($token)) {
                if ($datos->prioridadProfesional == 1) {
                    $con = new Conexion;    
                        // Prepare and execute the DELETE query for demandas
                        $prepareDemanda = $con->prepare("UPDATE demandas SET borrarDemanda = 1 WHERE idDemanda = ?");
                        if ($prepareDemanda === false) {
                            throw new Exception("Error creating demandas prepared statement: " . $con->error);
                        }
                        $prepareDemanda->bind_param("i", $idDemanda);
                        if ($prepareDemanda->execute()) {
                            $con->close();
                            return true;
                        }
                        $con->close();
                        throw new Exception("Error al eliminar la demanda");
                }
                throw new Exception("Error ausencia de permisos");
            }
            throw new Exception("Error token no autorizado");
        } catch (Exception $e) {
            echo json_encode(["error"=>$e->getMessage()]);
            return false;
        }
    }
    
    public function cambiarEstado($token,$idEstado,$idDemanda){
        try {
            if($datos = Profesionales::validarToken($token)){
                $con = new Conexion();
                $prepareValidar = $con -> prepare("SELECT COUNT(*) AS profesional FROM profesionalesgrupos WHERE idDemanda = ? AND idProfesional = ?");
                $prepareValidar->bind_param("ii", $idDemanda, $datos->idProfesional);
                $prepareValidar->execute();
                $result = $prepareValidar->get_result();
                $value = $result->fetch_object();
                if ($value->profesional == 1 || $datos-> idPrioridad == 1) {
                    if ($idEstado == 3) {
                        $prepareEstado = $con -> prepare("UPDATE demandas SET idEstado = ? , fechaCierreDemanda = CURDATE() WHERE idDemanda = ?");
                    }else{
                        $prepareEstado = $con -> prepare("UPDATE demandas SET idEstado = ? , fechaCierreDemanda = NULL WHERE idDemanda = ?");
                    }
                    $prepareEstado->bind_param("ii", $idEstado, $idDemanda);
                    if($prepareEstado->execute()){
                        return true;
                    }
                    
                    throw new Exception("Error El Estado no pudo cambiarse");
                } 
                throw new Exception("Error Profesional sin permiso");     
            }
            throw new Exception("Error Token no Valido");
            
        } catch (Exception $e) {
            echo json_encode(["error"=>$e->getMessage()]);
            return false;
        }

    }
    
    
    
    

    public function obtenerTodasDemandas($token, $pagina){
        if ($datos = Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, p.fotoProfesional, especialidades.nombreEspecialidad , personas.nombrePersona ,d.motivoDemanda, d.fechaIngresoDemanda, d.relatoDemanda, e.nombreEstado, t.nombreTipo, o.nombreOrganizacion   FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado INNER JOIN tipos t ON d.idTipo = t.idTipo INNER JOIN organizaciones o ON o.idOrganizacion = d.idOrganizacion INNER JOIN profesionalesgrupos g ON g.idDemanda = d.idDemanda AND g.creadorGrupo = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad WHERE d.borrarDemanda = 0 ORDER BY d.fechaIngresoDemanda DESC LIMIT 10 OFFSET ". (($pagina - 1)*10) ;
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
            $con -> close();
            return ["data"=>$datos, "demandasTotales"=>intval($total), "paginaNumero"=> $pagina];
        }
        return false;
    }

    public function obtenerDemanda($token, $id){

        try {
            //code...
            if ($datos = Profesionales::validarToken($token)) {
                $con = new Conexion();
                $query = "SELECT d.idDemanda, d.borrarDemanda ,d.almacenDemanda,p.fotoProfesional, especialidades.nombreEspecialidad , personas.nombrePersona ,d.motivoDemanda, d.fechaIngresoDemanda, d.relatoDemanda, e.nombreEstado,e.idEstado, t.nombreTipo, t.idTipo, o.nombreOrganizacion, o.idOrganizacion   FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado INNER JOIN tipos t ON d.idTipo = t.idTipo INNER JOIN organizaciones o ON o.idOrganizacion = d.idOrganizacion INNER JOIN profesionalesgrupos g ON g.idDemanda = d.idDemanda and g.creadorGrupo = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad WHERE d.idDemanda = $id";
                if ($resultado = $con ->query($query)) {
                    $datos =[];
                    if ($resultado->num_rows > 0) {
                        while ($row = $resultado->fetch_assoc()) {
                            $datos=$row;
                        }
                    }
                    $grupo = new Grupos();
                    $personasInvolucradas = new PersonasInvolucradas();
                    $con -> close();
                    if (!$datos) {
                        throw new Exception("Error al obtener la demanda");
                    }
                    if (!($grupoData =$grupo->obtenerGrupo($id))) {
                        throw new Exception("Error al obtener el grupo");
                    }if (!($personasData = $personasInvolucradas->obtenerPersonasInvolucradas($id))) {
                        throw new Exception("Error al obtener las persona involucradas de la demanda");
                    }
                    $datosDemanda = ["data"=>$datos , "grupo"=> $grupoData, "personasInvolucradas"=> $personasData];
                    return $datosDemanda;
                }
                throw new Exception("Error al obtener la demanda");
            }
            throw new Exception("Error Token no valido");
        } catch (Exception $e) {
            echo json_encode(["error"=>$e->getMessage()]);
            
        }

    }
    

    public function obtenerDemandaPorMotivo($token, $motivo) {
        if (Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, d.motivoDemanda, d.fechaIngresoDemanda, personas.nombrePersona  FROM demandas d INNER JOIN profesionalesgrupos g ON d.idDemanda = g.idDemanda AND g.creadorGrupo = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona WHERE d.motivoDemanda LIKE '%$motivo%' ORDER BY d.fechaIngresoDemanda DESC LIMIT 5" ;
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
    public function obtenerFechaIngresoDemanda($token, $motivo) {
        if (Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.fechaIngresoDemanda FROM demandas d WHERE d.motivoDemanda LIKE '%$motivo%' ORDER BY d.fechaIngresoDemanda DESC LIMIT 5";
            $datos = [];
            $resultado = $con->query($query);
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $datos[] = $row['fechaIngresoDemanda'];
                }
            }
            return $datos;
        }
        return false;
    }
    

    public function obtenerDemandaPorFiltro($token, $pagina, $idTipo = "NULL", $idEstado= "NULL", $idCreador= "NULL", $fechaIngreso = "NULL", $fechaCierre = "NULL"){
        if ( Profesionales::validarToken($token)) {
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
            $con -> close();
            return ["data"=>$datos, "demandasTotales"=>intval($total), "paginaNumero"=> $pagina];
        }
        return false;
    }

}
