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

if(!empty($data->username) && !empty($data->password) && empty($data->spam_protection)){

    // set product property values
    $person->username = $data->username;
    $person->password = $data->password;
    $person->last_login = time();

    $stmt = $person->loginAuth();
    if(!$person->usernameCheck()){
        echo '{';
            echo '"message": "2"'; // Login Failed
        echo '}';
        die();
    }
    else if($stmt && $person->usernameCheck()){
    	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        	extract($row);
	        $person_details = array(
	            "uid" => $uid,
	            "username" => $username,
	            "password" => $password,
                "salt_value" => $salt_value,
                "user_status" => $user_status,
                "is_admin" => $is_admin
	        );
       	}

        function password_Decrypt($password, $salt, $papper, $password_hash){
            $salt_papper_hash =  $salt . $password  . $papper;
            if(password_verify($salt_papper_hash, $password_hash)){
                return true;
            }
            else{
                return false;
            }
        }

        if($person_details['is_admin'] == "1"){
            echo '{';
                echo '"message": "1"'; // Is Admin No Access
            echo '}';
            die();
        }
        else if($person_details['user_status'] == "0"){
            echo '{';
                echo '"message": "0"'; // Inactive User
            echo '}';
            die();
        }
        else if($person_details['username'] == $person->username && password_Decrypt($person->password, $person_details['salt_value'], "!@#$%^&*()", $person_details['password'])){ // Success

            $token = substr(str_shuffle("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_") , 0, 32);

            session_start();
            if(isset($_SESSION["username"]) && isset($_SESSION["token"])){
                unset($_SESSION['username']);
                unset($_SESSION['token']);
                session_destroy();
            }
            $_SESSION["username"] = $person_details['username'];
            $_SESSION["token"] = $token;

            if($_SESSION["username"] && $_SESSION["token"]){
                $person->setUserToken($_SESSION["username"], $_SESSION["token"]);
                echo '{';
                    echo '"message": {'; 
                        echo '"username": "' . $_SESSION["username"] . '",';
                        echo '"token": "' . $_SESSION["token"] . '"';
                    echo '}';
                echo '}';

                // SET LAST LOGIN
                 $person->setLastLogin();
            }
            else{
                echo '{';
                    echo '"message": "3"'; // Unsuccessful (Server Problem)
                echo '}';
                die();
            }
        }
        else{
            echo '{';
                echo '"message": "2"'; // Login Failed
            echo '}';
            die();
        }
    }
    else{
        echo '{';
            echo '"message": "3"'; // Unsuccessful (Server Problem)
        echo '}';
        die();
    }
}
else{
    header('Location: '. $domain_url);
}

?>