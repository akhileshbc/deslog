<?php
class Course {
    
    public $code;
    public $name;
    public $startDate;
    public $location;
    public $cost;
    public $status;
    public $seatTaken;
    public $seatAvail;

    public function __construct( $code = '',$name = '', $startDate = '', $location = '', $cost = '', $status = '', $seatTaken = '', $seatAvail = '') {
        $this->code = $code;
        $this->name = $name;
        $this->startDate = $startDate;
        $this->location = $location;
        $this->cost = $cost;
        $this->status = $status;
        $this->seatTaken = $seatTaken;
        $this->seatAvail = $seatAvail;
    }

} 