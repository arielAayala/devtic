<?php 

include_once "Profesionales.php";
include_once "../conexion/Conexion.php";


class Administradores extends Profesionales{

    public function crearProfesional($token, $nombre, $dni, $correo, $especialidad, $prioridad ):bool{
        if ($datos = Profesionales::validarToken($token)) {           
            if ($datos->prioridadProfesional==1) {
                $con = new Conexion();
                $especialidad = intval($especialidad);
                $dni = intval($dni);
                $prioridad = intval($prioridad); 
                $queryPersona = "INSERT INTO personas (dniPersona, nombrePersona) VALUES (?, ?)";               
                $consultaPreparada = $con -> prepare($queryPersona);
                $consultaPreparada->bind_param("is",$dni,$nombre);
                if ($consultaPreparada->execute()) {      
                    $idPersona = $con -> insert_id;
                    $contrasenaEncriptada = password_hash(strval($dni), PASSWORD_DEFAULT);
                    $queryProfesional = "INSERT INTO profesionales 
                    (idPersona, idEspecialidad, correoProfesional, contrasenaProfesional, prioridadProfesional) 
                    VALUES (?,?,?,?,?)";
                    $prepare = $con -> prepare($queryProfesional);
                    $prepare ->bind_param("iissi", $idPersona, $especialidad,$correo,$contrasenaEncriptada,$prioridad);
                    if ($prepare ->execute()) {
                        $con ->close();
                        return true;
                    }else{
                        $con ->query("DELETE FROM personas where idPersona = $idPersona");
                        $con ->close();
                    }
                }
            }
        }
        return false;
    }

    public function borrarProfesional($token,$idProfesional){
        try {
            //code...
            if ($datosProfesional = Profesionales::validarToken($token)) {
                if ($datosProfesional->prioridadProfesional==1) {
                    $con = new Conexion();

                    $query = "UPDATE profesionales SET borrarProfesional = 1 WHERE idProfesional = ?";
                    $prepareDeleteProfesional = $con->prepare($query);
                    $prepareDeleteProfesional ->bind_param("i",$idProfesional);
                    if ($prepareDeleteProfesional->execute()) {
                        $con ->close();
                        return true;
                    }
                    throw new Exception("Ocurrio un error al borrar el profesional" );
                }
                throw new Exception("Error No autorizado" );
            }
            throw new Exception("Error Token no valido" );
            
        } catch (Exception $e) {
            $con-> close();
            echo json_encode(["error"=>$e]);
        }
    }

    public function obtenerEstadisticas($token, $initialDate, $endDate){
        try {
            if ($datos = Profesionales::validarToken($token)) {
                if ($datos->prioridadProfesional== 1) {
                    $con = new Conexion();
                    

                    $query = "SELECT 
                    (SELECT COUNT(*) FROM demandas WHERE demandas.borrarDemanda = 0 AND demandas.fechaIngresoDemanda BETWEEN ? AND ?) AS demandasIngresadas,
                    (SELECT COUNT(*) FROM demandas WHERE demandas.borrarDemanda = 0 AND demandas.fechaCierreDemanda BETWEEN ? AND ?) AS demandasCerradas,
                    (SELECT COUNT(*) FROM notas WHERE notas.fechaCreacionNota BETWEEN ? AND ?) AS notasIngresadas ";
                    $prepareGlobal = $con->prepare($query); 
                    $prepareGlobal->bind_param("ssssss",$initialDate, $endDate, $initialDate,$endDate, $initialDate, $endDate );
                    if($prepareGlobal-> execute()){
                        $resultado = $prepareGlobal->get_result();
                        $datos = [];
                        while( $row = $resultado->fetch_assoc() ) {
                            $datos = $row;
                        }
                        return ["estadisticasGlobales" =>$datos , "estadisticaProfesionales" => $this->obtenerEstadisticaProfesionales($initialDate, $endDate)];
                    }
                    throw new Exception("Error al cargar las estadisticas", 404);
                }
                throw new Exception("Error no posee los permisos",401);
            }
            throw new Exception("Error token no valido",401);
        }
        catch (Exception $e) {
            echo json_encode(["error"=>$e->getMessage()]);
            http_response_code($e->getCode());    
        }
        finally{
            $con -> close();
        }
    }

