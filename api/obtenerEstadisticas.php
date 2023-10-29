<?php

include_once "../models/Administradores.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    case 'POST':
        if (isset($_COOKIE["token"])) {
            $datos = json_decode(file_get_contents("php://input"));
            $administrador = new Administradores();

            if (isset($datos->fechaInicio)) {
                $initialDate = $datos->fechaInicio;
            }else{
                $initialDate = date("Y-m-d");
            }
            
            if (isset($datos->fechaFinal)) {
                $endDate = $datos->fechaFinal;
            }else{
                $endDate = date("Y-m-d", strtotime("-30 days"));
            }

            if ($lstDemandas = $administrador->obtenerEstadisticas($_COOKIE["token"], $initialDate, $endDate)) {            
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