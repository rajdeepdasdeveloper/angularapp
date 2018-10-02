feUserRegister.factory('registerOperation', function($rootScope, $http) {

    var factory = {}; 

    factory.register = function(newUser, ctrl) {

    	$http({
            method : "JSON",
            data : newUser[0],
            url : $rootScope.apiURL + "person/register.php",
            headers: {'Content-Type' : 'application/json'}
        })
        .then(function success(response) {
            if(response.data){
                ctrl.status = response.data.message;
                //alert(response.data.message);
            }
            else{
                alert("Something went wrong. Please check your internet connction and try again");
                window.location = $rootScope.baseUrl + "sign-in";
            }
        }, function error(response) {
            alert("Something went wrong. Please check your internet connction and try again");
            window.location = $rootScope.baseUrl + "sign-in";
        });
    }

    return factory;
});