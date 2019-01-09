<?php
// required headers
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Url Config
include_once '../../config/urlConfig.php'; // $domain_url // $api_url

// Get database connection
include_once '../../config/database.php';
 
// Get person object
include_once '../../objects/person.php';

$database = new Database();
$db = $database->getConnection();
 
$person = new Person($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->username) && empty($data->spam_protection)){

    // set product property values
    $person->username = $data->username;

    if($person->userStatusCheck()){
        echo '{';
            echo '"message": "3"'; // User account already active
        echo '}';
        die();
    }
    else{
        if(!$person->userStatusCheck()){
            if($person->sendActivisionCode()){
                echo '{';
                    echo '"message": "1"'; // Success
                echo '}';
            }
            else{
                echo '{';
                    echo '"message": "0"'; // Unsuccessful
                echo '}';
            }
        }
        else{
            echo '{';
                echo '"message": "0"'; // User already active
            echo '}';
        }
    }
}
else{
    header('Location: '. $domain_url);
}

?>