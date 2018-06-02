<?php

$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["lastname"] = $session['lastname'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'), $r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $user = $db->getOneRecord("select uid,lastname,password,email,created from customers_auth where phone='$email' or email='$email'");
    if ($user != NULL) {
        if (passwordHash::check_password($user['password'], $password)) {
            $response['status'] = "success";
            $response['message'] = 'Logged in successfully.';
            $response['lastname'] = $user['lastname'];
            $response['uid'] = $user['uid'];
            $response['email'] = $user['email'];
            $response['createdAt'] = $user['created'];
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $user['uid'];
            $_SESSION['email'] = $email;
            $_SESSION['lastname'] = $user['lastname'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    } else {
        $response['status'] = "error";
        $response['message'] = 'No such user is registered';
    }
    echoResponse(200, $response);
});
$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'lastname', 'password'), $r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $firstname = $r->customer->firstname;
    //$middlename = $r->customer->middlename;
    $lastname = $r->customer->lastname;
    $email = $r->customer->email;
    $phone = $r->customer->phone;
    //$sex = $r->customer->sex;
    $password = $r->customer->password;
    $isUserExists = $db->getOneRecord("select 1 from customers_auth where phone='$phone' and email='$email'");
    if (!$isUserExists) {
        $r->customer->password = passwordHash::hash($password);
        $tabble_name = "customers_auth";
        $column_names = array('firstname', 'middlename', 'lastname', 'email', 'phone', 'sex', 'password');
        $result = $db->insertIntoTable($r->customer, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["email"] = $email;
            $response["uid"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            $_SESSION['phone'] = $phone;
            $_SESSION['lastname'] = $lastname;
            $_SESSION['email'] = $email;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "An user with the provided phone or email exists!";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});
$app->post('/verifyPayment', function() use($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('reference'), $r->data->reference);
    require '../libs/src/autoload.php';
    $db = new DbHandler();
    $reference = $r->data->reference;
    //$course_code = $r->course_code;
    if (!$reference) {
        //die('No reference supplied');
        $response['staus'] = "error";
        $response['message'] = "It appears transaction was not successful";
        echoResponse(200, $response);
    }

    // initiate the Library's Paystack Object
    $secret_key = 'sk_test_acd79c3836e42aaa1b023304bd9de3064312c1bf';
    $paystack = new Paystack($secret_key);

    try {
        // verify using the library
        $tranx = $paystack->transaction->verify([
            'reference' => $reference
        ]);
    } catch (\Yabacon\Paystack\Exception\ApiException $e) {
        //print_r($e->getResponseObject());
        $response["status"] = "error";
        $response["message"] = "We could not verify your payment failed";
        $response["message2"] = $e->getMessage();
        $response["details"] = $e->getResponseObject();
        echoResponse(201, $response);
        die($e->getMessage());
    }

    if ('success' === $tranx->data->status) {
        $isRefExists = $db->getOneRecord("select 1 from customers_payment where reference='$reference'");
        if (!$isRefExists) {
            $tabble_name = "customers_payment";
            $payment = array();
            $transaction_id = $tranx->data->id;
            $verifierRef = $tranx->data->reference;
            $amount = $tranx->data->amount;
            $paid_time = $tranx->data->paid_at;
            $customer_email = $tranx->data->customer->email;
            $currency = $tranx->data->authorization->country_code;


            $payment["transaction_id"] = $transaction_id;
            $payment["reference"] = $verifierRef;
            $payment["amount"] = $amount;
            //2016-09-30T21:10:19.000Z
            $replacer = str_replace('T', ' ', $paid_time);
            $replace = trim(str_replace(['.', '0', 'Z'], '', $replacer));
            $payment["paid_time"] = $replace;
            $payment["customer_email"] = $customer_email;
            $payment["currency"] = $currency;
            $column_names = array('transaction_id', 'reference', 'amount', 'paid_time', 'customer_email', 'currency');
            if ($verifierRef == $reference) {
                $result = $db->insertIntoTable($payment, $column_names, $tabble_name);
                if ($result != NULL) {
                    $response["status"] = "success";
                    $response["message"] = "We've successfully verified your transaction. We would send you mail to that effect";
                    $response["course_id"] = $result;
                }
            } else {
                $response["status"] = "error";
                $response["message"] = "We could not successfully verified your transaction. We would send you mail to that effect";
                $response["course_id"] = $result;
            }
        } else {
            $response["status"] = "error";
            $response["message"] = "payment details already exists!";
            echoResponse(201, $response);
        }
        // transaction was successful...
        // please check other things like whether you already gave value for this ref
        // if the email matches the customer who owns the product etc
        // Give value
    }
});

