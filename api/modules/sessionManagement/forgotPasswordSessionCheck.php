<?php  

// required headers
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Url Config
include_once '../../config/urlConfig.php'; // $domain_url // $api_url

// get posted data
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->usernameSession)){
	session_start();
    if($_SESSION){
		if($_SESSION[$data->usernameSession]){
        	echo '{';
                echo '"message": {'; 
                    echo '"username": "' . $_SESSION[$data->usernameSession] . '",';
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
	header('Location: '. $domain_url);
}

?>