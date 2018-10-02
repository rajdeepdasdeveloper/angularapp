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

$person->username = $data->username;

$stmt = $person->getBasicData();

if($stmt){
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
    	extract($row);
        $person_details = array(
            "username" => $username,
            "firstname" => $first_name,
            "lastname" => $last_name
        );
   	}
}

if(!empty($data->username) && !empty($data->token)){
	session_start();
    if($_SESSION["username"] == $data->username && $_SESSION["token"] == $data->token){
    	echo '{';
            echo '"message": {'; 
                echo '"username": "' . $person_details["username"] . '",';
                echo '"firstname": "' . $person_details["firstname"] . '",';
                echo '"lastname": "' . $person_details["lastname"] . '"';
            echo '}';
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

?>