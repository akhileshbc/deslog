var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

myApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
            .when('/404', {
            templateUrl: 'views/404.html',
            controller: ''
        })
        .when('/courseregistration', {
            title: 'courseRegistration.html',
            templateUrl: 'views/register.html',
            controller: 'courseController'
        })
            .when('/register/:courseId', {
            title: 'registration',
            templateUrl: 'views/register.html',
            controller: 'usersController'
        })
            .when('/login', {
            title: 'Login',
            templateUrl: 'views/login.html',
            controller: 'usersController'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'views/login.html',
                controller: 'usersController'
            })
           
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'views/success.html',
                controller: 'usersController'
            })
            .when('/about', {
            title:'about',
            templateUrl: 'views/about.html',
            controller: ''
            })
            .when('/contact', {
            title: 'title',
            templateUrl: 'views/contactUs.html',
            controller: ''
            })
            .when('/', {
                title: 'Home',
                templateUrl: 'views/home.html',
                controller: 'usersController',
                role: '0'
            })
            .otherwise({
                redirectTo: '/'
            });
  }])
    .run(function ($rootScope, $location, userServices) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            userServices.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {

                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    });
