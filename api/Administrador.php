<?php
include_once "../models/Administradores.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    /* Crear Profesional */
    case "POST":
        if(isset($_COOKIE["token"])){
            $datos = json_decode(file_get_contents("php://input"));
            if ($datos){
                $administrador = new Administradores();
                if($administrador->crearProfesional($_COOKIE["token"],$datos->nombrePersona,$datos->dniPersona,$datos->correoProfesional,$datos->especialidadProfesional,$datos->prioridadProfesional)){
                    http_response_code(200);
                    echo json_encode(["msg"=>"Profesional creado correctamente"]);
                }else{
                    http_response_code(400); 
                    echo json_encode(["error" => "Ocurrio un error"]);
                }
            }else{
                http_response_code(400); 
                echo json_encode(["error" => "Datos no existentes"]);
            }
        }else{
            http_response_code(401); 
            echo json_encode(["error" => "No autorizado"]);
        } 

        break;

}