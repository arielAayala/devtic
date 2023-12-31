<?php

include_once "../models/Profesionales.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");



switch ($_SERVER["REQUEST_METHOD"]) {

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"));
        if (isset($datos) ) {
            $profesional = new Profesionales();
            if($profesional->reestablecerContrasena( $datos->contrasena, $datos->token)){
                echo json_encode(array("msg"=> "Se cambio la contraseña correctamente"));
                http_response_code(200);
            }          
        }else {
            http_response_code(404);
            echo json_encode(["error"=> "Faltan Datos"]);
        }
        break;
    default:

        break;
}