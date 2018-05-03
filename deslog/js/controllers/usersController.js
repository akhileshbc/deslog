myApp.controller('usersController', function ( $scope, $rootScope, $routeParams, $location, $http, courseService) {
    //initially set those objects to null to avoid undefined error
    $scope.message = '';
    $scope.status = false;
    $scope.gender = [
        
        {'sex': 'Male'},
        {'sex': 'Female'},
        {'sex': 'Transgender'},
        {'sex': 'Not Defined'}
    ];
    $scope.selectedItem = $scope.gender[0];
    $scope.login = {};
    $scope.signup = {};
    
     $scope.doLogin = function (customer) {
        $scope.message = 'Please wait while we confirm your identity';
        $scope.status = true;
        userServices.post('login', {
            customer: customer
        }).then(function (results) {
            $scope.message = results.message;
            userServices.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
                $scope.message = '';
                
            }
             $scope.status = false;
        });
       
    };
    
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        $scope.status= true;
	$scope.message = 'Please wait while while process your info';
        userServices.post('signUp', {
            customer: customer
        }).then(function (results) {
            userServices.toast(results);
            if (results.status == "success") {
                $scope.message = results.message;
                $location.path('dashboard');
                $scope.payWithPaystack(results.email, $routeParams.combocost, $routeParams.course);
                
                $scope.message = '';
            }
            $scope.status = false;
        });
        
    };
    
    $scope.logout = function () {
        userServices.get('logout').then(function (results) {
            userServices.toast(results);
            $location.path('login');
        });
    };
    $rootScope.log = function () {
        userServices.get('logout').then(function (results) {
            userServices.toast(results);
            $location.path('login');
        });
    };
    /**paystack methods here
    *
    **/
    $scope.payWithPaystack = function( email, amount, value){
       var combo = "";
       if(typeof value=== Array.isArray){
           combo = " Combo Course";
       }
       combo = value;
           
    var handler = PaystackPop.setup({
      key: 'pk_test_2a131a095b15d5e6441edcf8b51f096dfcba38ff',
      email: email || 'senenerst@gmail.com',
      amount: amount || 1000000,
      //ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
         custom_fields: [
            { /**
             * "metadata":{"cart_id":398,"custom_fields":[{"display_name":"Invoice ID","variable_name":"Invoice ID","value":209},
             * {"display_name":"Cart Items","variable_name":"cart_items","value":"3 bananas, 12 mangoes"}]}
              *
              **/
                
                
                display_name: combo || "null",
                variable_name: combo || "unknown",
                value: combo || 1
            }
         ]
      },
      callback: function(response){
          //response["course_code"] = course;
          userServices.post('verifyPayment', {
            reference: response
        }).then(function (results) {
            
            if(results.status === "error"){
                userServices.toast(results.message);
                alert(results.message);
            }
            if (results.status == "success") {
                $scope.payWithPaystack();
                //$location.path('dashboard');
            }
        });
          //alert('success. transaction ref is ' + response.reference);
      },
      onClose: function(){
          alert('Transaction is been cancelled but here is your reference ID: \n\
                    you would need it should you want to continue sometimes soon');
      }
    });
    handler.openIframe();
  };
  
  
  /** Json response of test data sent to paystack.co payment solution system
   * {
  "status": true,
  "message": "Transaction log updated successfully",
  "data": {
    "id": 14698623,
    "domain": "test",
    "status": "success",
    "reference": "T885721307709471",
    "amount": 1000000,
    "message": null,
    "gateway_response": "Successful",
    "paid_at": "2018-02-14T23:22:52.000Z",
    "created_at": "2018-02-14T23:19:33.000Z",
    "channel": "card",
    "currency": "NGN",
    "ip_address": "105.112.41.16",
    "metadata": {
      "custom_fields": [
        {
          "display_name": "null",
          "variable_name": "unknown",
          "value": 1
        }
      ],
      "referrer": "http://localhost/ekene/#/dashboard"
    },
    "log": {
      "time_spent": 191,
      "attempts": 1,
      "authentication": null,
      "errors": 0,
      "success": true,
      "mobile": false,
      "input": [],
      "channel": null,
      "history": [
        {
          "type": "input",
          "message": "Filled these fields: card number, card expiry, card cvv",
          "time": 188
        },
        {
          "type": "action",
          "message": "Attempted to pay",
          "time": 188
        },
        {
          "type": "success",
          "message": "Successfully paid",
          "time": 190
        },
        {
          "type": "close",
          "message": "Page closed",
          "time": 191
        }
      ]
    },
    "fees": 25000,
    "fees_split": null,
    "customer": {},
    "authorization": {},
    "plan": {},
    "subaccount": {},
    "paidAt": "2018-02-14T23:22:52.000Z",
    "createdAt": "2018-02-14T23:19:33.000Z"
  }
}
   * myObj = {
    "name":"John",
    "age":30,
    "cars": [
        { "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
        { "name":"BMW", "models":[ "320", "X3", "X5" ] },
        { "name":"Fiat", "models":[ "500", "Panda" ] }
    ]
 } 
    //Json processing here
    for (i in myObj.cars) {
    x += "<h1>" + myObj.cars[i].name + "</h1>";
    for (j in myObj.cars[i].models) {
        x += myObj.cars[i].models[j];
    }
}
   */
  //var data = {"data":{"courseId":"1","courseTitle":"hse","startingDate":"2018-12-12",
  //"trainingLocation":"port harcourt","cost":"20000","duration":"40","status":"open",
  //"type":null,"created":"2018-02-14 13:04:12","seatTaken":null,"seatAvail":"40","image":""}}
  
  /**
   * {
" response": {
"class": "chart",
"data": [
    {
        "artist": {
            "class": "artist",
            "id": "ed61fe981f9143fe82536a0e5e9836f7",
            "musicbrainz": "73e5e69d-3554-40d8-8516-00cb38737a1c",
            "name": "Rihanna"
        },
        "rank": 1,
        "value": 42437.6397
    },
    {
        "artist": {
            "class": "artist",
            "id": "668dfb9383684b79ba603605db21ac51",
            "musicbrainz": "f99b7d67-4e63-4678-aa66-4c6ac0f7d24a",
            "name": "PSY"
        },
        "rank": 2,
        "value": 21562.2685
    },

   … goes up to about 200 items
   ],

     "end_time": 1358553600,
    "id": "396c5b836ce74200b2b5b8ba1df28956",
    
    //php nested json processing
    $stuff = json_decode($json, true);

$results = array();

foreach($stuff['response']['data'] as $chunk) {
  $artist = $chunk['artist'];
  $id   = $artist['id'];
  $name = $artist['name'];

  $rank = $chunk['rank'];

  $tuple = array($id, $name, $rank);

  $results[] = $tuple;
}

shareimprove this answer
   */
  
  //transaction response of paystack
  /**
   * {  
   "event":"charge.success",
   "data":{  
      "id":302961,
      "domain":"live",
      "status":"success",
      "reference":"qTPrJoy9Bx",
      "amount":10000,
      "message":null,
      "gateway_response":"Approved by Financial Institution",
      "paid_at":"2016-09-30T21:10:19.000Z",
      "created_at":"2016-09-30T21:09:56.000Z",
      "channel":"card",
      "currency":"NGN",
      "ip_address":"41.242.49.37",
      "metadata":0,
      "log":{  
         "time_spent":16,
         "attempts":1,
         "authentication":"pin",
         "errors":0,
         "success":false,
         "mobile":false,
         "input":[  

         ],
         "channel":null,
         "history":[  
            {  
               "type":"input",
               "message":"Filled these fields: card number, card expiry, card cvv",
               "time":15
            },
            {  
               "type":"action",
               "message":"Attempted to pay",
               "time":15
            },
            {  
               "type":"auth",
               "message":"Authentication Required: pin",
               "time":16
            }
         ]
      },
      "fees":null,
      "customer":{  
         "id":68324,
         "first_name":"BoJack",
         "last_name":"Horseman",
         "email":"bojack@horseman.com",
         "customer_code":"CUS_qo38as2hpsgk2r0",
         "phone":null,
         "metadata":null,
         "risk_action":"default"
      },
      "authorization":{  
         "authorization_code":"AUTH_f5rnfq9p",
         "bin":"539999",
         "last4":"8877",
         "exp_month":"08",
         "exp_year":"2020",
         "card_type":"mastercard DEBIT",
         "bank":"Guaranty Trust Bank",
         "country_code":"NG",
         "brand":"mastercard"
      },
      "plan":{}
   }
}
   * 
   * 
   * 
   * 
   * 
   */
  
});
