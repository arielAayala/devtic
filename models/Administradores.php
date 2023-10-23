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

    public function obtenerEstadisticas($token){
        try {
            if ($datos = Profesionales::validarToken($token)) {
                if ($datos->prioridadProfesional== 1) {
                    $con = new Conexion();
                    $currentDate = date("Y-m-d");
                    $pastDate = date("Y-m-d", strtotime("-30 days"));

                    $query = "SELECT 
                    (SELECT COUNT(*) FROM demandas WHERE demandas.borrarDemanda = 0 AND demandas.fechaIngresoDemanda BETWEEN '$pastDate' AND '$currentDate') AS demandasIngresadas,
                    (SELECT COUNT(*) FROM demandas WHERE demandas.borrarDemanda = 0 AND demandas.fechaCierreDemanda BETWEEN '$pastDate' AND '$currentDate') AS demandasCerrada,
                    (SELECT COUNT(*) FROM notas WHERE notas.fechaCreacionNota BETWEEN '$pastDate' AND '$currentDate') AS notasIngresadas ";
                    if ($resultado = $con->query($query)) {
                        $datos = [];
                        while( $row = $resultado->fetch_assoc() ) {
                            $datos = $row;
                        }
                        $con->close();
                        return $datos;
                    }
                    throw new Exception("Error al cargar las estadisticas", 404);
                }
                throw new Exception("Error no posee los permisos",401);
            }
            throw new Exception("Error token no valido",401);
        }
        catch (Exception $e) {
            echo json_encode(["error"=>$e]);
            http_response_code($e->getCode());
        }
    }

    private function obtenerEstadisticaProfesionales($token){
        $con = new Conexion();
        $currentDate = date("Y-m-d");
        $pastDate = date("Y-m-d", strtotime("-30 days"));
        $query = "SELECT p.nombrePersona FROM profesionales 
        LEFT JOIN profesionalesgrupos pg ON  ";

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
        }
    }

}