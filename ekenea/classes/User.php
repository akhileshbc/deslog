<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of User
 *
 * @author Imperial-lab
 */
class User {
    protected $firstName;
    protected $middleName;
    protected $lastName;
    protected $email;
    protected $phone;
    protected $username;
    protected $password;
    
    public function __construct($firstName ="", $middleName ="", $lastName = "",
            $email = "", $phone = "", $userName = "", $password = "") {
        $this->firstName = $firstName;
        $this->middleName = $middleName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->phone = $phone;
        $this->username = $userName;
        $this->password = $password;
        
    }
    
    public static function getPassword(){
        if(!$this->password){
            return $this->password;
        } 
               
        
    }
    
}
