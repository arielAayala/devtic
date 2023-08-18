<?php

include_once "../models/Profesionales.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $profesional = new Profesionales;
    if($data = $profesional->cerrarSesion() ){
        http_response_code(200);
        echo json_encode($data);
    } else {
        http_response_code(400);
        echo json_encode(["Error" => "Error al iniciar sesion"] );
    }
}