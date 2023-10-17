<?php

include_once "../models/Notas.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    
    case "POST":
        if(isset($_COOKIE["token"] )){
            $datos = json_decode(file_get_contents("php://input"));
            if ($datos){
                $demanda = new Notas();
                if($demanda -> crearNotas($_COOKIE["token"], $datos->idDemanda, $datos->idTipoNota, $datos->tituloNota, $datos->descripcionNota, $_FILES["anexosNotas"])){
                    http_response_code(200); 
                    echo json_encode(["msg" => "Se creo la nota correctamente"]);
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