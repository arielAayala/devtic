<?php

include_once "../models/Organizaciones.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    
    case "POST":
        if(isset($_COOKIE["token"])){
            $datos = json_decode(file_get_contents("php://input"));
            if (isset($_COOKIE["token"], $datos->idOrganizacion, $datos->nombreOrganizacion, $datos->direccionOrganizacion, $datos->idLocalidad, $datos->cueAnexo, $datos->numeroTelefonoOrganizacion)){
                $organizacion = new Organizaciones();
                if($organizacion -> actualizarOrganizacion($_COOKIE["token"], $datos->idOrganizacion, $datos->nombreOrganizacion, $datos->direccionOrganizacion, $datos->idLocalidad, $datos->cueAnexo, $datos->numeroTelefonoOrganizacion)){
                    http_response_code(200); 
                    echo json_encode(["msg" => "Se Actualizo la demanda correctamente"]);
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
            echo json_encode(["error" => "Token no existente"]);
        } 

        break;


    default:
        # code...
        break;
}