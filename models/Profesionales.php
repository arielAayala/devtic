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
    

    

};// end class Profesional

?>
