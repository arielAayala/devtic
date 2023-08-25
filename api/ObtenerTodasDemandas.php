<?php

include_once "../models/Demandas.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    case 'GET':
        if ($_COOKIE["token"]) {
            $demanda = new Demandas();
            if ($lstDemandas = $demanda->obtenerTodasDemandas($_COOKIE["token"])) {            
                echo json_encode($lstDemandas);
                http_response_code(200);
            }else {
                http_response_code(400);
                echo json_encode(["error"=> "Ocurrio un error"]);
            }
        }else {
            echo json_encode(["error"=> "token no existente"]);
            http_response_code(401);
        }
        break;
    default:

        break;
}

