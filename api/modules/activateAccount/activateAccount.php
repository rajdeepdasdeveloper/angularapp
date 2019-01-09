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

if(!empty($data->username) && empty($data->spam_protection) && !empty($data->activisionCode)){

    // set product property values
    $person->username = $data->username;
    $person->activisionCode = $data->activisionCode;

    if($person->usernameCheck()){
        $stmt = $person->getActivisionCode();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
                extract($row);
                $activisionCode = array(
                    "activision_code" => $activision_code,
                );
            }
        if(!$person->userStatusCheck()){
            if( $activisionCode['activision_code'] == $person->activisionCode){
                if($person->updateUserActivisionStatus()){
                    echo '{';
                        echo '"message": "1"'; // Activision Successful
                    echo '}';
                }
                else{
                    echo '{';
                        echo '"message": "4"'; // Server Error
                    echo '}';
                }
            }
            else{
                echo '{';
                    echo '"message": "0"'; // Invalid Activision Code
                echo '}';
            }
        }
        else{
            echo '{';
                echo '"message": "2"'; // Username is Already Active
            echo '}';
        }
    }
    else{
        echo '{';
            echo '"message": "3"'; // Username Doesnt Exists
        echo '}'; 
    }
}
else{
    header('Location: '. $domain_url);
}

?>