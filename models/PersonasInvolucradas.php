<?php

include_once "../conexion/Conexion.php";

class PersonasInvolucradas {
    
    private $idPersona;

    private $idPersonaInvolucrada;

    public function crearPersonaInvolucrada($idDemanda, $nombre, $dni,$demandante ,$alumno,   $idParentesco ,$telefono, $domicilio,$idLocalidad , $grado, $turno, $docente ){
        try {
            $con = new Conexion();
            $query = "INSERT INTO personas(nombrePersona, dniPersona) VALUES (?, ?)";
            $prepare = $con->prepare($query);
            $prepare-> bind_param("si",$nombre, $dni);
            if ($prepare -> execute()) {
                $this -> idPersona = $con ->insert_id;
                $patternPhone = "/^\+\d{2} \(\d{3}\) \d{3}-\d{4}$/";

                if ($telefono && preg_match_all($patternPhone,$telefono)) {
                    $preparePhone = $con->prepare("INSERT INTO telefonos (idPersona, numeroTelefono) VALUES (?,?)");      
                    $preparePhone->bind_param("is",$this->idPersona,$telefono);
                    $preparePhone->execute();
                }
                
                if ($domicilio && $idLocalidad) {
                    $prepareAddress = $con->prepare( "INSERT INTO domicilios (idPersona, direccionDomicilio, idLocalidad) VALUES (?,?,?)");
                    $prepareAddress->bind_param("isi",$this->idPersona, $domicilio, $idLocalidad);
                    $prepareAddress->execute();
                }
                
            }else{
                $preparePersona = $con ->prepare("SELECT idPersona FROM personas WHERE dniPersona = ? ");
                $preparePersona->bind_param("i",$dni);
                $preparePersona->execute();
                $resultado = $preparePersona ->get_result();
                while ($row = $resultado->fetch_assoc()) {
                    $this ->idPersona = $row["idPersona"];
                }
            }
            $idParentesco = $idParentesco ?? "NULL";
            $preparePersonaInvolucrada = $con->prepare( "INSERT INTO personasinvolucradas(idDemanda, idPersona, idParentesco, demandante, alumno) VALUES (?, ?, $idParentesco, ?, ?)");
            $preparePersonaInvolucrada-> bind_param("iiii",$idDemanda,$this->idPersona, $demandante,$alumno);
            echo($preparePersonaInvolucrada->error); 
            if ($preparePersonaInvolucrada->execute()) {
                if ($alumno) {
                    $this->idPersonaInvolucrada = $con->insert_id;
                    $prepareAlumno = $con -> prepare("INSERT INTO alumnosdetalles (idPersonaInvolucrada, idGrado, idTurno, docente) VALUES (?,?,?,?)");
                    $prepareAlumno->bind_param("iiis", $this->idPersonaInvolucrada,$grado, $turno, $docente );
                    $prepareAlumno->execute();
                }
                $con-> close();
                return true;
            } 
        }
        catch (Exception $e) {
            echo json_encode(["error"=> $e->getMessage()]);
            http_response_code($e->getCode());
            $con->close();
            return false;
        }
    }

    public function obtenerPersonasInvolucradas($idDemanda){
        try {
            $con = new Conexion();
            $query = "SELECT personasinvolucradas.idPersonaInvolucrada, p.nombrePersona, p.dniPersona ,  personasinvolucradas.demandante,  personasinvolucradas.alumno , alumnosdetalles.idTurno, alumnosdetalles.idGrado, alumnosdetalles.docente, parentesco.nombreParentesco 
            FROM personasinvolucradas 
            INNER JOIN personas p ON p.idPersona = personasinvolucradas.idPersona
            LEFT JOIN alumnosdetalles ON  personasinvolucradas.idPersonaInvolucrada = alumnosdetalles.idPersonaInvolucrada 
            LEFT JOIN parentesco ON parentesco.idParentesco = personasinvolucradas.idParentesco 
            WHERE personasinvolucradas.idDemanda = ? ";
            if ($preparePersonasInvolucradas = $con->prepare($query)) {
                $preparePersonasInvolucradas ->bind_param("i", $idDemanda);
                if($preparePersonasInvolucradas->execute()){
                    $datos=[];
                    $resultado = $preparePersonasInvolucradas->get_result();
                    while ($row = $resultado ->fetch_assoc()) {
                        $datos[]=$row;
                    }
                    $con -> close();
                    return  $datos;
                }
            }
            throw new Exception("Error al obtener las personas involucradas a la demanda");
        } catch (Exception $e) {
            
            
        }
    }


}
