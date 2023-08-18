<?php
include_once "../models/Profesionales.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    case "POST":
        $datos = json_decode(file_get_contents("php://input"));
        if ($datos){
            $profesional = new Profesionales();
            if ($datos = $profesional -> iniciarSesion($datos->correo, $datos->contrasena)) {
                http_response_code(200);
                echo json_encode($datos);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Usuario no encontrado"]);
            } 
        }else{
            http_response_code(400);
            echo json_encode(["error" => "Ausencia de datos requeridos"]);
        } 
        break;

    case "GET":
        if(isset($_COOKIE["token"])){
            $profesional = new Profesionales();
            if ($datos = $profesional->iniciarSesionConToken(($_COOKIE["token"]))) {
                http_response_code(200);
                echo json_encode($datos);
            }else{
                http_response_code(404);
            }
        }else{
            http_response_code(400);
            echo json_encode(["error" => "Token no existente"]);
        }

        break;
    
    default:
        # code...
        break;
}


?>