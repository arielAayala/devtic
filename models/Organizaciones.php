<?php


include_once "Profesionales.php";
include_once "../conexion/Conexion.php";


    class Organizaciones{

        static public function listarOrganizaciones($token){
            if (Profesionales::validarToken($token)) {
                $con = new Conexion();
                $query = "SELECT o.idOrganizacion, o.nombreOrganizacion, o.cueAnexo, o.direccionOrganizacion, l.nombreLocalidad, d.nombreDepartamento, t.numeroTelefonoOrganizacion, l.idLocalidad FROM organizaciones o INNER JOIN localidades l ON l.idLocalidad = o.idLocalidad INNER JOIN departamentos d ON d.idDepartamento = l.idDepartamento LEFT JOIN telefonosorganizacion t ON t.idOrganizacion = O.idOrganizacion" ;
                $datos = [];
                $resultado = $con -> query($query);
                if ($resultado -> num_rows > 0) {
                    while ($row = $resultado->fetch_assoc()) {
                        $datos[] = $row;
                    }
                }
                $con -> close();
                return $datos;
            }
            return false;
        }


        public function crearOrganizacion($token,$nombreOrganizacion, $dirreccionOrganizacion, $idLocalidad, $cueAnexo, $telefonoOrganizacion = null){
            try {
                if (Profesionales::validarToken($token)) {
                    $con = new Conexion();
                    $query = "INSERT INTO organizaciones(nombreOrganizacion, direccionOrganizacion, idLocalidad, cueAnexo) VALUES(?,?,?,?)";
                    $prepareCrearOrganizacion = $con -> prepare($query);
                    $prepareCrearOrganizacion->bind_param("ssii", $nombreOrganizacion, $dirreccionOrganizacion, $idLocalidad, $cueAnexo);
                    if ($prepareCrearOrganizacion->execute()) {
                        if(isset($telefonoOrganizacion)){
                            $idOrganizacion = $prepareCrearOrganizacion->insert_id;
                            $queryTelefono = "INSERT INTO telefonosOrganizacion(idOrganizacion, numeroTelefonoOrganizacion) VALUES (?,?)";
                            $prepareTelefono = $con -> prepare($queryTelefono);
                            $prepareTelefono->bind_param("is",$idOrganizacion, $telefonoOrganizacion);
                            if (!$prepareTelefono->execute()) {
                                throw new Exception("Error al guardar el telefono de la organizacion", 404);
                            }
                        }
                        $con ->close();
                        return true;
                    }
                    throw new Exception("Error al crear la organización", 404);
                }
                throw new Exception("Error al validar identidad", 401);
            } catch (Exception $e) {
                $con -> close();
                echo json_encode(array("error"=> $e->getMessage()));
                http_response_code($e->getCode());
            }
        }


        public function actualizarOrganizacion($token, $idOrganizacion ,$nombreOrganizacion, $dirreccionOrganizacion, $idLocalidad, $cueAnexo, $telefonoOrganizacion = null){
            try {
                if (Profesionales::validarToken($token)) {
                    $con = new Conexion();
                    $query = "UPDATE organizaciones SET 
                    nombreOrganizacion = ?, 
                    direccionOrganizacion = ?, 
                    idLocalidad = ?, 
                    cueAnexo = ?
                    WHERE idOrganizacion = $idOrganizacion";
                    $prepareCrearOrganizacion = $con -> prepare($query);
                    $prepareCrearOrganizacion->bind_param("ssii", $nombreOrganizacion, $dirreccionOrganizacion, $idLocalidad, $cueAnexo);
                    if ($prepareCrearOrganizacion->execute()) {
                        if(isset($telefonoOrganizacion)){
                            $queryTelefono = "UPDATE telefonosOrganizacion 
                            SET numeroTelefonoOrganizacion = ? 
                            WHERE idOrganizacion = $idOrganizacion";
                            $prepareTelefono = $con -> prepare($queryTelefono);
                            $prepareTelefono->bind_param("s", $telefonoOrganizacion);
                            if (!$prepareTelefono->execute()) {
                                throw new Exception("Error al guardar el telefono de la organizacion", 404);
                            }
                        }
                        $con ->close();
                        return true;
                    }
                    throw new Exception("Error al crear la organización", 404);
                }
                throw new Exception("Error al validar identidad", 401);
            } catch (Exception $e) {
                $con -> close();
                echo json_encode(array("error"=> $e->getMessage()));
                
            }
        }
    }