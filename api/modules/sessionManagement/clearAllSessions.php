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

if(true){
    session_start();
    if(session_destroy()){
    	echo '{';
            echo '"message": "1"'; // success
        echo '}';
    }
    else{
        echo '{';
            echo '"message": "2"'; // failure
        echo '}';
    }
}
else{
	header('Location: '. $domain_url);
}

?>