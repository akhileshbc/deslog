<?php

class Course {
    
    public $courseId;
    public $courseTitle;
    public $startingDate;
    public $trainingLocation;
    public $cost;
    public $duration;
    public $status;
    public $seatTaken;
    public $seatAvail;
    // Load the source image
    public $image;
    
    public function init($r){
        //$r = (array) $obj;
        $this->courseId = $r->courseId;
        $this->courseTitle = $r->courseTitle;
        $this->startingDate = $r->startingDate;
        $this->trainingLocation =$r->trainingLocation;
        $this->cost = $r->cost;
        $this->duration = $r->duration;
        $this->status = $r->status;
        $this->seatTaken = $r->seatTaken;
        $this->seatAvail = $r->seatAvail;
        $this->image = imagecreatefromjpeg($r->image);
    }

    public function __construct( $courseId = '',$courseTitle = '', $startingDate = '', 
            $trainingLocation = '', $cost = '', $duration = '',$status = '', $seatTaken = '', $seatAvail = '',
            $image = '') {
        $this->courseId = $courseId;
        $this->courseTitle = $courseTitle;
        $this->startingDate = $startingDate;
        $this->trainingLocation = $trainingLocation;
        $this->cost = $cost;
        $this->duration = $duration;
        $this->status = $status;
        $this->seatTaken = $seatTaken;
        $this->seatAvail = $seatAvail;
        $this->image = imagecreatefromjpeg($image);
    }

} 