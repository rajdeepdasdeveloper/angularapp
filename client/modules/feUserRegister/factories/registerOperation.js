feUserRegister.factory('registerOperation', function($rootScope, $http, $timeout, $location) {

    var factory = {}; 

    factory.register = function(newUser, ctrl) {
        ctrl.disabled = true;
    	$http({
            method : "JSON",
            data : newUser[0],
            url : $rootScope.apiURL + "person/register.php",
            headers: {'Content-Type' : 'application/json'}
        })
        .then(function success(response) {
            if(response.data){
                ctrl.status = response.data.message;
                ctrl.disabled = false;
                if(response.data.message == "1"){
                    $timeout(function(){ 
                        $location.url('/activate-account');
                    }, 3000);
                }
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