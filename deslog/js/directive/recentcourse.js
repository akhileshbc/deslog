
myApp.directive('recentCourse', function() {
    return{
        restrict: 'A',   
        scope: {
            cr: '='
        },
        templateUrl: 'views/recentcourse.html'
    };
});