$app->post('/registerCourse', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('courseTitle', 'cost'), $r->course);
    $courseTitle = $r->course->courseTitle;
    $trainingLocation = $r->course->trainingLocation;
    $tabble_name = "course";
    $column_names = array('courseTitle', 'startingDate', 'trainingLocation', 'cost', 'duration',
        'status', 'seatAvail', 'image');
    $db = new DbHandler();
    $isCourseExists = $db->getOneRecord("select 1 from course where courseTitle='$courseTitle' or trainingLocation='$trainingLocation'");
    if (!$isCourseExists) {
        $result = $db->insertIntoTable($r->course, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = $courseTitle . " course created successfully";
            $response["uid"] = $result;
            echoResponse(200, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "course already exists!";
        echoResponse(201, $response);
    }
});
$app->get('/getAllCourse', function() {
    $response = array();
    $db = new DbHandler();
    $table_name = "course";
    $isCourseExists = $db->getallRecord("select * from $table_name");
    if ($isCourseExists) {
        //$response["status"] = "success";
        //$response["message"] = "course is being shipped in now successfully";
        $response["data"] = $isCourseExists;
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = $table_name . "There's no course data to display";
        echoResponse(201, $response);
    }
});

$app->get('/bannerData', function() {
    $response = array();
    $db = new DbHandler();
    $table_name = "bannerimage";
    $getAllBanner = $db->getallRecord("SELECT * FROM $table_name");
    if ($getAllBanner) {
        //$response["status"] = "success";
        //$response["message"] = "course is being shipped in now successfully";
        $response["data"] = $getAllBanner;
        //$response["status"] = "success";
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = $table_name . "There's no course data to display";
        echoResponse(201, $response);
    }
});
$app->get('/whoweare', function() {
    $response = array();
    $db = new DbHandler();
    $table_name = "who_we_are";
    $getAllBanner = $db->getallRecord("SELECT * FROM $table_name");
    if ($getAllBanner) {
        //$response["status"] = "success";
        //$response["message"] = "course is being shipped in now successfully";
        $response["data"] = $getAllBanner;
        //$response["status"] = "success";
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = $table_name . "There's no course data to display";
        echoResponse(201, $response);
    }
});


$app->post('/deleteBanner', function() use ($app){
    $response = array();
    
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('id', 'image_url'), $r->data);
    $id = $r->data->id;
    $table_name = "bannerimage";
    //$table_name = "bannerimage";
     $db = new DbHandler();
//     $path = "/img/banner";
//$rdi = new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::KEY_AS_PATHNAME);
//foreach (new RecursiveIteratorIterator($rdi, RecursiveIteratorIterator::SELF_FIRST) as $file => $info) {
//    
//            $response["status"] = "success";
//            $response["data"] = $file;
//            echoResponse(200, $response);
//}
//     $dir = new DirectoryIterator(dirname(__FILE__));
//     foreach ($dir as $fileinfo) {
//        if (!$fileinfo->isDot()) {
//          //var_dump($fileinfo->getFilename());
//          $response["status"] = "success";
//          $response["data"] = $fileinfo->getFilename();
//          echoResponse(200, $response);
//        }
//     }
     //return;
    $deleteBanner = $db->deleteOneRecord($table_name, $id);
    if ($deleteBanner) {
        //$response["status"] = "success";
        
        
        $response["status"] = "success";
        $response["data"] = $deleteBanner;
        $response["message"] = "Banner with ID: $id is been deleted successfully";
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = $table_name . "There's no course data to display";
        echoResponse(201, $response);
    }
});
//####################################################################################
//                    service api calls here
//####################################################################################

