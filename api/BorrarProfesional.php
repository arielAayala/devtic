<?php

include_once "../models/Administradores.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    
    case "POST":
        if(isset($_COOKIE["token"])){
            $datos = json_decode(file_get_contents("php://input"));
            if ($datos){
                $administrador = new Administradores();
                if($administrador->borrarProfesional($_COOKIE["token"],intval($datos->idProfesional) )){
                    http_response_code(200); 
                    echo json_encode(["msg" => "Se elimino la demanda correctamente"]);
                }else{
                    http_response_code(400); 
                    
                }
            }else{
                http_response_code(400); 
                
            }
        }else{
            http_response_code(401); 
            echo json_encode(["error" => "Token no existente"]);
        } 

        break;


    default:
        # code...
        break;
}