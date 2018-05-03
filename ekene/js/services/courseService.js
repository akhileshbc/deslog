/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){ myApp.factory('courseService', function($http) {
        var serviceBase = 'api/v1/';

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
				
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        
        obj.getcountries = function() {
              return $http.get(serviceBase + 'getAllCourse');
              
          };
          obj.getStates = function(countryCode) {
              return $http.get(serviceBase + 'getStates.php?countryCode=' +
                encodeURIComponent(countryCode));
          };
          obj.addState = function(name, countryCode) {
              return $http.get(serviceBase + 'addState.php?name=' +
                encodeURIComponent(name) + '&countryCode=' +
                encodeURIComponent(countryCode));
          };

        return obj;

        
          
        
        
        
    });
    

})();
