myApp.directive('sellingCourse', ['$rootScope', '$location', 'userServices', '$window', function($rootScope, $location, userServices, $window) {
        'use strict';
        return{
            restrict: 'A',
            replace: true,
            scope: {
                sell: '=',
                selections: '&',
                select: '=',
                paymentproceed: '&',
                changeroute: '&',
                add: '&add'

            },           
            templateUrl: 'views/sellingcourse.html',
            link: function(scope, element, attributes) {
                var undoclass = function() {
                    element.attr('class', 'col-lg-3 col-md-3 col-sm-4');

                };
                var addCssRule = function(){
                     element.attr('class', 'selected col-lg-3 col-md-3 col-sm-4');
                };
                scope.$on('removeCssRule', function(event, selectedCourse) {
                    if(selectedCourse.course == scope.sell.courseID){
                        undoclass();
                    }
                    
                    //scope.select = [];
                });
                scope.$on('addCssRule', function(event,selectedCourse){
                    //preventDefault();
                    console.log(selectedCourse.course + " " + "in link function");
                    //console.log(event);
                    if(selectedCourse.course == scope.sell.courseID){
                        addCssRule();
                    }
                    
                });

                element.bind('dblclick', function(e) {
                    // var selected = [];
                    if (e !== null) {
                        e.preventDefault();
                    }
                    ;

                });
                var count = 3;
                var DELAY = 400;
                var clicks = 0;
                var timer = null;
                
                element.bind('', function(e) {
                    if (e !== null) {
                        e.preventDefault();
                    }

                    clicks++;  //count clicks

                    if (clicks === 1) {

                        timer = setTimeout(function() {

                            var index = scope.select.indexOf(scope.sell.courseName);
                            if (index > -1) {
                                scope.select.splice(index, 1);
                            }
                            ;
                            alert("the element with the ID has be deleted from the array" + scope.select);
                            undoclass();
                            //$location.path('/register');
                            //alert(scope.select);
                            console.log(scope.select);
                            //alert('Single Click'); //perform single-click action

                            clicks = 0;  //after action performed, reset counter

                        }, DELAY);

                    } else {

                        clearTimeout(timer);  //prevent single-click action
                        if (scope.sell.type === 'single' && scope.sell.selectible === true) {

                            if (scope.select.length !== count) {
                                element.attr('class', 'selected col-lg-3 col-md-3 col-sm-4');

                                scope.selections({arg1: scope.sell.courseName});
//                        courseService.toastcourse({
//                            'courseID' : 'ekene',
//                            'des': 'ekene'
//                        });
                                //toaster.pop(scope.courseID, "", scope.des, 10000, 'trustedHtml');
                                alert(scope.select);
                                console.log(scope.select);

                            } else {
                                alert("you can't select more than three causes");

                            }
                            ;

                            if (scope.select.length === count) {
                                //scope.changeroute({arg1: scope.sell.courseName});

                                $location.path('/register');
                                scope.$apply();
                                //replace();

//                          var url = "http://" + $window.location.host + "/register";
//                         
//                          $window.location.href = url;
//                          alert("running to make registration");

//                            scope.paymentproceed({arg1: $rootScope.email, arg2: scope.sell.price, 
//                                arg3: scope.sell.courseName, arg4: scope.select});
//                        
                            }
                        }
                        ;
                        //alert('Double Click');  //perform double-click action

                        clicks = 0;  //after action performed, reset counter
                    }
                    ;




                });
            }
//            ,
//            controller: function($scope){
//                var add = this;
//                add.callAddCourse = $scope.addCourseToCourseArray;
//                    
//                
//            },
//            //this is my girlfriend petname
//            controllerAs: 'belle'

        };
    }]);


