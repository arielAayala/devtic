<?php

include_once("../conexion/Conexion.php");
require_once("../vendor/autoload.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Profesionales  {
    private $idProfesional;
    private $prioridadProfesional;
    private $especialidadProfesional;
    private $nombrePersona;
    private $dniPersona; 

    private $fotoProfesional;

    // EL INICIO DE SESION TIENE QUE TENER LA VALIDACION DE PASSWORD ENCRIPTADA
    
    public function iniciarSesion($correo, $contrasena){
        $con = new Conexion();
        $query = "SELECT p.idProfesional, p.fotoProfesional,p.prioridadProfesional, p.contrasenaProfesional ,especialidades.nombreEspecialidad, personas.nombrePersona, personas.dniPersona FROM  profesionales p INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad INNER JOIN personas ON p.idPersona = personas.idPersona  WHERE '$correo' = p.correoProfesional ";
        $resultado = $con -> query($query);
        $flag = false;
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                if ( password_verify($contrasena, $row["contrasenaProfesional"])){
                    $flag = true;
                    $this->setProfesional(
                        $row["idProfesional"], 
                        $row["prioridadProfesional"], 
                        $row["nombreEspecialidad"], 
                        $row["nombrePersona"], 
                        $row["dniPersona"],
                        $row["fotoProfesional"]
                    );
                }
            }        
        }
        if($flag){
            $this ->crearCookies();
            return [
                "data"=>$this-> getProfesional(),
                "msg" => "Se inició sesión correctamente"
            ]; 
        }
        return False;
    }


    public function cerrarSesion():array{
        $this -> borrarCookies();
        return [
            "msg" => "Se cerro sesión correctamente"
        ];
    }


    private function setProfesional($id, $prioridad, $especialidad, $nombre, $dni, $foto):void{
        $this -> idProfesional = $id;
        $this -> prioridadProfesional = $prioridad;
        $this -> especialidadProfesional = $especialidad;
        $this -> nombrePersona = $nombre;
        $this -> dniPersona = $dni;
        $this -> fotoProfesional =$foto;
    }

    private function getProfesional():array{
        return [
            "idProfesional" =>$this -> idProfesional,
            "prioridadProfesional" =>$this -> prioridadProfesional,
            "especialidadProfesional" =>$this -> especialidadProfesional,
            "nombrePersona" =>$this -> nombrePersona,
            "dniPersona" =>$this -> dniPersona,
            "fotoProfesional" =>$this->fotoProfesional,
        ];
    }

    
    private function crearCookies():void{
        $time = time();
        $payload = [
            "iat" => $time,
            "exp" => $time + (60*60*24),
            "data" => ["idProfesional" =>$this -> idProfesional,
            "prioridadProfesional" =>$this -> prioridadProfesional]
        ];

        $cookiesConfiguration = [
            'expires' => (time() + (60*60*24)), 
            'path' => '/', 
            'domain' => '', // leading dot for compatibility or use subdomain
            'secure' => true,     // or false
            'httponly' => true,    // or false
            'samesite' => 'None' // None || Lax  || Strict
        ];

        $token = JWT::encode($payload, $_ENV["SECRET_JWT"], "HS256");

        setcookie('token', $token , $cookiesConfiguration);
    }

    private function borrarCookies():void{
        $time = time();
        $cookiesConfiguration = [
            'expires' => ($time - 60*60*24), 
            'path' => '/', 
            'domain' => '', // leading dot for compatibility or use subdomain
            'secure' => true,     // or false
            'httponly' => true,    // or false
            'samesite' => 'None' // None || Lax  || Strict
        ];

        setcookie('token', "" , $cookiesConfiguration);
    } 
    public function iniciarSesionConToken($token):?array{
        if ($data = Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT p.idProfesional, p.fotoProfesional,p.prioridadProfesional, p.contrasenaProfesional ,especialidades.nombreEspecialidad, personas.nombrePersona, personas.dniPersona FROM  profesionales p INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad INNER JOIN personas ON p.idPersona = personas.idPersona  WHERE ".$data->idProfesional." = p.idProfesional";
            $resultado = $con -> query($query);
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $this->setProfesional(
                        $row["idProfesional"], 
                        $row["prioridadProfesional"], 
                        $row["nombreEspecialidad"], 
                        $row["nombrePersona"], 
                        $row["dniPersona"],
                        $row["fotoProfesional"]
                    );
                }
                $this ->crearCookies();
                return [
                    "data"=>$this-> getProfesional(),
                    "msg" => "Se inició sesión correctamente"
                ];
            }
        }
    }

    public static function listarProfesionales($token){
        if (Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT p.idProfesional, e.nombreEspecialidad, personas.nombrePersona,p.prioridadProfesional, p.fotoProfesional FROM profesionales p INNER JOIN especialidades e ON e.idEspecialidad = p.idEspecialidad INNER JOIN personas ON personas.idPersona = p.idPersona WHERE p.borrarProfesional = 0";
            $resultado = $con->query($query);
            $datos = [];
            if ($resultado ->num_rows >0) {
                while($row = $resultado->fetch_assoc()){
                    $datos[]=$row;
                }
            }
            return $datos;
        }
        return false;
    }

    static public function validarToken($token):?object{
        try {
            $payload = JWT::decode($token, new Key($_ENV["SECRET_JWT"], "HS256"));
            return $payload->data;
        } catch (Exception $e) {
            echo json_encode(["Error" => "Error al validar el token"]);
        } 
    }   
    
    public function obtenerPerfil($token, $idProfesional){
        try {
            if (Profesionales::validarToken($token)) {
                $con = new Conexion();
                $query = "SELECT per.nombrePersona, p.idProfesional, p.fotoProfesional, e.nombreEspecialidad  
                FROM profesionales p 
                INNER JOIN personas per ON per.idPersona = p.idPersona
                INNER JOIN especialidades e ON e.idEspecialidad = p.idEspecialidad
                WHERE p.idProfesional = ? ";
                $preparePerfil = $con->prepare($query);
                $preparePerfil->bind_param("i", $idProfesional);
                if ($preparePerfil->execute()) {
                    $datos = [];
                    $resultado = $preparePerfil->get_result();
                    while($row = $resultado->fetch_assoc()) {
                        $datos=$row;
                    }
                    return json_encode(["datosProfesional" => $datos, "movimientoProfesional" =>$this->obtenerMovimientoProfesional($idProfesional)]);
                }
                throw new Exception("Error al obtener el perfil", 400);
            }
            throw new Exception("Error al validar el token", 401);
        } catch (Exception $e) {
            echo json_encode(["error"=>$e->getMessage()]);
            http_response_code($e->getCode());        
        }
    } 

    private function obtenerMovimientoProfesional ( $idProfesional){
       $con = new Conexion();
       $query = "SELECT 
            p.idProfesional,
            per.nombrePersona,
            ad.idAuditoriaDemanda,
            d.idDemanda,
            d.idEstado,
            e.nombreEstado,
            d.motivoDemanda,
            ad.idOperacion,
            o.nombreOperacion,
            ad.fechaAuditoria,
            ada.motivoDemandaViejo,
            ada.motivoDemandaNuevo,
            ada.relatoDemandaViejo,
            ada.relatoDemandaNuevo,
            ada.idTipoViejo,
            tiposViejos.nombreTipo as nombreTipoViejo,
            ada.idTipoNuevo,
            tiposNuevos.nombreTipo as nombreTipoNuevo,
            ada.idOrganizacionViejo, organizacionesViejos.nombreOrganizacion as nombreOrganizacionViejo,
            ada.idOrganizacionNuevo, organizacionesNuevos.nombreOrganizacion as nombreOrganizacionNuevo,
            ada.almacenDemandaViejo,
            ada.almacenDemandaNuevo,
            ade.idEstadoViejo,
            estadosViejos.nombreEstado as nombreEstadoViejo,
            ade.idEstadoNuevo,
            estadosNuevos.nombreEstado as nombreEstadoNuevo
        FROM auditoriaDemanda ad 
        LEFT JOIN auditoriaDemandaActualizar ada ON ada.idAuditoriaDemanda = ad.idAuditoriaDemanda
        LEFT JOIN auditoriaDemandaEstado ade ON ade.idAuditoriaDemanda = ad.idAuditoriaDemanda
        INNER JOIN operaciones o ON ad.idOperacion = o.idOperacion
        INNER JOIN demandas d ON d.idDemanda = ad.idDemanda
        INNER JOIN estados e ON d.idEstado = e.idEstado
        LEFT JOIN estados estadosViejos ON estadosViejos.idEstado = ade.idEstadoViejo
        LEFT JOIN estados estadosNuevos ON estadosNuevos.idEstado = ade.idEstadoNuevo
        LEFT JOIN tipos tiposViejos ON tiposViejos.idTipo = ada.idTipoViejo
        LEFT JOIN tipos tiposNuevos ON tiposNuevos.idTipo = ada.idTipoNuevo
        LEFT JOIN organizaciones organizacionesViejos ON organizacionesViejos.idOrganizacion = ada.idOrganizacionViejo
        LEFT JOIN organizaciones organizacionesNuevos ON organizacionesNuevos.idOrganizacion = ada.idOrganizacionNuevo
        INNER JOIN profesionales p ON ad.idProfesional = p.idProfesional
        INNER JOIN personas per ON per.idPersona = p.idPersona
        WHERE p.idProfesional = ?
        ORDER BY ad.idAuditoriaDemanda DESC
        LIMIT 3; ";
        $preparePerfil = $con->prepare($query);
        $preparePerfil->bind_param("i", $idProfesional);
        if ($preparePerfil->execute()) {
            $datos = [];
            $resultado = $preparePerfil->get_result();
            while($row = $resultado->fetch_assoc()) {
                $datos[]=$row;
            }
            return $datos;
        }
    }

};// end class Profesional

?>
