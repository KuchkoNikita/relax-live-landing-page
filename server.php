<?php
sleep(3);

$input = json_decode(file_get_contents("php://input"), true);
if(!empty($input)){
    if(empty($input['name'])){
        echo '';
    } else {
        echo $input['name'].',';
    }
}