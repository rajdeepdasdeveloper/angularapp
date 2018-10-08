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

// Clean String
function clean_string($string) {
	$bad = array("content-type","bcc:","to:","cc:","href");
	return str_replace($bad,"",$string);
}

// get posted data
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->username) && empty($data->spam_protection)){
	$person->username = mysql_real_escape_string($data->username);
	if($person->usernameCheck()){
		if($person->userStatusCheck()){
			$token = substr(str_shuffle("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_") , 0, 32);
			$stmt = $person->sendPasswordRecoveryLink($token);
			if($stmt){
				if($stmt = $person->getBasicData()){

					while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
				        // extract row
				        // this will make $row['name'] to
				        // just $name only
				    	extract($row);
				        $userBasicData = array(
				            "username" => $username,
				            "firstname" => $first_name,
				            "lastname" => $last_name
				        );
			   		}

			   		$email_message = "";
					$email_message .= "Dear, " . clean_string($userBasicData['firstname']) . " " . clean_string($userBasicData['lastname']) . "\n";
			        $email_message .= "Token: " . "\n";
			        $email_message .= $token;
			        $email_to = $userBasicData['username'];
			        $email_subject = "Password Recovery";
			        $headers = 'From: '. $domain_url ."\r\n".
			        'Reply-To: '. "angularapp.local" ."\r\n" .
			        'X-Mailer: PHP/' . phpversion();
			        if(@mail($email_to, $email_subject, $email_message, $headers)){
			            echo '{';
	            			echo '"message": "1"'; // Successful
			       		echo '}';
			       		die();
			        }
			        else{
			        	echo '{';
	            			echo '"message": "' . $person->username .  '"'; // Unsuccessful (Server Problem)
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
				echo '{';
	            	echo '"message": "0"'; // Unsuccessful (Server Problem)
	       		echo '}';
	       		die();
			}
		}
		else{
			echo '{';
        		echo '"message": "3"'; // User is inactive (Server Problem)
	   		echo '}';
	   		die();
		}
	}
	else{
		echo '{';
	            			echo '"message": "' . $person->username .  '"'; // Unsuccessful (Server Problem)
			       		echo '}';
			       		die();
	}
}
else{
   header('Location: '. $domain_url);
}

?>