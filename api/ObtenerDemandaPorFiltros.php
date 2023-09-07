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
            if ($lstDemandas = $demanda->obtenerDemandaPorFiltro($_COOKIE["token"],$datos->pagina,$datos-> idTipo, $datos->idEstado, $datos->idCreador, $datos->fechaIngresoDemanda, $datos->fechaCierreDemanda)) {            
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
