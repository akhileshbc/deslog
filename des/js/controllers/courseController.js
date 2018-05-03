/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){
    myApp.controller('CourseController', function(countryService) {

        var that = this;

        countryService.getcountries().success(function(data) {
            that.countries = data;
            console.log(data);
        });

    });


})();