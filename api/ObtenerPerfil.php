<?php

include_once "../models/Profesionales.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    case 'POST':
        if ($_COOKIE["token"]) {
            $datos = json_decode(file_get_contents("php://input"));
            $profesional = new Profesionales();
            if ($datosProfesionales = $profesional->obtenerPerfil($_COOKIE["token"], $datos->idProfesional)) {            
                echo ($datosProfesionales);
                http_response_code(200);
            }
        }else {
            echo json_encode(["error"=> "token no existente"]);
            http_response_code(401);
        }
        break;
    default:

        break;
}
