<?php

include_once "../models/Profesionales.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");



switch ($_SERVER["REQUEST_METHOD"]) {

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"));
        if (isset($datos)) {
            $profesional = new Profesionales();
            $profesional->enviarReestablecerContrasena( $datos->correo);           
        }else {
            http_response_code(401);
            echo json_encode(["error"=> "Faltan Datos"]);
        }
        break;
    default:

        break;
}