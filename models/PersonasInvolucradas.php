<?php

include_once "../conexion/Conexion.php";

class PersonasInvolucradas {
    
    private $idPersona;

    private $idPersonaInvolucrada;

    public function crearPersonaInvolucrada($idDemanda, $nombre, $dni,$demandante ,$alumno,   $idParentesco ,$telefono, $domicilio,$idLocalidad ,$correo, $grado, $turno, $docente ):bool{
        $con = new Conexion();
        $query = "INSERT INTO personas(nombrePersona, dniPersona) VALUES (?, ?)";
        $prepare = $con ->prepare($query);
        $prepare-> bind_param("si",$nombre, $dni);
        if ($prepare -> execute()) {
            $this -> idPersona = $con ->insert_id;
            $patternPhone = "/^((\(?\d{3}\)?[-. ]?\d{4})|(\(?\d{4}\)?[-. ]?\d{3})|(\(?\d{5}\)?[-. ]?\d{2}))[-. ]?\d{4}$/";
            if ($telefono && preg_match_all($patternPhone,$telefono)) {
                echo("telefono");
                $preparePhone = $con->prepare("INSERT INTO telefonos (idPersona, numeroTelefono) VALUES (?,?)");      
                $preparePhone->bind_param("is",$this->idPersona,$telefono);
                $preparePhone->execute();
            }
            $patternEmail ='/@devtic\.com$/';
            if ($correo && preg_match($patternEmail,$correo)) {
                echo("correo");
                $prepareEmail = $con->prepare("INSERT INTO correos (idPersona, direccionCorreo) VALUES (?,?)");      
                $prepareEmail->bind_param("is",$this->idPersona,$correo);
                $prepareEmail->execute();

            }
            if ($domicilio && $idLocalidad) {
                echo("domicilio");
                $prepareAddress = $con->prepare( "INSERT INTO domicilios (idPersona, direccionDomicilio, idLocalidad) VALUES (?,?,?)");
                $prepareAddress->bind_param("isi",$this->idPersona, $domicilio, $idLocalidad);
                $prepareAddress->execute();
            }
        }else{
            $preparePersona = $con ->prepare("SELECT idPersona FROM personas WHERE idPersona = ? ");
            $preparePersona->bind_param("i",$dni);
            $preparePersona->execute();
            $this ->idPersona = $preparePersona->insert_id;
        }    
            $preparePersonaInvolucrada = $con->prepare( "INSERT INTO personasinvolucradas(idDemanda, idPersona, idParentesco, demandante, alumno) VALUES (?, ?, ?, ?, ?)");
            $preparePersonaInvolucrada-> bind_param("iiiii",$idDemanda,$this->idPersona, $idParentesco, $demandante,$alumno);
            echo($preparePersonaInvolucrada->error); 
            if ($preparePersonaInvolucrada->execute()) {
                if ($alumno) {
                    $this->idPersonaInvolucrada = $con->insert_id;
                    $prepareAlumno = $con -> prepare("INSERT INTO alumnosdetalles (idPersonaInvolucrada, grado, turno, docente) VALUES (?,?,?,?)");
                    $prepareAlumno->bind_param("isss", $this->idPersonaInvolucrada,$grado, $turno, $docente );
                    $prepareAlumno->execute();
                }
                $con-> close();
                return true;
            }else{
                echo("hola");
            }
        
        echo($con->error);
        $con->close();
        return false;
    }

    public function obtenerPersonasInvolucradas($idDemanda){
        $con = new Conexion();
        $preparePersonasInvolucradas = $con->prepare("SELECT p.nombrePersona,p.dniPersona ,parentesco.nombreParentesco, personasinvolucradas.idPersonaInvolucrada, personasinvolucradas.demandante,  personasinvolucradas.alumno 
        FROM personasinvolucradas 
        INNER JOIN personas p ON p.idPersona = personasinvolucradas.idPersona
        LEFT JOIN alumnosdetalles ON   
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
