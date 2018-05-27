<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Image
 *
 * @author Imperial-lab
 */
class Image {
    protected $image_url;
    protected $intro;
    
    public function __construct($intro, $image_url) {
        $this->image_url = $image_url;
        $this->intro = $intro;
        
    }

}
