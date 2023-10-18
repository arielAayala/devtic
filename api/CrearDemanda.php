<?php

include_once "../models/Demandas.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


switch ($_SERVER["REQUEST_METHOD"]) {

    
    case "POST":
        if(isset($_COOKIE["token"])){
            if (isset($_POST["motivoDemanda"], $_POST["relatoDemanda"], $_POST["idTipo"],$_POST["idOrganizacion"],$_POST["almacenDemanda"])) {
                $motivoDemanda = $_POST["motivoDemanda"];
                $relatoDemanda = $_POST["relatoDemanda"];
                $idTipo = $_POST["idTipo"];
                $idOrganizacion = $_POST["idOrganizacion"];
                $almacenDemanda = $_POST["almacenDemanda"];
                $personasInvolucradas = json_decode(html_entity_decode($_POST["personasInvolucradas"]));
                if (isset($_FILES["anexosDemanda"])) {
                    $anexosDemanda = $_FILES["anexosDemanda"];
                }else{
                    $anexosDemanda = [];
                }   
                // Procesar la solicitud utilizando las variables $_POST y $anexosDemanda
                $demanda = new Demandas();
                if ($demanda->crearDemanda($_COOKIE["token"], $idTipo, $idOrganizacion, $motivoDemanda, $relatoDemanda, $almacenDemanda, $personasInvolucradas, $anexosDemanda)) {
                    http_response_code(200); 
                    echo json_encode(["msg" => "Se creó la demanda correctamente"]);
                }   
            }else{

                http_response_code(400); 
                echo json_encode(["error" => "Falta información en el formulario"]);
            }
        } else {
            http_response_code(401); 
            echo json_encode(["error" => "Token no existente"]);
        }
        break;
    


    default:
        # code...
        break;
}