<?php

$salt_characters = "!@#$%^&*()_+}{?1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

$password = $salt_characters .  "PASSWOrd";

$hash = password_hash($password, PASSWORD_BCRYPT, array('cost' => 11));

echo $hash;

if(password_verify($salt_characters . $password, $hash)){
	echo "valid";
}
else{
	echo "invalid";
}

?>