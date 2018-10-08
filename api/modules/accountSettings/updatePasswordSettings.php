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

if(!empty($data->username) && !empty($data->token) && !empty($data->oldPassword) && !empty($data->newPassword) && empty($data->spam_protection)){
	$person->username = mysql_real_escape_string($data->username);
	$person->password = mysql_real_escape_string($data->newPassword);
	$oldPassword = mysql_real_escape_string($data->oldPassword);
	session_start();
	if($_SESSION["username"] == $data->username && $_SESSION["token"] == $data->token && $person->usernameCheck()){
		$stmt = $person->getAuthValue();
		if($stmt){
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		        // extract row
		        // this will make $row['name'] to
		        // just $name only
		    	extract($row);
		        $authValue = array(
		            "salt_value" => $salt_value,
		            "password" => $password
		        );
		   	} 
		}
		else{
			echo '{';
            	echo '"message": "2"'; // Unsuccessful (Server Problem)
       		echo '}';
       		die();
		}

		if(password_Decrypt($oldPassword, $authValue['salt_value'], "!@#$%^&*()", $authValue['password'])){
			if($person->updatePasswordSettings()){
				echo '{';
            		echo '"message": "1"'; // Successfull
        		echo '}';
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
            	echo '"message": "3"'; // Wrong Password
        	echo '}';
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
	header('Location: '. $domain_url);
}

?>