$app->get('/servicedata', function() {
    $response = array();
    $db = new DbHandler();
    $table_name = "our_service";
    $getAllService = $db->getallRecord("SELECT * FROM $table_name");
    if ($getAllService) {
        $response["status"] = "success";
        $response["message"] = "course is being shipped in now successfully";
        $response["data"] = $getAllService;
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = $table_name . "There's no course data to display";
        echoResponse(201, $response);
    }
});
$app->post('/deleteService', function() use ($app){
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('serviceabout', 'id', 'servicetitle'), $r->data);
    $id = $r->data->id;
    $table_name = "our_service";
    $db = new DbHandler();
    $deleteService = $db->deleteOneRecord($table_name, $id);
    if ($deleteService) {
        $response["status"] = "success";
        $response["data"] = $deleteService;
        $response["message"] = "Service with ID: $id is been deleted successfully";
        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = $table_name. "doesn't contain the information you're trying to delete";
        echoResponse(201, $response);
    }
});
$app->post('/createservice', function() use ($app) {
    $response = array();
    $servicetitle = $_POST['servicetitle'];
    $servicepageurl = $_POST['servicepageurl'];
    $serviceabout =$_POST['serviceabout'];
    //$previousFileName = $_POST['filename'];
    //$id = $_POST['id'];
    if(isset($_FILES['image'])){
      $file_name = $_FILES['image']['name'];
      $file_size = $_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      $file_type=$_FILES['image']['type'];
      $tmp = explode('.', $file_name);
      $file_extension = end($tmp);
      $file_ext=strtolower($file_extension);
      
      $expensions= array("jpeg","jpg","png");
      
      if(in_array($file_ext,$expensions)=== false){
          $response["status"] = "error";
         $response["message"]="extension not allowed, please choose a JPEG or PNG file.";
         echoResponse(201, $response);
         
      }
      
      if($file_size > 2097152){
         $response["status"] = "error";
         $response["message"]='File size must be excately 2 MB';
         echoResponse(201, $response);
      }
      $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
      //warning! file name overwriten here 
      $file_name = sprintf('%s.%0.8s', $basename, $file_ext);
      //##############################################################
      //                db methods here
      //##############################################################
    $table_name = "our_service";
    $column_names = array('filename', 'serviceabout', 'servicepageurl',
        'servicetitle', 'edit');
    require_once './Image.php';
    //$image = new Image($attachment,$file_name);
    $edit = 0;
    $image = (object) array('filename' => $file_name, 'serviceabout' => $serviceabout,
        'servicepageurl' => $servicepageurl, 'servicetitle' =>$servicetitle,
        'edit' =>$edit);
    //$container['upload_directory'] = __DIR__ . '/uploads';
    $db = new DbHandler();
    $path = $_SERVER['DOCUMENT_ROOT'] . "/deslog/deslog/img/educare/";
    //$deleteService = $db->deleteOneRecord($tabble_name, $id);
    $isServiceExists = $db->getOneRecord("select 1 from ".$table_name." where filename='$file_name' or servicetitle = '$servicetitle'");
    //$deleteBanner = $db->deleteOneRecord($tabble_name, $id);
    //if($deleteService){
        if (!$isServiceExists) {
            $result = $db->insertIntoTable($image, $column_names, $table_name);
            if ($result != NULL) {
            
                move_uploaded_file($file_tmp, $path .$file_name);
                $response["status"] = "Success";
                $response["message"] = "Your file has been save successfully";
                echoResponse(200, $response);
            }else{
                $response["status"] = "error";
                $response["message"] = "requested action could not be completed. something technical but don't worry we're on it!";
                echoResponse(201, $response);
            }
        } else {
        $response["status"] = "error";
        $response["message"] = "it appears this banner already exist in this system!";
        echoResponse(201, $response);
        }
//    }else{
//        $response["status"] = "error";
//        $response["message"] = "There seems to be a problem with overwritting the previous file. Try again in awhile!";
//        echoResponse(201, $response);
//    }
 }
});
$app->post('/updateservice', function() use ($app) {
    $response = array();
    $servicetitle = $_POST['servicetitle'];
    $servicepageurl = $_POST['servicepageurl'];
    $serviceabout =$_POST['serviceabout'];
    $previousFileName = $_POST['image'];
    $id = $_POST['id'];
    if(isset($_FILES['image'])){
      $file_name = $_FILES['image']['name'];
      $file_size = $_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      //$file_type=$_FILES['image']['type'];
      $tmp = explode('.', $file_name);
      $file_extension = end($tmp);
      $file_ext=strtolower($file_extension);
      
      $expensions= array("jpeg","jpg","png");
      
      if(in_array($file_ext,$expensions)=== false){
          $response["status"] = "error";
         $response["message"]="extension not allowed, please choose a JPEG or PNG file.";
         echoResponse(201, $response);
         
      }
      
      if($file_size > 2097152){
         $response["status"] = "error";
         $response["message"]='File size must be excately 2 MB';
         echoResponse(201, $response);
      }
      $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
      //warning! file name overwriten here 
      $file_name = sprintf('%s.%0.8s', $basename, $file_ext);
      //##############################################################
      //                db methods here
      //##############################################################
    $tabble_name = "our_service";
    $column_names = array('filename', 'serviceabout', 'servicepageurl',
        'servicetitle', 'edit');
    require_once './Image.php';
    //$image = new Image($attachment,$file_name);
    $edit = "false";
    $image = (object) array('filename' => $file_name, 'serviceabout' => $serviceabout,
        'servicepageurl' => $servicepageurl, 'servicetitle' =>$servicetitle,
        'edit' =>$edit);
    //$container['upload_directory'] = __DIR__ . '/uploads';
    $db = new DbHandler();
    $path = $_SERVER['DOCUMENT_ROOT'] . "/deslog/deslog/img/educare/";
    $deleteService = $db->deleteOneRecord($tabble_name, $id);
    $isServiceExists = $db->getOneRecord("select 1 from ".$tabble_name." where image_url='$file_name' or intro = '$attachment'");
    //$deleteBanner = $db->deleteOneRecord($tabble_name, $id);
    if($deleteService){
        if (!$isServiceExists) {
            $result = $db->insertIntoTable($image, $column_names, $tabble_name);
            if ($result != NULL) {
            
                move_uploaded_file($file_tmp, $path .$file_name);
                $response["status"] = "Success";
                $response["message"] = "Your file has been save successfully";
                echoResponse(200, $response);
            }else{
                $response["status"] = "error";
                $response["message"] = "requested action could not be completed. something technical but don't worry we're on it!";
                echoResponse(201, $response);
            }
        } else {
        $response["status"] = "error";
        $response["message"] = "it appears this banner already exist in this system!";
        echoResponse(201, $response);
        }
    }else{
        $response["status"] = "error";
        $response["message"] = "There seems to be a problem with overwritting the previous file. Try again in awhile!";
        echoResponse(201, $response);
    }
 }
});
//###################################################################################
//              service api ends here
//###################################################################################
$app->post('/uploader', function() use ($app) {
    $response = array();
    $attachment = $_POST['intro'];
    if(isset($_FILES['image'])){
      $file_name = $_FILES['image']['name'];
      $file_size = $_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      $file_type=$_FILES['image']['type'];
      $tmp = explode('.', $file_name);
      $file_extension = end($tmp);
      $file_ext=strtolower($file_extension);
      
      $expensions= array("jpeg","jpg","png");
      
      if(in_array($file_ext,$expensions)=== false){
          $response["status"] = "error";
         $response["message"]="extension not allowed, please choose a JPEG or PNG file.";
         echoResponse(201, $response);
         
      }
      
      if($file_size > 2097152){
         $response["status"] = "error";
         $response["message"]='File size must be excately 2 MB';
         echoResponse(201, $response);
      }
      $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
      //warning! file name overwriten here 
      $file_name = sprintf('%s.%0.8s', $basename, $file_ext);
      //##############################################################
      //                db methods here
      //##############################################################
    $tabble_name = "bannerimage";
    $column_names = array('image_url', 'intro');
    require_once './Image.php';
    //$image = new Image($attachment,$file_name);
    $image = (object) array('image_url' => $file_name, 'intro' => $attachment);
    //$container['upload_directory'] = __DIR__ . '/uploads';
    $db = new DbHandler();
    $path = $_SERVER['DOCUMENT_ROOT'] . "/deslog/deslog/img/banner/";
    $isBannerExists = $db->getOneRecord("select 1 from bannerimage where image_url='$file_name' or intro = '$attachment'");
    if (!$isBannerExists) {
        $result = $db->insertIntoTable($image, $column_names, $tabble_name);
        if ($result != NULL) {
            
            move_uploaded_file($file_tmp, $path .$file_name);
            $response["status"] = "Success";
            $response["message"] = "Your file has been uploaded successfully";
            echoResponse(200, $response);
        }else{
            $response["status"] = "error";
            $response["message"] = "it appears something bad happened. you needn't worry, we're on it";
            echoResponse(201, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "course already exists!";
        echoResponse(201, $response);
    }
}
});
$app->post('/uploadupdatenow', function() use ($app) {
    $response = array();
    $attachment = $_POST['intro'];
    //$attachment = $_POST['intro'];
    $previousFileName = $_POST['image_url'];
    $id = $_POST['id'];
    if(isset($_FILES['image'])){
      $file_name = $_FILES['image']['name'];
      $file_size = $_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      $file_type=$_FILES['image']['type'];
      $tmp = explode('.', $file_name);
      $file_extension = end($tmp);
      $file_ext=strtolower($file_extension);
      
      $expensions= array("jpeg","jpg","png");
      
      if(in_array($file_ext,$expensions)=== false){
          $response["status"] = "error";
         $response["message"]="extension not allowed, please choose a JPEG or PNG file.";
         echoResponse(201, $response);
         
      }
      
      if($file_size > 2097152){
         $response["status"] = "error";
         $response["message"]='File size must be excately 2 MB';
         echoResponse(201, $response);
      }
      $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
      //warning! file name overwriten here 
      $file_name = sprintf('%s.%0.8s', $basename, $file_ext);
      //##############################################################
      //                db methods here
      //##############################################################
    $tabble_name = "bannerimage";
    $column_names = array('image_url', 'intro');
    require_once './Image.php';
    //$image = new Image($attachment,$file_name);
    $image = (object) array('image_url' => $file_name, 'intro' => $attachment);
    //$container['upload_directory'] = __DIR__ . '/uploads';
    $db = new DbHandler();
    $path = $_SERVER['DOCUMENT_ROOT'] . "/deslog/deslog/img/banner/";
    $deleteBanner = $db->deleteOneRecord($tabble_name, $id);
    $isBannerExists = $db->getOneRecord("select 1 from bannerimage where image_url='$file_name' or intro = '$attachment'");
    //$deleteBanner = $db->deleteOneRecord($tabble_name, $id);
    if($deleteBanner){
        if (!$isBannerExists) {
            $result = $db->insertIntoTable($image, $column_names, $tabble_name);
            if ($result != NULL) {
            
                move_uploaded_file($file_tmp, $path .$file_name);
                $response["status"] = "Success";
                $response["message"] = "Your file has been save successfully";
                echoResponse(200, $response);
            }else{
                $response["status"] = "error";
                $response["message"] = "requested action could not be completed. something technical but don't worry we're on it!";
                echoResponse(201, $response);
            }
        } else {
        $response["status"] = "error";
        $response["message"] = "it appears this banner already exist in this system!";
        echoResponse(201, $response);
        }
    }else{
        $response["status"] = "error";
        $response["message"] = "There seems to be a problem with overwritting the previous file. Try again in awhile!";
        echoResponse(201, $response);
    }
 }
});

$app->post('/updatebanner', function() use ($app) {
    $response = array();
    $attachment = $_POST['intro'];
    $previousFileName = $_POST['image_url'];
    $id = $_POST['id'];
    if(isset($_FILES['image'])){
      $file_name = $_FILES['image']['name'];
      $file_size = $_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      $file_type=$_FILES['image']['type'];
      $tmp = explode('.', $file_name);
      $file_extension = end($tmp);
      $file_ext=strtolower($file_extension);
      
      $expensions= array("jpeg","jpg","png");
      
      if(in_array($file_ext,$expensions)=== false){
          $response["status"] = "error";
         $response["message"]="extension not allowed, please choose a JPEG or PNG file.";
         echoResponse(201, $response);
         
      }
      
      if($file_size > 2097152){
         $response["status"] = "error";
         $response["message"]='File size must be excately 2 MB';
         echoResponse(201, $response);
      }
      $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
      //warning! file name overwriten here 
      $file_name = sprintf('%s.%0.8s', $basename, $file_ext);
      //##############################################################
      //                db methods here
      //##############################################################
    $tabble_name = "bannerimage";
    $column_names = array('image_url', 'intro');
    require_once './Image.php';
    //$image = new Image($attachment,$file_name);
    $image = (object) array('image_url' => $file_name, 'intro' => $attachment);
    //$container['upload_directory'] = __DIR__ . '/uploads';
    $db = new DbHandler();
    $path = $_SERVER['DOCUMENT_ROOT'] . "/deslog/deslog/img/banner/";
    $isBannerExists = $db->getOneRecord("select 1 from bannerimage where image_url='$file_name' or intro = '$attachment' or id='$id'");
    if ($isBannerExists) {
        $result = $db->updateTable($image, $column_names, $tabble_name, $id);
        if ($result != NULL) {
            
            move_uploaded_file($file_tmp, $path .$file_name);
            $response["status"] = "Success";
            $response["message"] = "Your file has been save successfully";
            echoResponse(200, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "course already exists!";
        echoResponse(201, $response);
    }
      
//      if(empty($response)==true){
//         move_uploaded_file($file_tmp,"posters/".$file_name);
//         $response["status"] = "Success";
//         $response["message"] = "Your file has been save successfully";
//         echoResponse(200, $response);
//      }else{
//          echoResponse(201, $response);
//      }
   }
});

$app->post('/whoweare', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('heading', 'intro', 'content'), $r->content);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $heading = $r->content->heading;
    //$middlename = $r->customer->middlename;
    $intro = $r->content->intro;
    //$content = $r->content->content;
    $r->content->edit = "false";
    $tabble_name = "who_we_are";
    $isExists = $db->getOneRecord("select 1 from " .$tabble_name." where heading='$heading' and intro='$intro'");
    if (!$isExists) {
    $column_names = array('heading', 'intro', 'content', 'edit');
        $result = $db->insertIntoTable($r->content, $column_names, $tabble_name);
        if (is_integer($result)) {
            $response["status"] = "success";
            $response["message"] = "content created successfully";
            $response["result"] = $result;
            echoResponse(200, $response);
            
            
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create content. Please try again";
            echoResponse(201, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "content already exists!";
        echoResponse(201, $response);
    }
});
?>