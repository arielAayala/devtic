<?php

include_once "../conexion/Conexion.php";
include_once "Profesional.php";

class PersonasInvolucradas {
    
    private $idPersona;
    private $idParentesco;
    private $idPersonaInvolucrada;


    public function crearPersonaInvolucrada($token ,$idDemanda, $nombre, $dni, $demandante = false){
        if (Profesionales::validarToken($token)) {
            $con = new Conexion();
            $queryPersona = "SELECT  idPersona FROM personas WHERE dniPersona = $dni";
            $resultado = $con ->query($queryPersona);
            if ($resultado -> num_rows == 0  ){
                $query = "INSERT INTO personas(nombrePersona, dniPersona) VALUES ($nombre, $dni)";
                if ($con -> query($query)) {
                    $this -> idPersona = $con ->insert_id;
                    }    
            }else {
                while ($row = $resultado->fetch_assoc()) {
                    $this->idPersona =  $row["idPersona"];
                }
            }

            $queryCrearPersonaInvolucrada = "INSERT INTO personasinvolucradas(idDemanda, idPersona, idParentesco) VALUES ($idDemanda, $this->idPersona, null)";
            if ($con->query($queryCrearPersonaInvolucrada)) {
                $this -> idPersonaInvolucrada;
                if($demandante){
                    $queryPersonaRol = "INSERT INTO rolespersonas(idPersonaInvolucrada, idRol ) VALUES ($this->idPersonaInvolucrada, 1)";
                    if($con -> query($queryPersonaRol)){
                        return true;
                    }
                }
                return true;
            }
            
        }
        return false;
    }
}