    private function obtenerEstadisticaProfesionales($initialDate, $endDate) {
        try {
            //code...
            $con = new Conexion();
            $query = "SELECT per.nombrePersona, p.idProfesional, 
            (SELECT COUNT(d.idDemanda) FROM demandas d
                INNER JOIN profesionalesgrupos pg ON pg.idProfesional = p.idProfesional
                WHERE d.fechaIngresoDemanda BETWEEN ? AND ? 
            ) as demandasIngresadas,

            (SELECT COUNT(d.idDemanda) FROM demandas d
                INNER JOIN profesionalesgrupos pg ON pg.idProfesional = p.idProfesional
                WHERE d.fechaCierreDemanda BETWEEN ? AND ? 
            ) as demandasTerminadas,

            (SELECT COUNT(d.idDemanda) FROM demandas d
                INNER JOIN profesionalesgrupos pg ON pg.idProfesional = p.idProfesional
                WHERE (d.fechaIngresoDemanda BETWEEN ? AND ?) AND d.idEstado = 1 
            ) as demandasPendientes,

            (SELECT COUNT(d.idDemanda) FROM demandas d
                INNER JOIN profesionalesgrupos pg ON pg.idProfesional = p.idProfesional
                WHERE (d.fechaIngresoDemanda BETWEEN ? AND ?) AND d.idEstado = 2 
            ) as demandasEnCurso,

            (SELECT COUNT(d.idDemanda) FROM demandas d
                INNER JOIN profesionalesgrupos pg ON pg.idProfesional = p.idProfesional
                WHERE (d.fechaIngresoDemanda BETWEEN ? AND ?) AND d.idEstado = 4 
            ) as demandasDemoradas,

            (SELECT COUNT(n.idNota) FROM notas n
                WHERE (n.fechaCreacionNota BETWEEN ? AND ?) AND (p.idProfesional = n.idProfesionalCreador)
            ) as notasIngresadas

            FROM profesionales p
            INNER JOIN personas per ON per.idPersona = p.idPersona
            GROUP BY per.nombrePersona, p.idProfesional";
            if($prepareGlobal = $con->prepare($query)){

                if ($prepareGlobal->bind_param("ssssssssssss", $initialDate, $endDate, $initialDate, $endDate, $initialDate, $endDate, $initialDate, $endDate, $initialDate, $endDate, $initialDate, $endDate)) {
                    
                    
                    
                    if ($prepareGlobal->execute()) {
                        $resultado = $prepareGlobal->get_result();
                        $datos = [];
                        while ($row = $resultado->fetch_assoc()) {
                            $datos[] = $row;
                        }
                        $con->close();
                        return $datos;
                    }
                } 
                throw new Exception("Problemas al obtener las estadisticas",404);
            }
            throw new Exception("Error al obtener las estadisticas", 404);
            
        } catch (Exception $e) {
            echo json_encode(["error"=>$e->getMessage()]);
            http_response_code($e->getCode());
        }
        
    }
    







    public function verAuditoria($token){
        try {
            if ($datos = Profesionales::validarToken($token)){
                if ($datos->prioridadAplicacion== 1) {
                    $con = new Conexion();
                    $query = "SELECT * FROM auditoria ORDER BY fecha DESC ";
                    if($resultado =$con->query($query)){
                        $datos = [];
                        while ($row = $resultado->fetch_assoc()) {
                            $datos[]= $row;
                        }
                        $con->close();
                        return $datos;
                    }
                    throw new Exception("Error ocurrio un error al cargar los ultimos movimientos", 404);
                }
                throw new Exception("Error no posee los permisos necesarios", 401);
            }
            throw new Exception("Token no valido", 401);
        } catch (Exception $e) {
            echo json_encode(["error"=>$e]);
            http_response_code($e->getCode());

        }finally {
            $con -> close();
        }

    }


}