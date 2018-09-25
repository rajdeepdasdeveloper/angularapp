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
    public $login_date;
 
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

         $user_status = "1";

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
}   

?>