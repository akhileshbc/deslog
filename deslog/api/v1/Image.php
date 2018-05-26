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
    protected $upload_time;
    protected $id;
    public function __construct($image_url, $intro, $upload_time="", $id="") {
        $this->image_url = $image_url;
        $this->intro = $intro;
        $this->upload_time = $upload_time;
        $this->id = $id;
    }

}
