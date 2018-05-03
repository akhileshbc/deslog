var app = angular.module("MyApp", ['paystack']);

//Set the Api Public Key!
app.config(['$paystackProvider', function ($paystackProvider) {
    $paystackProvider.configure({
        key: 'pk_test_########################################'
    });
}]);

app.controller("FooController", function ($scope) {
    //Unique transaction reference or order number
    $scope.reference = "####-####-####-####";
    
    //The customer's email address.
    $scope.email = "johndoe@example.com";
    
    //Amount you want to bill the customer in kobo for NGN
    $scope.amount = "100000"; //equals N1000
    
    //Metadata is optional
    $scope.metadata = {
        custom_fields: [
            {
                display_name: "Phone Number",
                variable_name: "phone",
                value: "+234##########"
            }
        ]
    };

    //Javascript function that is called before payment dialog is opened
    $scope.beforePopUp = function () {
        console.log("Now we can perform some task before opening the payment dialog");
        return true;
    };
    
    //Javascript function that is called when the payment is successful
    $scope.callback = function (response) {
        console.log(response);
    };
    
    //Javascript function that is called if the customer closes the payment window
    $scope.close = function () {
        console.log("Payment closed");
    };
});