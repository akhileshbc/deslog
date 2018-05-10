var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

myApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
            .when('/404', {
            templateUrl: 'views/404.html',
            controller: ''
        })
        .when('/upload', {
                title: 'upload file',
                templateUrl: 'views/courseupload.html',
                controller: 'courseController'
                //role: '0'
            })
        .when('/training/hselevel', {
                title: 'HSE Level 1, 2 & 3 (WSO)',
                templateUrl: 'views/hselevel.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/advancehse', {
                title: 'Advance HSE Level 3 (WSO)',
                templateUrl: 'views/advancehse.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/firefighting', {
                title: 'Basic Fire Fighting',
                templateUrl: 'views/firefighting.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/safetysupervision', {
                title: 'Basic Fire Fighting',
                templateUrl: 'views/safteysupervision.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/accidentinvestigation', {
                title: 'Accident Investigation and Reporting',
                templateUrl: 'views/accidentinvestigation.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/chemicalhandling', {
                title: 'Safe Chemical Handling',
                templateUrl: 'views/chemicalhandling.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/scafoldsafety', {
                title: 'Scaffold Safety',
                templateUrl: 'views/scafoldsafety.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/foodsafety', {
                title: 'Basic Food Safety and Catering Mgt.(1&2)',
                templateUrl: 'views/foodsafety.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/rigtraining', {
                title: 'Basic Rig Training (Roustabout/Rig Helper)',
                templateUrl: 'views/rigtraining.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/oilandgassafety', {
                title: 'Oil & Gas Rig Safety',
                templateUrl: 'views/oilandgassafety.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/corporateform', {
                title: 'Corporate Sign-up Form',
                templateUrl: 'views/corporateform.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/nyscorps', {
                title: 'NYSC Post Camp Training',
                templateUrl: 'views/nyscorps.html',
                controller: 'courseController as cd'
                //role: '0'
            })
            .when('/training/generalcoursegrid', {
                title: 'General Courses Grid',
                templateUrl: 'views/generalcourses.html',
                controller: 'courseController as m'
                //role: '0'
            })
            .when('/career/applicant', {
                title: 'General Courses Grid',
                templateUrl: 'views/applicant.html',
                controller: 'courseController as cd'
                //role: '0'
            })
        .when('/services/train', {
            title: 'Training and Certification',
            templateUrl: 'views/train.html',
            controller: 'courseController as cd'
        })
        .when('/services/corrosioncontrol', {
            title: 'NDT and Corrosion Control Services',
            templateUrl: 'views/corrosioncontrol.html',
            controller: 'courseController as cd'
        })
        .when('/services/environmanagement', {
            title: 'Environment Management Services',
            templateUrl: 'views/environmanagement.html',
            controller: 'courseController as cd'
        })
        .when('/services/manpower', {
            title: 'Manpower Outsourcing and Supply',
            templateUrl: 'views/manpower.html',
            controller: 'courseController as cd'
        })
        .when('/services/supplyofchem', {
            title: 'Supplyof Chemical and Safety Tools',
            templateUrl: 'views/supplyofchem.html',
            controller: 'courseController as cd'
        })
        .when('/services/riskmanagement', {
            title: 'H.S.E and Risk Management Consultancy',
            templateUrl: 'views/riskmanagement.html',
            controller: 'courseController as cd'
        })
        .when('/courseregistration', {
            title: 'courseRegistration',
            templateUrl: 'views/register.html',
            controller: 'courseController'
        })
            .when('/register', {
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
                controller: 'courseController as m',
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
                    $rootScope.lastname = results.lastname;
                    $rootScope.email = results.email;
                    console.log($rootScope.authenticated);
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/dashboard' && $rootScope.authenticated == false) {
                        $location.path("/");
                        
                    } 
                }
            });
        });
    });
