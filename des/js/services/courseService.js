/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){ myApp.factory('countryService', function($http) {
        var baseUrl = 'api/v1/';

        return {
          getcountries: function() {
              return $http.get(baseUrl + 'getcountries.php');
          },
          getStates: function(countryCode) {
              return $http.get(baseUrl + 'getStates.php?countryCode=' +
                encodeURIComponent(countryCode));
          },
          addState: function(name, countryCode) {
              return $http.get(baseUrl + 'addState.php?name=' +
                encodeURIComponent(name) + '&countryCode=' +
                encodeURIComponent(countryCode));
          }
        };
        
    });

})();
