<?php

include_once "../conexion/Conexion.php";

class PersonasInvolucradas {
    
    private $idPersona;
    private $idParentesco;
    private $idPersonaInvolucrada;


    public function crearPersonaInvolucrada($idDemanda, $nombre, $dni, $roles, $idParentesco):bool{
            $con = new Conexion();
            $queryPersona = "SELECT  idPersona FROM personas WHERE dniPersona = $dni";
            $resultado = $con ->query($queryPersona);
            if ($resultado -> num_rows == 0  ){
                $query = "INSERT INTO personas(nombrePersona, dniPersona) VALUES ('$nombre', $dni)";
                if ($con -> query($query)) {
                    $this -> idPersona = $con ->insert_id;
                    }    
            }else {
                while ($row = $resultado->fetch_assoc()) {
                    $this->idPersona =  $row["idPersona"];
                }
            }
            $idParentescoValue = $idParentesco ? $idParentesco : "NULL";
            $queryCrearPersonaInvolucrada = "INSERT INTO personasinvolucradas(idDemanda, idPersona, idParentesco) VALUES ($idDemanda, $this->idPersona, $idParentescoValue)";
            if ($con->query($queryCrearPersonaInvolucrada)) {
                $this->idPersonaInvolucrada = $con->insert_id;
                if($roles){
                    foreach ($roles as  $rol) {
                        $queryPersonaRol = "INSERT INTO rolespersonas(idPersonaInvolucrada, idRol ) VALUES ($this->idPersonaInvolucrada, $rol->idRol)";
                        $con -> query($queryPersonaRol);
                    }
                }
                return true;
            }
            echo $con -> error;
        return false;
    }
}
