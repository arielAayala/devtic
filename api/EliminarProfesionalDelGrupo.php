<?php

include_once "../models/Grupos.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    case 'POST':
        if (isset($_COOKIE["token"])) {
            $datos = json_decode(file_get_contents("php://input"));
            $grupo = new Grupos();
            if ($lstDemandas = $grupo->EliminarProfesionalDelGrupo($_COOKIE["token"], $datos->idDemanda, $datos->idProfesional)) {            
                echo json_encode(["msg"=> "Se Elimino el profesional correctamente"]);
                http_response_code(200);
            }else {
                http_response_code(400);
            }
        }else {
            echo json_encode(["error" => "Token no existente"]);
            http_response_code(401);
        }
        break;
    default:

        break;
}