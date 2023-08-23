<?php 

include_once "Profesionales.php";
include_once "../conexion/Conexion.php";


class Administradores extends Profesionales{

    public function crearProfesional($token, $nombre, $dni, $correo, $especialidad, $prioridad ){
        if ($datos = Profesionales::validarToken($token)) {           
            if ($datos->prioridadProfesional==1) {
                $con = new Conexion();
                $queryPersona = "INSERT INTO personas (dniPersona, nombrePersona) VALUES ($dni, '$nombre')";
                if ( $con -> query($queryPersona) ) {
                    $idPersona = $con -> insert_id;
                    $contrasenaEncriptada = password_hash(strval($dni), PASSWORD_DEFAULT);
                    $queryProfesional = "INSERT INTO profesionales (idPersona, idEspecialidad, correoProfesional, contrasenaProfesional, prioridadProfesional) VALUES ($idPersona, $especialidad, '$correo', '$contrasenaEncriptada', $prioridad )";
                    if ($con -> query($queryProfesional)) {
                        return true;
                    }else{
                        $queryBorrarPersona = "DELETE FROM personas where idPersona = $idPersona";
                        $con -> query($queryBorrarPersona);
                        return false;
                    }
                }
            }
        }
    }

    public function obtenerProfesionales($token){
        if ($datos = Profesionales::validarToken($token)) {
            if ($datos->prioridadProfesional==1) {
                $con = new Conexion;
                $query = "SELECT p.idProfesional, p.prioridadProfesional, especialidades.nombreEspecialidad, personas.nombrePersona, personas.dniPersona FROM  profesionales p INNER JOIN especialidades ON especialidades.idEspecialidad = p.idEspecialidad INNER JOIN personas ON p.idPersona = personas.idPersona" ;
                $datos = [];
                $resultado = $con -> query($query);
                if ($resultado -> num_rows > 0) {
                    while ($row = $resultado->fetch_assoc()) {
                        $datos[] = $row;
                    }
                }
                return $datos;
            }
        }
    }

}