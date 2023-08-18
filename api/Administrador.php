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
            $administrador = new Administradores();
        }else{
            http_response_code(400); 
            echo json_encode(["error" => "Token no existente"]);
        } 

    break;

    case "GET":
        if(isset($_COOKIE["token"])){
            
        }else{
            http_response_code(400);
            echo json_encode(["error" => "Token no existente"]);
        }

        break;
    
    default:
        # code...
        break;
}