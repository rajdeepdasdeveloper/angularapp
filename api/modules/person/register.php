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

if(!empty($data->username) && !empty($data->password) && !empty($data->first_name) && !empty($data->last_name) && empty($data->spam_protection)){

    // set product property values
    $person->username = $data->username;
    $person->password = $data->password;
    $person->first_name = $data->first_name;
    $person->last_name = $data->last_name;
    $person->create_date = time();

    if($person->usernameCheck()){
        echo '{';
            echo '"message": "3"'; // Username already Exists
        echo '}';
        die();
    }
    else{
        if($person->register()){
            echo '{';
                echo '"message": "1"'; // Success
            echo '}';
        }
        // if unable to create the Person
        else{
            echo '{';
                echo '"message": "0"'; // Unsuccessful
            echo '}';
        }
    }
}
else{
    header('Location: '. $domain_url);
}

?>