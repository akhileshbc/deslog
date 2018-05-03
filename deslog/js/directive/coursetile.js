myApp.directive('courseTile', function(){
    return{
        restrict:'A',
        
        scope: {
              actor: '='
        },
        templateUrl: 'views/coursetile.html'
    };
});

