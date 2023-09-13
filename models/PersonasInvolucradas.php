<?php

include_once "../conexion/Conexion.php";

class PersonasInvolucradas {
    
    private $idPersona;

    public function crearPersonaInvolucrada($idDemanda, $nombre, $dni,$demandante ,$alumno,   $idParentesco=null ,$telefono=null, $domicilio=null,$idLocalidad=null ,$correo=null ):bool{
        $con = new Conexion();
        $query = "INSERT INTO personas(nombrePersona, dniPersona) VALUES (?, ?)";
        $prepare = $con ->prepare($query);
        $prepare-> bind_param("si",$nombre, $dni);
        if ($prepare -> execute()) {
            $this -> idPersona = $con ->insert_id;
            $patternPhone = "/^((\(?\d{3}\)?[-. ]?\d{4})|(\(?\d{4}\)?[-. ]?\d{3})|(\(?\d{5}\)?[-. ]?\d{2}))[-. ]?\d{4}$/";
            if ($telefono & preg_match_all($patternPhone,$telefono)) {
                $preparePhone = $con->prepare("INSERT INTO telefonos (idPersona, numeroTelefono) VALUES (?,?)");      
                $preparePhone->bind_param("is",$this->idPersona,$telefono);
                $preparePhone->execute();
            }
            $patternEmail ='/@devtic\.com$/';
            if ($correo && preg_match($patternEmail,$correo)) {
                $prepareEmail = $con->prepare("INSERT INTO correos (idPersona, direccionCorreo) VALUES (?,?)");      
                $prepareEmail->bind_param("is",$this->idPersona,$correo);
                $prepareEmail->execute();

            }
            if ($domicilio & $idLocalidad) {
                $prepareAddress = $con->prepare( "INSERT INTO domicilios (idPersona, direccionDomicilio, idLocalidad) VALUES (?,?,?)");
                $prepareAddress->bind_param("isi",$this->idPersona, $domicilio, $idLocalidad);
                $prepareAddress->execute();
            }
            
            $preparePersonaInvolucrada = $con->prepare( "INSERT INTO personasinvolucradas(idDemanda, idPersona, idParentesco, demandante, alumno) VALUES (?, ?, ?, ?, ?)");
            $preparePersonaInvolucrada-> bind_param("iiiii",$idDemanda,$this->idPersona, $idParentesco, $demandante,$alumno);
            if ($preparePersonaInvolucrada->execute()) {
                $con-> close();
                return true;
            } 
        }
        $preparePersonaInvolucrada->close();
        return false;
    }

    public function obtenerPersonasInvolucradas($idDemanda){
        $con = new Conexion();
        $preparePersonasInvolucradas = $con->prepare("SELECT p.nombrePersona,p.dniPersona ,parentesco.nombreParentesco, personasinvolucradas.idPersonaInvolucrada, personasinvolucradas.demandante,  personasinvolucradas.alumno 
        FROM personasinvolucradas 
        INNER JOIN personas p ON p.idPersona = personasinvolucradas.idPersona 
        LEFT JOIN parentesco ON parentesco.idParentesco = personasinvolucradas.idParentesco 
        WHERE personasinvolucradas.idDemanda = ? ");
        $preparePersonasInvolucradas ->bind_param("i", $idDemanda);
        $preparePersonasInvolucradas->execute();
        $datos=[];
        if ($preparePersonasInvolucradas-> num_rows() > 0) {
            $resultado = $preparePersonasInvolucradas->get_result();
            while ($row = $resultado ->fetch_assoc()) {
                $datos[]=$row; 
            }
        }
        return  $datos;
    }


}
