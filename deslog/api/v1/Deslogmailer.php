<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Deslogmailer
 *
 * @author Imperial-lab
 */
class Deslogmailer {

    protected $toEmail;// = 'youremail@site.com';
    protected $EmailSubject;// = 'Thanks for signingup';
    protected $mailheader;// = "From: " . $_POST["email"] . "\r\n";
    protected $mailheader;// .= "Reply-To: " . $_POST["email"] . "\r\n";
    protected $mailheader;// .= "Content-type: text/html; charset=iso-8859-1\r\n";
    protected $MESSAGE_BODY;// = "Name: " . $_POST["name"] . "";
    protected $MESSAGE_BODY;// .= "Email: " . $_POST["email"] . "";
    protected $MESSAGE_BODY;// .= "Comment: " . nl2br($_POST["comment"]) . "";
    protected $phone;
    protected $DeslogSms;
    protected $message;
    public function __construct( $toMail, $phone ) {
        require_once './DeslogSms.php';
        $this->toEmail = $toMail;
        $from = "senenerst@gmai.com"; 
        $this->mailheader = "From: " .$from."\r\n";
        $this->mailheader .= "Reply-To: " .$from."\r\n";
        $this->mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n";
        //$this->MESSAGE_BODY = ;
        $this->MESSAGE_BODY = $toMail;
        $this->DeslogSms = new DeslogSms($this->phone, $this->message);
        
   }
    function sendMail($recipientName, $message, $recipientEmailAddress = ''){
        if($recipientName == FALSE){
            return 1;
        }else{
            $this->MESSAGE_BODY = "Name:" .$recipientName . "";
            
        }
        if($recipientEmailAddress == TRUE){
            $this->MESSAGE_BODY .= "Email: " . $recipientEmailAddress . "";
        }
        if($message == FALSE){
            return 2;
        }  else {
            $this->MESSAGE_BODY .= "Content:" . $message . "";
            $this->message = $message;
        }
        
       $retval = mail($this->toEmail, $this->EmailSubject, $this->MESSAGE_BODY, $this->mailheader);
         if( $retval == true ) {
            return "success";
         }else {
            return "failed";
         }
         $this->DeslogSms->sendSms();
    }
    

}
