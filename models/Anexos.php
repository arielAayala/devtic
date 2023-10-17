<?php

class Anexos{

    public function agregarAnexosNotas( $anexos ,int $idNota){
        foreach ($anexos as $i) {

            $dir = "anexosNotas";
            $nameFile = $idNota . "-" . $i["name"];
            $urlFile = $dir . "/" . $nameFile;
    
            if (move_uploaded_file($i["tmp_name"], $urlFile)) {
                echo "hola";
            }  
    }
    }

    public function agregarAnexosDemanda( int $idNota){
       
    }

}