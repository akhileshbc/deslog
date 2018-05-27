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
$app->post('/uploader', function() use ($app) {
    $response = array();
    //$r = json_decode($app->request->getBody(), true);
    //$data = $app->request->getParsedBody();
    //$image = $app->request->getUploadedFiles();
    //this program failed here.
    //echoResponse(201, $data);
    //echoResponse(201, $image);
    
    //return;
    
    //$intro = $r->attachment->intro;
    $attachment = $_POST['intro'];
    //echoResponse(201, $intro);
    //return;
//    echoResponse(201, $attachment);
//    return;
    //verifyRequiredParams(array('intro'), $attachment);
    
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
    
    $isBannerExists = $db->getOneRecord("select 1 from bannerimage where image_url='$file_name' or intro = '$attachment'");
    if (!$isBannerExists) {
        $result = $db->insertIntoTable($image, $column_names, $tabble_name);
        if ($result != NULL) {
            move_uploaded_file($file_tmp,"posters/".$file_name);
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


?>