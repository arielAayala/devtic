<?php

include_once "../models/Notas.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

switch ($_SERVER["REQUEST_METHOD"]) {

    case "POST":
        if (isset($_COOKIE["token"])) {
            if (isset($_POST['idDemanda']) && isset($_POST['idTipoNota']) && isset($_POST['tituloNota']) && isset($_POST['descripcionNota'])) {
                $idDemanda = $_POST['idDemanda'];
                $idTipoNota = $_POST['idTipoNota'];
                $tituloNota = $_POST['tituloNota'];
                $descripcionNota = $_POST['descripcionNota'];
                if (isset( $_FILES["anexosNotas"])) {
                    $anexosNotas = $_FILES["anexosNotas"];
                } else{
                    $anexosNotas = [];
                }
                

                $nota = new Notas();

                if ($nota->crearNotas($_COOKIE["token"], $idDemanda, $idTipoNota, $tituloNota, $descripcionNota, $anexosNotas)) {
                    http_response_code(200);
                    echo json_encode(["msg" => "Se creó la nota correctamente"]);
                } 
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Faltan datos requeridos en el formulario"]);
            }
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Token no existente"]);
        }

        break;

    default:
        // Manejar otras solicitudes aquí si es necesario
        break;
}

