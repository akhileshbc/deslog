var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

myApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
            .when('/404', {
            templateUrl: 'views/404.html',
            controller: ''
        })
            .when('/register/:courseCode', {
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
           
            .when('/success', {
                title: 'Dashboard',
                templateUrl: 'views/success.html',
                controller: 'authCtrl'
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
                controller: 'CourseController',
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



/**
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
      templateUrl: 'views/home.html',
      controller: ''
    }).
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/about', {
      templateUrl: 'views/about.html',
      controller: ''
    }).
    when('/contact', {
      templateUrl: 'views/contactUs.html',
      controller: ''
    }).
    when('/404', {
      templateUrl: 'views/404.html',
      controller: ''
    }).
    when('/register/:courseCode', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //currentAuth
      }//resolve
    }).
    otherwise({
      redirectTo: '/'
    });
}]);**/