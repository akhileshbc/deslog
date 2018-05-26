<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DeslogSms
 *
 * @author Imperial-lab
 */
class DeslogSms {
    protected $recipientNumber;
    protected $recipientMessage;
    protected $visitUs;
    
    protected $url = "http://www.deslogenergy.com";
    
    public function __construct($phone, $message, $visitUS = '') {
        if($visitUS == FALSE){
            $this->visitUs = $this->url;
        }else{
            $this->visitUs = $visitUS;
        }
       
    }
    function sendSms(){
         //sms sending route here
    }
}
