<?php  

// required headers
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get posted data
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->username) && !empty($data->token)){
	session_start();
    if(isset($_SESSION["username"]) &&  isset($_SESSION["token"])){
        if($_SESSION["username"] == $data->username && $_SESSION["token"] == $data->token){
        	echo '{';
                echo '"message": "1"'; // Auth Success
            echo '}';
        }
        else{
        	echo '{';
                echo '"message": "0"'; // Auth Failed
            echo '}';
        }
    }
    else{
        echo '{';
            echo '"message": "0"'; // Auth Failed
        echo '}';
    }
}
else{
	echo '{';
        echo '"message": "0"'; // Auth Failed
    echo '}';
}

?>