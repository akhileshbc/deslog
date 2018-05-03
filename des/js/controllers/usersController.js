/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    myApp.controller('usersController', function ($scope, $rootScope, $routeParams, 
    $location, $http, userServices) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        userServices.post('login', {
            customer: customer
        }).then(function (results) {
            userServices.toast(results);
            if (results.status == "success") {
                $location.path('success');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        userServices.post('signUp', {
            customer: customer
        }).then(function (results) {
            userServices.toast(results);
            if (results.status == "success") {
                $location.path('success');
            }
        });
    };
    $scope.logout = function () {
        userServices.get('logout').then(function (results) {
            userServices.toast(results);
            $location.path('login');
        });
    };
});

