<?php

include_once "../models/Administradores.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    case 'GET':
        if (isset($_COOKIE["token"])) {
            $administrador = new Administradores();
            if ($lstDemandas = $administrador->obtenerAuditoria($_COOKIE["token"])) {            
                echo json_encode($lstDemandas);
                http_response_code(200);
            }
        }else {
            http_response_code(401);
            echo json_encode(["error"=> "Faltan Datos"]);
        }
        break;
    default:

        break;
}