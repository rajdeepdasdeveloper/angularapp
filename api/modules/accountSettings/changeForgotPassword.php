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

// PASSWORD DECRYPT CHECK
function password_Decrypt($password, $salt, $papper, $password_hash){
    $salt_papper_hash =  $salt . $password  . $papper;
    if(password_verify($salt_papper_hash, $password_hash)){
        return true;
    }
    else{
        return false;
    }
}

// get posted data
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->username) && !empty($data->recoveryCode) && !empty($data->newForgotPassword)){
	$person->username = $data->username;
	$person->password = $data->newForgotPassword;
	session_start();
    if($_SESSION){
        if($_SESSION["forgotPasswordUsername"] == $data->username && $_SESSION["settingsToken"] == $data->recoveryCode){
        	if($person->updatePasswordSettings()){
				echo '{';
            		echo '"message": "1"'; // Successfull
        		echo '}';
        		if($_SESSION){
			   		if($_SESSION["forgotPasswordUsername"] && $_SESSION["settingsToken"] && $_SESSION["settingsTokenAttempt"]){
			   			unset($_SESSION["forgotPasswordUsername"]);
				        unset($_SESSION["settingsToken"]);
				        unset($_SESSION["settingsTokenAttemt"]);
				        session_destroy();
				        die();
			   		}
			   	}
			}
			else{
				echo '{';
	            	echo '"message": "2"'; // Unsuccessful (Server Problem)
	       		echo '}';
	       		die();
			}
        }
        else{
        	echo '{';
                echo '"message": "0"'; // Auth Failed
            echo '}';
            die();
        }
    }
    else{
        echo '{';
            echo '"message": "0"'; // Auth Failed
        echo '}';
        die();
    }
}
else{
	header('Location: '. $domain_url);
}

?>