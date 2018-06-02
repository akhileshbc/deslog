myApp.controller('courseController',['$scope', '$rootScope', '$routeParams', '$location', '$http', 'courseService', 'ModalService', 'pageContent', 'userServices' ,function($scope, $rootScope, $routeParams, $location, $http, courseService, ModalService, pageContent, userServices) {

    //$scope.courses = {};
    var that = this;
    that.can = false;
    that.banner = [];
    
//    that.remove = function(index) {
//        var selected = [];
//        angular.forEach(that.selected, function(selected, key) {
//            if (index != key) {
//                files.push(file);
//            }
//        });
//        $scope.files = files;
//    };
    that.selections = function(selected) {
        courseService.select.push(selected);
    };
    that.getselect = function(){
      return that.select;  
    };
     
     that.removeclass = function(){
         //that.select = [];
          $rootScope.$broadcast('changeClass', {call: 123});
     };
//     that.changeroute = function(route){
//         $location.path('dashboard');
//     };
//    
        that.initController = function() {
            that.bodyText = 'This text can be updated in modal 1';
        };
        that.initController();
         
        that.openModal = function(id){
            ModalService.Open(id);
        };
 
        that.closeModal = function(id){
            ModalService.Close(id);
        };
        deleteBannerImage = function(b){
            pageContent.delete(b.id).success(function (data){
                if(data.status == "success"){
                    that.bannerMessage = data.data.id + "removed" + data.status;
                }
                that.bannerMessage = data.status + ":" + " banner with ID:" + data.data.id + "remove failed";
            });
        };
        //#####################################################################
        //          home page banner and others
        //#####################################################################
        pageContent.get('bannerData').then(function(data) {
            //console.log("Scouting for home page banner data now. please wait!");
           console.log("in pagecontent service");
           //conslole.log(results.data);
           console.log(data.data);
           that.banner = data.data ;
                //console.log(data.data);
                //console.log(that.banner1);
//            that.banner = data;
//            console.log(data);
//            if(data.status == "success"){
//            that.banner = data;
//                //console.log(data);
//         }
        //console.log(data.message);
    });
    that.whoweare;
    pageContent.get('whoweare').then(function(data) {
        that.whoweare = data.data[0];
        console.log(data.data);
        if(data.status == "success"){
            
         }
    });
        //###########################################################################
        //       DISCOUNTED COURSES
        //###########################################################################
        that.discountedCourse = [
            {
                day: '5',
                month: 'may',
                title: 'Train the Trainer',
                intro: 'This course trains the trainer.'
            },
            {
                day: '5',
                month: 'may',
                title: 'Train the Trainer',
                intro: 'This course trains the trainer.'
            },
            {
                day: '5',
                month: 'may',
                title: 'Train the Trainer',
                intro: 'This course trains the trainer.'
            },
            {
                day: '5',
                month: 'may',
                title: 'Train the Trainer',
                intro: 'This course trains the trainer.'
            }
        ];
            
        //##############################################################################
        //              DISCOUNTED COURSES END HERE
        //##############################################################################
        
    that.deslog = [
        {
            type: 'single',
            combocost: '120000',
            selectible: true,
            courseDuration: '3 weeks',
            courseID: '1234456',
            classDuration: '4 hours',
            price: '120000',
            courseName: 'Nehbosh',
            startDate: 'April 8',
            location: 'Port Hartcourt',
            status: 'Open',
            seatAvil: '40',
            seatTaken: '29',
            image: 'img/educare/edu-2.jpg',
            des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'

        },
        {
            type: 'single',
             combocost: '120000',
            selectible: true,
            courseDuration: '3 weeks',
            courseID: '1234457',
            classDuration: '4 hours',
            price: '120000',
            courseName: 'Nehbosh',
            startDate: 'April 8',
            location: 'Port Hartcourt',
            status: 'Open',
            seatAvil: '40',
            seatTaken: '29',
            image: 'img/educare/edu-2.jpg',
            des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'

        },
        {
            type: 'single',
             combocost: '120000',
            selectible: true,
            courseDuration: '3 weeks',
            courseID: '1234459',
            classDuration: '4 hours',
            price: '120000',
            courseName: 'Nehbosh',
            startDate: 'April 8',
            location: 'Port Hartcourt',
            status: 'Open',
            seatAvil: '40',
            seatTaken: '29',
            image: 'img/educare/edu-2.jpg',
            des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'

        },
        {
            type: 'single',
             combocost: '120000',
            selectible: true,
            courseDuration: '3 weeks',
            des: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
            courseID: '1234410',
            classDuration: '4 hours',
            price: '120000',
            courseName: 'Nehbosh',
            startDate: 'April 8',
            location: 'Port Hartcourt',
            status: 'Open',
            seatAvil: '40',
            seatTaken: '29',
            image: 'img/educare/edu-2.jpg'

        },
        {
            type: 'single',
             combocost: '120000',
            selectible: true,
            courseDuration: '4 weeks',
            courseID: '1234411',
            classDuration: '4 hours',
            price: '80000',
            courseName: 'Android Development (Beginner)',
            startDate: 'May 9',
            location: 'Port Hartcourt',
            status: 'Open',
            seatAvil: '40',
            seatTaken: '29',
            image: 'img/educare/android.jpg',
            des: 'Learn the basics of Android and Java programming, and take the first step on your journey to becoming an Android developer!'

        },
        {
            type: 'single',
             combocost: '120000',
            selectible: true,
            courseDuration: '14 weeks',
            courseID: '1234412',
            classDuration: '4 hours',
            price: '80000',
            courseName: 'Android Development (Intermediate)',
            startDate: 'May 9',
            location: 'Port Hartcourt',
            status: 'Open',
            seatAvil: '40',
            seatTaken: '29',
            image: 'img/android.jpg',
            des: 'In this course we would be building a real app. We would dig into the foundamentals of how android work, its pattern and best practices.'

        }

    ];
    //#######################################################################
    //              COURSE GRID CONTROLLERS AND SELLING COURSE
    //#######################################################################
    /*
     * @counter hold the number of coourse in the currentCourse Array
     */
     var counter = 0;
    /*
     * @currentCourse holds courses selected by the user's of this site
     */
    that.currentCourse;
    //this method runs through the @that.select array and returns to the view
    //it only circle the array and doesn't make any changes
    
    that.getcurrentCourse = function(){
        console.log("i'm getCurrentCourse function" + " " +courseService.select.length);
        if(courseService.select.length == 0){
            alert("there's nothing to show. I'm taking you to course grid now.");
            $location.path('/training/generalcoursegrid');
            return;
        }
        if(counter == 2){
            counter = 0;
            console.log(counter + "at the loop when counter=3");
            that.currentCourse = courseService.select[counter];
            counter++;
            console.log(counter + "after counter is been increased");
            //that.$apply();
            
        }else{
            that.currentCourse = courseService.select[counter];
            
            counter++;
            console.log(counter + "looping through courseService.select");
            //$rootScope.$apply();
            //.$apply();
            
        }
        
    };
    /*
     * 
     * @param {type} selectedCourse 
     * @returns {undefined}
     */
    that.changeroute = function(selectedCourse){
        var count = 3;
        var courseID = selectedCourse.courseID;
        var courseIndex = courseService.select.indexOf(selectedCourse);
        if(selectedCourse != undefined && courseService.select.length != count && courseIndex == -1){
            courseService.select.push(selectedCourse);
            $rootScope.$broadcast('addCssRule', {course: courseID});
            courseID = null;
            alert(selectedCourse);
            //console.log(that.select);
            alert(courseService.select);
            //that.$emit("addCssRule", arg);
        }else if(courseIndex != -1){
            //alert("remove");
            //remove the item from the array
            courseService.select.splice(courseIndex,1);
            //alert();
            $rootScope.$broadcast('removeCssRule', {course: courseID});
            courseID = null;
            //that.$emit('removeCssRule');
            alert(selectedCourse + " " + "removed");
            alert(courseService.select);
            //console.log(that.select);
        }
        
        if(courseService.select.length == count){
            that.currentCourse = courseService.select[0];
            $location.path('/course/details');
            
                
                //$rootScope.$digest();
                //$scope.$apply();
        };
        
    }; 
    
//    $scope.$watch('that.currentCourse', function(newValue, oldValue){
//        $scope.$apply();
//    });
    
    that.clearCourseArray = function(){
        
            courseService.select = [];
            $location.path('/training/generalcoursegrid');
//            $scope.$on('$routeChangeStart', function($event, next, current) { 
//  
//                
//            });
//        
        
    };

    that.recent = [
        {
            image: 'img/educare/sidebar-1.jpg',
            title: 'Graphic design',
            start: '21 July 2017',
            comment: '45 comments'
        },
        {
            image: 'img/educare/sidebar-1.jpg',
            title: 'Graphic design',
            start: '21 July 2017',
            comment: '45 comments'
        },
        {
            image: 'img/educare/sidebar-3.jpg',
            title: 'Graphic design',
            start: '21 July 2017',
            comment: '45 comments'
        },
        {
            image: 'img/educare/sidebar-2.jpg',
            title: 'Graphic design',
            start: '21 July 2017',
            comment: '45 comments'
        }
    ];

    that.message = [
        {
            name: 'wolverine',
            actor: 'Hugh Jackman',
            image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwj949fVgaPaAhXLzaQKHbCbBIYQjRx6BAgAEAU&url=http%3A%2F%2Fwww.imdb.com%2Fname%2Fnm0413168%2F&psig=AOvVaw2-9EzNDXcK57hXkpwcrg9o&ust=1523013525570818'
        },
        {
            name: 'Jane Grey',
            actor: 'Ophie Turner',
            image: 'https://www.google.com/search?client=firefox-b&dcr=0&q=Sophie+Turner&stick=H4sIAAAAAAAAAONgFuLSz9U3MCqqMDAuUgKzM8wsksuLtCSzk6300zJzcsFEfHFqUWZqsVVyYnHJI8YQboGXP-4JS3lPWnPyGqMrF261QhpcbK55JZkllUJyXHxSSJZpMEjxcCHxeQDU5miijAAAAA&npsic=0&sa=X&ved=0ahUKEwiZzc2mgqPaAhUxMuwKHelbB-0Q-BYIMQ'
        },
        {
            name: 'Magneto',
            actor: 'Machiel Fassbender',
            image: 'data:image/jpeg;base64,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'
        },
        {
            name: 'Magneto',
            actor: 'Machiel Fassbender',
            image: 'data:image/jpeg;base64,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'
        }
    ];

    courseService.getcountries().success(function(data) {
        that.course = data;
        //console.log(data);
    });

    //initially set those objects to null to avoid undefined error
    $scope.courseregistration = {};
    $scope.courseregistration = {courseTitle: '', startingDate: '', trainingLocation: '',
        cost: '', duration: '', status: '', seatTaken: '', seatAvail: '', image: ''};

    $scope.courseRegistration = function(course) {
        courseService.post('registerCourse', {
            course: course
        }).then(function(results) {
            $scope.message = results.message
            courseService.toast(results);
            if (results.status == "success") {
                $location.path('courseregistration')
            }
        });
    };



    (function() {
        $scope.getAllCourse = function() {
            courseService.get('registerCourse').then(function(results) {
                $scope.message = results.message
                courseService.toast(results);
                if (results.status == "success") {
                    $scope.courses = results.data;
                }
            });
        };
    })();
    //#################################################################
    //                        File upload method
    //#################################################################
    $scope.uploadFile = function(attachment){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "uploader";
        courseService.uploadFileToUrl(uploadUrl, file, attachment).then(function(results) {
            //$scope.message = results.message;
            console.log(results);
            courseService.toast(results);
            if (results.status == "success") {
                //$location.path('courseregistration');
            }
        });
    };
    
    /**paystack methods here
    *
    **/
    that.payWithPaystack = function( email, amount, course, value){
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
                
                
                display_name: course || "null",
                variable_name: course || "unknown",
                value: value || 1
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
                $location.path('dashboard');
            }
        });
          //alert('success. transaction ref is ' + response.reference);
      },
      onClose: function(){
          //that.select = [];
          
         that.removeclass();
         alert(that.select);
          alert('Transaction is been cancelled but here is your reference ID: \n\
                    you would need it should you want to continue sometimes soon');
      }
    });
    handler.openIframe();
  };
  
}]);
