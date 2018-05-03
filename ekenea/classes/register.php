<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of register
 *
 * @author Imperial-lab
 */
require_once 'User.php';
class register {
    protected static $users;
    protected static function init() {
        $user = array();
         
        
        array_push($user, new User('leonard', 'ugbana', 'ekene', 'senenerst@gmail.com', '08066607729', 'ugbanawaji'));
        
        
        self::$users = $user;
    }

    public static function getUser() {
        if (count(self::$users) === 0) {
            self::init();
        }
        return self::$users;
    }
   

   

    
}
