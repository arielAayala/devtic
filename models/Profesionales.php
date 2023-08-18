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

    // EL INICIO DE SESION TIENE QUE TENER LA VALIDACION DE PASSWORD ENCRIPTADA
    
    public function iniciarSesion($correo, $contrasena){
        $con = new Conexion();
        $query = "SELECT p.idProfesional, p.prioridadProfesional, especialidades.nombreEspecialidad, personas.nombrePersona, personas.dniPersona FROM  profesionales p INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad INNER JOIN personas ON p.idPersona = personas.idPersona  WHERE '$correo' = p.correoProfesional AND '$contrasena' = p.contrasenaProfesional";
        $resultado = $con -> query($query);
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                $this->setProfesional(
                    $row["idProfesional"], 
                    $row["prioridadProfesional"], 
                    $row["nombreEspecialidad"], 
                    $row["nombrePersona"], 
                    $row["dniPersona"]
                ); 
            }

            $this ->crearCookies();
            return [
                "data"=>$this-> getProfesional(),
                "msg" => "Se inició sesión correctamente"
            ];
        }
    }

    public function iniciarSesionConToken($token){
        if ($data =Profesionales::validarToken($token)) {
            $con = new Conexion();
            $query = "SELECT p.idProfesional, p.prioridadProfesional, especialidades.nombreEspecialidad, personas.nombrePersona, personas.dniPersona FROM  profesionales p INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad INNER JOIN personas ON p.idPersona = personas.idPersona  WHERE ".$data[0]." = p.idProfesional";
            $resultado = $con -> query($query);
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $this->setProfesional(
                        $row["idProfesional"], 
                        $row["prioridadProfesional"], 
                        $row["nombreEspecialidad"], 
                        $row["nombrePersona"], 
                        $row["dniPersona"]
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

    public function cerrarSesion(){
        $this -> borrarCookies();
        return [
            "msg" => "Se cerro sesión correctamente"
        ];
    }


    private function setProfesional($id, $prioridad, $especialidad, $nombre, $dni){
        $this -> idProfesional = $id;
        $this -> prioridadProfesional = $prioridad;
        $this -> especialidadProfesional = $especialidad;
        $this -> nombrePersona = $nombre;
        $this -> dniPersona = $dni;
    }

    private function getProfesional(){
        return [
            "idProfesional" =>$this -> idProfesional,
            "prioridadProfesional" =>$this -> prioridadProfesional,
            "especialidadProfesional" =>$this -> especialidadProfesional,
            "nombrePersona" =>$this -> nombrePersona,
            "dniPersona" =>$this -> dniPersona
        ];
    }

    
    private function crearCookies(){
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

    private function borrarCookies(){
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

    static public function validarToken($token){
        try {
            $payload = JWT::decode($token, new Key($_ENV["SECRET_JWT"], "HS256"));
            return [$payload->data->idProfesional, $payload->data->prioridadProfesional ];
        } catch (Exception $e) {
            echo json_encode(["Error" => "Error al validar el token"]);
        } 
    }   


    

};// end class Profesional

?>
