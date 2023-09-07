<?php

include_once "../conexion/Conexion.php";

class PersonasInvolucradas {
    
    private $idPersona;
    private $idParentesco;
    private $idPersonaInvolucrada;


    public function crearPersonaInvolucrada($idDemanda, $nombre, $dni, $roles, $idParentesco ,$demandante,$telefono, $domicilio, $correo):bool{
            $con = new Conexion();
            $queryPersona = "SELECT  idPersona FROM personas WHERE dniPersona = $dni";
            $resultado = $con ->query($queryPersona);
            if ($resultado -> num_rows == 0  ){
                $query = "INSERT INTO personas(nombrePersona, dniPersona) VALUES ('$nombre', $dni)";
                if ($con -> query($query)) {
                    $this -> idPersona = $con ->insert_id;
                    $con->query( "INSERT INTO telefonos (idPersona, numeroTelefono) VALUES ($this->idPersona,$telefono)");
                    $con->query("INSERT INTO telefonos (idPersona, numeroTelefono) VALUES ($this->idPersona,$domicilio)");
                    $con->query( "INSERT INTO telefonos (idPersona, numeroTelefono) VALUES ($this->idPersona,$correo)");
                }
            }else {
                while ($row = $resultado->fetch_assoc()) {
                    $this->idPersona =  $row["idPersona"];
                }
            }

            $idParentescoValue = $idParentesco ? $idParentesco : "NULL";
            $queryCrearPersonaInvolucrada = "INSERT INTO personasinvolucradas(idDemanda, idPersona, idParentesco,demandante) VALUES ($idDemanda, $this->idPersona, $idParentescoValue, $demandante)";
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

    public function obtenerPersonasInvolucradas($idDemanda){
        $con = new Conexion();
        $query = "SELECT p.nombrePersona, parentesco.nombreParentesco, personasinvolucradas.idPersonaInvolucrada, personasinvolucradas.demandante ,CONCAT(
            '[', 
            GROUP_CONCAT(
                CONCAT(
                '{\"idRol\":', roles.idRol, ',',
                '\"nombreRol\":\"', roles.nombreRol, '\"}'
            )
            ),
            ']'
        ) as rolesPersona 
        FROM personasinvolucradas 
        INNER JOIN personas p ON p.idPersona = personasinvolucradas.idPersona 
        INNER JOIN rolespersonas ON rolespersonas.idPersonaInvolucrada = personasinvolucradas.idPersonaInvolucrada 
        INNER JOIN roles ON roles.idRol = rolespersonas.idRol 
        LEFT JOIN parentesco ON parentesco.idParentesco = personasinvolucradas.idParentesco 
        WHERE personasinvolucradas.idDemanda = $idDemanda GROUP BY p.nombrePersona, parentesco.nombreParentesco";
        $resultado = $con ->query($query);
        $datos=[];
        if ($resultado ->num_rows > 0) {
            while ($row = $resultado ->fetch_assoc()) {
                $row['rolesPersona'] = json_decode($row['rolesPersona'], true);
                $datos[]=$row; 
            }
        }
        return  $datos;
    }


}
