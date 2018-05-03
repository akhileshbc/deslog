/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller('courseCtrl', function ( $scope, $rootScope, $routeParams, $location, $http, Courseservice) {
    //initially set those objects to null to avoid undefined error
   
    $scope.courses = {};
    $scope.getCourse = function () {
        
        Courseservice.get('courses').success(function(data) {
            $scope.courses = data;
            console.log(data);
        });
    };
   /** $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
		
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    **/
   
});


