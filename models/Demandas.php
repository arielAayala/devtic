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

    public function eliminarDemanda($token, $idDemanda): bool {
        if ($datos = Profesionales::validarToken($token)) {
            if ($datos->prioridadProfesional == 1) {
                $con = new Conexion;
    
                try {
                    $con->begin_transaction();
    
                    // Prepare and execute the DELETE query for profesionalesgrupos
                    
                    
                    // Prepare and execute the DELETE query for alumnosdetalles
                    $prepareAlumnos = $con->prepare("DELETE alumnosdetalles FROM alumnosdetalles
                    JOIN personasinvolucradas ON alumnosdetalles.idPersonaInvolucrada = personasinvolucradas.idPersonaInvolucrada
                    WHERE personasinvolucradas.idDemanda = ?");
                    if ($prepareAlumnos === false) {
                        throw new Exception("Error creating alumnos prepared statement: " . $con->error);
                    }
                    $prepareAlumnos->bind_param("i", $idDemanda);
                    if (!$prepareAlumnos->execute()) {
                        throw new Exception("Error executing alumnos query: " . $prepareAlumnos->error);
                    }
    
                    // Prepare and execute the DELETE query for personasinvolucradas
                    $preparePersonas = $con->prepare("DELETE FROM personasinvolucradas WHERE idDemanda = ?");
                    if ($preparePersonas === false) {
                        throw new Exception("Error creating personas prepared statement: " . $con->error);
                    }
                    $preparePersonas->bind_param("i", $idDemanda);
                    if (!$preparePersonas->execute()) {
                        throw new Exception("Error executing query: " . $preparePersonas->error);
                    }
    
                    $prepareGrupo = $con->prepare("DELETE FROM profesionalesgrupos WHERE idDemanda = ?");
                    if ($prepareGrupo === false) {
                        throw new Exception("Error creating grupos prepared statement: " . $con->error);
                    }
                    $prepareGrupo->bind_param("i", $idDemanda);
                    if (!$prepareGrupo->execute()) {
                        throw new Exception("Error executing query: " . $prepareGrupo->error);
                    }

                    // Prepare and execute the DELETE query for demandas
                    $prepareDemanda = $con->prepare("DELETE FROM demandas WHERE idDemanda = ?");
                    if ($prepareDemanda === false) {
                        throw new Exception("Error creating demandas prepared statement: " . $con->error);
                    }
                    $prepareDemanda->bind_param("i", $idDemanda);
                    if (!$prepareDemanda->execute()) {
                        throw new Exception("Error executing query: " . $prepareDemanda->error);
                    }
    
                    $con->commit();
                    $con->close();
    
                    return true;
                } catch (Exception $e) {
                    // Handle exceptions here, possibly log the error
                    $con->rollback();
                    echo "Error: " . $e->getMessage(); // You can log or display the error message here
                }
            }
        }
        return false;
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
        }

    }
    
    
    
    

    public function obtenerTodasDemandas($token, $pagina){
        if ($datos = Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, p.fotoProfesional, especialidades.nombreEspecialidad , personas.nombrePersona ,d.motivoDemanda, d.fechaIngresoDemanda, d.relatoDemanda, e.nombreEstado, t.nombreTipo, o.nombreOrganizacion   FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado INNER JOIN tipos t ON d.idTipo = t.idTipo INNER JOIN organizaciones o ON o.idOrganizacion = d.idOrganizacion INNER JOIN profesionalesgrupos g ON g.idDemanda = d.idDemanda AND g.creadorGrupo = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad ORDER BY d.fechaIngresoDemanda DESC LIMIT 10 OFFSET ". (($pagina - 1)*10) ;
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
        if ($datos = Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, d.almacenDemanda,p.fotoProfesional, especialidades.nombreEspecialidad , personas.nombrePersona ,d.motivoDemanda, d.fechaIngresoDemanda, d.relatoDemanda, e.nombreEstado,e.idEstado, t.nombreTipo, t.idTipo, o.nombreOrganizacion, o.idOrganizacion   FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado INNER JOIN tipos t ON d.idTipo = t.idTipo INNER JOIN organizaciones o ON o.idOrganizacion = d.idOrganizacion INNER JOIN profesionalesgrupos g ON g.idDemanda = d.idDemanda and g.creadorGrupo = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad WHERE d.idDemanda = $id";
            $datos =[];
            $resultado = $con ->query($query);
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $datos=$row;
                }
            }
            $grupo = new Grupos();
            $personasInvolucradas = new PersonasInvolucradas();
            $con -> close();
            return ["data"=>$datos , "grupo"=> $grupo->obtenerGrupo($id), "personasInvolucradas"=> $personasInvolucradas->obtenerPersonasInvolucradas($id)];
        }
        return false;
    }
    

    public function obtenerDemandaPorMotivo($token, $motivo) {
        if (Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT d.idDemanda, p.fotoProfesional, especialidades.nombreEspecialidad , personas.nombrePersona ,d.motivoDemanda, d.fechaIngresoDemanda, d.relatoDemanda, e.nombreEstado, t.nombreTipo, o.nombreOrganizacion   FROM demandas d INNER JOIN estados e ON e.idEstado= d.idEstado INNER JOIN tipos t ON d.idTipo = t.idTipo INNER JOIN organizaciones o ON o.idOrganizacion = d.idOrganizacion INNER JOIN profesionalesgrupos g ON g.idDemanda = d.idDemanda and g.creadorGrupo = 1 INNER JOIN profesionales p ON p.idProfesional = g.idProfesional INNER JOIN personas ON personas.idPersona = p.idPersona INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad WHERE d.motivoDemanda LIKE '%$motivo%' ORDER BY d.fechaIngresoDemanda DESC LIMIT 3" ;
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
