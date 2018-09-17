<?php
class Database{
 
    // Database credentials
    private $host = "localhost";
    private $db_name = "nickosys_angularapp";
    private $username = "nickosys_angular";
    private $password = "!@#123QWEqwe_";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>