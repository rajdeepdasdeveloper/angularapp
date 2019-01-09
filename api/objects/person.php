<?php
class Person{
 
    // Database connection and table name
    private $conn;
    private $table_name = "fe_users";
    private $salt_characters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
    private $papper_characters = "!@#$%^&*()";
    private $password_hash;
 
    // Object properties
    public $username;
    public $password;
    public $first_name;
    public $last_name;
    public $create_date;
    public $last_login;
    public $activisionCode;
 
    // Constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // if Username already Exists
    function usernameCheck(){
        $query = "SELECT `username` FROM " . $this->table_name . " WHERE `username` = ?";
        $query = str_replace("\'","",$query);
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(1, $this->username);
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return true;
        }
        else{
            return false;
        }
    }

    // User Status check
    function userStatusCheck(){
        $query = "SELECT `user_status` FROM " . $this->table_name . " WHERE `username` = ?";
        $query = str_replace("\'","",$query);
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(1, $this->username);
        // execute query
        if($stmt->execute()){
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                // extract row
                // this will make $row['name'] to
                // just $name only
                extract($row);
                $userStatus = array(
                    "user_status" => $user_status,
                );
            }
            if($userStatus['user_status']=="1"){
                return true;
            }
            else if($userStatus['user_status']=="0"){
                return false;
            }
        }
        else{
            return false;
        }
    }

    // Registration
    function register(){

        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . "
            SET
                username=:username, password=:password, first_name=:first_name, last_name=:last_name, create_date=:create_date, salt_value=:salt_value, user_status=:user_status";
        $query = str_replace("\'","",$query);
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->password=htmlspecialchars(strip_tags($this->password));
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->create_date=htmlspecialchars(strip_tags($this->create_date));
        
        // Salt Papper BCRYPT Hashing
        $random_salt = substr(str_shuffle($this->salt_characters), 0, 15);
        $this->password_hash = $random_salt . $this->password . "!@#$%^&*()";
        $this->password_hash = password_hash($this->password_hash, PASSWORD_BCRYPT, array('cost' => 11));

        // All user status is ACTVIE for now

        $user_status = "0";

        // bind values
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password", $this->password_hash);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":create_date", $this->create_date);
        $stmt->bindParam(":salt_value", $random_salt);
        $stmt->bindParam(":user_status", $user_status);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
        else{
            return false;
        }
    }

    // Send Activision Code

    // Activate Account

    function sendActivisionCode(){
        $query = "UPDATE
                " . $this->table_name . "
            SET
                activision_code = :activision_code
            WHERE
                username = :username";
                
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $token = substr(str_shuffle("1234567890") , 0, 6);

        // bind values
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":activision_code", $token);
        
     
        // execute query
        if($stmt->execute()){
            $email_message = "";
            $email_message .= "Your Account Activision Code: " . "\n";
            $email_message .= $token;
            $email_to = $this->username;
            $email_subject = "Account Activision Code";
            $headers = 'From: '. "angularapp.dev.projects.nickosys.com" ."\r\n".
            'Reply-To: '. "angularapp.dev.projects.nickosys.com" ."\r\n" .
            'X-Mailer: PHP/' . phpversion();
            if(@mail($email_to, $email_subject, $email_message, $headers)){
                return true;
            }
        }
        else{
            return false;
        }
    }

    // Activate Account

    function activateAccount(){
        $query = "UPDATE
                " . $this->table_name . "
            SET
                first_name = :first_name, last_name = :last_name
            WHERE
                username = :username";
                
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->password=htmlspecialchars(strip_tags($this->password));

        // Salt Papper BCRYPT Hashing
        $random_salt = substr(str_shuffle($this->salt_characters), 0, 15);
        $this->password_hash = $random_salt . $this->password . "!@#$%^&*()";
        $this->password_hash = password_hash($this->password_hash, PASSWORD_BCRYPT, array('cost' => 11));
        
        // bind values
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password_hash", $this->password_hash);
        $stmt->bindParam(":salt_value", $random_salt);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
        else{
            return false;
        }
    }

    // LOG IN
    function loginAuth(){
        $query = "SELECT * FROM " . $this->table_name . " WHERE `username` = ?" ; 
        $query = str_replace("\'","",$query);
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(1, $this->username);
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return $stmt;
        }
        else{
            return false;
        }
    }

    // UPDATE BASIC SETTINGS (firstname and lastname)
    function updateBasicSettings(){
        $query = "UPDATE
                " . $this->table_name . "
            SET
                first_name = :first_name, last_name = :last_name
            WHERE
                username = :username";
        $query = str_replace("\'","",$query);
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->username=htmlspecialchars(strip_tags($this->username));
        
        // bind values
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":username", $this->username);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
        else{
            return false;
        }
    }

    // UPDATE PASSWORD SETTINGS (Password)
    function updatePasswordSettings(){
        $query = "UPDATE
                " . $this->table_name . "
            SET
                password = :password_hash, salt_value = :salt_value
            WHERE
                username = :username";
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->password=htmlspecialchars(strip_tags($this->password));

        // Salt Papper BCRYPT Hashing
        $random_salt = substr(str_shuffle($this->salt_characters), 0, 15);
        $this->password_hash = $random_salt . $this->password . "!@#$%^&*()";
        $this->password_hash = password_hash($this->password_hash, PASSWORD_BCRYPT, array('cost' => 11));
        
        // bind values
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password_hash", $this->password_hash);
        $stmt->bindParam(":salt_value", $random_salt);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
        else{
            return false;
        }
    }

    function setLastLogin(){
        // query to insert record
        $query = "UPDATE
                " . $this->table_name . "
            SET
                last_login = :last_login 
            WHERE
                username = :username";
        $query = str_replace("\'","",$query);
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->last_login=htmlspecialchars(strip_tags($this->last_login));
        $this->username=htmlspecialchars(strip_tags($this->username));
        
        // bind values
        $stmt->bindParam(":last_login", $this->last_login);
        $stmt->bindParam(":username", $this->username);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
        else{
            return false;
        }
    }

    // GET BASIC DATA 
    function getBasicData(){
        $query = "SELECT * FROM " . $this->table_name . " WHERE `username` = ?" ; 
        $query = str_replace("\'","",$query);
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(1, $this->username);
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return $stmt;
        }
        else{
            return false;
        }
    }

    // Send password link for forgot password
    function sendPasswordRecoveryLink($settingsToken){
        
        $query = "UPDATE
                " . $this->table_name . "
            SET
                settings_token = :settings_token
            WHERE
                username = :username";

        $stmt = $this->conn->prepare($query);

        // bind values
        $stmt->bindParam(":settings_token", $settingsToken);
        $stmt->bindParam(":username", $this->username);

        // execute query
        if($stmt->execute()){
            return true;
        }
        else{
            return false;
        }     
    }

    // UPDATE USER ACTIVISION STATUS 
    function updateUserActivisionStatus(){
        // query to insert record
        $query = "UPDATE
                " . $this->table_name . "
            SET
                user_status = :user_status 
            WHERE
                username = :username";
        $query = str_replace("\'","",$query);
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        $this->username=htmlspecialchars(strip_tags($this->username));
        
        $user_status = "1";
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":user_status", $user_status);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
        else{
            return false;
        }
    }

    // GET ACTIVISION CODE
    function getActivisionCode(){
        $query = "SELECT `activision_code` FROM " . $this->table_name . " WHERE `username` = ?" ; 
        $query = str_replace("\'","",$query);
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(1, $this->username);
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return $stmt;
        }
        else{
            return false;
        }
    }

    // GET SALT VALUE AND PASSWORD
    function getAuthValue(){
        $query = "SELECT `salt_value`, `password` FROM " . $this->table_name . " WHERE `username` = ?" ; 
        $query = str_replace("\'","",$query);
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(1, $this->username);
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return $stmt;
        }
        else{
            return false;
        }
    }
}   

?>