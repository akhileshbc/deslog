/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    myApp.controller('CourseController', function($scope, $rootScope, $routeParams, $location, $http, courseService) {

        $scope.courses = {};
        var that = this;

        courseService.getcountries().success(function(data) {
            that.countries = data;
            console.log(data);
        });
        
        //initially set those objects to null to avoid undefined error
        $scope.courseregistration = {};
        $scope.courseregistration = {courseTitle:'', startingDate:'', trainingLocation:'',
        cost:'', duration:'', status:'', seatTaken:'', seatAvail:'', image:''};

         $scope.courseRegistration = function (course) {
            courseService.post('registerCourse', {
                course: course
            }).then(function (results) {
                $scope.message = results.message
                courseService.toast(results);
                if (results.status == "success") {
                    $location.path('courseregistration')
                }
            });
        };
       
        
        
        (function(){
            $scope.getAllCourse = function () {
            courseService.get('registerCourse').then(function (results) {
                $scope.message = results.message
                courseService.toast(results);
                if (results.status == "success") {
                    $scope.courses = results.data;   
                }
            });
        };
        })();      
    });
