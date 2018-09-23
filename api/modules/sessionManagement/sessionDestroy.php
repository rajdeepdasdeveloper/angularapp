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
    if($_SESSION["username"] == $data->username && $_SESSION["token"] == $data->token){
        unset($_SESSION["username"]);
        unset($_SESSION["token"]);
        session_destroy();
    	echo '{';
            echo '"message": "1"'; // User logout success
        echo '}';
    }
    else{
        session_destroy();
    	echo '{';
            echo '"message": "1"'; // User logout success
        echo '}';
    }
}
else{
	echo '{';
        echo '"message": "0"'; // User logout Failed
    echo '}';
}

?>