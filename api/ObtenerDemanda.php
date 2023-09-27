<?php

include_once "../models/Demandas.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    case 'POST':
        if ($_COOKIE["token"]) {
            $datos = json_decode(file_get_contents("php://input"));
            $demanda = new Demandas();
            if ($lstDemandas = $demanda->obtenerDemanda($_COOKIE["token"], $datos->idDemanda)) {            
                echo json_encode($lstDemandas);
                http_response_code(200);
            }else {
                http_response_code(400);
            }
        }else {
            http_response_code(401);
        }
        break;
    default:

        break;
}