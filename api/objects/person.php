<?php
class Person{
 
    // Database connection and table name
    private $conn;
    private $table_name = "fe_users";
    private $salt_characters = "!@#$%^&*()_+}{?1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private $papper_characters = "!@#$%^&*()";
    private $password_hash;
 
    // Object properties
    public $username;
    public $password;
    public $first_name;
    public $last_name;
    public $create_date;
 
    // Constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // if Username already Exists
    function usernameCheck(){
        $query = "SELECT `username` FROM `fe_users` WHERE `username` = ?";
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
                username=:username, password=:password, first_name=:first_name, last_name=:last_name, create_date=:create_date, salt_value=:salt_value";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->password=htmlspecialchars(strip_tags($this->password));
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->create_date=htmlspecialchars(strip_tags($this->create_date));
        
        // Salt Papper BCRYPT Hashing
        $this->password_hash = str_shuffle($this->salt_characters) . $this->password . $this->papper_characters;
        $this->password_hash = password_hash($this->password_hash, PASSWORD_BCRYPT, array('cost' => 11));

        // bind values
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password", $this->password_hash);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":create_date", $this->create_date);
        $stmt->bindParam(":salt_value", str_shuffle($this->salt_characters));
     
        // execute query
        if($stmt->execute()){
            return true;
        }
        else{
            return false;
        }
    }

}

?>