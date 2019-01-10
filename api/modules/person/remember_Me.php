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

if(!empty($data->username) && !empty($data->token) && empty($data->spam_protection)){

    // set product property values
    $person->username = $data->username;
    $person->token = $data->token;
    $person->last_login = time();

    if(!$person->usernameCheck()){
        echo '{';
            echo '"message": "2"'; // User not found
        echo '}';
        die();
    }
    else if($person->userStatusCheck()){
        $stmt = $person->getUserToken();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
            extract($row);
            $user_token = array(
                "user_token" => $user_token,
            );
        }
        if($person->token == $user_token['user_token']){ 

            $token = $user_token['user_token'];

            session_start();
            if(isset($_SESSION["username"]) || isset($_SESSION["token"])){
                session_destroy();
            }
            $_SESSION["username"] = $person->username;
            $_SESSION["token"] = $user_token['user_token'];

            if($_SESSION["username"] && $_SESSION["token"]){
                echo '{';
                    echo '"message": "1"'; // Auto login success
                echo '}';
                // SET LAST LOGIN
                 $person->setLastLogin();
            }
            else{
                echo '{';
                    echo '"message": "0"'; // Unsuccessful (Server Problem)
                echo '}';
                die();
            }
        }
        else{
            echo '{';
                echo '"message": "0"'; // Login Failed
            echo '}';
            die();
        }
    }
    else{
        echo '{';
            echo '"message": "0"'; // Unsuccessful (Server Problem)
        echo '}';
        die();
    }
}
else{
    header('Location: '. $domain_url);
}

?>